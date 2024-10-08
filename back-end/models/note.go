package model

import (
	"time"
)

type Note struct {
	ID        uint      `json:"id"`
	Title     string    `json:"title" gorm:"not null"`
	Body      string    `json:"body" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	Archived  bool      `json:"archived" gorm:"default:false"`
}

func (Note) TableName() string {
	return "tbl_catatan"
}
