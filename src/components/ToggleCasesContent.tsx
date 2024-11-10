import React, { useEffect, useState } from 'react';
import Case, { CaseProps } from './Case';
import Item, { ItemProps } from './Item';
import '../styles/toggle.scss';

interface ToggleCasesContentProps {
  selectedCase: CaseProps | null;
  setSelectedCase: React.Dispatch<React.SetStateAction<CaseProps | null>>;
  setShowRoulette: React.Dispatch<React.SetStateAction<boolean>>;
  showRoulette: boolean;
}

const ToggleCasesContent: React.FC<ToggleCasesContentProps> = ({
  selectedCase,
  setSelectedCase,
  setShowRoulette,
  showRoulette,
}) => {
  const [cases, setCases] = useState<CaseProps[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selectedTab, setSelectedTab] = useState('cases');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = selectedTab === 'cases'
        ? 'cases/cases'
        : `cases/weapons/${selectedCase?.id || 1}`;

      try {
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/${endpoint}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        // console.log(data);
        const parsedData = data.data ? JSON.parse(data.data) : [];
        // console.log(parsedData);
        if (Array.isArray(parsedData)) {
          if (selectedTab === 'cases') {
            setCases(parsedData);
            setSelectedCase(selectedCase || parsedData[0] || null);
          } else {
            setItems(parsedData);
            // console.log(items);
          }
        } else throw new Error('Ошибка данных: ожидается массив');
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, selectedCase, setSelectedCase]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const handleCaseClick = (caseItem: CaseProps) => {
    setSelectedCase(caseItem);
    setShowRoulette(false);
  };

  return (
    <div>
      <button onClick={() => setSelectedTab('cases')} className={selectedTab === 'cases' ? 'option' : 'deactive option'}>
        Кейсы
      </button>
      <button onClick={() => setSelectedTab('content')} className={selectedTab === 'content' ? 'option' : 'deactive option'}>
        Содержимое
      </button>

      <div className='options'>
        {selectedTab === 'cases' ?
          <div className='case-list'>
            {cases.map((caseItem) => (
              <div
                className='case-button'
                key={caseItem.id}
                onClick={() => handleCaseClick(caseItem)}
                style={{ boxShadow: selectedCase?.id === caseItem.id ? `${caseItem.id % 2 === 0 ? 'blue' : 'red'} 0px 0px 10px -3px` : 'transparent 0px 0px 0px' }}
              >
                <Case id={caseItem.id} name={caseItem.name} image={caseItem.image} />
              </div>
            ))}
          </div>
          :
          <div className='item-list'>
            {items.map((item) => (
              <div className='item' key={item.id}> 
                <Item
                  id={item.id}
                  weapon_name={item.weapon_name}
                  skin_name={item.skin_name}
                  rarity={item.rarity}
                  steam_image={item.steam_image}
                  isLoser={item.isLoser}
                />
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default ToggleCasesContent;
