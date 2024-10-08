import React from "react";

function ActiveButton({ onClick }) {
  return (
    <button className="note-item__archive-button" onClick={onClick}>
      Pindahkan
    </button>
  );
}

export default ActiveButton;