package main

import (
	api "api/handlers"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv" // Import the godotenv package

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDB client
var client *mongo.Client

// Initialize MongoDB connection
func connectDB() (*mongo.Client, error) {

	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, continuing with environment variables.")
	}

	// Read the MongoDB credentials from environment variables
	username := os.Getenv("MONGODB_USERNAME")
	password := os.Getenv("MONGODB_PASSWORD")
	clusterName := os.Getenv("MONGODB_CLUSTER_NAME")
	databaseName := os.Getenv("MONGODB_DATABASE")

	// Ensure the required variables are set
	if username == "" || password == "" || clusterName == "" || databaseName == "" {
		fmt.Printf("Username: %s\nPassword: %s\n clusterName: %s\n databaseName: %s\n", username, password, clusterName, databaseName)
		log.Fatal("Missing required environment variables for MongoDB connection")
	}

	// Create the SRV connection string

	//mongodb+srv://yashchoksey:<db_password>@scatournamentmanager.zf7py.mongodb.net/?retryWrites=true&w=majority&appName=SCATournamentManager
	uri := fmt.Sprintf("mongodb+srv://%s:%s@%s.zf7py.mongodb.net/%s?retryWrites=true&w=majority", username, password, clusterName, databaseName)

	// Set client options
	clientOptions := options.Client().ApplyURI(uri)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Ping the database to ensure connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Unable to connect to MongoDB: ", err)
	}
	fmt.Println("Connected to MongoDB!")

	return client, nil
}

// Main function to set up routes and start the server
func main() {
	// Connect to the MongoDB database
	client, err := connectDB()
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}

	// Create a new router
	router := mux.NewRouter()
	// Initialize database for handlers
	db := client.Database(os.Getenv("MONGODB_DATABASE"))

	// Participant routes
	router.HandleFunc("/participants", api.GetParticipants(db)).Methods("GET")
	router.HandleFunc("/participants", api.CreateParticipant(db)).Methods("POST")
	router.HandleFunc("/participants/{participantNanoID}", api.GetParticipant(db)).Methods("GET")
	router.HandleFunc("/participants/{participantNanoID}", api.UpdateParticipant(db)).Methods("PUT")

	//Tournament routes
	router.HandleFunc("/tournaments", api.GetTournaments(db)).Methods("GET")
	router.HandleFunc("/tournaments", api.CreateTournament(db)).Methods("POST")
	router.HandleFunc("/tournaments/{tournamentNanoID}", api.GetTournament(db)).Methods("GET")
	router.HandleFunc("/tournaments/{tournamentNanoID}", api.UpdateTournament(db)).Methods("PUT")

	// Start the server
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedOrigins([]string{"http://localhost:4200"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT"}),
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
	)(router)))
}
