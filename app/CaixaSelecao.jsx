import { Container, Form, Row, Col, Spinner } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

export default function CaixaSelecao({
  enderecoFonteDados,
  campoChave,
  campoExibicao,
  funcaoSelecao,
}) {
  const [valorSelecionado, setValorSelecionado] = useState({
    [campoChave]: 0,
    [campoExibicao]: "Não foi possivel obter os dados do backend",
  });

  const [carregandoDados, setCarregandoDados] = useState(false);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    try {
      setCarregandoDados(true);
      fetch(enderecoFonteDados, { methos: "GET" })
        .then((resposta) => {
          if (resposta.ok) {
            return resposta.json();
          } else {
            setDados([
              {
                [campoChave]: 0,
                [campoExibicao]: "Não foi possivel obter os dados do backend",
              },
            ]);
          }
        })
        .then((listaDados) => {
          setCarregandoDados(false);
          setDados(listaDados);
          if (listaDados.length > 0) {
            setValorSelecionado(listaDados[0]);
            funcaoSelecao(listaDados);
          }
        });
    } catch (erro) {
      setCarregandoDados(false);
      setDados([
        {
          [campoChave]: 0,
          [campoExibicao]: "Não foi possivel obter os dados do backend",
        },
      ]);
    }
  }, []);

  return (
    <div>
      <Form.Select
        value={valorSelecionado[campoChave]}
        onChange={(evento) => {
          const itemSelecionado = evento.currentTarget.value;
          const pos = dados
            .map((item) => item[campoChave].toString())
            .indexOf(itemSelecionado); // lista somente de ids
          setValorSelecionado(dados[pos]);
          funcaoSelecao(dados[pos]);
        }}
      >
        {dados.map((item) => {
          return (
            <option key={item[campoChave]} value={item[campoChave]}>
              {item[campoExibicao]}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
}
