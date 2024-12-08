package dbcommands

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database interface {
	Collection(name string) Collection
}

type Collection interface {
	Find(ctx context.Context, filter interface{}) (*mongo.Cursor, error)
	FindOne(ctx context.Context, filter interface{}) *mongo.SingleResult
	InsertOne(ctx context.Context, document interface{}) (*mongo.InsertOneResult, error)
	UpdateOne(ctx context.Context, filter interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error)
}

type MongoDatabase struct {
	Client *mongo.Database
}

type MongoCollection struct {
	Collection *mongo.Collection
}

// Ensure MongoDatabase implements the Database interface
func (db *MongoDatabase) Collection(name string) Collection {
	return &MongoCollection{Collection: db.Client.Collection(name)}
}

// Ensure MongoCollection implements the Collection interface
func (c *MongoCollection) Find(ctx context.Context, filter interface{}) (*mongo.Cursor, error) {
	return c.Collection.Find(ctx, filter)
}

func (c *MongoCollection) FindOne(ctx context.Context, filter interface{}) *mongo.SingleResult {
	return c.Collection.FindOne(ctx, filter)
}

func (c *MongoCollection) InsertOne(ctx context.Context, document interface{}) (*mongo.InsertOneResult, error) {
	return c.Collection.InsertOne(ctx, document)
}

func (c *MongoCollection) UpdateOne(ctx context.Context, filter interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error) {
	return c.Collection.UpdateOne(ctx, filter, update, opts...)
}
