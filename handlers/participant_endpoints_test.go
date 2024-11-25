package handlers_test

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"api/models"
	"api/utils"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var pTestDB *mongo.Database

// Setup function to initialize a MongoDB instance
func pSetupDatabase() (*mongo.Client, *mongo.Database, error) {
	// Replace with your MongoDB URI if running on a live instance
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, nil, err
	}

	// Choose a temporary database for testing
	db := client.Database("p_test_db")
	return client, db, nil
}

// Cleanup function to clear the database after each test
func pCleanupDatabase(client *mongo.Client) {
	client.Database("p_test_db").Drop(context.Background())
	client.Disconnect(context.Background())
}

// Test Main:
// Set up the database, store the database reference, and do the tests :)

// Test get participants (2 participants, fully filled out)
// Participant 1: (Name: participant1) (Rank: AoA) (Exp Date: Nov. 30, 2024) (Combat Type: heavy) (Kingdom: Caid)
// Participant 2: (Name: participant2) (Rank: GoA) (Exp Date: April 14, 2025) (Combat Type: rapier) (Kingdom: Midrealm)
// Retrieved particpants should be the same as the stored participants added manually to the db

// Test create participant (2 participants, fully filled out)
// Let's clear the database and use the same participants as earlier
// Since we know getParticipants works, we can check it with that <3

// Test get participant (1 participant, fully filled out)
// Participant: (Name: participant3) (Rank: Peer) (Exp Date: Nov 1, 2024) (Combat Type: rapier) (Kingdom: East Kingdom)
// Insert participant manually, or by create participant
// Retrieved participant should be the same as the stored participant

// Test update participant
// Insert participant3 (since the expiration date has passed) to make a new expiration date: Nov 1, 2025
// When testing, create 2 participant objects: one with old participant3 info, and one with new info (the only change should be the date)
// Check if the updated info matches with get participant