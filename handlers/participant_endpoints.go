package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"api/dbcommands"
	"api/models"
	"api/utils"

	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetParticipants retrieves all participants from the MongoDB collection
func GetParticipants(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		collection := db.Collection("Participants")
		cursor, err := collection.Find(context.Background(), bson.M{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer cursor.Close(context.Background())

		var participantsResponse []models.ParticipantResponse

		for cursor.Next(context.Background()) {
			var participant models.Participant
			if err := cursor.Decode(&participant); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Convert time.Time fields to string representations
			participantResponse := models.ParticipantResponse{
				ParticipantID:              participant.ParticipantID,
				ParticipantNanoID:          participant.ParticipantNanoID,
				Name:                       participant.Name,
				Username:                   participant.Username,
				Password:                   participant.Password,
				Rank:                       participant.Rank,
				VerificationExpirationDate: participant.VerificationExpirationDate.Format(time.RFC3339), // Format to JS-compatible string
				CreatedAt:                  participant.CreatedAt.Format(time.RFC3339),                  // Format to JS-compatible string
				CombatType:                 participant.CombatType,
				Kingdom:                    participant.Kingdom,
				TournamentParticipantIn:    participant.TournamentParticipantIn,
				Wins:                       participant.Wins,
				Losses:                     participant.Losses,
			}

			participantsResponse = append(participantsResponse, participantResponse)
		}

		if err := cursor.Err(); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Encode the response with the time fields as strings
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(participantsResponse)
		if err != nil {
			fmt.Print(err)
		}

	}
}

// CreateParticipant inserts a new participant into the MongoDB collection
func CreateParticipant(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var participant models.Participant
		err := json.NewDecoder(r.Body).Decode(&participant)
		if err != nil {
			fmt.Print(err)
		}
		participant.CreatedAt = time.Now()
		//do something similar to generate the nanoID
		nanoID, err := utils.GenerateDocumentNanoID()
		if err != nil {
			http.Error(w, "Error generating id value", http.StatusInternalServerError)
			return
		}
		participant.ParticipantNanoID = nanoID

		collection := db.Collection("Participants")
		_, err = collection.InsertOne(context.Background(), participant)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "%s", nanoID)
	}
}

// GetParticipant retrieves a participant by their ParticipantNanoID
func GetParticipant(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the participantNanoID from the URL parameters
		vars := mux.Vars(r)                                // Get URL parameters using gorilla/mux
		participantNanoID, ok := vars["participantNanoID"] // Extract participantNanoID from the route
		if !ok || participantNanoID == "" {
			http.Error(w, "Missing participantNanoID", http.StatusBadRequest)
			return
		}

		// Query the database for the participant
		var participant models.Participant
		collection := db.Collection("Participants")
		err := collection.FindOne(context.Background(), bson.M{"participantNanoID": participantNanoID}).Decode(&participant)
		if err != nil {
			http.Error(w, "Participant not found", http.StatusNotFound)
			return
		}

		// Create a response struct with time.Time fields as strings
		participantResponse := models.ParticipantResponse{
			ParticipantID:              participant.ParticipantID,
			ParticipantNanoID:          participant.ParticipantNanoID,
			Name:                       participant.Name,
			Username:                   participant.Username,
			Password:                   participant.Password,
			Rank:                       participant.Rank,
			VerificationExpirationDate: participant.VerificationExpirationDate.Format(time.RFC3339), // Format to JS-compatible string
			CreatedAt:                  participant.CreatedAt.Format(time.RFC3339),                  // Format to JS-compatible string
			CombatType:                 participant.CombatType,
			Kingdom:                    participant.Kingdom,
			TournamentParticipantIn:    participant.TournamentParticipantIn,
			Wins:                       participant.Wins,
			Losses:                     participant.Losses,
		}

		// Return the participant as JSON
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(participantResponse)

		if err != nil {
			fmt.Print(err)
		}
	}
}

// UpdateParticipant updates a participant's information based on their ParticipantNanoID
func UpdateParticipant(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the ParticipantNanoID from the URL parameters

		vars := mux.Vars(r)                                // Get URL parameters using gorilla/mux
		participantNanoID, ok := vars["participantNanoID"] // Extract participantNanoID from the route
		if !ok || participantNanoID == "" {
			http.Error(w, "Missing participantNanoID", http.StatusBadRequest)
			return
		}

		// Decode the request body into a Participant struct
		var updatedParticipant models.Participant
		if err := json.NewDecoder(r.Body).Decode(&updatedParticipant); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Prepare the update fields
		updateFields := bson.M{
			"$set": bson.M{
				"name":                       updatedParticipant.Name,
				"rank":                       updatedParticipant.Rank,
				"verificationExpirationDate": updatedParticipant.VerificationExpirationDate,
				"combatType":                 updatedParticipant.CombatType,
				"kingdom":                    updatedParticipant.Kingdom,
				"tournamentParticipantIn":    updatedParticipant.TournamentParticipantIn,
				"wins":                       updatedParticipant.Wins,
				"losses":                     updatedParticipant.Losses,
			},
		}

		// Update the participant in the database
		collection := db.Collection("Participants")
		_, err := collection.UpdateOne(
			context.Background(),
			bson.M{"participantNanoID": participantNanoID},
			updateFields,
			options.Update().SetUpsert(false), // Do not create a new document if not found
		)

		if err != nil {
			http.Error(w, "Failed to update participant", http.StatusInternalServerError)
			return
		}

		// Respond with a success message
		w.WriteHeader(http.StatusOK)
		_, err = w.Write([]byte("Participant updated successfully"))
		if err != nil {
			fmt.Print(err)
		}

	}
}

func CheckLogin(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)              // Get URL parameters using gorilla/mux
		username, ok := vars["username"] // Extract participantNanoID from the route
		if !ok || username == "" {
			http.Error(w, "Missing username", http.StatusBadRequest)
			return
		}

		password, ok := vars["password"] // Extract participantNanoID from the route
		if !ok || password == "" {
			http.Error(w, "Missing password", http.StatusBadRequest)
			return
		}

		//Check if there is a document with that username and password.
		// Query the database for the participant
		var participant models.Participant
		collection := db.Collection("Participants")
		err := collection.FindOne(context.Background(), bson.M{"password": password, "username": username}).Decode(&participant)
		if err != nil {
			http.Error(w, "Participant not found", http.StatusNotFound)
			return
		}

		// Return the participant as JSON
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode("Login successfull")
		if err != nil {
			fmt.Print(err)
		}

	}

}
