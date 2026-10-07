
import { useState } from "react";
import "./App.css";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function aoAdicionar(event) {
    event.preventDefault();

    if (novaIdeia.trim() == "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false
    };

    setIdeias([...ideias, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function concluir(id) {
    setIdeias(
      ideias.map((ideia) => {
        if (ideia.id == id) {
          return {
            ...ideia,
            feita: !ideia.feita
          };
        }

        return ideia;
      })
    );
  }

  function remover(id) {
    setIdeias(
      ideias.filter((ideia) => ideia.id != id)
    );
  }

  const concluidas = ideias.filter(
    (ideia) => ideia.feita
  ).length;

  return (
    <div className="painel">
      <h1>Minhas Ideias</h1>

      <form onSubmit={aoAdicionar}>
        <input
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
              onChange={() => concluir(ideia.id)}
            />

            <span className={ideia.feita ? "feita" : ""}>
              {ideia.texto}
            </span>

            <button
              type="button"
              onClick={() => remover(ideia.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="contador">
        {`${ideias.length} ideias no painel · ${concluidas} concluídas`}
      </p>
    </div>
  );
}

export default App;
