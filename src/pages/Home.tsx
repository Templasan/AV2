import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Home.css";

const mockAtividades = [
  { id: 1, texto: "Aeronave PR-AZU, Status: Manutenção Iniciada" },
  { id: 2, texto: "Novo Funcionário, Matrícula: 12345, Adicionado." },
  { id: 3, texto: "Peça PL-900 Cadastrada no Sistema" },
  { id: 4, texto: "Relatório Mensal de Produção Gerado" },
  { id: 5, texto: "Status da Etapa #50 Alterado para Concluído" },
];

const mockRelatorios = [
  { id: 1, titulo: "Relatório Q3/2025 - Peças" },
  { id: 2, titulo: "Performance do Setor de Montagem (Out/2025)" },
  { id: 3, titulo: "Lista de Aeronaves em Manutenção" },
  { id: 4, titulo: "Balanço de Funcionários Ativos" },
];

export default function Home() {
  const [sidebarClosed, setSidebarClosed] = useState(false);

  return (
    <div className="home-wrapper">
      <Sidebar
        role="admin"
        activePage="home"
        onToggle={(closed) => setSidebarClosed(closed)}
      />

      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          {/* Coluna Esquerda - Últimas Atividades */}
          <div className="left-column">
            <div className="card">
              <h3>Últimas Atividades:</h3>
              <div className="divider"></div>
              <ul className="list">
                {mockAtividades.map((atividade) => (
                  <li key={atividade.id} className="list-item">
                    {atividade.texto}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coluna Direita - Relatórios Recentes */}
          <div className="right-column">
            <div className="card">
              <h3>Relatórios Recentes:</h3>
              <div className="divider"></div>
              <ul className="list">
                {mockRelatorios.map((relatorio) => (
                  <li key={relatorio.id} className="list-item">
                    {relatorio.titulo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}