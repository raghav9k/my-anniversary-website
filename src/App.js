import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Countdown from './pages/Countdown';
import Message from './pages/Message';
import FirstGame from './pages/FirstGame';
import SecondGame from './pages/SecondGame';
import ThirdGame from './pages/ThirdGame';

function App() {
  return (
    <MantineProvider>
      <BrowserRouter basename="/my-anniversary-website">
        <Routes>
          <Route path="/" element={<Countdown />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/message" element={<Message />} />
          <Route path="/quiz" element={<FirstGame />} />
          <Route path="/qualities" element={<SecondGame />} />
          <Route path="/hottestboyfriend" element={<ThirdGame />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;