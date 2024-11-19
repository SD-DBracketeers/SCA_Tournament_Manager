package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Participant struct {
	ParticipantID              primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	ParticipantNanoID          string             `bson:"participantNanoID" json:"participantNanoID"`
	Name                       string             `bson:"name" json:"name"`
	Rank                       string             `bson:"rank" json:"rank"`
	VerificationExpirationDate time.Time          `bson:"verificationExpirationDate" json:"verificationExpirationDate"`
	CreatedAt                  time.Time          `bson:"createdAt" json:"createdAt"`
	CombatType                 string             `bson:"combatType" json:"combatType"`
	Kingdom                    string             `bson:"kingdom" json:"kingdom"`
	TournamentParticipantIn    []string           `bson:"tournamentParticipantIn" json:"tournamentParticipantIn"`
	Wins                       int                `bson:"wins" json:"wins"`
	Losses                     int                `bson:"losses" json:"losses"`
}
