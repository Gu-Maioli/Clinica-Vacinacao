"use client";
import "app/style.css";
import React, { useEffect, useState } from "react";
import CaixaSelecao from "app/CaixaSelecao.jsx";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import Tabela from "./Tabela";
import Axios from "axios";
import MsgRequired from "../msgExplicativa/MsgRequired.jsx";

export default function VendaVacina() {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [listaVenda, setListaVenda] = useState();
  const [listaVacina, setListaVacina] = useState();
  const [vacinaSelecionada, setVacinaSelecionada] = useState();
  const [pacienteSelecionado, setPacienteSelecionado] = useState();

  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável por registrar as vendas das vacinas feitas aos pacientes"
  );

  const [editVenda, setEditVenda] = useState({
    id: 0,
    preco: "",
    descricao: "",
    quantidade: "",
    paciente_id: 0,
    vacina_id: 0,
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/getVacina").then((response) => {
      setListaVacina(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getVenda").then((response) => {
      setListaVenda(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getVenda").then((response) => {
        setListaVenda(response.data);
      });
    } else {
      setListaVenda(
        listaVenda.filter((item) => {
          return (
            item["nomePaciente"]
              .toLowerCase()
              .includes(pesquisa.toLowerCase()) ||
            item["nomeVacina"].toLowerCase().includes(pesquisa.toLowerCase())
          );
        })
      );
    }
  };

  const mudarValores = (valor) => {
    setExibe(false);
    setValor((prevValor) => ({
      ...prevValor,
      [valor.target.name]: valor.target.value,
    }));
  };

  const verificaDados = () => {
    if (typeof valor == "undefined") {
      setMsg("Preencha os Campos obrigatórios");
      setExibe(true);
      return false;
    } else {
      if (typeof pacienteSelecionado.id == "undefined") {
        setMsg("Escolha um Paciente");
        setExibe(true);
        return false;
      }
      if (typeof vacinaSelecionada.id == "undefined") {
        setMsg("Escolha uma Vacina");
        setExibe(true);
        return false;
      }
      if (typeof valor.quantidade == "undefined" || valor.quantidade == "") {
        setMsg("Preencha a Quantidade");
        setExibe(true);
        return false;
      }
      if (typeof valor.preco == "undefined" || valor.preco == "") {
        setMsg("Defina um Preço");
        setExibe(true);
        return false;
      }
      if (typeof valor.descricao == "undefined" || valor.descricao == "") {
        setMsg("Preencha a Descrição");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      if (editVenda.id == 0) {
        Axios.post("http://localhost:3001/cadastrarVenda", {
          preco: valor.preco,
          descricao: valor.descricao,
          quantidade: valor.quantidade,
          paciente_id: pacienteSelecionado.id,
          vacina_id: vacinaSelecionada.id,
        }).then(() => {
          setListaVenda([
            ...listaVenda,
            {
              preco: valor.preco,
              descricao: valor.descricao,
              quantidade: valor.quantidade,
              paciente_id: pacienteSelecionado.id,
              vacina_id: vacinaSelecionada.id,
            },
          ]);
          Axios.get("http://localhost:3001/getVenda").then((response) => {
            setListaVenda(response.data);
          });
        });
      } else {
        Axios.put("http://localhost:3001/editarVenda", {
          id: editVenda.id,
          preco: valor.preco,
          descricao: valor.descricao,
          quantidade: valor.quantidade,
          paciente_id: pacienteSelecionado.id,
          vacina_id: vacinaSelecionada.id,
        }).then(() => {
          setListaVenda(
            listaVenda.map((value) => {
              return value.id == editVenda.id
                ? {
                    preco: valor.preco,
                    descricao: valor.descricao,
                    quantidade: valor.quantidade,
                    paciente_id: pacienteSelecionado.id,
                    vacina_id: vacinaSelecionada.id,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getVenda").then((response) => {
            setListaVenda(response.data);
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
        crossorigin="anonymous"
      ></link>
      <div className="container">
        <input
          className="form-control"
          hidden
          defaultValue={editVenda.id}
          type="text"
          name="id"
        />
        <br />
        <h1>Vender Vacina</h1>
        <MsgRequired id={"pacienteID"} texto={"Paciente"} obrigatorio={true} />
        <CaixaSelecao
          id="pacienteID"
          enderecoFonteDados="http://localhost:3001/getPaciente"
          campoChave="id"
          campoExibicao="nome"
          funcaoSelecao={setPacienteSelecionado}
        />
        <br />
        <MsgRequired id={"vacinaID"} texto={"Vacina"} obrigatorio={true} />
        <CaixaSelecao
          id="vacinaID"
          enderecoFonteDados="http://localhost:3001/getVacina"
          campoChave="id"
          campoExibicao="nome"
          funcaoSelecao={setVacinaSelecionada}
        />
        <br />
        <div className="form-group col-md-2">
          <MsgRequired
            id={"quantidadeID"}
            texto={"Quantidade"}
            obrigatorio={true}
          />
          <input
            id="quantidadeID"
            className="form-control"
            defaultValue={editVenda.quantidade}
            type="number"
            name="quantidade"
            placeholder=""
            onChange={mudarValores}
          />
        </div>
        <br />
        <div className="form-group col-md-2">
          <MsgRequired id={"precoID"} texto={"Preço"} obrigatorio={true} />
          <input
            id="precoID"
            className="form-control"
            defaultValue={editVenda.preco}
            type="number"
            name="preco"
            placeholder=""
            onChange={mudarValores}
          />
        </div>
        <br />
        <div className="form-group col-md-2">
          <MsgRequired
            id={"descricaoID"}
            texto={"Descrição"}
            obrigatorio={false}
          />
          <input
            id="descricaoID"
            className="form-control"
            defaultValue={editVenda.descricao}
            type="text"
            name="descricao"
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
        <div className="container">
          <button className="btn btn-success" onClick={() => clickButton()}>
            Vender
          </button>
        </div>
        <div></div>
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
                <th className="th-pacienteId">Paciente</th>
                <th className="th-vacinaId">Vacina</th>
                <th className="th-descricaoId">Descrição</th>
                <th className="th-valorId">Valor Unitário</th>
                <th className="th-qtdeId">Quantidade</th>
                <th className="th-valorId">Valor Total</th>
                <th className="th-acoesId">Ações</th>
              </tr>
            </thead>
            <tbody>
              {typeof listaVenda != "undefined" &&
                listaVenda.map((item) => {
                  return (
                    <Tabela
                      id={item.id}
                      descricao={item.descricao}
                      quantidade={item.quantidade}
                      nomePaciente={item.nomePaciente}
                      nomeVacina={item.nomeVacina}
                      preco={item.preco}
                      setLista={setListaVenda}
                      listaFunc={listaVenda}
                      editFunc={setEditVenda}
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
