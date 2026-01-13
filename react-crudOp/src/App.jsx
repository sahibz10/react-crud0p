import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import UserList from "./Components/UserList";
import UserForm from "./Components/UserForm";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <Router>
        {/* Navbar Section */}
        <nav style={{ padding: "20px", background: "#f8f9fa", marginBottom: "20px", textAlign: "center" }}>
          {/* We only keep the Home link here */}
          <Link to="/" style={{ fontWeight: "bold", textDecoration: "none", color: "#333" }}>Home</Link>
        </nav>

        <Routes>
          {/* Route for List */}
          <Route path="/" element={<UserList />} />
          
          {/* Route for Creating */}
          <Route path="/add" element={<UserForm />} />
          
          {/* Route for Editing (Dynamic ID) */}
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;