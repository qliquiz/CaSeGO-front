import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item, { ItemProps } from '../components/Item';
import '../styles/inventory.css';

const Inventory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/inventory/${id}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        
        const data = await response.json();
        const parsedData: ItemProps[] = data.data ? JSON.parse(data.data) : [];
        if (Array.isArray(parsedData)) {
          setItems(parsedData);
        } else {
          throw new Error("Ошибка данных: ожидается массив");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [id]);

  if (loading) return <p>Загрузка инвентаря...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!items.length) return <p>Инвентарь пока пуст</p>;

  return (
    <div className="inventory-page">
      <h1>Инвентарь</h1>
      <div className="inventory-list">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            weapon_name={item.weapon_name}
            skin_name={item.skin_name}
            rarity={item.rarity}
            steam_image={item.steam_image}
            isLoser={item.isLoser}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
