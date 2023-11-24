"use client";
import "app/style.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Tabela from "./Tabela.jsx";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import MsgRequired from "../msgExplicativa/msgRequired.jsx";

export default function Funcionario() {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [listaFuncionario, setListaFuncionario] = useState();

  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável fazer o cadastro dos funcionários"
  );
  const [camposIncorretos, setCamposIncorretos] = useState([
    {
      nome: "==Campo(s) a serem Corrigidos==",
    },
  ]);

  const [editFuncionario, setEditFuncionario] = useState([
    {
      id: 0,
      nome: "",
      cargo: "",
      acesso: 0,
    },
  ]);

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getFuncionario").then((response) => {
        setListaFuncionario(response.data);
      });
    } else {
      setListaFuncionario(
        listaFuncionario.filter((item) => {
          return item["nome"].toLowerCase().includes(pesquisa.toLowerCase());
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

  useEffect(() => {
    Axios.get("http://localhost:3001/getFuncionario").then((response) => {
      setListaFuncionario(response.data);
    });
  }, []);

  const adicionaMensagem = (mensagem) => {
    const novoObj = { nome: mensagem };
    const novoArray = [...camposIncorretos, novoObj];
    setCamposIncorretos(novoArray);
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
      if (typeof valor.cargo == "undefined" || valor.cargo == "") {
        setMsg("Preencha o Cargo");
        setExibe(true);
        return false;
      }
      if (typeof valor.acesso == "undefined") {
        setMsg("Escolha um Nível de Acesso");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      if (typeof editFuncionario.id == "undefined" || editFuncionario.id == 0) {
        Axios.post("http://localhost:3001/cadastrarFuncionario", {
          nome: valor.nome,
          cargo: valor.cargo,
          acesso: valor.acesso,
        }).then(() => {
          setListaFuncionario([
            ...listaFuncionario,
            {
              nome: valor.nome,
              cargo: valor.cargo,
              acesso: valor.acesso,
            },
          ]);
        });
      } else {
        Axios.put("http://localhost:3001/editarFuncionario", {
          id: editFuncionario.id,
          nome: valor.nome,
          cargo: valor.cargo,
          acesso: valor.acesso,
        }).then(() => {
          setListaFuncionario(
            listaFuncionario.map((value) => {
              return value.idFuncionario == editFuncionario.id
                ? {
                    nome: valor.nome,
                    cargo: valor.cargo,
                    acesso: valor.acesso,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getFuncionario").then((response) => {
            setListaFuncionario(response.data);
          });
        });
      }
    }
  };

  return (
    <>
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
              <h1>Cadastrar Funcionário</h1>
              <div className="form-group col-md-3">
                <input
                  className="form-control"
                  hidden
                  defaultValue={editFuncionario.id}
                  type="text"
                  name="id"
                />
                <MsgRequired
                  id={"nomeID"}
                  texto={"Nome Completo"}
                  obrigatorio={true}
                />
                <input
                  id="nomeID"
                  className="form-control"
                  defaultValue={editFuncionario.nome}
                  type="text"
                  name="nome"
                  placeholder=""
                  onChange={mudarValores}
                />
              </div>
              <br />
              <div className="form-group col-md-3">
                <MsgRequired
                  id={"cargoID"}
                  texto={"Cargo"}
                  obrigatorio={true}
                />
                <input
                  id="cargoID"
                  className="form-control"
                  defaultValue={editFuncionario.cargo}
                  type="text"
                  name="cargo"
                  placeholder=""
                  onChange={mudarValores}
                />
              </div>
              <br />
              <div className="form-group col-md-3">
                <MsgRequired
                  id={"idAcesso"}
                  texto={"Nível de Acesso"}
                  obrigatorio={true}
                />
                <br />
                <TextField
                  name="acesso"
                  id="idAcesso"
                  select
                  label="Acesso"
                  helperText="Selecione o nível de acesso"
                  defaultValue={editFuncionario.acesso}
                  onChange={mudarValores}
                >
                  <MenuItem key="1" value="1">
                    Funcionário
                  </MenuItem>
                  <MenuItem key="2" value="2">
                    Gerente
                  </MenuItem>
                  <MenuItem key="3" value="3">
                    Administrador
                  </MenuItem>
                </TextField>
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
                  onClick={() => clickButton()}
                >
                  Cadastrar
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
                      <th className="th-nomeId">Nome</th>
                      <th className="th-cargoId">Cargo</th>
                      <th className="th-cargoId">Acesso</th>
                      <th className="th-acoesId">Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {typeof listaFuncionario != "undefined" &&
                      listaFuncionario.map((item) => {
                        return (
                          <Tabela
                            id={item.id}
                            nome={item.nome}
                            cargo={item.cargo}
                            acesso={item.acesso}
                            setLista={setListaFuncionario}
                            listaFunc={listaFuncionario}
                            editFunc={setEditFuncionario}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <br />
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
