package mocks

import (
	"api/dbcommands"
)

// MockDatabase simulates a MongoDB database for testing.
type MockDatabase struct {
	CollectionFunc func(name string) dbcommands.Collection
}

// Ensure MockDatabase implements dbcommands.Database interface.
var _ dbcommands.Database = (*MockDatabase)(nil)

// Implement the Collection method to return a mock collection.
func (m *MockDatabase) Collection(name string) dbcommands.Collection {
	return m.CollectionFunc(name)
}
