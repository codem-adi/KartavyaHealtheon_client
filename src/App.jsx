import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUserPage from './pages/CreateUserPage';
import "./App.css"
import UserList from './pages/UserList';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';
import Home from './pages/Home';
// Import other components/pages as needed

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/profiles" element={<UserList />} />
      <Route exact path="/create-user" element={<CreateUserPage />} />
      <Route exact path="/search-users" element={<UserList />} />
      <Route exact path="/users-profile/edit/:memberId" element={<EditUser />} />
      <Route exact path="/member/profile/:memberId" element={<ViewUser />} />
    </Routes>
  );
};

export default App;