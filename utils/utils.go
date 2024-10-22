package utils

import (
	gonanoid "github.com/matoous/go-nanoid/v2"
)

func GenerateDocumentNanoID() (string, error) {
	return gonanoid.Generate("abcdefghijklmnopqrstuvwxyz0123456789", 6)
}
