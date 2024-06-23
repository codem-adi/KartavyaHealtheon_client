import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const UserCard = ({ user }) => {
     const navigate = useNavigate();
     const { name, profilePhoto, phone, memberId, employeType } = user;

     const [showQR, setShowQR] = useState(false);

     const handleEdit = () => {
          navigate(`/users-profile/edit/${memberId}`);
     };

     const toggleQR = () => {
          setShowQR(!showQR);
     };

     useEffect(() => {
          if (user?.showQR == true || user?.showQR == false ) {
               setShowQR(user?.showQR);
          }
     }, [user?.showQR])

     return (
          <div className="user-card">
               <div className="profile-photo" >
                    {showQR ?
                         <div className='profile-view'>
                              <div className='side-line'></div>
                              <QRCode value={`${import.meta.env.VITE_BASE_URL}/member/profile/${memberId}`} size={85} />
                              <div className='side-line'></div>

                         </div>
                         :
                         <div className='profile-view'>
                              <img src={profilePhoto} alt={`${name}'s profile`} />
                         </div>
                    }

               </div>
               <div className="user-details">

                    <>
                         <h3>{name}</h3>
                         <p><strong>Phone:</strong> {phone}</p>
                         <p><strong>Member ID:</strong> {memberId}</p>
                         <p><strong>Employee Type:</strong> {employeType}</p>
                    </>

               </div>
               <div className="button-group">
                    <button onClick={handleEdit} className="button">Edit</button>
                    <button onClick={toggleQR} className="button">
                         {showQR ? 'Close QR' : 'View QR'}
                    </button>
               </div>
          </div>
     );
};

export default UserCard;
