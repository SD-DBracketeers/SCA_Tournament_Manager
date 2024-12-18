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

// GetTournaments retrieves all tournaments from the MongoDB collection
func GetTournaments(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		collection := db.Collection("Tournaments")
		cursor, err := collection.Find(context.Background(), bson.M{})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer cursor.Close(context.Background())

		var tournamentsResponse []models.TournamentResponse

		for cursor.Next(context.Background()) {
			var tournament models.Tournament
			if err := cursor.Decode(&tournament); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			// Convert time.Time fields to string representations
			tournamentResponse := models.TournamentResponse{
				TournamentID:     tournament.TournamentID,
				TournamentNanoID: tournament.TournamentNanoID,
				Name:             tournament.Name,
				EventType:        tournament.EventType,
				Kingdom:          tournament.Kingdom,
				Location:         tournament.Location,
				Date:             tournament.Date.Format(time.RFC3339), // Format to JS-compatible string
				Description:      tournament.Description,
				CreatedAt:        tournament.CreatedAt.Format(time.RFC3339), // Format to JS-compatible string
				Participants:     tournament.Participants,
				Progression:      tournament.Progression,
			}

			tournamentsResponse = append(tournamentsResponse, tournamentResponse)
		}

		// Encode the response with the time fields as strings
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(tournamentsResponse)
		if err != nil {
			fmt.Print(err)
		}
	}
}

// CreateTournament inserts a new tournament into the MongoDB collection
func CreateTournament(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var tournament models.Tournament
		err := json.NewDecoder(r.Body).Decode(&tournament)
		if err != nil {
			fmt.Print(err)
		}
		tournament.CreatedAt = time.Now()
		//do something similar to generate the nanoID
		nanoID, err := utils.GenerateDocumentNanoID()
		if err != nil {
			http.Error(w, "Error generating id value", http.StatusInternalServerError)
			return
		}
		tournament.TournamentNanoID = nanoID

		collection := db.Collection("Tournaments")
		_, err = collection.InsertOne(context.Background(), tournament)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "%s", tournament.TournamentNanoID)
	}
}

// GetTournament retrieves a tournament by their TournamentNanoID
func GetTournament(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the tournamentNanoID from the URL parameters
		vars := mux.Vars(r)
		tournamentNanoID, ok := vars["tournamentNanoID"]
		if !ok || tournamentNanoID == "" {
			http.Error(w, "Missing tournamentNanoID", http.StatusBadRequest)
			return
		}

		// Query the database for the tournament
		var tournament models.Tournament
		collection := db.Collection("Tournaments")
		err := collection.FindOne(context.Background(), bson.M{"tournamentNanoID": tournamentNanoID}).Decode(&tournament)
		if err != nil {
			http.Error(w, "Tournament not found", http.StatusNotFound)
			return
		}

		// Convert time.Time fields to string representations
		tournamentResponse := models.TournamentResponse{
			TournamentID:     tournament.TournamentID,
			TournamentNanoID: tournament.TournamentNanoID,
			Name:             tournament.Name,
			EventType:        tournament.EventType,
			Kingdom:          tournament.Kingdom,
			Location:         tournament.Location,
			Date:             tournament.Date.Format(time.RFC3339), // Format to JS-compatible string
			Description:      tournament.Description,
			CreatedAt:        tournament.CreatedAt.Format(time.RFC3339), // Format to JS-compatible string
			Participants:     tournament.Participants,
			Progression:      tournament.Progression,
		}

		// Return the tournament as JSON
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(tournamentResponse)
		if err != nil {
			fmt.Print(err)
		}
	}
}

// UpdateTournament updates a tournament's information based on their tournamentNanoID
func UpdateTournament(db dbcommands.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the TournamentNanoID from the URL parameters

		vars := mux.Vars(r)                              // Get URL parameters using gorilla/mux
		tournamentNanoID, ok := vars["tournamentNanoID"] // Extract tournamentNanoID from the route
		if !ok || tournamentNanoID == "" {
			http.Error(w, "Missing tournamentNanoID", http.StatusBadRequest)
			return
		}

		// Decode the request body into a Tournament struct
		var updatedTournament models.Tournament
		if err := json.NewDecoder(r.Body).Decode(&updatedTournament); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Prepare the update fields
		updateFields := bson.M{
			"$set": bson.M{
				"name":         updatedTournament.Name,
				"description":  updatedTournament.Description,
				"date":         updatedTournament.Date,
				"kingdom":      updatedTournament.Kingdom,
				"eventType":    updatedTournament.EventType,
				"location":     updatedTournament.Location,
				"participants": updatedTournament.Participants,
				"progression":  updatedTournament.Progression,
			},
		}

		// Update the tournament in the database
		collection := db.Collection("Tournaments")
		_, err := collection.UpdateOne(
			context.Background(),
			bson.M{"tournamentNanoID": tournamentNanoID},
			updateFields,
			options.Update().SetUpsert(false), // Do not create a new document if not found
		)

		if err != nil {
			http.Error(w, "Failed to update tournament", http.StatusInternalServerError)
			return
		}

		// Respond with a success message
		w.WriteHeader(http.StatusOK)
		_, err = w.Write([]byte("Tournament updated successfully"))
		if err != nil {
			fmt.Print(err)
		}
	}
}
