import React, { useState, useEffect, useRef } from 'react';
import { Container, Title, Text, Card, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './Countdown.css';

// Set to true to force message mode for development
const DEV_FORCE_MESSAGES = false;

function useAnimateOnChange(value) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 350); // match CSS duration
    return () => clearTimeout(timeout);
  }, [value]);
  return animate;
}

const messages = [
  "Hey", 
  "We have made it to our first anniversary!",
  "It feels like just yesterday we started this journey.",
  "There are a few things I want to tell you",
  "But before that",
  "Here is a litte something to remember this day by.",
];

function Countdown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const animateDays = useAnimateOnChange(days);
  const animateHours = useAnimateOnChange(hours);
  const animateMinutes = useAnimateOnChange(minutes);
  const animateSeconds = useAnimateOnChange(seconds);

  const [showMessages, setShowMessages] = useState(DEV_FORCE_MESSAGES);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [fade, setFade] = useState(true);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const navigate = useNavigate();
  const intervalRef = useRef();

  useEffect(() => {
    // Get current UTC time
    function getUTCDate() {
      return new Date(); // JS Date is always in UTC internally
    }

    // Set your anniversary date in UTC (July 19, 2025, 4am UTC = midnight NY)
    const anniversaryUTC = new Date(Date.UTC(2025, 6, 19, 4, 0, 0));

    intervalRef.current = setInterval(() => {
      const nowUTC = getUTCDate();
      const diff = anniversaryUTC - nowUTC;
      console.log('anniversaryUTC:', anniversaryUTC);
      console.log('nowUTC:', nowUTC);
      console.log('diff:', diff);
      setCountdownStarted(true);
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (DEV_FORCE_MESSAGES) {
      setShowMessages(true);
      return;
    }
    if (countdownStarted && days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      setShowMessages(true);
    }
  }, [days, hours, minutes, seconds, countdownStarted]);

  useEffect(() => {
    if (showMessages) {
      setFade(true);
      const fadeTimeout = setTimeout(() => setFade(false), 1800);
      const msgTimeout = setTimeout(() => {
        if (currentMessage === messages.length - 1) {
          navigate('/quiz');
        } else {
          setCurrentMessage((prev) => prev + 1);
          setFade(true);
        }
      }, 2200);
      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(msgTimeout);
      };
    }
  }, [showMessages, currentMessage, navigate]);

  return (
    <Container className="countdown-container">
        <Card shadow="md" padding="xl" radius="md" className="countdown-card">
            {!showMessages && (
              <>
                <Title align="center" className="countdown-title">Counting down to first year of our Love (Officially)</Title>
                <Group position="center" spacing="xl" mt="md" display="flex" className="countdown-group">
                    <div className="countdown-unit">
                        <Text size="2xl" weight={700} className={animateDays ? 'countdown-animate' : ''}>{days}</Text>
                        <Text>Days</Text>
                    </div>
                    <div className="countdown-unit">
                        <Text size="2xl" weight={700} className={animateHours ? 'countdown-animate' : ''}>{hours}</Text>
                        <Text>Hours</Text>
                    </div>
                    <div className="countdown-unit">
                        <Text size="2xl" weight={700} className={animateMinutes ? 'countdown-animate' : ''}>{minutes}</Text>
                        <Text>Minutes</Text>
                    </div>
                    <div className="countdown-unit">
                        <Text size="2xl" weight={700} className={animateSeconds ? 'countdown-animate' : ''}>{seconds}</Text>
                        <Text>Seconds</Text>
                    </div>
                </Group>
              </>
            )}
            {showMessages && (
              <div className={`fade-message${fade ? ' fade-in' : ' fade-out'}`}>
                <Text align="center" className="countdown-title">{messages[currentMessage]}</Text>
              </div>
            )}
        </Card>
    </Container>
  );
}

export default Countdown;