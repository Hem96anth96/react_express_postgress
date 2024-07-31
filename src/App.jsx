import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("http://localhost:3000/api/todolist");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    fetchNotes();
  }, []);

  async function addNote(newNote) {
    try {
      const response = await axios.post("http://localhost:3000/api/todolist", newNote);
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:3000/api/todolist/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.note}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
