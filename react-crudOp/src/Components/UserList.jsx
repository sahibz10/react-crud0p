
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { FaEdit, FaTrash, FaUserPlus, FaSearch } from "react-icons/fa"; 

const UserList = () => {
  const { users, deleteUser, loading, error } = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div className="container" style={{textAlign:'center', marginTop:'50px'}}><h2>Loading Employees...</h2></div>;
  if (error) return <div className="container" style={{textAlign:'center', color:'red'}}><h2>Error: {error}</h2></div>;

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    // Removed role check
    return name.includes(term) || email.includes(term);
  });

  return (
    <div className="container">
      <div className="card">
        <div className="list-header">
          <h2>Employee List</h2>
          
          <div style={{position: 'relative'}}>
            <FaSearch style={{position: 'absolute', left: '10px', top: '12px', color: '#888'}} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="search-bar"
              style={{paddingLeft: '35px'}}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.email}</td>
                    <td>
                      <div style={{display: 'flex', gap: '10px'}}>
                        <Link to={`/edit/${user.id}`} className="btn-edit"><FaEdit /></Link>
                        <button onClick={() => deleteUser(user.id)} className="btn-delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" style={{textAlign: "center", padding: "20px"}}>No employees found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;