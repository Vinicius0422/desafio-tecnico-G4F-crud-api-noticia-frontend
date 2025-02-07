import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListarNoticias from './components/listar-noticias/index.tsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ListarNoticias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
