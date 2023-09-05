import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Graphs from './pages/Graphs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Graphs></Graphs>}></Route>
    </Routes>
  );
}

export default App;
