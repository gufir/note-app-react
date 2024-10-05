import React from "react";
import NoteList from "./NoteList";
import NoteSearch from "./NoteSearch.jsx";
import { getInitialData } from "../utils/index.js";
import NoteInput from "./NoteInput.jsx";


class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            querySearch: ''
        };
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddHandler = this.onAddHandler.bind(this);
        this.onActiveHandler = this.onActiveHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onAddHandler({title, body}) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: new Date().toISOString(),
                        archived: false
                    }
                ]
            }
        });
    }

    onDeleteHandler(id) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.filter((note) => note.id !== id)
            }
        });
    }

    onArchiveHandler(id) {
        this.setState({notes: this.state.notes.map((note) => note.id === id ? {...note, archived: true} : note)});
    }

    onActiveHandler(id) {
        this.setState({notes: this.state.notes.map((note) => note.id === id ? {...note, archived: false} : note)});
    }

    onSearchHandler(query) {
        console.log('Search query received:', query)
        this.setState({ querySearch: query || '' });
    }

    render() {

        const { notes, querySearch} = this.state;

        console.log('Current querySearch:', querySearch);

        const filteredNotes = notes.filter(note => {
            const title = note.title.toLowerCase();
            const body = note.body.toLowerCase();
            const query = querySearch.toLowerCase();
        
            return title.includes(query) || body.includes(query);
        });

        console.log(filteredNotes)

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