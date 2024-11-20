import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/start.css';

const Start = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleStart = async () => {
      try {
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user?.id, name: user?.username }),
        });
        if (response.ok) navigate('/cases');
      } catch (error) {
        setError((error as Error).message);
      }
    };

    handleStart();
  })

  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className='start-page'>
      <h1>CaSeGO</h1>
    </div>
  );
};

export default Start;
