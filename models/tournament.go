package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tournament struct {
	TournamentID     primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	TournamentNanoID string             `bson:"tournamentNanoID" json:"tournamentNanoID"`
	Name             string             `bson:"name" json:"name"`
	EventType        string             `bson:"eventType" json:"eventType"`
	Kingdom          string             `bson:"kingdom" json:"kingdom"`
	Location         string             `bson:"location" json:"location"`
	Date             time.Time          `bson:"date" json:"date"`
	Description      string             `bson:"description" json:"description"`
	CreatedAt        time.Time          `bson:"createdAt" json:"createdAt"`
	Participants     []string           `bson:"tournamentParticipants" json:"tournamentParticipants"`
	Progression      []string           `bson:"progression" json:"progression"`
}
