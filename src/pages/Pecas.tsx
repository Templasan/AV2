import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Pecas.css";

const mockPecas = [
  {
    nome: "Turbina PW1900G",
    tipo: "IMPORTADA",
    fornecedor: "Pratt & Whitney",
    status: "PRONTA",
    aeronave: "PR-E2E"
  },
  {
    nome: "Aviônicos Pro Line Fusion",
    tipo: "IMPORTADA",
    fornecedor: "Collins Aerospace",
    status: "PRONTA",
    aeronave: "PR-E2E"
  },
  {
    nome: "Fuselagem Central",
    tipo: "NACIONAL",
    fornecedor: "Embraer Metálicas",
    status: "PRONTA",
    aeronave: "PR-E2E"
  },
  {
    nome: "Motor IAE V2500-E5",
    tipo: "IMPORTADA",
    fornecedor: "IAE",
    status: "PRONTA",
    aeronave: "FAB-2857"
  }
];

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="section-card">
    <h3 className="section-title">{title}</h3>
    <div className="divider"></div>
    {children}
  </div>
);

const BuscaPecas = () => {
  const [filtros, setFiltros] = useState({
    nome: "",
    tipo: "",
    fornecedor: "",
    status: "",
    aeronave: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.placeholder.toLowerCase()]: e.target.value });
  };


  const pecasFiltradas = mockPecas.filter((peca) =>
    peca.nome.toLowerCase().includes(filtros.nome.toLowerCase()) &&
    peca.tipo.toLowerCase().includes(filtros.tipo.toLowerCase()) &&
    peca.fornecedor.toLowerCase().includes(filtros.fornecedor.toLowerCase()) &&
    peca.status.toLowerCase().includes(filtros.status.toLowerCase()) &&
    peca.aeronave.toLowerCase().includes(filtros.aeronave.toLowerCase())
  );

  return (
    <SectionCard title="Busca">
      <div className="grid">
        {["Nome", "Tipo", "Fornecedor", "Status", "Aeronave"].map((label) => (
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
      <div className="peca-results">
        {pecasFiltradas.length === 0 ? (
          <p>Nenhuma peça encontrada.</p>
        ) : (
          pecasFiltradas.map((peca, idx) => (
            <div key={idx} className="peca-block">
              <div className="peca-header">
                <strong>{peca.nome}</strong> ({peca.tipo})
              </div>
              <div className="peca-content">
                <div className="peca-details">
                  <div>Fornecedor: {peca.fornecedor}</div>
                  <div>Status: {peca.status}</div>
                  <div>Aeronave Associada: {peca.aeronave}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

const CadastroPecas = () => {
  const [tipo, setTipo] = useState("IMPORTADA");
  return (
    <SectionCard title="Cadastro de Peças">
      <div className="grid">
        <div className="form-col">
          <input placeholder="Nome" className="input-field" />
          <input placeholder="Fornecedor" className="input-field" />
          <div className="radio-group">
            <label>
              <input type="radio" value="IMPORTADA" checked={tipo === "IMPORTADA"} onChange={() => setTipo("IMPORTADA")} />
              IMPORTADA
            </label>
            <label>
              <input type="radio" value="NACIONAL" checked={tipo === "NACIONAL"} onChange={() => setTipo("NACIONAL")} />
              NACIONAL
            </label>
          </div>
          <input placeholder="Status" className="input-field" />
          <input placeholder="Aeronave Associada" className="input-field" />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-success">Cadastrar</button>
        </div>
      </div>
    </SectionCard>
  );
};

const EditarPeca = () => {
  const [tipo, setTipo] = useState("IMPORTADA");
  return (
    <SectionCard title="Editar Peça">
      <div className="grid">
        <div className="form-col">
          <input placeholder="Nome" className="input-field" defaultValue="Turbina PW1900G" disabled />
          <input placeholder="Fornecedor" className="input-field" defaultValue="Pratt & Whitney" />
          <div className="radio-group">
            <label>
              <input type="radio" value="IMPORTADA" checked={tipo === "IMPORTADA"} onChange={() => setTipo("IMPORTADA")} />
              IMPORTADA
            </label>
            <label>
              <input type="radio" value="NACIONAL" checked={tipo === "NACIONAL"} onChange={() => setTipo("NACIONAL")} />
              NACIONAL
            </label>
          </div>
          <input placeholder="Status" className="input-field" defaultValue="PRONTA" />
          <input placeholder="Aeronave Associada" className="input-field" defaultValue="PR-E2E" />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-primary">Editar</button>
        </div>
      </div>
    </SectionCard>
  );
};

const DeletarPeca = () => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <SectionCard title="Deletar Peça">
      <div className="grid">
        <div className="form-col">
          <div className="alert-warning">
            Esta é uma área sensível. Revise os dados antes de prosseguir.
          </div>
          <div>
            <div>Peça Selecionada: Turbina PW1900G</div>
            <div>Fornecedor: Pratt & Whitney</div>
            <div>Tipo: IMPORTADA</div>
            <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="Digite 'DELETAR'" className="input-field" />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-danger" disabled={confirmText !== "DELETAR"}>DELETAR</button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default function Pecas() {
  const [sidebarClosed, setSidebarClosed] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="admin" onToggle={(closed) => setSidebarClosed(closed)} activePage="Peças" />
      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          <BuscaPecas />
          <CadastroPecas />
          <EditarPeca />
          <DeletarPeca />
        </div>
      </main>
    </div>
  );
}