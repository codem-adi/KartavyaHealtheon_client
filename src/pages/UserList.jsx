import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import "../styles/userCard.css";
import { useNavigate } from 'react-router-dom';

const UserList = () => {
     const [users, setUsers] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [typingTimeout, setTypingTimeout] = useState(0);
     const navigate = useNavigate()

     useEffect(() => {
          const fetchUsers = async () => {

               try {
                    let url = `${import.meta.env.VITE_SERVER_URL}/api/users`;
                    if (searchTerm) {
                         url += `?search=${searchTerm}`;
                    }
                    const response = await axios.get(url);
                    setUsers(response?.data);
               } catch (error) {
                    setUsers([]);
                    console.error('Error fetching users:', error);
               }
          };

          // Only fetch users after user stops typing for 500ms
          if (typingTimeout) {
               clearTimeout(typingTimeout);
          }

          setTypingTimeout(setTimeout(() => {
               fetchUsers();
          }, 1000));

          // Cleanup function to clear timeout if component unmounts or searchTerm changes
          return () => clearTimeout(typingTimeout);

     }, [searchTerm]); // Fetch users whenever searchTerm changes

     const handleSearch = (e) => {
          const value = e.target.value;
          setSearchTerm(value);
     };

     return (
          <div className="user-list">
               <div className='navigation-bar-container'>
                    <button onClick={() => { navigate("/create-user") }}>Create User</button>
               </div>
               <div className="search-bar-container">
                    <input
                         type="text"
                         placeholder="Search by name phone or employeId."
                         value={searchTerm}
                         onChange={handleSearch}
                         className='search-bar'
                    />
                    <div className='show_qr_container'>
                         <label>Show All QR</label>
                         <input type='checkbox' onChange={(e) => {
                              setUsers(user => {
                                   return user?.map(ele => ({ ...ele, showQR: e.target.checked }))
                              })
                         }} />
                    </div>
               </div>
               <div className='user-card-container'>

                    {users.length ?
                         <>
                              {
                                   users?.map(user => (
                                        <UserCard key={user._id} user={user} />
                                   ))
                              }
                         </>
                         :
                         <><h1>No User Found</h1></>
                    }
               </div>
          </div>
     );
};

export default UserList;
