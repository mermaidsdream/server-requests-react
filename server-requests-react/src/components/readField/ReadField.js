import React from "react";

export const ReadField = ({ handleEditClick, handleDeleteClick, contact }) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.username}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
