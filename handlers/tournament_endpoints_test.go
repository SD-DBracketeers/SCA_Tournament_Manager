package handlers_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
	"fmt"

	"api/handlers"
	"api/models"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var testDB *mongo.Database

// Setup function to initialize a MongoDB instance
func setupDatabase() (*mongo.Client, *mongo.Database, error) {
	// Replace with your MongoDB URI if running on a live instance
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, nil, err
	}

	// Choose a temporary database for testing
	db := client.Database("test_db")
	return client, db, nil
}

// Cleanup function to clear the database after each test
func cleanupDatabase(client *mongo.Client) {
	client.Database("test_db").Drop(context.Background())
	client.Disconnect(context.Background())
}

// Run setup before each test and cleanup after each test
func TestMain(m *testing.M) {
	client, db, err := setupDatabase()
	if err != nil {
		panic(err)
	}
	testDB = db
	defer cleanupDatabase(client)
	m.Run()
}

func TestGetTournaments(t *testing.T) {
	fmt.Println("Testing GetTournaments")
	// Insert mock data
	collection := testDB.Collection("Tournaments")
	tournaments := []models.Tournament{
		{Name: "Tournament1", Kingdom: "Ansteorra", EventType: "Heavy"},
		{Name: "Tournament2", Kingdom: "Caid", EventType: "Rapier"},
	}

	for tournament := range tournaments {
		collection.InsertOne(context.Background(), tournament)
	}

	// Call the handler
	req, err := http.NewRequest("GET", "/tournaments", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	handler := handlers.GetTournaments(testDB)
	handler.ServeHTTP(rr, req)

	// Check the response
	assert.Equal(t, http.StatusOK, rr.Code)
	var result []models.Tournament
	json.Unmarshal(rr.Body.Bytes(), &result)
	assert.Equal(t, tournaments, result)
}

func TestCreateTournament(t *testing.T) {
	fmt.Println("Testing CreateTournament")
	// Clean up before test
	collection := testDB.Collection("Tournaments")
	_, err := collection.DeleteMany(context.Background(), bson.M{})
	assert.NoError(t, err)

	// Define a test tournament
	newTournament := models.Tournament{
		Name:        "New Tournament",
		Description: "A new tournament",
		EventType:   "Type",
		Kingdom:     "Kingdom",
		Location:    "Location",
		Date:        time.Now(),
		Participants: []string{"Participant1", "Participant2"},
		Progression:  []bool{true, false},
	}

	// Convert the tournament struct to JSON
	body, err := json.Marshal(newTournament)
	assert.NoError(t, err)

	// Create the request and recorder
	req, err := http.NewRequest("POST", "/tournaments", bytes.NewBuffer(body))
	assert.NoError(t, err)
	rr := httptest.NewRecorder()

	// Invoke the handler
	handler := handlers.CreateTournament(testDB)
	handler.ServeHTTP(rr, req)

	// Check the response code
	assert.Equal(t, http.StatusOK, rr.Code)

	// Check that the response includes a non-empty ID
	responseID := rr.Body.String()
	assert.NotEmpty(t, responseID)

	// Verify that the tournament was inserted in the database
	var insertedTournament models.Tournament
	err = collection.FindOne(context.Background(), bson.M{"tournamentNanoID": responseID}).Decode(&insertedTournament)
	assert.NoError(t, err)
	assert.Equal(t, newTournament.Name, insertedTournament.Name)
	assert.Equal(t, newTournament.Description, insertedTournament.Description)
	assert.Equal(t, newTournament.EventType, insertedTournament.EventType)
	assert.Equal(t, newTournament.Kingdom, insertedTournament.Kingdom)
	assert.Equal(t, newTournament.Location, insertedTournament.Location)
	assert.Equal(t, len(newTournament.Participants), len(insertedTournament.Participants))
}

func TestGetTournament(t *testing.T) {
	fmt.Println("Testing GetTournament (singular)")
	// Insert a mock tournament
	collection := testDB.Collection("Tournaments")
	collection.DeleteMany(context.Background(), bson.M{}) // Clean up before test

	tournament := models.Tournament{
		TournamentNanoID: "testID",
		Name:             "Test Tournament",
		Kingdom:          "Kingdom",
		EventType:        "Type",
		Participants:     []string{"Participant1"},
		Progression:      []bool{true},
	}
	collection.InsertOne(context.Background(), tournament)

	// Call the handler
	req, err := http.NewRequest("GET", "/tournaments/testID", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/tournaments/{tournamentNanoID}", handlers.GetTournament(testDB))
	router.ServeHTTP(rr, req)

	// Check the response
	assert.Equal(t, http.StatusOK, rr.Code)
	var result models.Tournament
	json.Unmarshal(rr.Body.Bytes(), &result)
	assert.Equal(t, tournament, result)
}

func TestUpdateTournament(t *testing.T) {
	fmt.Println("Testing UpdateTournament")
	// Insert a mock tournament
	collection := testDB.Collection("Tournaments")
	collection.DeleteMany(context.Background(), bson.M{}) // Clean up before test

	tournament := models.Tournament{
		TournamentNanoID: "testID",
		Name:             "Old Tournament",
		Description:      "Old description",
		Participants:     []string{"Participant1"},
		Progression:      []bool{true, false},
	}
	collection.InsertOne(context.Background(), tournament)

	// Create updated tournament data
	updatedTournament := models.Tournament{
		Name:        "Updated Tournament",
		Description: "Updated description",
		Participants: []string{"Participant1", "Participant2"},
		Progression: []bool{true, true},
	}

	body, _ := json.Marshal(updatedTournament)
	req, err := http.NewRequest("PUT", "/tournaments/testID", bytes.NewBuffer(body))
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	router := mux.NewRouter()
	router.HandleFunc("/tournaments/{tournamentNanoID}", handlers.UpdateTournament(testDB))
	router.ServeHTTP(rr, req)

	// Check the response
	assert.Equal(t, http.StatusOK, rr.Code)
	assert.Equal(t, "Tournament updated successfully", rr.Body.String())

	// Verify update in database
	var result models.Tournament
	err = collection.FindOne(context.Background(), bson.M{"tournamentNanoID": "testID"}).Decode(&result)
	assert.NoError(t, err)
	assert.Equal(t, updatedTournament.Name, result.Name)
	assert.Equal(t, updatedTournament.Description, result.Description)
}
