// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Menu from './components/Menu';
import Home from './pages/Home';
import Objetivos from './pages/Objetivos';
import Financeiro from './pages/Financeiro';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      <Menu />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/objetivos" element={<Objetivos />} />
          <Route path="/objetivos/academia" element={<Objetivos categoria="academia" />} />
          <Route path="/objetivos/equipamento" element={<Objetivos categoria="equipamento" />} />
          <Route path="/objetivos/viagem" element={<Objetivos categoria="viagem" />} />
          <Route path="/financas" element={<Financeiro />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;