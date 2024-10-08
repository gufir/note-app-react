import React from "react";
import NoteList from "./NoteList";
import NoteSearch from "./NoteSearch.jsx";
import { getInitialData } from "../utils/index.js";
import NoteInput from "./NoteInput.jsx";


class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            querySearch: ''
        };
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddHandler = this.onAddHandler.bind(this);
        this.onActiveHandler = this.onActiveHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    componentDidMount() {
        this.fetchNotes();
    }

    async fetchNotes() {
        try {
            const response = await fetch("http://localhost:8000/notes");
            const data = await response.json();
            this.setState({ notes: data });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    async onAddHandler({title, body}) {

        const notedata = {
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false
        }

        try {
            const response = await fetch("http://localhost:8000/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(notedata)
            });

            if (response.ok) {
                this.fetchNotes(); // Refresh data setelah menambahkan catatan baru
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
        // this.setState((prevState) => {
        //     return {
        //         notes: [
        //             ...prevState.notes,
        //             {
        //                 id: +new Date(),
        //                 title,
        //                 body,
        //                 createdAt: new Date().toISOString(),
        //                 archived: false
        //             }
        //         ]
        //     }
        // });
        console.log(notedata.title)
        console.log(notedata.body)
        console.log(notedata.createdAt)
        console.log(notedata.archived)
    }

    async onDeleteHandler(id) {

        try {
            const response = await fetch(`http://localhost:8000/notes/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                this.fetchNotes(); // Refresh data setelah menghapus catatan
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
        // this.setState((prevState) => {
        //     return {
        //         notes: prevState.notes.filter((note) => note.id !== id)
        //     }
        // });
    }

    async onArchiveHandler(id) {
        try {
            const note = this.state.notes.find(note => note.id === id);
            console.log(note);
            const response = await fetch(`http://localhost:8000/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...note,
                    archived: true
                })
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                this.fetchNotes(); // Refresh data setelah mengarsipkan catatan
            }
        } catch (error) {
            console.error("Error archiving note:", error);
        }
        // this.setState({notes: this.state.notes.map((note) => note.id === id ? {...note, archived: true} : note)});
    }

    async onActiveHandler(id) {
        try {
            const note = this.state.notes.find(note => note.id === id);
            const response = await fetch(`http://localhost:8000/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...note,
                    archived: false
                })
            });

            if (response.ok) {
                this.fetchNotes(); // Refresh data setelah mengaktifkan catatan
            }
        } catch (error) {
            console.error("Error activating note:", error);
        }

        // this.setState({notes: this.state.notes.map((note) => note.id === id ? {...note, archived: false} : note)});
    }

    onSearchHandler(query) {
        this.setState({ querySearch: query || '' });
    }

    render() {

        const { notes, querySearch} = this.state;

        const filteredNotes = notes.filter(note => {
            const title = note.title.toLowerCase();
            const body = note.body.toLowerCase();
            const query = querySearch.toLowerCase();
        
            return title.includes(query) || body.includes(query);
        });

        return (
            <div className="notes-app">

                <div className="note-app__header">
                    <h1>Notes</h1>
                    <NoteSearch onSearch={this.onSearchHandler} />  
                </div>

                <NoteInput AddNotes={this.onAddHandler} />

                <h2>Catatan</h2>
                {filteredNotes.length === 0 ? (
                    <p>No matching notes found.</p>
                ) : (
                    <NoteList
                        notes={filteredNotes.filter(note => !note.archived)}
                        onDelete={this.onDeleteHandler}
                        onArchive={this.onArchiveHandler}
                        onActive={this.onActiveHandler}
                    />
                )}
                

                <h2>Arsip</h2>
                {filteredNotes.length === 0 ? (
                    <p>No archived notes found.</p>
                ) : (
                    <NoteList
                        notes={filteredNotes.filter(note => note.archived)}
                        onDelete={this.onDeleteHandler}
                        onArchive={this.onArchiveHandler}
                        onActive={this.onActiveHandler}
                    />
                )}

            </div>

        );
    }
}

export default NotesApp;;