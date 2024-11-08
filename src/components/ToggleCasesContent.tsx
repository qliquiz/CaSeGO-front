import React, { useState, useEffect } from 'react';
import Item, { ItemProps } from './Item';
import Case, { CaseProps } from './Case';

const ToggleCasesContent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("cases");
  const [cases, setCases] = useState<CaseProps[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseProps | null>(null);
  const [showRoulette, setShowRoulette] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = selectedTab === "cases" ? "/cases/cases" : "/cases/weapons";
      try {
        const response = await fetch(`https://2cfq1rkx-3000.euw.devtunnels.ms/${endpoint}`);
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const data = await response.json();
        const parsedData = data.data ? JSON.parse(data.data) : [];
        if (Array.isArray(parsedData)) {
          if (selectedTab === "cases") {
            setCases(parsedData);
            setSelectedCase(parsedData[0] || null);
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
  }, [selectedTab]);

  const handleCaseClick = (caseItem: CaseProps) => {
    setSelectedCase(caseItem);
    setShowRoulette(false);
  };

  const handleOpenClick = () => {
    setShowRoulette(true);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <div>
        <button
          onClick={() => setSelectedTab("cases")}
          className={selectedTab === "cases" ? "active" : ""}
        >
          Кейсы
        </button>
        <button
          onClick={() => setSelectedTab("content")}
          className={selectedTab === "content" ? "active" : ""}
        >
          Содержимое
        </button>
      </div>

      <div className="case-list">
        {cases.map((caseItem) => (
          <button
            key={caseItem.id}
            onClick={() => handleCaseClick(caseItem)}
            style={{
              backgroundColor: selectedCase?.id === caseItem.id ? "lightblue" : "transparent",
            }}
          >
            <Case id={caseItem.id} name={caseItem.name} image={caseItem.image} />
          </button>
        ))}
      </div>

      <div className="roulette-area">
        {showRoulette ? (
          <div className="roulette"> Рулетка крутится... </div>
        ) : (
          selectedCase && (
            <div className="selected-case">
              <Case id={selectedCase.id} name={selectedCase.name} image={selectedCase.image} />
            </div>
          )
        )}
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

      <button onClick={handleOpenClick}>Открыть</button>
    </div>
  );
};

export default ToggleCasesContent;
