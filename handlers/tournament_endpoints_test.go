package handlers_test

import (
	"api/dbcommands"
	"api/handlers"
	"api/mocks"
	"api/models"
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// TestCreateTournament checks that a new participant is created successfully.
func TestCreateTournament(t *testing.T) {
	// Mock collection
	mockCollection := &mocks.MockCollection{
		InsertOneFunc: func(ctx context.Context, document interface{}) (*mongo.InsertOneResult, error) {
			// Simulate successful insert
			return &mongo.InsertOneResult{
				InsertedID: primitive.NewObjectID(),
			}, nil
		},
	}

	// Mock database
	mockDB := &mocks.MockDatabase{
		CollectionFunc: func(name string) dbcommands.Collection {
			if name != "Tournaments" {
				t.Fatalf("Expected collection name 'Tournaments', got %s", name)
			}
			return mockCollection
		},
	}

	// Create a new participant
	Tournament := models.Tournament{
		Name:         "Test Participant",
		EventType:    "Jousting",
		Kingdom:      "Atlantia",
		Location:     "Castle Grounds",
		Date:         time.Now(),
		Description:  "Annual Kingdom Tournament",
		CreatedAt:    time.Now(),
		Participants: []string{"participant1", "participant2"},
		Progression:  []string{"round1", "round2"},
	}

	// Marshal the participant to JSON
	tournamentJSON, err := json.Marshal(Tournament)
	if err != nil {
		t.Fatal(err)
	}

	// Create a request
	req, err := http.NewRequest("POST", "/tournaments", bytes.NewBuffer(tournamentJSON))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Create a ResponseRecorder
	rr := httptest.NewRecorder()

	// Call the handler
	handler := handlers.CreateTournament(mockDB)
	handler.ServeHTTP(rr, req)

	// Check the status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}
