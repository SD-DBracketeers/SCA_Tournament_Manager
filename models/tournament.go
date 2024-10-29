package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tournament struct {
	TournamentID           primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	TournamentNanoID       string             `bson:"participantNanoID" json:"participantNanoID"`
	Name                   string             `bson:"name" json:"name"`
	TournamentParticipants []string           `bson:"tournamentParticipants" json:"tournamentParticipants"`
}
