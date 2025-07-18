import React, { useState } from 'react';
import { Container, Card, Title, Text, Button, Group } from '@mantine/core';
import './SecondGame.css';
import { useNavigate } from 'react-router-dom';

let qualities = [
  { label: 'Kind', type: 'positive' },
  { label: 'Funny', type: 'positive' },
  { label: 'Loyal', type: 'positive' },
  { label: 'Smart', type: 'positive' },
  { label: 'Caring', type: 'positive' },
  { label: 'Adventurous', type: 'positive' },
  { label: 'Supportive', type: 'positive' },
  { label: 'Creative', type: 'positive' },
  { label: 'Romantic', type: 'positive' },
  { label: 'Jealous', type: 'negative' },
  { label: 'Selfish', type: 'negative' },
  { label: 'Moody', type: 'negative' },
  { label: 'Lazy', type: 'negative' },
  { label: 'Stubborn', type: 'negative' },
  { label: 'Forgetful', type: 'negative' },
];

// Shuffle qualities array on each render
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function SecondGame() {
  const [selected, setSelected] = useState([]);
  const [fading, setFading] = useState([]);
  const [message, setMessage] = useState('');
  const messages = ['Whoops', 'Nope, not at all', 'I\'m not sure about that one','That\'s not a good quality', 'Let\'s stick to the good ones for today'];
  const navigate = useNavigate();

  // Shuffle qualities only once per page load
  const [qualitiesState, setQualitiesState] = useState(() => shuffleArray(qualities));

  const handleSelect = (label, type) => {
    if (selected.includes(label) || fading.includes(label)) return;
    if (type === 'negative') {
      setFading((prev) => [...prev, label]);
      setMessage();
      setTimeout(() => {
        setFading((prev) => prev.filter((l) => l !== label));
        setMessage('');
        setQualitiesState((prev) => prev.filter(q => q.label !== label));
      }, 700);
    } else {
      setSelected((prev) => [...prev, label]);
      setMessage('');
    }
  };

  const allGoodSelected = qualitiesState.filter(q => q.type === 'positive').every(q => selected.includes(q.label));

  return (
    <Container className="secondgame-container" size="xs">
      <Card shadow="md" padding="xl" radius="md" className="secondgame-card">
        <Title align="center" order={2} mb="md" className="secondgame-title">Why should I date you?</Title>
        <Text align="center" mb="xs" className="secondgame-subtitle">Choose at least 9</Text>
        <Text align="center" mb="sm" className="secondgame-progress">{selected.length} / 9</Text>
        <Group position="center" spacing="md" className="secondgame-qualities">
          {qualitiesState.map(({ label, type }) => {
            const isFading = fading.includes(label);
            const isSelected = selected.includes(label);
            if (type === 'negative' && isFading) {
              return (
                <div key={label} className="secondgame-quality-fadewrap">
                  <div
                    className={`secondgame-quality-btn fade-out`}
                    style={{ pointerEvents: 'none' }}
                    tabIndex={0}
                    role="button"
                    aria-disabled="true"
                  >
                    {label}
                  </div>
                  <Text align="center" className="secondgame-message" style={{ opacity: 1, transition: 'opacity 0.7s' }}>{messages[Math.floor(Math.random() * messages.length)]}</Text>
                </div>
              );
            }
            return (
              <div
                key={label}
                className={`secondgame-quality-btn${isSelected ? ' selected' : ''}`}
                onClick={() => !isSelected && handleSelect(label, type)}
                tabIndex={0}
                role="button"
                aria-disabled={isSelected}
                style={{ cursor: isSelected ? 'default' : 'pointer', opacity: isSelected ? 0.7 : 1 }}
              >
                {label}
              </div>
            );
          })}
        </Group>
        {/* {message && <Text align="center" className="secondgame-message">{message}</Text>} */}
        <Button
          className="secondgame-continue-btn"
          disabled={!allGoodSelected}
          style={{ marginTop: '1.5rem' }}
          onClick={() => navigate('/hottestboyfriend')}
          
        >
          Continue
        </Button>
        {allGoodSelected && (
          <Text align="center" className="secondgame-success">So glad I picked all the best qualities! You may continue ❤️</Text>
        )}
      </Card>
    </Container>
  );
}

export default SecondGame;
