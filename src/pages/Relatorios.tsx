import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Relatorios.css";

// --- Mock de Relatórios ---
const mockRelatorios = [
  {
    id: 1,
    titulo: "Relatório Semanal PR-E2E",
    aeronave: "PR-E2E",
    data: "2025-11-15T03:00:00.000Z",
    tipo: "Manutenção",
    autor: "Carlos Silva",
    status: "CONCLUÍDO"
  },
  {
    id: 2,
    titulo: "Relatório de Testes FAB-2857",
    aeronave: "FAB-2857",
    data: "2025-11-20T03:00:00.000Z",
    tipo: "Teste",
    autor: "Mariana Souza",
    status: "PENDENTE"
  }
];

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="section-card">
    <h3 className="section-title">{title}</h3>
    <div className="divider"></div>
    {children}
  </div>
);

const BuscaRelatorios = () => {
  const [filtros, setFiltros] = useState({ titulo: "", aeronave: "", tipo: "", status: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const relatoriosFiltrados = mockRelatorios.filter(
    (r) =>
      r.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()) &&
      r.aeronave.toLowerCase().includes(filtros.aeronave.toLowerCase()) &&
      r.tipo.toLowerCase().includes(filtros.tipo.toLowerCase()) &&
      r.status.toLowerCase().includes(filtros.status.toLowerCase())
  );

  return (
    <SectionCard title="Busca de Relatórios">
      <div className="grid">
        {["titulo", "aeronave", "tipo", "status"].map((field) => (
          <input
            key={field}
            name={field}    
            className="input-field"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={filtros[field as keyof typeof filtros]}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="actions">
        <button className="btn-primary">Buscar</button>
      </div>
      <div className="relatorios-results">
        {relatoriosFiltrados.length === 0 ? (
          <p>Nenhum relatório encontrado.</p>
        ) : (
          relatoriosFiltrados.map((r) => (
            <div key={r.id} className="relatorio-block">
              <div className="relatorio-header">
                <strong>{r.titulo}</strong> - {r.aeronave}
              </div>
              <div className="relatorio-content">
                <div>Data: {new Date(r.data).toLocaleDateString()}</div>
                <div>Tipo: {r.tipo}</div>
                <div>Autor: {r.autor}</div>
                <div>Status: {r.status}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

const CadastroRelatorios = () => (
  <SectionCard title="Cadastro de Relatório">
    <div className="grid">
      <div className="form-col">
        <input placeholder="Título" className="input-field" />
        <input placeholder="Aeronave (Código)" className="input-field" />
        <input type="date" placeholder="Data" className="input-field" />
        <input placeholder="Tipo" className="input-field" />
        <input placeholder="Autor" className="input-field" />
        <select className="input-field">
          <option value="">Status</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="CONCLUÍDO">CONCLUÍDO</option>
        </select>
        <input type="password" placeholder="Digite sua senha" className="input-field" />
        <button className="btn-success">Cadastrar</button>
      </div>
    </div>
  </SectionCard>
);

const DeletarRelatorio = () => {
  const [confirmText, setConfirmText] = useState("");

  return (
    <SectionCard title="Deletar Relatório">
      <div className="grid">
        <div className="form-col">
          <div className="alert-warning">
            Esta ação é irreversível. Revise os dados antes de prosseguir.
          </div>
          <div>
            <div>Relatório Selecionado: Relatório Semanal PR-E2E</div>
            <div>Aeronave: PR-E2E</div>
            <div>Status: CONCLUÍDO</div>
          </div>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Digite 'DELETAR'"
            className="input-field"
          />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-danger" disabled={confirmText !== "DELETAR"}>
            DELETAR
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default function Relatorios() {
  const [sidebarClosed, setSidebarClosed] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="admin" onToggle={(closed) => setSidebarClosed(closed)} activePage="relatorios" />
      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          <BuscaRelatorios />
          <CadastroRelatorios />
          <DeletarRelatorio />
        </div>
      </main>
    </div>
  );
}