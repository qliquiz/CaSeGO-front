import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/start.css';

const Start: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStart = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://2cfq1rkx-3000.euw.devtunnels.ms/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user?.id, name: user?.username }),
      });
      if (response.ok) navigate('/cases');
      else setError('Ошибка при запросе');
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="start-page">
      <h1>CaSeGO</h1>
      <button onClick={handleStart} disabled={loading}>Start</button>
    </div>
  );
};

export default Start;
