package main

import (
	"note-app/config"
	"note-app/handler"
	"note-app/repository"
	"note-app/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	db, err := config.ConnectDB()

	if err != nil {
		panic("failed to connect database")
	}

	noteRepo := repository.NewNoteRepository(db)
	noteService := services.NewNoteService(noteRepo)
	NoteHandler := handler.NewNoteHandler(noteService)

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	e.POST("/notes", NoteHandler.Create)
	e.GET("/notes", NoteHandler.GetAll)
	e.GET("/notes/:id", NoteHandler.GetByID)
	e.PUT("/notes/:id", NoteHandler.Update)
	e.DELETE("/notes/:id", NoteHandler.Delete)

	e.Logger.Fatal(e.Start(":8000"))
}
