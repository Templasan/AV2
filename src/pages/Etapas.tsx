import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Etapas.css";

const mockEtapas = [
  {
    id: 1,
    nome: "Montagem Estrutural",
    aeronave: "PR-E2E",
    prazo: "2025-11-15T03:00:00.000Z",
    status: "CONCLUÍDA",
    funcionarios: [
      { id: 1, nome: "Carlos Silva" },
      { id: 2, nome: "Maria Souza" }
    ]
  },
  {
    id: 2,
    nome: "Instalação de Sistemas",
    aeronave: "FAB-2857",
    prazo: "2025-11-30T03:00:00.000Z",
    status: "EM ANDAMENTO",
    funcionarios: [{ id: 3, nome: "João Pereira" }]
  }
];

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="section-card">
    <h3 className="section-title">{title}</h3>
    <div className="divider"></div>
    {children}
  </div>
);

const BuscaEtapas = () => {
  const [filtros, setFiltros] = useState({ nome: "", aeronave: "", status: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFiltros({ ...filtros, [e.target.placeholder.toLowerCase()]: e.target.value });

  const etapasFiltradas = mockEtapas.filter(
    (etapa) =>
      etapa.nome.toLowerCase().includes(filtros.nome.toLowerCase()) &&
      etapa.aeronave.toLowerCase().includes(filtros.aeronave.toLowerCase()) &&
      etapa.status.toLowerCase().includes(filtros.status.toLowerCase())
  );

  return (
    <SectionCard title="Busca de Etapas">
      <div className="grid">
        {["Nome", "Aeronave", "Status"].map((label) => (
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
      <div className="etapa-results">
        {etapasFiltradas.length === 0 ? (
          <p>Nenhuma etapa encontrada.</p>
        ) : (
          etapasFiltradas.map((etapa) => (
            <div key={etapa.id} className="etapa-block">
              <div className="etapa-header">
                <strong>{etapa.nome}</strong> - {etapa.aeronave}
              </div>
              <div className="etapa-content">
                <div className="etapa-details">
                  <div>Status: {etapa.status}</div>
                  <div>Prazo: {new Date(etapa.prazo).toLocaleDateString()}</div>
                  <div>
                    <strong>Funcionários:</strong>{" "}
                    {etapa.funcionarios.map((f) => f.nome).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

const CadastroEtapas = () => (
  <SectionCard title="Cadastro de Etapas">
    <div className="grid">
      <div className="form-col">
        <input placeholder="Nome da Etapa" className="input-field" />
        <input placeholder="Aeronave (Código)" className="input-field" />
        <input type="date" className="input-field" placeholder="Prazo" />
        <input placeholder="Funcionários (IDs separados por vírgula)" className="input-field" />
        <select className="input-field">
          <option value="">Selecione o Status</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="EM ANDAMENTO">EM ANDAMENTO</option>
          <option value="CONCLUÍDA">CONCLUÍDA</option>
        </select>
        <input type="password" placeholder="Digite sua senha" className="input-field" />
        <button className="btn-success">Cadastrar</button>
      </div>
    </div>
  </SectionCard>
);

const EditarEtapa = () => (
  <SectionCard title="Editar Etapa">
    <div className="grid">
      <div className="form-col">
        <input placeholder="Nome da Etapa" defaultValue="Montagem Estrutural" className="input-field" />
        <input placeholder="Aeronave (Código)" defaultValue="PR-E2E" className="input-field" />
        <input type="date" className="input-field" defaultValue="2025-11-15" />
        <select className="input-field" defaultValue="CONCLUÍDA">
          <option value="PENDENTE">PENDENTE</option>
          <option value="EM ANDAMENTO">EM ANDAMENTO</option>
          <option value="CONCLUÍDA">CONCLUÍDA</option>
        </select>
        <input placeholder="Funcionários" defaultValue="1, 2" className="input-field" />
        <input type="password" placeholder="Digite sua senha" className="input-field" />
        <button className="btn-primary">Editar</button>
      </div>
    </div>
  </SectionCard>
);

const DeletarEtapa = () => {
  const [confirmText, setConfirmText] = useState("");

  return (
    <SectionCard title="Deletar Etapa">
      <div className="grid">
        <div className="form-col">
          <div className="alert-warning">
            Esta ação é irreversível. Tenha certeza antes de deletar.
          </div>
          <div>
            <div>Etapa Selecionada: Montagem Estrutural</div>
            <div>Aeronave: PR-E2E</div>
            <div>Status: CONCLUÍDA</div>
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

export default function Etapas() {
  const [sidebarClosed, setSidebarClosed] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="admin" onToggle={(closed) => setSidebarClosed(closed)} activePage="etapas" />
      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          <BuscaEtapas />
          <CadastroEtapas />
          <EditarEtapa />
          <DeletarEtapa />
        </div>
      </main>
    </div>
  );
}