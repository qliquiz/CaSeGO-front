import React, { useState, useRef } from 'react';
import '../styles/cases.css';

const images = [
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
];

const Cases = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const rouletteRef = useRef(null);

  const startRolling = () => {
    setIsRolling(true);
    setSelectedImage(null);

    // Начинаем быструю анимацию
    rouletteRef.current.style.animation = 'spin-fast 3s linear infinite';

    setTimeout(() => {
      // Через 7 секунд переключаемся на замедление и останавливаем рулетку
      rouletteRef.current.style.animation = 'spin-slow 4s ease-out forwards';

      // Через 4 секунды получаем результат
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setSelectedImage(images[randomIndex]);
        console.log('Выигранная картинка:', images[randomIndex]);
        setIsRolling(false);
      }, 5000);
    }, 2000); // Первоначальная быстрая прокрутка 3 секунды
  };

  return (
    <div className="cases-page">
      <h1>Cases</h1>
      <div className="roulette-container">
        <div className="roulette" ref={rouletteRef}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`image-${index}`} className="roulette-item" />
          ))}
        </div>
        <div className="roulette-pointer">▲</div>
      </div>
      <button onClick={startRolling} disabled={isRolling}>
        {isRolling ? 'Крутится...' : 'Запустить'}
      </button>
      {selectedImage && <p>Выпавший предмет: {selectedImage}</p>}
    </div>
  );
};

export default Cases;
