import { useRef, useState, useEffect } from 'react';
import { RouletteClass, WeaponAttributes } from '../roulette.classes';
import Item from '../components/Item';
import '../styles/cases.scss';
import '../styles/item.scss';
import ToggleCasesContent from '../components/ToggleCasesContent';
import Case, { CaseProps } from '../components/Case';

interface CasesProps {
  weaponsCount: number;
  transitionDuration: number;
}

const Cases = ({ weaponsCount, transitionDuration }: CasesProps) => {
  const [rouletteWeapons, setRouletteWeapons] = useState<WeaponAttributes[]>([]);
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1);
  const [isReplay, setIsReplay] = useState<boolean>(false);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<CaseProps | null>(null);
  const [showRoulette, setShowRoulette] = useState<boolean>(false);
  const [isAnimationInterrupted, setIsAnimationInterrupted] = useState<boolean>(false);
  const rouletteContainerRef = useRef<HTMLDivElement>(null);
  const weaponsRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset states when case is changed
  useEffect(() => {
    setIsAnimationInterrupted(false);
    setIsSpin(false);
    setIsSpinEnd(false);
    setIsReplay(false);
    setWeaponPrizeId(-1);
  }, [selectedCase]);

  const fetchCaseItems = async (caseId: number) => {
    try {
      const response = await fetch(`https://9lsgnf1b-3000.euw.devtunnels.ms/cases/weapons/${caseId}`);
      if (!response.ok) throw new Error('Failed to load case items');
      const data = await response.json();
      const items = JSON.parse(data.data);
      return items;
    } catch (error: any) {
      setError(error.message);
      return [];
    }
  };

  function transitionEndHandler() {
    if (!isAnimationInterrupted) {
      setIsSpin(false);
      setIsSpinEnd(true);
    }
  }

  function prepare() {
    if (weaponsRef.current) {
      weaponsRef.current.style.transition = 'none';
      weaponsRef.current.style.left = '0px';
    }
  }

  async function load() {
    if (!selectedCase) return null;
    const items = await fetchCaseItems(selectedCase.id);
    if (!items.length) return null;

    const winner = items[Math.floor(Math.random() * items.length)];

    const roulette = new RouletteClass({
      winner,
      caseItems: items,
      rouletteContainerRef,
      weaponsRef,
      weaponsCount,
      transitionDuration
    });

    roulette.set_weapons();
    setRouletteWeapons(roulette.weapons);

    return roulette;
  }

  async function play() {
    if (!selectedCase) return;
    
    if (isReplay) {
      prepare();
    }
    
    setIsSpin(true);
    setShowRoulette(true);
    setIsAnimationInterrupted(false);

    const roulette = await load();
    if (!roulette) {
      setError('Failed to load case items');
      setIsSpin(false);
      return;
    }

    setTimeout(() => {
      setIsSpin(true);
      setWeaponPrizeId(roulette.spin());
      setIsReplay(true);
    }, 100);
  }

  // Handler for case selection
  const handleCaseSelect = (newCase: CaseProps) => {
    setIsAnimationInterrupted(true);
    setSelectedCase(newCase);
    setShowRoulette(false);
  };

  return (
    <div>
      <h1>Cases</h1>

      {showRoulette ? (
        <div className='roulette-wrapper' ref={rouletteContainerRef}>
          <div className='ev-roulette'>
            <div className='ev-target'></div>
            <div ref={weaponsRef} className='ev-weapons' onTransitionEnd={transitionEndHandler}>
              {rouletteWeapons.map((w, i) => (
                <Item
                  key={i}
                  isLoser={(i !== weaponPrizeId) && !isSpin && isSpinEnd}
                  {...w}
                />
              ))}
            </div>
          </div>
        </div>
      ) : selectedCase ? (
        <div className="selected-case">
          <Case {...selectedCase} />
        </div>
      ) : (
        <p>Choose a case</p>
      )}

      <button 
        className='button' 
        disabled={!selectedCase} 
        onClick={play}
      >
        {isSpin && !isAnimationInterrupted ? 'Opening...' : 'Open Case'}
      </button>

      <ToggleCasesContent
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        setShowRoulette={setShowRoulette}
        showRoulette={showRoulette}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Cases;