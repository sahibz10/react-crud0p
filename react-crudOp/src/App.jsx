import React, { useState, useEffect } from "react";

const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" },
  header: { textAlign: "center", color: "#333" },
  form: { display: "flex", gap: "10px", marginBottom: "20px", padding: "15px", background: "#f4f4f4", borderRadius: "8px" },
  input: { padding: "8px", flex: 1, borderRadius: "4px", border: "1px solid #ccc" },
  button: { padding: "8px 15px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  deleteBtn: { background: "#dc3545", color: "white", marginLeft: "10px", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" },
  editBtn: { background: "#ffc107", color: "black", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  th: { borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left" },
  td: { borderBottom: "1px solid #ddd", padding: "10px" }
};

const App = () => {
  // State to hold the list of users
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    
    return saved ? JSON.parse(saved) : [];
  });

  // State to hold form data
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Persist users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Copy existing formData (...formData) and update only the specific field being typed in
    setFormData({ ...formData, [name]: value });
  };

  // Simple email validation helper
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

   // creating user
  const addUser = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    // Check for missing fields
    const missing = [];
    if (!formData.name || !formData.name.trim()) missing.push("Name");
    if (!formData.email || !formData.email.trim()) missing.push("Email");
    if (!formData.role || !formData.role.trim()) missing.push("Role");

    if (missing.length > 0) return alert(`Please fill the following fields: ${missing.join(", ")}`);

    // Validate email format
    if (!validateEmail(formData.email)) return alert("Please enter a valid email address.");
    // Create new user object
    const newUser = { 
      id: Date.now(), // Generate a unique ID based on current timestamp
      ...formData     // Spread the form data (name, email, role) into this object
    };
    
    // Update state: Add new user to the END of the existing list
    setUsers([...users, newUser]);
    
    // Reset form to blank
    setFormData({ name: "", email: "", role: "" }); 
  };
 
  // DELETE Operation
  const deleteUser = (id) => {
    // Confirm before deleting (Good UX practice)
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      // Filter out the user with the matching ID.
      // logic: "Keep everyone whose ID is NOT equal to the ID we clicked."
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    }
  };

  //  UPDATE Operation
  
  const startEdit = (user) => {
    setIsEditing(true);         // Switch mode to "Edit"
    setCurrentUserId(user.id);  // Remember WHO we are editing
    setFormData({ name: user.name, email: user.email, role: user.role }); // Fill inputs
  };

 
  const updateUser = (e) => {
    e.preventDefault();
    // Check for missing fields before updating
    const missing = [];
    if (!formData.name || !formData.name.trim()) missing.push("Name");
    if (!formData.email || !formData.email.trim()) missing.push("Email");
    if (!formData.role || !formData.role.trim()) missing.push("Role");

    if (missing.length > 0) return alert(`Please fill the following fields: ${missing.join(", ")}`);

    // Validate email format
    if (!validateEmail(formData.email)) return alert("Please enter a valid email address.");

    // Map through the users. If ID matches, replace with new data. If not, keep old data.
    const updatedList = users.map((user) => 
      user.id === currentUserId ? { ...user, ...formData } : user
    );

    setUsers(updatedList); // Update the main list
    
    // Reset everything back to "Add" mode
    setIsEditing(false);
    setFormData({ name: "", email: "", role: "" });
    setCurrentUserId(null);
  };

  // READ Operation 
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee Management System</h2>

      {/* FORM SECTION (Add / Edit) */}
      {/* If isEditing is true, run updateUser on submit. Otherwise run addUser */}
      <form onSubmit={isEditing ? updateUser : addUser} style={styles.form}>
        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="role"
          placeholder="Role (e.g. Dev)"
          value={formData.role}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>

      {/* TABLE SECTION (Displaying Data) */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Checking if we have users. If yes, loop ya (map) through them. If no, show message. */}
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  {/* Buttons to trigger Edit and Delete */}
                  <button style={styles.editBtn} onClick={() => startEdit(user)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{...styles.td, textAlign: "center"}}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;