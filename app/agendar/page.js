"use client";
import "app/style.css";
import React, { useEffect, useState } from "react";
import CaixaSelecao from "app/CaixaSelecao.jsx";
import Tabela from "./Tabela";
import Axios from "axios";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import MsgRequired from "../msgExplicativa/msgRequired";

export default function Agendar() {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável por agendar aplicação do paciente"
  );
  const [listaAtendimento, setListaAtendimento] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState();
  const [dataSelecionada, setDataSelecionada] = useState({
    dataInicio: "",
  });
  const [editAtendimento, setEditAtendimento] = useState({
    id: 0,
    descricao: "",
    dataInicio: "",
    paciente_id: 0,
  });

  const columns = [
    { Header: "Nome", accessor: "nomePaciente" },
    { Header: "Data", accessor: "dataInicio" },
    { Header: "Descrição", accessor: "descricao" },
    { Header: "Ações", accessor: "acoes" },
    // Adicione mais colunas conforme necessário
  ];

  const getDias = (data) => {
    console.log(data);
    return data.split("T")[0].split("-")[2];
  };

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getAtendimento").then((response) => {
        setListaAtendimento(response.data);
      });
    } else {
      setListaAtendimento(
        listaAtendimento.filter((item) => {
          return (
            item["nomePaciente"]
              .toLowerCase()
              .includes(pesquisa.toLowerCase()) ||
            getDias(item["dataInicio"])
              .toLowerCase()
              .includes(pesquisa.toLowerCase())
          );
        })
      );
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getAtendimento").then((response) => {
      setListaAtendimento(response.data);
    });
  }, []);

  const mudarValores = (valor) => {
    setExibe(false);
    setValor((prevValor) => ({
      ...prevValor,
      [valor.target.name]: valor.target.value,
    }));
  };

  const getData = (e) => {
    setDataSelecionada({
      dataInicio: e.target.value,
    });
  };

  const verificaDados = () => {
    if (typeof valor == "undefined") {
      setMsg("Preencha os Campos Obrigatórios");
      console.log("> " + msg);
      setExibe(true);
      return false;
    } else {
      if (typeof valor.descricao == "undefined" || valor.descricao == "") {
        setMsg("Preencha a Descrição");
        setExibe(true);
        return false;
      }
      if (dataSelecionada.dataInicio == "") {
        setMsg("Preencha o Campo Data");
        setExibe(true);
        return false;
      }
      if (typeof pacienteSelecionado.id == "undefined") {
        setMsg("Escolha um Paciente");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      if (typeof editAtendimento.id == "undefined" || editAtendimento.id == 0) {
        Axios.post("http://localhost:3001/cadastrarAtendimento", {
          descricao: valor.descricao,
          dataInicio: dataSelecionada.dataInicio,
          paciente_id: pacienteSelecionado.id,
        }).then(() => {
          setListaAtendimento([
            ...listaAtendimento,
            {
              descricao: valor.descricao,
              dataInicio: dataSelecionada.dataInicio,
              paciente_id: pacienteSelecionado.id,
            },
          ]);
          Axios.get("http://localhost:3001/getAtendimento").then((response) => {
            setListaAtendimento(response.data);
          });
        });
      } else {
        Axios.put("http://localhost:3001/editarAtendimento", {
          id: editAtendimento.id,
          descricao: valor.descricao,
          dataInicio: dataSelecionada.dataInicio,
          paciente_id: pacienteSelecionado.id,
        }).then(() => {
          setListaAtendimento(
            listaAtendimento.map((value) => {
              return value.id == editAtendimento.id
                ? {
                    descricao: valor.descricao,
                    dataInicio: dataSelecionada.dataInicio,
                    paciente_id: pacienteSelecionado.id,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getAtendimento").then((response) => {
            setListaAtendimento(response.data);
          });
        });
      }
    }
    setExibe(false);
  };

  return (
    <div>
      <br />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <main>
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
              <h1>Agendar Aplicação</h1>
              <br />
              <input
                className="form-control"
                hidden
                defaultValue={editAtendimento.id}
                type="text"
                name="id"
              />
              <div className="row">
                <div className="col-md-2">
                  <MsgRequired
                    id={"pacienteID"}
                    texto={"Paciente"}
                    obrigatorio={true}
                  />
                  <CaixaSelecao
                    id="pacienteID"
                    enderecoFonteDados="http://localhost:3001/getAllPaciente"
                    campoChave="id"
                    campoExibicao="nome"
                    funcaoSelecao={setPacienteSelecionado}
                  />
                </div>
                <br />
                <div className="col-md-2">
                  <MsgRequired
                    id={"dataInicioId"}
                    texto={"Data do Atendimento"}
                    obrigatorio={true}
                  />
                  <input
                    className="form-control"
                    type="datetime-local"
                    id="dataInicioId"
                    defaultValue={editAtendimento.dataInicio}
                    onChange={(e) => {
                      getData(e);
                    }}
                    name="dataInicio"
                  ></input>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <MsgRequired
                    id={"descricaoID"}
                    texto={"Descrição"}
                    obrigatorio={false}
                  />
                  <input
                    id="descricaoID"
                    className="form-control"
                    defaultValue={editAtendimento.descricao}
                    type="text"
                    name="descricao"
                    placeholder=""
                    onChange={mudarValores}
                  />
                </div>
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
                <button
                  className="btn btn-success"
                  onClick={() => clickButton()}
                >
                  Agendar
                </button>
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
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th id="th-pacienteId">Paciente</th>
                    <th id="th-dataId">Data Agendamento</th>
                    <th id="th-descricaoId">Descrição</th>
                    <th id="th-acoesId">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {typeof listaAtendimento != "undefined" &&
                    listaAtendimento.map((item) => {
                      return (
                        <Tabela
                          id={item.id}
                          nomePaciente={item.nomePaciente}
                          descricao={item.descricao}
                          dataInicio={item.dataInicio}
                          paciente_id={item.paciente_id}
                          setLista={setListaAtendimento}
                          listaFunc={listaAtendimento}
                          editFunc={setEditAtendimento}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </main>
          <div style={{ marginLeft: 1200 }}>
            <ImageWithMessage msg={msgExplicativa} />
          </div>
        </div>
      </div>
    </div>
  );
}
/* <div>
                <Pagination
                  columns={columns}
                  data={listaAtendimento}
                  itemsPerPage={2}
                />
              </div> */
