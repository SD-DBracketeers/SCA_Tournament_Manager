package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Participant struct {
	ParticipantID              primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	ParticipantNanoID          string             `bson:"participantNanoID" json:"participantNanoID"`
	Name                       string             `bson:"name" json:"name"`
	Username                   string             `bson:"username" json:"username"`
	Password                   string             `bson:"password" json:"password"`
	Rank                       string             `bson:"rank" json:"rank"`
	VerificationExpirationDate time.Time          `bson:"verificationExpirationDate" json:"verificationExpirationDate"`
	CreatedAt                  time.Time          `bson:"createdAt" json:"createdAt"`
	CombatType                 string             `bson:"combatType" json:"combatType"`
	Kingdom                    string             `bson:"kingdom" json:"kingdom"`
	TournamentParticipantIn    []string           `bson:"tournamentParticipantIn" json:"tournamentParticipantIn"`
	Wins                       int                `bson:"wins" json:"wins"`
	Losses                     int                `bson:"losses" json:"losses"`
}

// Modified Participant struct for the response
type ParticipantResponse struct {
	ParticipantID              primitive.ObjectID `json:"_id,omitempty"`
	ParticipantNanoID          string             `json:"participantNanoID"`
	Name                       string             `json:"name"`
	Username                   string             `json:"username"`
	Password                   string             `json:"password"`
	Rank                       string             `json:"rank"`
	VerificationExpirationDate string             `json:"verificationExpirationDate"`
	CreatedAt                  string             `json:"createdAt"`
	CombatType                 string             `json:"combatType"`
	Kingdom                    string             `json:"kingdom"`
	TournamentParticipantIn    []string           `json:"tournamentParticipantIn"`
	Wins                       int                `json:"wins"`
	Losses                     int                `json:"losses"`
}
