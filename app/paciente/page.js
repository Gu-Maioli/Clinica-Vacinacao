"use client";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Tabela from "./Tabela.jsx";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import MsgRequired from "../msgExplicativa/msgRequired.jsx";

export default function Paciente() {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [listaPaciente, setListaPaciente] = useState([]);

  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável fazer o cadastro dos pacientes"
  );

  const [dataSelecionada, setDataSelecionada] = useState({
    dataCadastro: "",
  });

  const [editPaciente, setEditPaciente] = useState([
    {
      id: 0,
      sexo: 0,
      nome: "",
      endereco: "",
      observacao: "",
      dataCadastro: "",
    },
  ]);

  const getData = (e) => {
    setDataSelecionada({
      dataCadastro: e.target.value,
    });
  };

  const getDias = (data) => {
    return data.split("T")[0].split("-")[2];
  };

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getPaciente").then((response) => {
        setListaPaciente(response.data);
      });
    } else {
      setListaPaciente(
        listaPaciente.filter((item) => {
          return (
            item["nome"].toLowerCase().includes(pesquisa.toLowerCase()) ||
            item["endereco"].toLowerCase().includes(pesquisa.toLowerCase()) ||
            getDias(item["dataCadastro"])
              .toLowerCase()
              .includes(pesquisa.toLowerCase())
          );
        })
      );
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getPaciente").then((response) => {
      setListaPaciente(response.data);
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
    if (typeof valor == "undefined") {
      setMsg("Preencha os Campos obrigatórios");
      setExibe(true);
      return false;
    } else {
      if (typeof valor.nome == "undefined" || valor.nome == "") {
        setMsg("Preencha o Nome");
        setExibe(true);
        return false;
      }
      if (typeof valor.endereco == "undefined" || valor.endereco == "") {
        setMsg("Preencha o Endereço");
        setExibe(true);
        return false;
      }
      if (dataSelecionada.dataCadastro == "") {
        setMsg("Preencha o Campo Data");
        setExibe(true);
        return false;
      }
      if (
        typeof valor.sexo == "undefined" ||
        valor.sexo < 1 ||
        valor.sexo > 3
      ) {
        setMsg("Selecione o Sexo");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      console.log("ENTROU" + editPaciente.id);
      if (typeof editPaciente.id == "undefined" || editPaciente.id == 0) {
        Axios.post("http://localhost:3001/cadastrarPaciente", {
          nome: valor.nome,
          endereco: valor.endereco,
          observacao: valor.observacao,
          sexo: valor.sexo,
          dataCadastro: dataSelecionada.dataCadastro,
        }).then(() => {
          setListaPaciente([
            ...listaPaciente,
            {
              nome: valor.nome,
              endereco: valor.endereco,
              observacao: valor.observacao,
              sexo: valor.sexo,
              dataCadastro: dataSelecionada.dataCadastro,
            },
          ]);
        });
      } else {
        Axios.put("http://localhost:3001/editarPaciente", {
          id: editPaciente.id,
          nome: valor.nome,
          endereco: valor.endereco,
          observacao: valor.observacao,
          sexo: valor.sexo,
          dataCadastro: dataSelecionada.dataCadastro,
        }).then(() => {
          setListaPaciente(
            listaPaciente.map((value) => {
              return value.idPaciente == editPaciente.id
                ? {
                    nome: valor.nome,
                    endereco: valor.endereco,
                    observacao: valor.observacao,
                    sexo: valor.sexo,
                    dataCadastro: dataSelecionada.dataCadastro,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getPaciente").then((response) => {
            setListaPaciente(response.data);
          });
        });
      }
    }
  };

  return (
    <>
      <div>
        <div>
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
            <br />
            <div className="container">
              <h1>Gerenciar Paciente</h1>

              <input
                className="form-control"
                hidden
                defaultValue={editPaciente.id}
                type="text"
                name="id"
              />
              <div className="row">
                <div className="col-md-3">
                  <MsgRequired
                    id={"nomeID"}
                    texto={"Nome Completo"}
                    obrigatorio={true}
                  />
                  <input
                    className="form-control"
                    defaultValue={editPaciente.nome}
                    type="text"
                    id="nomeID"
                    name="nome"
                    placeholder=""
                    onChange={mudarValores}
                  />
                </div>
                <div className="col-md-3">
                  <MsgRequired
                    id={"enderecoID"}
                    texto={"Endereço Completo"}
                    obrigatorio={true}
                  />
                  <input
                    className="form-control"
                    defaultValue={editPaciente.endereco}
                    type="text"
                    id="enderecoID"
                    name="endereco"
                    placeholder=""
                    onChange={mudarValores}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3">
                  <MsgRequired
                    id={"observacaoID"}
                    texto={"Observação"}
                    obrigatorio={false}
                  />
                  <input
                    id="observacaoID"
                    className="form-control"
                    defaultValue={editPaciente.observacao}
                    type="text"
                    name="observacao"
                    placeholder=""
                    onChange={mudarValores}
                  />
                </div>
                <div className="col-md-2">
                  <MsgRequired
                    id={"dataCadastroId"}
                    texto={"Data do Cadastro"}
                    obrigatorio={true}
                  />
                  <input
                    className="form-control"
                    type="datetime-local"
                    id="dataCadastroId"
                    defaultValue={editPaciente.dataCadastro}
                    onChange={(e) => {
                      getData(e);
                    }}
                    name="dataCadastro"
                  ></input>
                </div>
                <div className="col-md-3">
                  <TextField
                    name="sexo"
                    id="sexoID"
                    select
                    label="*Sexo"
                    helperText="Selecione o Sexo"
                    defaultValue={editPaciente.sexo}
                    onChange={mudarValores}
                  >
                    <MenuItem key="1" value="1">
                      Masculino
                    </MenuItem>
                    <MenuItem key="2" value="2">
                      Feminino
                    </MenuItem>
                    <MenuItem key="3" value="3">
                      Não identificado
                    </MenuItem>
                  </TextField>
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
              <div className="">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => clickButton()}
                >
                  Cadastrar
                </button>
              </div>

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
                      <th id="th-nomeId">Nome</th>
                      <th id="th-cargoId">Endereço</th>
                      <th id="th-dataId">Data Cadastro</th>
                      <th id="th-cargoId">Sexo</th>
                      <th id="th-cargoId">Observação</th>
                      <th id="th-acoesId">Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {typeof listaPaciente != "undefined" &&
                      listaPaciente.map((item) => {
                        return (
                          <Tabela
                            id={item.id}
                            nome={item.nome}
                            observacao={item.observacao}
                            endereco={item.endereco}
                            dataCadastro={item.dataCadastro}
                            sexo={item.sexo}
                            setLista={setListaPaciente}
                            listaFunc={listaPaciente}
                            editFunc={setEditPaciente}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
          <div style={{ marginLeft: 1200 }}>
            <ImageWithMessage msg={msgExplicativa} />
          </div>
        </div>
      </div>
    </>
  );
}
