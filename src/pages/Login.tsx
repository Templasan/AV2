import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/Login.css";
import LoginImg from "../assets/Banner.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      alert("Login bem-sucedido!");
      navigate("/home");
    } else {
      setError("Usuário ou senha inválidos");
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${LoginImg})` }}
      ></div>
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Bem-vindo à Aerocode</p>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="forgot-password">Esqueci a senha</p>

        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}