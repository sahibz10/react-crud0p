
import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

// Remote API used for demo (reads/writes are simulated locally for immediate UI updates)
const API_URL = "https://jsonplaceholder.typicode.com/users"; 

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data); // No longer adding "role" here
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      // Simulate adding user (ID generation)
      const newUser = { ...user, id: Date.now() }; 
      setUsers([...users, newUser]); 
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      
      setUsers(users.map((user) => 
        user.id === parseInt(id) ? { ...user, ...updatedData } : user
      ));
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const getUserById = (id) => users.find(u => u.id === parseInt(id));

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, updateUser, deleteUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);