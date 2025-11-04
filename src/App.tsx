import './App.css'

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Aeronaves from './pages/Aeronave';
import Funcionarios from './pages/Funcionarios';
import Pecas from './pages/Pecas';
import Etapas from './pages/Etapas';
import Testes from './pages/Testes';
import Relatorios from './pages/Relatorios';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/funcionarios" element={<Funcionarios />} />
      <Route path="/aeronaves" element={<Aeronaves />} />
      <Route path="/pecas" element={<Pecas />} />
      <Route path="/etapas" element={<Etapas />} />
      <Route path="/testes" element={<Testes />} />
      <Route path="/relatorios" element={<Relatorios />} />
    </Routes>
  );
}
