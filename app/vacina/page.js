"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import TabelaV from "./TabelaV";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import MsgRequired from "../msgExplicativa/MsgRequired.jsx";

const Vacina = () => {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [listaVacina, setListaVacina] = useState();
  const [pesquisa, setPesquisa] = useState("");

  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável por registrar as vacinas"
  );

  const [editVacina, setEditVacina] = useState({
    id: 0,
    nome: "",
    quantidade: "",
    lote: "",
  });

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getVacina").then((response) => {
        setListaVacina(response.data);
      });
    } else {
      setListaVacina(
        listaVacina.filter((item) => {
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
    Axios.get("http://localhost:3001/getVacina").then((response) => {
      setListaVacina(response.data);
    });
  }, []);

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
      if (typeof valor.quantidade == "undefined" || valor.quantidade == "") {
        setMsg("Preencha a Quantidade");
        setExibe(true);
        return false;
      }
      if (typeof valor.lote == "undefined" || valor.lote == "") {
        setMsg("Preencha o Lote");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      if (typeof editVacina.id == "undefined" || editVacina.id == 0) {
        Axios.post("http://localhost:3001/cadastrarVacina", {
          nome: valor.nome,
          quantidade: valor.quantidade,
          lote: valor.lote,
        }).then(() => {
          setListaVacina([
            ...listaVacina,
            {
              nome: valor.nome,
              quantidade: valor.quantidade,
              lote: valor.lote,
            },
          ]);
        });
      } else {
        Axios.put("http://localhost:3001/editarVacina", {
          id: editVacina.id,
          nome: valor.nome,
          quantidade: valor.quantidade,
          lote: valor.lote,
        }).then(() => {
          setListaVacina(
            listaVacina.map((value) => {
              return value.id == editVacina.id
                ? {
                    nome: valor.nome,
                    quantidade: valor.quantidade,
                    lote: valor.lote,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getVacina").then((response) => {
            setListaVacina(response.data);
          });
        });
      }
    }
  };

  return (
    <>
      <div className="container">
        <br />
        <h1>Gerenciar Vacina</h1>
        <input
          className="form-control"
          hidden
          defaultValue={editVacina.id}
          type="text"
          name="id"
        />
        <div className="row">
          <div className="col-md-3">
            <MsgRequired
              id={"vacinaID"}
              texto={"Nome da Vacina"}
              obrigatorio={true}
            />
            <input
              id="vacinaID"
              className="form-control"
              defaultValue={editVacina.nome}
              type="text"
              name="nome"
              placeholder=""
              onChange={mudarValores}
            />
          </div>
          <div className="col-md-2">
            <MsgRequired
              id={"quantidadeID"}
              texto={"Quantidade"}
              obrigatorio={true}
            />
            <input
              id="quantidadeID"
              className="form-control"
              defaultValue={editVacina.quantidade}
              type="number"
              name="quantidade"
              placeholder=""
              onChange={mudarValores}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-2">
            <MsgRequired
              id={"loteID"}
              texto={"Codigo Lote"}
              obrigatorio={true}
            />
            <input
              id="loteID"
              className="form-control"
              defaultValue={editVacina.lote}
              type="text"
              name="lote"
              placeholder=""
              onChange={mudarValores}
            />
          </div>
        </div>
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
          <button className="btn btn-success" onClick={() => clickButton()}>
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
                <th className="th-nomeId">Nome Vacina</th>
                <th className="th-quantidadeId">Quantidade</th>
                <th className="th-loteId">Codigo Lote</th>
                <th className="th-acoesId">Ações</th>
              </tr>
            </thead>

            <tbody>
              {typeof listaVacina != "undefined" &&
                listaVacina.map((item) => {
                  return (
                    <TabelaV
                      id={item.id}
                      nome={item.nome}
                      lote={item.lote}
                      quantidade={item.quantidade}
                      setLista={setListaVacina}
                      listaFunc={listaVacina}
                      editFunc={setEditVacina}
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
};

export default Vacina;
