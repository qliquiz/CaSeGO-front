import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Start.css';

const Start = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleStart = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://2cfq1rkx-3000.euw.devtunnels.ms/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id, name: user.username }),
      });
      
      if (response.ok) {
        navigate('/cases');
      } else {
        console.error('Ошибка при запросе');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="start-page">
      <h1>CaSeGO</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default Start;
