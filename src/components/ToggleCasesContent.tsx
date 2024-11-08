import React, { useEffect, useState } from 'react';
import Case, { CaseProps } from './Case';
import Item, { ItemProps } from './Item';

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
  const [selectedTab, setSelectedTab] = useState("cases");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = selectedTab === "cases"
        ? "cases/cases"
        : `cases/weapons/${selectedCase?.id || 1}`;
  
      try {
        const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/${endpoint}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
  
        const data = await response.json();
        const parsedData = data.data ? JSON.parse(data.data) : [];
        if (Array.isArray(parsedData)) {
          if (selectedTab === "cases") {
            setCases(parsedData);
            setSelectedCase(selectedCase || parsedData[0] || null);
          } else {
            setItems(parsedData);
          }
        } else {
          throw new Error("Ошибка данных: ожидается массив");
        }
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
      <div>
        <button onClick={() => setSelectedTab("cases")} className={selectedTab === "cases" ? "active" : ""}>
          Кейсы
        </button>
        <button onClick={() => setSelectedTab("content")} className={selectedTab === "content" ? "active" : ""}>
          Содержимое
        </button>
      </div>

      <div className="case-list">
        {cases.map((caseItem) => (
          <button
            key={caseItem.id}
            onClick={() => handleCaseClick(caseItem)}
            style={{ backgroundColor: selectedCase?.id === caseItem.id ? "lightblue" : "transparent" }}
          >
            <Case id={caseItem.id} name={caseItem.name} image={caseItem.image} />
          </button>
        ))}
      </div>

      {selectedTab === "content" && (
        <div className="grid">
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
      )}
    </div>
  );
};

export default ToggleCasesContent;
