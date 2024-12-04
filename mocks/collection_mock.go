package mocks

import (
	"api/dbcommands"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MockCollection simulates a MongoDB collection for testing.
type MockCollection struct {
	FindFunc      func(ctx context.Context, filter interface{}) (*mongo.Cursor, error)
	FindOneFunc   func(ctx context.Context, filter interface{}) *mongo.SingleResult
	InsertOneFunc func(ctx context.Context, document interface{}) (*mongo.InsertOneResult, error)
	UpdateOneFunc func(ctx context.Context, filter interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error)
}

// Ensure MockCollection implements dbcommands.Collection interface.
var _ dbcommands.Collection = (*MockCollection)(nil)

// Implement the Find method.
func (m *MockCollection) Find(ctx context.Context, filter interface{}) (*mongo.Cursor, error) {
	return m.FindFunc(ctx, filter)
}

// Implement the FindOne method.
func (m *MockCollection) FindOne(ctx context.Context, filter interface{}) *mongo.SingleResult {
	return m.FindOneFunc(ctx, filter)
}

// Implement the InsertOne method.
func (m *MockCollection) InsertOne(ctx context.Context, document interface{}) (*mongo.InsertOneResult, error) {
	return m.InsertOneFunc(ctx, document)
}

// Implement the UpdateOne method.
func (m *MockCollection) UpdateOne(ctx context.Context, filter interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error) {
	return m.UpdateOneFunc(ctx, filter, update, opts...)
}
