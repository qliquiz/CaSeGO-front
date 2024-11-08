import { useRef, useState } from 'react';
import { RouletteClass, weaponAttributes } from '../roulette.classes';
import Item from '../components/Item';
import '../styles/cases.scss'
import '../styles/item.scss';
import ToggleCasesContent from '../components/ToggleCasesContent';
import Case, { CaseProps } from '../components/Case';

interface RouletteElementParams {
  weapons: weaponAttributes[],
  weaponsCount: number,
  transitionDuration: number
}

const Cases = ({
  weapons,
  weaponsCount,
  transitionDuration
}: RouletteElementParams) => {

  const [rouletteWeapons, setRouletteWeapons] = useState<weaponAttributes[]>(weapons)
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1)
  const [isReplay, setIsReplay] = useState<boolean>(false)
  const [isSpin, setIsSpin] = useState<boolean>(false)
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false)
  const [winHistory, setWinHistory] = useState<weaponAttributes[]>([])
  const [selectedCase, setSelectedCase] = useState<CaseProps | null>(null);
  const [showRoulette, setShowRoulette] = useState<boolean>(false);
  const rouletteContainerRef = useRef<HTMLDivElement>(null)
  const weaponsRef = useRef<HTMLDivElement>(null)

  function transitionEndHandler() {
    setWinHistory(winHistory.concat(rouletteWeapons[weaponPrizeId]))
    setIsSpin(false)
    setIsSpinEnd(true)
  }

  function prepare() {
    weaponsRef.current!.style.transition = 'none'
    weaponsRef.current!.style.left = '0px'
  }

  function load() {
    let winner = weapons[Math.floor(Math.random() * weapons.length)];

    const roulette = new RouletteClass({
      winner,
      weapons,
      rouletteContainerRef,
      weaponsRef,
      weaponsCount: weaponsCount,
      transitionDuration: transitionDuration
    });

    roulette.set_weapons()
    setRouletteWeapons(roulette.weapons)

    return roulette
  }

  function play() {
    if (isReplay) {
      prepare()
    }
    setIsSpin(true)
    setShowRoulette(true);

    const roulette = load()

    setTimeout(() => {
      setIsSpin(true)
      setWeaponPrizeId(roulette.spin())
      setIsReplay(true)
    }, 100)
  }

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
                  id={i}
                  isLoser={(i !== weaponPrizeId) && !isSpin && isSpinEnd}
                  weapon_name={w.weapon_name}
                  skin_name={w.skin_name}
                  rarity={w.rarity}
                  steam_image={w.steam_image}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (selectedCase ?
        <div className="selected-case">
          <Case id={selectedCase.id} name={selectedCase.name} image={selectedCase.image} />
        </div>
        : <p>Choose a case</p>
      )}

      <button className='button' disabled={isSpin || !selectedCase} onClick={play}>
        {isSpin ? 'Открывается...' : 'Открыть'}
      </button>

      <ToggleCasesContent
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        setShowRoulette={setShowRoulette}
        showRoulette={showRoulette}
      />
    </div>
  );
};

export default Cases;
