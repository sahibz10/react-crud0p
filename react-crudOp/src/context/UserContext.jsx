import React , { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 1. State for Users
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 3. CRUD Operations
  const addUser = (user) => {
    const newUser = { id: Date.now(), ...user };
    setUsers([...users, newUser]);
  };

  const updateUser = (id, updatedData) => {
    const updatedList = users.map((user) => 
      user.id === parseInt(id) ? { ...user, ...updatedData } : user
    );
    setUsers(updatedList);
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const getUserById = (id) => users.find(u => u.id === parseInt(id));

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUserContext = () => useContext(UserContext);