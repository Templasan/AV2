import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/Funcionarios.css";
const mockFuncionarios = [
  {
    id: "1",
    nome: "João Silva",
    cargo: "Engenheiro",
    setor: "Manutenção",
    status: "Ativo",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-0001"
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    cargo: "Operador",
    setor: "Produção",
    status: "Ativo",
    email: "maria.oliveira@email.com",
    telefone: "(11) 99999-0002"
  }
];

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="section-card">
    <h3 className="section-title">{title}</h3>
    <div className="divider"></div>
    {children}
  </div>
);

const BuscaFuncionarios = () => {
  const [filtros, setFiltros] = useState({
    nome: "",
    cargo: "",
    setor: "",
    status: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.placeholder.toLowerCase()]: e.target.value });
  };

  const funcionariosFiltrados = mockFuncionarios.filter((f) =>
    Object.entries(filtros).every(([key, value]) =>
      f[key as keyof typeof f].toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <SectionCard title="Busca">
      <div className="grid">
        {["Nome", "Cargo", "Setor", "Status"].map((label) => (
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
        {funcionariosFiltrados.length === 0 ? (
          <p>Nenhum funcionário encontrado.</p>
        ) : (
          funcionariosFiltrados.map((f) => (
            <div key={f.id} className="aircraft-block">
              <div className="aircraft-header">
                <strong>{f.nome}</strong> - {f.cargo} ({f.status})
              </div>
              <div className="aircraft-content">
                <div className="aircraft-details">
                  <div>Setor: {f.setor}</div>
                  <div>Email: {f.email}</div>
                  <div>Telefone: {f.telefone}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

const CadastroFuncionarios = () => {
  const [cargo, setCargo] = useState("Engenheiro");

  return (
    <SectionCard title="Cadastro de Funcionário">
      <div className="grid">
        <div className="form-col">
          <input placeholder="Nome" className="input-field" />
          <input placeholder="Cargo" className="input-field" value={cargo} onChange={e => setCargo(e.target.value)} />
          <input placeholder="Setor" className="input-field" />
          <input placeholder="Status" className="input-field" />
          <input placeholder="Email" className="input-field" />
          <input placeholder="Telefone" className="input-field" />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-success">Cadastrar</button>
        </div>
      </div>
    </SectionCard>
  );
};

const EditarFuncionario = () => {
  const [cargo, setCargo] = useState("Engenheiro");

  return (
    <SectionCard title="Editar Funcionário">
      <div className="grid">
        <div className="form-col">
          <input placeholder="Nome" className="input-field" defaultValue="João Silva" />
          <input placeholder="Cargo" className="input-field" value={cargo} onChange={e => setCargo(e.target.value)} />
          <input placeholder="Setor" className="input-field" defaultValue="Manutenção" />
          <input placeholder="Status" className="input-field" defaultValue="Ativo" />
          <input placeholder="Email" className="input-field" defaultValue="joao.silva@email.com" />
          <input placeholder="Telefone" className="input-field" defaultValue="(11) 99999-0001" />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-primary">Editar</button>
        </div>
      </div>
    </SectionCard>
  );
};

const DeletarFuncionario = () => {
  const [confirmText, setConfirmText] = useState("");

  return (
    <SectionCard title="Deletar Funcionário">
      <div className="grid">
        <div className="form-col">
          <div className="alert-warning">
            Esta é uma área sensível. Revise os dados antes de prosseguir.
          </div>
          <div>
            <div>Funcionário Selecionado: João Silva</div>
            <div>Cargo: Engenheiro</div>
            <div>Setor: Manutenção</div>
            <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Digite 'DELETAR'"
            className="input-field"
          />
          <input type="password" placeholder="Digite sua senha" className="input-field" />
          <button className="btn-danger" disabled={confirmText !== "DELETAR"}>DELETAR</button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default function Funcionarios() {
  const [sidebarClosed, setSidebarClosed] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="admin" onToggle={(closed) => setSidebarClosed(closed)} activePage="Funcionários" />
      <main className={`home-main ${sidebarClosed ? "closed" : "open"}`}>
        <div className="home-container">
          <BuscaFuncionarios />
          <CadastroFuncionarios />
          <EditarFuncionario />
          <DeletarFuncionario />
        </div>
      </main>
    </div>
  );
}