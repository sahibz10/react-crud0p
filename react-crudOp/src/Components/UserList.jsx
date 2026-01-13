import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { FaEdit, FaTrash, FaUserPlus, FaSearch } from "react-icons/fa"; // Import Icons

const UserList = () => {
  const { users, deleteUser } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container">
      <div className="card"> {/* Wrapped in Card */}
        <div className="list-header">
          <h2>Employee List</h2>
          
          <div style={{position: 'relative'}}>
            <FaSearch style={{position: 'absolute', left: '10px', top: '22px', color: '#888'}} />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="search-bar"
              style={{paddingLeft: '35px'}} // Make room for icon
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link to="/add" className="btn-primary">
            <FaUserPlus /> Add Employee
          </Link>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.email}</td>
                    <td><span style={{background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>{user.role}</span></td>
                    <td>
                      <div style={{display: 'flex', gap: '10px'}}>
                        <Link to={`/edit/${user.id}`} className="btn-edit">
                          <FaEdit /> 
                        </Link>
                        <button onClick={() => deleteUser(user.id)} className="btn-delete">
                          <FaTrash /> 
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{textAlign: "center", padding: "30px", color: "#888"}}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;