import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListarNoticias from './components/listar-noticias/index.tsx';
import { SalvarNoticias } from './components/salvar-noticias/index.tsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ListarNoticias />} />
          <Route path="/editar/:id" element={<SalvarNoticias />} />
          <Route path="/novo" element={<SalvarNoticias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
