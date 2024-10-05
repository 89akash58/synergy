import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserModal.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserModal({ existingUser, onUserAdded, onUserUpdated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    company: { name: "" },
    website: "",
  });

  useEffect(() => {
    if (existingUser) {
      setForm(existingUser);
      setIsModalOpen(true);
    }
  }, [existingUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 3) {
      toast.error("Name length should be greater than 3", {
        position: "top-right",
      });
      return;
    } else if (!form.email.includes("@")) {
      toast.error("Email should include @", {
        position: "top-right",
      });
      return;
    } else if (form.phone.length < 10) {
      toast.error(" Phone no. should 10 digits", {
        position: "top-right",
      });
      return;
    } else if (form.company.name < 3) {
      toast.error("comapny name should be greater than 3 character", {
        position: "top-right",
      });
      return;
    }

    try {
      if (existingUser) {
        onUserUpdated(form);
      } else {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          form
        );
        onUserAdded(response.data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error handling user:", error);
      alert("Error " + (existingUser ? "updating" : "creating") + " user");
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <button onClick={() => setIsModalOpen(true)} className="add-user-btn">
        Add User
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{existingUser ? "Edit User Details" : "Add a New User"}</h2>
            <form onSubmit={handleSubmit} className="form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={`USER-${form.name}`}
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
              <label>
                Street:
                <input
                  type="text"
                  name="address.street"
                  value={form.address.street}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="address.city"
                  value={form.address.city}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Company Name:
                <input
                  type="text"
                  name="company.name"
                  value={form.company.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Website:
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleInputChange}
                />
              </label>
              <div className="button-group">
                <button type="submit" className="create">
                  {existingUser ? "Update" : "Create"} User
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserModal;
