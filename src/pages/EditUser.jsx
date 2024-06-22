import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/EditUser.css"

const EditUser = () => {
     const { memberId } = useParams(); // Get memberId from URL params
     const navigate = useNavigate();

     const [formData, setFormData] = useState({
          name: '',
          profilePhoto: '',
          phone: '',
          idType: '',
          idNumber: '',
          employeType: ''
     });
     const [loading, setLoading] = useState(false);

     useEffect(() => {
          const fetchUser = async () => {
               try {
                    setLoading(true)
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users?search=${memberId}`);
                    const [user] = response.data;

                    setFormData({
                         name: user.name,
                         profilePhoto: user.profilePhoto,
                         phone: user.phone,
                         idType: user.govermentId.idType,
                         idNumber: user.govermentId.idNumber,
                         employeType: user.employeType
                    });
                    setLoading(false)
               } catch (error) {
                    setLoading(false)
                    console.error('Error fetching user:', error);
               }
          };

          fetchUser();
     }, [memberId]); // Fetch user details when memberId changes

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true)

          try {
               await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/${memberId}`, formData);
               alert("Profile Updated.")
               navigate('/all-users'); // Redirect to user list page after successful update
          } catch (error) {
               setLoading(false)
               console.error('Error updating user:', error);
          }
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     const handleSelectChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     return (
          <>
               <div className='navigation-bar-container'>
                    <button onClick={() => { navigate("/profiles") }}>Home</button>
               </div>
               <div className="edit-user">
                    <h2>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                         <label>Name:</label>
                         <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                         />

                         <label>Profile Photo URL:</label>
                         <input
                              type="text"
                              name="profilePhoto"
                              value={formData.profilePhoto}
                              onChange={handleChange}
                         />

                         <label>Phone:</label>
                         <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                         />

                         <label>ID Type:</label>
                         <select
                              name="idType"
                              value={formData.idType}
                              onChange={handleSelectChange}
                              className="input_options"
                         >
                              <option value="">Select ID Type</option>
                              <option value="Aadhaar">Aadhaar</option>
                              <option value="Pan">Pan</option>
                              <option value="DrivingLicence">Driving Licence</option>
                              <option value="Passport">Passport</option>
                         </select>

                         <label>ID Number:</label>
                         <input
                              type="text"
                              name="idNumber"
                              value={formData.idNumber}
                              onChange={handleChange}
                         />

                         <label>Employee Type:</label>
                         <select
                              name="employeType"
                              value={formData.employeType}
                              onChange={handleSelectChange}
                              className="input_options"
                         >
                              <option value="">Select Employee Type</option>
                              <option value="HealthWorker">Health Worker</option>
                              <option value="Trainer">Trainer</option>
                              <option value="Physio">Physio</option>
                         </select>

                         <button type="submit" disabled={loading}>Update User</button>
                    </form>
               </div>
          </>
     );
};

export default EditUser;
