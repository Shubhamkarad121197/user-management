import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import UserCard from "./component/UserCard";

const baseURL = "http://localhost:5000/api";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  /* ---------------- FETCH USERS ---------------- */
  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseURL}/user`);
      setUserData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- FORM HANDLING ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- SUBMIT (CREATE / UPDATE) ---------------- */
  const submitUserData = async (e) => {
    e.preventDefault();

    const { firstName, email } = formData;
    if (!firstName || !email) {
      alert("First Name and Email are required");
      return;
    }

    try {
      setLoading(true);

      if (editingUserId) {
        // UPDATE
        await axios.patch(
          `${baseURL}/updateUser/${editingUserId}`,
          formData
        );
      } else {
        // CREATE
        await axios.post(`${baseURL}/user`, formData);
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error(
        "Error submitting user:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseURL}/deleteTask/${id}`);
      setUserData((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  /* ---------------- EDIT ---------------- */
  const editUser = (user) => {
    setEditingUserId(user._id);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      city: user.city || "",
    });
  };

  /* ---------------- RESET FORM ---------------- */
  const resetForm = () => {
    setEditingUserId(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    });
  };

  return (
    <div className="app">
      <h2>User Management</h2>

      {/* ---------------- FORM ---------------- */}
      <form onSubmit={submitUserData}>
        <div className="formControl">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formControl">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="formControl">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formControl">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div style={{display:'flex',gap:'20px'}}>
           <button type="submit" disabled={loading}>
          {loading
            ? "Submitting..."
            : editingUserId
            ? "Update User"
            : "Add User"}
        </button>

        {editingUserId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
        </div>
       
      </form>

      {/* ---------------- USER LIST ---------------- */}
      <div className="users">
        {userData.length === 0 && <p>No users found</p>}

        {userData.map((user) => (
          <UserCard
            key={user._id}
            data={user}
            onDelete={deleteUser}
            onEdit={editUser}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
