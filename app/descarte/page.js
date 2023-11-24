"use client";
import "app/style.css";
import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import CaixaSelecao from "./CaixaSelecao.jsx";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import Tabela from "./Tabela";
import Axios from "axios";
import MsgRequired from "../msgExplicativa/MsgRequired.jsx";

export default function DescarteVacina() {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [listaVacina, setListaVacina] = useState([]);
  const [listaDescarte, setListaDescarte] = useState([]);
  const [vacinaSelecionada, setVacinaSelecionada] = useState();

  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável fazer os descartes das vacinas já aplicadas/vendidas"
  );

  const [quantidadeAtual, setQuantidadeAtual] = useState({
    quantidade: "",
  });
  // arrumar ao clicar na vacina
  const [editDescarte, setEditDescarte] = useState({
    id: 0,
    vacina_id: 0,
    descricao: "",
    qtdeDescartada: "",
    quantidadeAtual: "",
  });

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getDescarte").then((response) => {
        setListaDescarte(response.data);
      });
    } else {
      setListaDescarte(
        listaDescarte.filter((item) => {
          return item["nomeVacina"]
            .toLowerCase()
            .includes(pesquisa.toLowerCase());
        })
      );
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getVacina").then((response) => {
      setListaVacina(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getDescarte").then((response) => {
      setListaDescarte(response.data);
    });
  }, []);

  const mudarValores = (valor) => {
    setExibe(false);
    setValor((prevValor) => ({
      ...prevValor,
      [valor.target.name]: valor.target.value,
    }));
  };

  const verificaDados = () => {
    if (typeof vacinaSelecionada == "undefined") {
      setMsg("Escolha uma Vacina");
      setExibe(true);
      return false;
    } else {
      if (typeof valor == "undefined") {
        setMsg("Preencha o Descarte");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      if (editDescarte.id == 0) {
        Axios.post("http://localhost:3001/cadastrarDescarte", {
          quantidade: valor.quantidade,
          vacina_id: vacinaSelecionada.id,
          descricao: valor.descricao,
          qtdeDescartada: valor.qtdeDescartada,
        }).then(() => {
          setListaDescarte([
            ...listaDescarte,
            {
              quantidade: valor.quantidade,
              vacina_id: vacinaSelecionada.id,
              descricao: valor.descricao,
              qtdeDescartada: valor.qtdeDescartada,
            },
          ]);
          Axios.get("http://localhost:3001/getDescarte").then((response) => {
            setListaDescarte(response.data);
          });
        });
      } else {
        Axios.put("http://localhost:3001/editarDescarte", {
          id: editDescarte.id,
          quantidade: valor.quantidade,
          vacina_id: editDescarte.vacina_id,
          descricao: editDescarte.descricao,
          qtdeDescartada: valor.qtdeDescartada,
        }).then(() => {
          setListaDescarte(
            listaDescarte.map((value) => {
              return value.id == editDescarte.id
                ? {
                    quantidade: valor.quantidade,
                    vacina_id: editDescarte.vacina_id,
                    descricao: valor.descricao,
                    qtdeDescartada: valor.qtdeDescartada,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getDescarte").then((response) => {
            setListaDescarte(response.data);
          });
        });
      }
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
        crossOrigin="anonymous"
      ></link>

      <div className="container">
        <br />
        <h1>Descarte de Vacinas</h1>
        <input
          className="form-control"
          hidden
          defaultValue={editDescarte.id}
          type="text"
          name="id"
        />
        <div className="form-group col-8">
          <MsgRequired id={"vacinaID"} texto={"Vacina"} obrigatorio={true} />
          <CaixaSelecao
            id="vacinaID"
            enderecoFonteDados="http://localhost:3001/getVacina"
            campoChave="id"
            campoExibicao="nome"
            funcaoSelecao={setVacinaSelecionada}
            setQuantidade={setQuantidadeAtual}
          />
        </div>
        <br />
        <div className="form-group col-md-3">
          <MsgRequired
            id={"quantidadeAtualID"}
            texto={"Quantidade Atual"}
            obrigatorio={false}
          />
          <input
            id="quantidadeAtualID"
            className="form-control"
            disabled
            defaultValue={quantidadeAtual.quantidade}
            type="number"
            name="quantidadeAtual"
            placeholder=""
          />
        </div>
        <br />
        <div className="form-group col-md-3">
          <MsgRequired
            id={"quantidadeDescarteID"}
            texto={"Quantidade a Descartar"}
            obrigatorio={true}
          />
          <input
            id="quantidadeDescarteID"
            className="form-control"
            defaultValue={editDescarte.qtdeDescartada}
            type="number"
            name="qtdeDescartada"
            placeholder=""
            onChange={mudarValores}
          />
        </div>
        <br />
        <div
          className={
            exibe
              ? "alert alert-danger col-md-3 visible"
              : "alert alert-danger col-md-3 invisible"
          }
          role="alert"
        >
          <li>{msg}</li>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={() => clickButton()}>
            Descartar
          </button>
        </div>
        <br />
        <br />
        <div className="form-group col-md-3">
          <input
            className="form-control"
            type="search"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="th-nomeId">Vacina</th>
                <th className="qtdeId">Quantidade Descartada</th>
                <th className="dataId">Data Descarte</th>
                <th className="acoesId">Ações</th>
              </tr>
            </thead>

            <tbody>
              {typeof listaDescarte != "undefined" &&
                listaDescarte.map((item) => {
                  return (
                    <Tabela
                      id={item.id}
                      qtdeDescartada={item.qtdeDescartada}
                      qtdeAtual={item.quantidadeAtual}
                      vacina_id={item.vacina_id}
                      nomeVacina={item.nomeVacina}
                      dataDescarte={item.dataDescarte}
                      setLista={setListaDescarte}
                      listaFunc={listaDescarte}
                      editFunc={setEditDescarte}
                      setQuantidadeAtual={setQuantidadeAtual}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div style={{ marginLeft: 1200 }}>
          <ImageWithMessage msg={msgExplicativa} />
        </div>
      </div>
    </>
  );
}
