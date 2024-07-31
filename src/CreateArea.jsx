import React, { useState } from "react";


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [areaZoom, setAreaZoom] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
    setAreaZoom(false);
  }

  function handleClick (){

    setAreaZoom(true);
  }

  return (
    <div>
      <form className="create-note">
        {
          areaZoom && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        } 
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows= {areaZoom ? 3 : 1}
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
