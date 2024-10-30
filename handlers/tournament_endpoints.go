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

// GetTournaments retrieves all tournaments from the MongoDB collection
// GetTournaments retrieves all tournaments from the MongoDB collection
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

// CreateTournament inserts a new tournament into the MongoDB collection
func CreateTournament(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var tournament models.Tournament
		json.NewDecoder(r.Body).Decode(&tournament)
		tournament.CreatedAt = time.Now()
		//do something similar to generate the nanoID
		nanoID, err := utils.GenerateDocumentNanoID()
		if err != nil {
			http.Error(w, "Error generating id value", http.StatusInternalServerError)
			return
		}
		tournament.TournamentNanoID = nanoID

		collection := db.Collection("Tournaments")
		result, err := collection.InsertOne(context.Background(), tournament)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "Tournament created with ID: %v", result.InsertedID)
	}
}

// GetTournament retrieves a tournament by their TournamentNanoID
func GetTournament(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get the tournamentNanoID from the URL parameters
		vars := mux.Vars(r)                              // Get URL parameters using gorilla/mux
		tournamentNanoID, ok := vars["tournamentNanoID"] // Extract tournamentNanoID from the route
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

		// Return the tournament as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tournament)
	}
}

// UpdateTournament updates a tournament's information based on their tournamentNanoID
func UpdateTournament(db *mongo.Database) http.HandlerFunc {
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
		w.Write([]byte("Tournament updated successfully"))
	}
}
