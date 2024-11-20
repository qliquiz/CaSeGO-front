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
  const [loadingCases, setLoadingCases] = useState<boolean>(true);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка кейсов
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoadingCases(true);
        const response = await fetch('https://9lsgnf1b-3000.euw.devtunnels.ms/cases/cases');
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        const parsedData = data.data ? JSON.parse(data.data) : [];

        if (Array.isArray(parsedData)) {
          setCases(parsedData);
          if (!selectedCase) {
            setSelectedCase(parsedData[0] || null);
          }
        } else {
          throw new Error('Ошибка данных: ожидается массив');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoadingCases(false);
      }
    };

    fetchCases();
  }, []);

  // Загрузка предметов
  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedCase) return;

      try {
        setLoadingItems(true);
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/cases/weapons/${selectedCase.id}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        const parsedData = data.data ? JSON.parse(data.data) : [];

        if (Array.isArray(parsedData)) {
          setItems(parsedData);
        } else {
          throw new Error('Ошибка данных: ожидается массив');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoadingItems(false);
      }
    };

    if (selectedTab === 'content' && selectedCase) {
      fetchItems();
    }
  }, [selectedTab, selectedCase?.id]);

  const handleCaseClick = (caseItem: CaseProps) => {
    if (selectedCase?.id !== caseItem.id) {
      setSelectedCase(caseItem);
      setShowRoulette(false);
    }
  };

  const handleTabClick = (tab: string) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
      setError(null);
    }
  };

  const renderCases = () => (
    <div className='case-list'>
      {loadingCases ? (
        <div className="loading-overlay">
          <p>Загрузка кейсов...</p>
        </div>
      ) : (
        cases.map((caseItem) => (
          <div
            className='case-button'
            key={caseItem.id}
            onClick={() => handleCaseClick(caseItem)}
            style={{
              boxShadow: selectedCase?.id === caseItem.id
                // ? `${caseItem.id % 2 === 0 ? 'blue' : 'red'} 0px 0px 10px -5px`
                ? `white 0px 0px 10px -5px`
                : 'transparent 0px 0px 0px'
            }}
          >
            <Case
              id={caseItem.id}
              name={caseItem.name}
              image={caseItem.image}
            />
          </div>
        ))
      )}
    </div>
  );

  const renderItems = () => (
    <div className='item-list'>
      {loadingItems ? (
        <div className="loading-overlay">
          <p>Загрузка предметов...</p>
        </div>
      ) : (
        items.map((item) => (
          <div className='item' key={item.id}>
            <Item
              id={item.id}
              weapon_name={item.weapon_name}
              skin_name={item.skin_name}
              rarity={item.rarity}
              steam_image={item.steam_image}
              isLoser={false}
            />
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      <div className="toggle-buttons">
        <button
          onClick={() => handleTabClick('cases')}
          className={selectedTab === 'cases' ? 'option' : 'deactive option'}
        >
          Кейсы
        </button>
        <button
          onClick={() => handleTabClick('content')}
          className={selectedTab === 'content' ? 'option' : 'deactive option'}
        >
          Содержимое
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className='options'>
        {selectedTab === 'cases' ? renderCases() : renderItems()}
      </div>
    </div>
  );
};

export default ToggleCasesContent;