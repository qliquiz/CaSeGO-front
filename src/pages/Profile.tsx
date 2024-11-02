import React from 'react';
import { useUser } from '../contexts/UserContext';
import '../styles/profile.css';

const Profile: React.FC = () => {
  const { user } = useUser();

  return <h2>{user?.username ?? 'Пользователь не найден'}</h2>;
};

export default Profile;
