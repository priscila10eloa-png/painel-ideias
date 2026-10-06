
import { useState } from "react";
import "./App.css";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function aoAdicionar(event) {
    event.preventDefault();

    if (!novaIdeia.trim()) {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia.trim(),
      feita: false,
    };

    setIdeias((atual) => [...atual, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function alternarFeita(id) {
    setIdeias((atual) =>
      atual.map((ideia) =>
        ideia.id === id
          ? { ...ideia, feita: !ideia.feita }
          : ideia
      )
    );
  }

  function aoRemover(id) {
    setIdeias((atual) =>
      atual.filter((ideia) => ideia.id !== id)
    );
  }

  const ideiasConcluidas = ideias.filter(
    (ideia) => ideia.feita
  ).length;

  return (
    <div className="painel">
      <h1>Painel de Ideias</h1>

      <form onSubmit={aoAdicionar}>
        <input
          type="text"
          value={novaIdeia}
          onChange={(event) => {
            setNovaIdeia(event.target.value);
            setErro("");
          }}
          placeholder="Digite sua ideia"
        />

        <button type="submit">Adicionar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul>
        {ideias.map((ideia) => (
          <li key={ideia.id}>
            <input
              type="checkbox"
              checked={ideia.feita}
              onChange={() => alternarFeita(ideia.id)}
            />

            <span className={ideia.feita ? "feita" : ""}>
              {ideia.texto}
            </span>

            <button
              type="button"
              onClick={() => aoRemover(ideia.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="contador">
        {`${ideias.length} ideias no painel · ${ideiasConcluidas} concluídas`}
      </p>
    </div>
  );
}

export default App;

