import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Aeronaves.css";

const mockAeronaves = [
  {
    codigo: "PR-E2E",
    modelo: "Embraer E195-E2",
    tipo: "COMERCIAL",
    capacidade: 146,
    alcance: 4800,
    pecas: [
      { nome: "Turbina PW1900G", tipo: "IMPORTADA", fornecedor: "Pratt & Whitney", status: "PRONTA" },
      { nome: "Aviônicos Pro Line Fusion", tipo: "IMPORTADA", fornecedor: "Collins Aerospace", status: "PRONTA" },
      { nome: "Fuselagem Central", tipo: "NACIONAL", fornecedor: "Embraer Metálicas", status: "PRONTA" }
    ],
    etapas: [
      { nome: "Montagem Estrutural", prazo: "2025-11-15T03:00:00.000Z", status: "CONCLUIDA", funcionarios: [{id: "2"}, {id: "3"}] },
      { nome: "Instalação de Sistemas", prazo: "2025-11-30T03:00:00.000Z", status: "CONCLUIDA", funcionarios: [{id: "2"}] }
    ],
    testes: [
      { tipo: "ELÉTRICO", resultado: "APROVADO" },
      { tipo: "HIDRÁULICO", resultado: "APROVADO" }
    ]
  },
  {
    codigo: "FAB-2857",
    modelo: "Embraer KC-390",
    tipo: "MILITAR",
    capacidade: 80,
    alcance: 2800,
    pecas: [
      { nome: "Motor IAE V2500-E5", tipo: "IMPORTADA", fornecedor: "IAE", status: "PRONTA" },
      { nome: "Sistema de Missão", tipo: "NACIONAL", fornecedor: "AEL Sistemas", status: "EM_TRANSPORTE" }
    ],
    etapas: [
      { nome: "Junção das Asas", prazo: "2025-12-10T03:00:00.000Z", status: "PENDENTE", funcionarios: [{id: "2"}] }
    ],
    testes: [
      { tipo: "AERODINÂMICO", resultado: "REPROVADO" }
    ]
  }
];

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="section-card">
    <h3 className="section-title">{title}</h3>
    <div className="divider"></div>
    {children}
  </div>
);

const BuscaAeronaves = () => {
  const [filtros, setFiltros] = useState({
    código: "",
    modelo: "",
    fabricante: "",
    status: "",
    localização: "",
    proprietário: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.placeholder.toLowerCase() as keyof typeof filtros;
    setFiltros({ ...filtros, [key]: e.target.value });
  };

  const aeronavesFiltradas = mockAeronaves.filter((a) => {
    return Object.entries(filtros).every(([key, value]) => {
      if (!value) return true;
      return a[key as keyof typeof a]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });

  return (
    <SectionCard title="Busca">
      <div className="grid">
        {["Código", "Modelo", "Fabricante", "Status", "Localização", "Proprietário"].map((label) => (
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

      <div className="aircraft-results">
        {aeronavesFiltradas.length === 0 ? (
          <p>Nenhuma aeronave encontrada.</p>
        ) : (
          <div className="aircraft-grid">
            {aeronavesFiltradas.map((aeronave) => (
              <div key={aeronave.codigo} className="aircraft-block">
                <div className="aircraft-header">
                  <strong>{aeronave.codigo}</strong> - {aeronave.modelo} ({aeronave.tipo})
                </div>
                <div className="aircraft-details">
                  <div>Capacidade: {aeronave.capacidade}</div>
                  <div>Alcance: {aeronave.alcance} km</div>

                  <div className="aircraft-section">
                    <strong>Peças:</strong>
                    <ul>
                      {aeronave.pecas.map((p, idx) => (
                        <li key={idx}>
                          {p.nome} ({p.tipo}) - {p.fornecedor} [{p.status}]
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="aircraft-section">
                    <strong>Etapas:</strong>
                    <ul>
                      {aeronave.etapas.map((et, idx) => (
                        <li key={idx}>
                          {et.nome} - {et.status} (Prazo: {new Date(et.prazo).toLocaleDateString()})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="aircraft-section">
                    <strong>Testes:</strong>
                    <ul>
                      {aeronave.testes.map((t, idx) => (
                        <li key={idx}>
                          {t.tipo}: {t.resultado}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
};

const CadastroAeronaves = () => {
  const [tipo, setTipo] = useState("COMERCIAL");

  return (
    <SectionCard title="Cadastro Aeronaves">
      <div className="grid">
        <div className="form-col">
          <div className="form-col">
          <input placeholder="Código" className="input-field" />
          <input placeholder="Modelo" className="input-field" />
          <div className="radio-group"> 
            <label>
              <input type="radio" value="COMERCIAL" checked={tipo === "COMERCIAL"} onChange={() => setTipo("COMERCIAL")} />
              COMERCIAL
            </label>
            {tipo === "COMERCIAL" }
            <label>
              <input type="radio" value="MILITAR" checked={tipo === "MILITAR"} onChange={() => setTipo("MILITAR")} />
              MILITAR
            </label>
            <input placeholder="Capacidade" className="small-input"  />
            <input placeholder="Alcance" className="small-input" />
            <input type="password" placeholder="Digite sua senha" className="input-field" />
            <button className="btn-primary">Editar</button>
          </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

const EditarAeronave = () => {
  const [tipo, setTipo] = useState("COMERCIAL");

  return (
    <SectionCard title="Editar Aeronave">
      <div className="grid">
        <div className="form-col">
          <input placeholder="Código" className="input-field" />
          <input placeholder="Modelo" className="input-field" disabled  />
          <div className="radio-group"> 
            <label>
              <input type="radio" value="COMERCIAL" checked={tipo === "COMERCIAL"}  disabled  onChange={() => setTipo("COMERCIAL")} />
              COMERCIAL
            </label>
            {tipo === "COMERCIAL" }
            <label>
              <input type="radio" value="MILITAR" checked={tipo === "MILITAR"} disabled  onChange={() => setTipo("MILITAR")} />
              MILITAR
            </label>
            <input placeholder="Capacidade" className="small-input" disabled  />
            <input placeholder="Alcance" className="small-input" disabled  />
            <input type="password" placeholder="Digite sua senha" className="input-field" disabled />
            <button className="btn-primary">Editar</button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

const DeletarAeronave = () => {
  const [confirmText, setConfirmText] = useState("");

  return (
    <SectionCard title="Deletar Aeronave">
      <div className="grid">
        <div className="form-col">
          <div className="alert-warning">
            Esta é uma área sensível. Revise os dados antes de prosseguir.
          </div>
          <div>
            <input placeholder="Código" className="input-field" />
            <input placeholder="Modelo" className="input-field" disabled  />
            <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="Digite 'DELETAR'" className="input-field" />
            <input type="password" placeholder="Digite sua senha" className="input-field" />
            <button className="btn-danger" disabled={confirmText !== "DELETAR"}>DELETAR</button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default function Aeronaves() {
  const [sidebarClosed, setSidebarClosed] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="admin" onToggle={(closed) => setSidebarClosed(closed)} activePage="Aeronaves" />
      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          <BuscaAeronaves />
          <CadastroAeronaves />
          <EditarAeronave />
          <DeletarAeronave />
        </div>
      </main>
    </div>
  );
}