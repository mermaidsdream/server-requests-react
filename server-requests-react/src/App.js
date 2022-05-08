import { useState, Fragment } from "react";

import DATA from "./store/data.json";
import { EditField, ReadField } from "./components";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState(DATA);
  const [addFormData, setAddFormData] = useState("");
  const [editFormData, setEditFormData] = useState("");
  const [editUser, setEditUser] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: addFormData.id,
      name: addFormData.name,
      username: addFormData.username,
      phone: addFormData.phone,
      email: addFormData.email,
    };
    const newContacts = [...users, newContact];
    setUsers(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editUser,
      name: editFormData.name,
      username: editFormData.username,
      phone: editFormData.phone,
      email: editFormData.email,
    };
    const newContacts = [...users];
    const index = users.findIndex((user) => user.id === editUser);
    newContacts[index] = editedContact;
    setUsers(newContacts);
    setEditUser(null);
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUser(user.id);
    const formValues = {
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditUser(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...users];
    const index = users.findIndex((user) => user.id === contactId);
    newContacts.splice(index, 1);
    setUsers(newContacts);
  };

  return (
    <div className="container">
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="username"
          required="required"
          placeholder="Enter a username..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Fragment>
                {editUser === user.id ? (
                  <EditField
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadField
                    contact={user}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
