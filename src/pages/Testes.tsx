import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Testes.css";

const mockTestes = [
  {
    id: 1,
    tipo: "ELÉTRICO",
    aeronave: "PR-E2E",
    data: "2025-11-20T03:00:00.000Z",
    resultado: "APROVADO",
    responsavel: "Carlos Silva"
  },
  {
    id: 2,
    tipo: "HIDRÁULICO",
    aeronave: "FAB-2857",
    data: "2025-11-25T03:00:00.000Z",
    resultado: "REPROVADO",
    responsavel: "Maria Souza"
  }
];

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="section-card">
    <h3 className="section-title">{title}</h3>
    <div className="divider"></div>
    {children}
  </div>
);

const BuscaTestes = () => {
  const [filtros, setFiltros] = useState({ tipo: "", aeronave: "", resultado: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFiltros({ ...filtros, [e.target.placeholder.toLowerCase()]: e.target.value });

  const testesFiltrados = mockTestes.filter(
    (t) =>
      t.tipo.toLowerCase().includes(filtros.tipo.toLowerCase()) &&
      t.aeronave.toLowerCase().includes(filtros.aeronave.toLowerCase()) &&
      t.resultado.toLowerCase().includes(filtros.resultado.toLowerCase())
  );

  return (
    <SectionCard title="Busca de Testes">
      <div className="grid">
        {["Tipo", "Aeronave", "Resultado"].map((label) => (
          <input
            key={label}
            className="input-field"
            placeholder={label}
            value={filtros[label.toLowerCase() as keyof typeof filtros]}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="actions">
        <button className="btn-primary">Buscar</button>
      </div>
      <div className="testes-results">
        {testesFiltrados.length === 0 ? (
          <p>Nenhum teste encontrado.</p>
        ) : (
          testesFiltrados.map((t) => (
            <div key={t.id} className="teste-block">
              <div className="teste-header">
                <strong>{t.tipo}</strong> - {t.aeronave}
              </div>
              <div className="teste-content">
                <div>Data: {new Date(t.data).toLocaleDateString()}</div>
                <div>Resultado: {t.resultado}</div>
                <div>Responsável: {t.responsavel}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

const CadastroTestes = () => (
  <SectionCard title="Cadastro de Teste">
    <div className="grid">
      <div className="form-col">
        <input placeholder="Tipo de Teste" className="input-field" />
        <input placeholder="Aeronave (Código)" className="input-field" />
        <input type="date" className="input-field" placeholder="Data" />
        <input placeholder="Responsável" className="input-field" />
         <select className="input-field">
          <option value="">Resultado</option>
          <option value="APROVADO">APROVADO</option>
          <option value="REPROVADO">REPROVADO</option>
        </select>
        <input type="password" placeholder="Digite sua senha" className="input-field" />
        <button className="btn-success">Cadastrar</button>
      </div>
    </div>
  </SectionCard>
);

const EditarTeste = () => (
  <SectionCard title="Editar Teste">
    <div className="grid">
      <div className="form-col">
        <input placeholder="Tipo de Teste" defaultValue="ELÉTRICO" className="input-field" />
        <input placeholder="Aeronave (Código)" defaultValue="PR-E2E" className="input-field" />
        <input type="date" className="input-field" defaultValue="2025-11-20" />
        <select className="input-field" defaultValue="APROVADO">
          <option value="APROVADO">APROVADO</option>
          <option value="REPROVADO">REPROVADO</option>
        </select>
        <input placeholder="Responsável" defaultValue="Carlos Silva" className="input-field" />
        <input type="password" placeholder="Digite sua senha" className="input-field" />
        <button className="btn-primary">Editar</button>
      </div>
    </div>
  </SectionCard>
);

const DeletarTeste = () => {
  const [confirmText, setConfirmText] = useState("");

  return (
    <SectionCard title="Deletar Teste">
      <div className="grid">
        <div className="form-col">
          <div className="alert-warning">
            Esta ação é irreversível. Tenha certeza antes de deletar.
          </div>
          <div>
            <div>Teste Selecionado: ELÉTRICO</div>
            <div>Aeronave: PR-E2E</div>
            <div>Resultado: APROVADO</div>
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

export default function Testes() {
  const [sidebarClosed, setSidebarClosed] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="admin" onToggle={(closed) => setSidebarClosed(closed)} activePage="testes" />
      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          <BuscaTestes />
          <CadastroTestes />
          <EditarTeste />
          <DeletarTeste />
        </div>
      </main>
    </div>
  );
}