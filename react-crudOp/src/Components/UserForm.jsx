import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const UserForm = () => {
  const { addUser, updateUser, getUserById } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  useEffect(() => {
    if (id) {
      const user = getUserById(id);
      if (user) setFormData(user);
    }
  }, [id, getUserById]);

  // Validation Logic
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //

    // Check Name
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Check Email
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Check Role
    if (!formData.role || !formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Run validation before submitting
    if (!validate()) return; 

    if (id) {
      updateUser(id, formData);
    } else {
      addUser(formData);
    }
    navigate("/");
  };

  // Helper to clear error when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear the error for this field as soon as they type
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Employee" : "Add New Employee"}</h2>
      <form onSubmit={handleSubmit} className="form-column">
        
        {/* Name Field */}
        <div className="input-group">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            style={{ borderColor: errors.name ? "red" : "#ccc" }}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="input-group">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ borderColor: errors.email ? "red" : "#ccc" }}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Role Field */}
        <div className="input-group">
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            style={{ borderColor: errors.role ? "red" : "#ccc" }}
          />
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>

        <button type="submit" className="btn-primary">
          {id ? "Save Changes" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;