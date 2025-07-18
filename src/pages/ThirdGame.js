import React, { useState } from 'react';
import './ThirdGame.css';
import { Card, Title } from '@mantine/core';

const leftImg = process.env.PUBLIC_URL + '/myphoto.jpg';
const rightImages = [
  // Henry Cavill
  process.env.PUBLIC_URL + '/henry.jpg',
  // Aditya Roy Kapur
  process.env.PUBLIC_URL + '/aditya.jpg',
  // Pedro Pascal
  process.env.PUBLIC_URL + '/pedro.jpg',
  // Tom Ellis (Lucifer)
  process.env.PUBLIC_URL + '/tomellis.jpg',
  // Chris Hemsworth
  process.env.PUBLIC_URL + '/chris.jpg',
  process.env.PUBLIC_URL + '/jordan.jpg',
];

const errorSound = new window.Audio(process.env.PUBLIC_URL + '/error.mp3');

const ThirdGame = () => {
  const [shake, setShake] = useState(false);
  const [selected, setSelected] = useState(false);
  const [rightIndex, setRightIndex] = useState(0);
  const [imgTransition, setImgTransition] = useState(false);
  const [leftClicked, setLeftClicked] = useState(false);

  const handleLeftClick = () => {
    setLeftClicked(true);
    setTimeout(() => setLeftClicked(false), 250);
    if (rightIndex < rightImages.length - 1) {
      setImgTransition(true);
      setTimeout(() => {
        setRightIndex((prev) => prev + 1);
        setImgTransition(false);
      }, 250); // duration matches CSS
    } else {
      setSelected(true);
    }
  };

  const handleRightClick = () => {
    setShake(true);
    // Play error sound
    try {
      errorSound.currentTime = 0;
      errorSound.play();
    } catch (e) {}
    setTimeout(() => setShake(false), 500);
  };

  return (
    <Card shadow="md" padding="xl" radius="md" className="thirdgame-card">
      <Title align="center" order={2} mb="md" className="thirdgame-title">Pick the hotter one</Title>
      <div className="thirdgame-vs-row">
        <div
          className={`thirdgame-img-wrap${shake ? ' shake' : ''}${selected ? ' selected' : ''}${leftClicked ? ' left-clicked' : ''}`}
          onClick={handleLeftClick}
        >
          <img src={leftImg} alt="Left" className="thirdgame-img" />
        </div>
        <div className="thirdgame-vs">vs</div>
        <div
          className={`thirdgame-img-wrap${imgTransition ? ' img-transition' : ''}`}
          onClick={handleRightClick}
        >
          <img src={rightImages[rightIndex]} alt="Right" className="thirdgame-img" />
          {shake && (
            <div className="thirdgame-nope">NOPE</div>
          )}
        </div>
      </div>
      {selected && <div className="thirdgame-success">Great Choices!❤️ </div>}
      {selected && (
        <div className="thirdgame-link">
          <a href="/message">Click here to go to the message</a>
        </div>
      )}
    </Card>
  );
};

export default ThirdGame;