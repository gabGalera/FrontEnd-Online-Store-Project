import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Listagem from './pages/Listagem';

function App() {
  return (
    <BrowserRouter>
      <Listagem />
    </BrowserRouter>
  );
}

export default App;
