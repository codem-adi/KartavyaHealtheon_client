import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import "../styles/ViewUser.css"

const ViewUser = () => {
     const { memberId } = useParams();  // Get memberId from URL params
     const [userData, setUserData] = useState({
          name: '',
          profilePhoto: '',
          phone: '',
          idType: '',
          idNumber: '',
          employeType: ''
     });

     useEffect(() => {
          const fetchUser = async () => {
               try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users?search=${memberId}`);
                    const [user] = response.data;
                    setUserData({
                         name: user.name,
                         profilePhoto: user.profilePhoto,
                         phone: user.phone,
                         idType: user.govermentId.idType,
                         idNumber: user.govermentId.idNumber,
                         employeType: user.employeType
                    });
               } catch (error) {
                    console.error('Error fetching user:', error);
               }
          };

          fetchUser();
     }, [memberId]); // Fetch user details when id changes

     return (
          <div className="view-user">
               <h2>User Details</h2>
               <Card user={userData} />
          </div>
     );
};

export default ViewUser;

const Card = ({ user }) => {
     const { name, profilePhoto, phone, memberId, employeType } = user;

     return (
          <div className="user-card">
               <div className="profile-photo" >
                    <div className='profile-view'>
                         <img src={profilePhoto} alt={`${name}'s profile`} />
                    </div>
               </div>
               <div className="user-details">
                    <>
                         <h3>{name}</h3>
                         <p><strong>Phone:</strong> {phone}</p>
                         <p><strong>Member ID:</strong> {memberId}</p>
                         <p><strong>Employee Type:</strong> {employeType}</p>
                    </>
               </div>
          </div>
     );
};
