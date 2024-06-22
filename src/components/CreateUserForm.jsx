import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateUserForm.css'; // Import CSS file for styling

const CreateUserForm = () => {
     const [formData, setFormData] = useState({
          name: '',
          profilePhoto: '',
          phone: '',
          idType: '',
          idNumber: '',
          employeType: ''
     });
     const [errorMessage, setErrorMessage] = useState('');
     const [successMessage, setSuccessMessage] = useState('');

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               // Validate required fields
               if (!formData.name || !formData.phone || !formData.idType || !formData.employeType || !formData.profilePhoto) {
                    setErrorMessage('Please fill in all required fields.');
                    return;
               }

               const response = await axios.post('${import.meta.env.VITE_SERVER_URL}/api/users', formData);
               setSuccessMessage('User created successfully');
               setFormData({ name: '', profilePhoto: '', phone: '', idType: '', idNumber: '', employeType: '' })
               setTimeout(() => { 
                    setSuccessMessage('');
               },1000)
          } catch (error) {
               if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.error);
               } else {
                    setErrorMessage('Something went wrong');
               }
          }
     };

     const handleDropdownChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
     };

     return (
          <div className="form-container">
               <h2 className='form_heading'>Create New User</h2>
               <div>
                    <form onSubmit={handleSubmit} className='user_create_form'>
                         <label>Name:</label>
                         <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                         />
                         <br />
                         <label>Profile Photo URL:</label>
                         <input
                              type="text"
                              name="profilePhoto"
                              value={formData.profilePhoto}
                              onChange={handleChange}
                              required
                         />
                         <br />
                         <label>Phone:</label>
                         <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                         />
                         <br />
                         <label>ID Type:</label>
                         <select
                              name="idType"
                              value={formData.idType}
                              onChange={handleDropdownChange}
                              required
                              className='input_options'
                         >
                              <option value="">Select ID Type</option>
                              <option value="Aadhaar">Aadhaar</option>
                              <option value="Pan">Pan</option>
                              <option value="DrivingLicence">Driving Licence</option>
                              <option value="Passport">Passport</option>
                         </select>
                         <br />
                         <label>ID Number:</label>
                         <input
                              type="text"
                              name="idNumber"
                              value={formData.idNumber}
                              onChange={handleChange}
                              required
                         />
                         <br />
                         <label>Employee Type:</label>
                         <select
                              name="employeType"
                              value={formData.employeType}
                              onChange={handleDropdownChange}
                              required
                              className='input_options'
                         >
                              <option value="">Select Employee Type</option>
                              <option value="HealthWorker">Health Worker</option>
                              <option value="Trainer">Trainer</option>
                              <option value="Physio">Physio</option>
                         </select>
                         <br />
                         <button type="submit">Create User</button>
                    </form>
               </div>
               {errorMessage && <p className="error-message">{errorMessage}</p>}
               {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
     );
};

export default CreateUserForm;
