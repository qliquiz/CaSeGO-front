import React, { useState, useEffect } from 'react';
import '../styles/Inventory.css';
import { useParams } from 'react-router-dom';

const Inventory = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`https://2cfq1rkx-3000.euw.devtunnels.ms/inventory/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        const parsedData = JSON.parse(data.data);
        setItems(parsedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [id]);

  if (loading) {
    return <p>Загрузка инвентаря...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div className="inventory-page">
      <h1>Инвентарь</h1>
      <div className="inventory-list">
        {items.map((item, index) => (
          <div key={index} className="inventory-item">
            {/* <img src={item.image} alt={item.name} /> */}
            <h6>{item.name}</h6>
            <p>{item.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
