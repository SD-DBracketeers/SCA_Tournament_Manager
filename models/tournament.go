package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tournament struct {
	TournamentID     primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	TournamentNanoID string             `bson:"tournamentNanoID" json:"tournamentNanoID"`
	Name             string             `bson:"name" json:"name"`
	Location         string             `bson:"location" json:"location"`
	CreatedAt        time.Time          `bson:"createdAt" json:"createdAt"`
	Participants     []string           `bson:"tournamentParticipants" json:"tournamentParticipants"`
	Progression      []bool             `bson:"progression" json:"progression"`
}
