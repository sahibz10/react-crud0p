
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { FaSave, FaArrowLeft } from "react-icons/fa"; 

const UserForm = () => {
  const { addUser, updateUser, getUserById } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    if (id) {
      const user = getUserById(id);
      if (user) {
       
        setFormData({ 
          name: user.name, 
          email: user.email 
        });
      }
    }
  }, [id, getUserById]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    
  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true); 

    if (id) {
      await updateUser(id, formData);
    } else {
      await addUser(formData);
    }
    
    setIsSubmitting(false);
    navigate("/");
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="container" style={{maxWidth: '500px'}}>
      <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', textDecoration: 'none', color: '#666'}}>
         <FaArrowLeft /> Back to List
      </Link>

      <div className="card">
        <h2 style={{textAlign: 'center', marginBottom: '20px'}}>
          {id ? "Edit Employee" : "New Employee"}
        </h2>
        
        <form onSubmit={handleSubmit} className="form-column">
          <div className="input-group">
            <label style={{fontSize: '14px', fontWeight: '600', color: '#444'}}>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ borderColor: errors.name ? "red" : "#ddd" }}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label style={{fontSize: '14px', fontWeight: '600', color: '#444'}}>Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: errors.email ? "red" : "#ddd" }}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

       

          <button type="submit" className="btn-primary" disabled={isSubmitting} style={{width: '100%', justifyContent: 'center', marginTop: '10px'}}>
            <FaSave /> {isSubmitting ? "Saving..." : (id ? "Save Changes" : "Create Employee")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;