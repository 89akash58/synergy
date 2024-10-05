import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./UserModal.css";
function Detailed() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching user details", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>User not found.</div>;

  return (
    <div className=" user-detail">
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>
      <p>
        <strong>Street:</strong> {user.address.street}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <Link to="/">Back to Users List</Link>
    </div>
  );
}

export default Detailed;
