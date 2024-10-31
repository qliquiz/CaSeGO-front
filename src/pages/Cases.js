import React, { useState, useRef } from 'react';
import '../styles/cases.css';

const images = [
  `${process.env.PUBLIC_URL}/images/butterfly-knife-gamma-doppler-emerald-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/ak-47-wild-lotus-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/specialist-gloves-fade-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/karambit-doppler-ruby-factory-new.png`,
  `${process.env.PUBLIC_URL}/images/awp-dragon-lore-field-tested.png`,
];


const createLongRandomArray = (array, minLength) => {
  let result = [];
  while (result.length < minLength) {
    // Перемешиваем массив и добавляем в конец результата
    result = result.concat(array.sort(() => Math.random() - 0.5));
  }
  return result;
};

const Cases = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const rouletteRef = useRef(null);

  const startRolling = () => {
    setIsRolling(true);
    setSelectedImage(null);

    // Создаем длинный массив случайного порядка
    const shuffledImages = createLongRandomArray(images, images.length * 10); // Увеличьте коэффициент для более длинной рулетки
    const totalWidth = shuffledImages.length * 100; // Общая ширина для всех изображений
    const randomStop = Math.floor(Math.random() * images.length) * 100;

    // Запускаем рулетку, прокручивая ее на определенное расстояние
    rouletteRef.current.style.transition = 'transform 7s cubic-bezier(0.25, 1, 0.5, 1)';
    rouletteRef.current.style.transform = `translateX(-${totalWidth + randomStop}px)`;

    setTimeout(() => {
      // Рассчитываем индекс победного изображения
      const finalIndex = (randomStop / 100) % images.length;
      setSelectedImage(shuffledImages[finalIndex]);
      console.log('Выигранная картинка:', shuffledImages[finalIndex]);

      // Сбрасываем трансформацию и отключаем анимацию
      rouletteRef.current.style.transition = '';
      rouletteRef.current.style.transform = `translateX(-${randomStop}px)`;
      setIsRolling(false);
    }, 7000); // Время замедления 7 секунд
  };

  return (
    <div className="cases-page">
      <h1>Cases</h1>
      <div className="roulette-container">
        <div className="roulette" ref={rouletteRef}>
          {createLongRandomArray(images, images.length * 10).map((image, index) => (
            <img key={index} src={image} alt={`image-${index}`} className="roulette-item" />
          ))}
        </div>
        <div className="roulette-pointer"></div>
      </div>
      <div className="roulette-btn" onClick={startRolling} disabled={isRolling}>
        {isRolling ? 'Открывается...' : 'Открыть'}
      </div>
      {selectedImage && <p>Выпавший предмет: {selectedImage}</p>}
    </div>
  );
};

export default Cases;
