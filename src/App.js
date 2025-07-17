import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Countdown from './pages/Countdown';
import Photos from './pages/Photos';
import Message from './pages/Message';
import FirstGame from './pages/FirstGame';

function App() {
  return (
    <MantineProvider>
      <BrowserRouter basename="/my-anniversary-website">
        <Routes>
          <Route path="/" element={<Countdown />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/message" element={<Message />} />
          <Route path="/firstGame" element={<FirstGame />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;