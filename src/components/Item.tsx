import '../styles/item.scss';

export interface ItemProps {
  id: number;
  weapon_name: string;
  skin_name: string;
  rarity: string;
  steam_image: string;
  isLoser: boolean;
}

const Item = ({
  id,
  weapon_name,
  skin_name,
  rarity,
  steam_image,
  isLoser
}: ItemProps) => {
  return (
    <div className="ev-weapon" style={isLoser ? { opacity: '0.5' } : { opacity: '1' }}>
      <div className="ev-weapon-inner" id={String(id)}>
        <div className={`ev-weapon-rarity ${rarity}`}></div>
        <img src={steam_image} alt={weapon_name} />
        <div className="ev-weapon-text">
          <p>{weapon_name}</p>
          <p>{skin_name}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
