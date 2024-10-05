import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserModal from "../components/UserModal";
import { toast } from "react-toastify";
import "./Home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Retrieve the users data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching users", error);
        setLoading(false);
      });
  }, []);

  // Delete the user with the particular id
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        });
    }
  };

  // Update the user
  const updateUser = (updatedUser) => {
    axios
      .put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      )
      .then((response) => {
        toast.success("User updated successfully", {
          position: "top-right",
        });
        setUsers(
          users.map((user) =>
            user.id === updatedUser.id ? response.data : user
          )
        );
        setEditingUser(null);
      })
      .catch((error) =>
        alert(
          "Error updating the user. The user might not have a persistent ID.",
          error
        )
      );
  };

  // Filtered users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <UserModal onUserAdded={(newUser) => setUsers([...users, newUser])} />
      {editingUser && (
        <UserModal
          existingUser={editingUser}
          onUserUpdated={updateUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      <h1>Users Table</h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px", marginBottom: "50px" }}
        />
      </div>

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table
          className="table"
          style={{
            position: "absolute",
            color: "white",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Street</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link
                      to={`/users/${user.id}`}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address.city}</td>
                  <td>{user.address.street}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <button
                      onClick={() => setEditingUser(user)}
                      className="edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
