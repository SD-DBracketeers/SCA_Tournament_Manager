package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"api/models"
	"api/utils"

	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetParticipants retrieves all tournaments from the MongoDB collection
func GetTournaments(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var tournaments []models.Tournament
		collection := db.Collection("Tournaments")
		cursor, err := collection.Find(context.Background(), bson.M{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer cursor.Close(context.Background())

		for cursor.Next(context.Background()) {
			var tournament models.Tournament
			cursor.Decode(&tournament)
			tournaments = append(tournaments, tournament)
		}

		json.NewEncoder(w).Encode(tournaments)
	}
}

// CreateParticipant inserts a new participant into the MongoDB collection
func CreateTournament(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var participant models.Participant
		json.NewDecoder(r.Body).Decode(&participant)
		participant.CreatedAt = time.Now()
		//do something similar to generate the nanoID
		nanoID, err := utils.GenerateDocumentNanoID()
		if err != nil {
			http.Error(w, "Error generating id value", http.StatusInternalServerError)
			return
		}
		participant.ParticipantNanoID = nanoID

		collection := db.Collection("Participants")
		result, err := collection.InsertOne(context.Background(), participant)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "Participant created with ID: %v", result.InsertedID)
	}
}

// GetParticipant retrieves a user by their UserNanoID
func GetTournament(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the participantNanoID from the URL parameters
		vars := mux.Vars(r)                                // Get URL parameters using gorilla/mux
		participantNanoID, ok := vars["participantNanoID"] // Extract participantNanoID from the route
		if !ok || participantNanoID == "" {
			http.Error(w, "Missing participantNanoID", http.StatusBadRequest)
			return
		}

		// Query the database for the user
		var participant models.Participant
		collection := db.Collection("Participants")
		err := collection.FindOne(context.Background(), bson.M{"participantNanoID": participantNanoID}).Decode(&participant)
		if err != nil {
			http.Error(w, "Participant not found", http.StatusNotFound)
			return
		}

		// Return the user as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(participant)
	}
}

// UpdateParticipant updates a user's information based on their ParticipantNanoID
func UpdateTournament(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the UserNanoID from the URL parameters

		vars := mux.Vars(r)                                // Get URL parameters using gorilla/mux
		participantNanoID, ok := vars["participantNanoID"] // Extract userNanoID from the route
		if !ok || participantNanoID == "" {
			http.Error(w, "Missing participantNanoID", http.StatusBadRequest)
			return
		}

		// Decode the request body into a User struct
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
				"verificationExperationDate": updatedParticipant.VerificationExperationDate,
				"combatType":                 updatedParticipant.CombatType,
				"kingdom":                    updatedParticipant.Kingdom,
				"tournamentParticipantIn":    updatedParticipant.TournamentParticipantIn,
			},
		}

		// Update the user in the database
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
		w.Write([]byte("Participant updated successfully"))
	}
}
