import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from "../assets/Kartavya_logo.jpg"
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
                    console.log("user ", user);
                    setUserData({
                         name: user.name,
                         profilePhoto: user.profilePhoto,
                         phone: user.phone,
                         idType: user.govermentId.idType,
                         idNumber: user.govermentId.idNumber,
                         employeType: user.employeType,
                         memberId: user.memberId
                    });
               } catch (error) {
                    console.error('Error fetching user:', error);
               }
          };

          fetchUser();
     }, [memberId]); // Fetch user details when id changes

     return (
          <div className="view-user">
               <Card user={userData} />
          </div>
     );
};

export default ViewUser;

const Card = ({ user }) => {

     console.log("User ", user);
     const { name, profilePhoto, phone, idNumber, employeType, idType } = user;

     return (
          <div className="user-card">
               <div className='brand-logo'>
                    <img src={logo} />
               </div>
               <div className="profile-photo" >
                    <div className='profile-view'>
                         <img src={profilePhoto} alt={`${name}'s profile`} />
                    </div>
               </div>
               <div className="user-details">
                    <>
                         <h3>{name}</h3>
                         <p className='employe_type'>{employeType}</p>
                         <div className='goverment_id_details'>
                              <p><strong>{idType}</strong> </p>
                              <p>{idNumber}</p>
                         </div>
                    </>
               </div>
               <div className='cross_line'></div>
          </div>
     );
};
