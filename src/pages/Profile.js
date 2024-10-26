import React from 'react';
import { useUser } from '../contexts/UserContext';

const Profile = () => {
  const { user } = useUser();

  return <h2>{user.username}</h2>;
};

export default Profile;
