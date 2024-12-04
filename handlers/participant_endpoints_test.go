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

// TestCreateParticipant checks that a new participant is created successfully.
func TestCreateParticipant(t *testing.T) {
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
			if name != "Participants" {
				t.Fatalf("Expected collection name 'Participants', got %s", name)
			}
			return mockCollection
		},
	}

	// Create a new participant
	participant := models.Participant{
		Name:      "Test Participant",
		Username:  "testuser",
		Password:  "password123",
		Rank:      "Beginner",
		CreatedAt: time.Now(),
	}

	// Marshal the participant to JSON
	participantJSON, err := json.Marshal(participant)
	if err != nil {
		t.Fatal(err)
	}

	// Create a request
	req, err := http.NewRequest("POST", "/participants", bytes.NewBuffer(participantJSON))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Create a ResponseRecorder
	rr := httptest.NewRecorder()

	// Call the handler
	handler := handlers.CreateParticipant(mockDB)
	handler.ServeHTTP(rr, req)

	// Check the status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}
