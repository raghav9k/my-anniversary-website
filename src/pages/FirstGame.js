import React, { useState } from 'react';
import { Container, Card, Title, Text, TextInput, Button } from '@mantine/core';
import './FirstGame.css';
import { href } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FirstGame() {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.toLowerCase().includes('raghav')) {
      setError('You know that is not true');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setAnswer('');
      }, 400); // match shake animation duration
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
    // You can add next step here
  };

const navigate = useNavigate();

return (
    <Container className="firstgame-container" size="xs">
        <Card shadow="md" padding="xl" radius="md" className="firstgame-card">
            <Title align="center" order={2} mb="md" className="firstgame-title">Answer Correctly to continue</Title>
            <Text align="center" mb="lg" className="firstgame-question">Who is the best boy in the world?</Text>
            <form onSubmit={handleSubmit} className="firstgame-form">
                <TextInput
                    placeholder="Answer please :)"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    size="md"
                    className={shake ? 'shake-input error-input' : error ? 'error-input' : ''}
                />
                <Button className="firstgame-submit-button" type="submit" color="pink" size="md" radius="xl">Submit</Button>
            </form>
            {error && (
                <Text className="firstgame-error-message">{error}</Text>
            )}
            {submitted && !error && (
                <Text align="center" color="green" mt="md">
                    Yes my baby girl!! You know it,{' '}
                    <span
                      style={{ color: 'hotpink', textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => navigate('/qualities')}
                    >
                      Now move on
                    </span>
                </Text>
            )}
        </Card>
    </Container>
);
}

export default FirstGame;
