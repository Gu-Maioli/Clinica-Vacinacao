"use client";
import "app/style.css";
import React, { useEffect, useState } from "react";
import CaixaSelecao from "app/CaixaSelecao.jsx";
import Tabela from "./Tabela";
import Axios from "axios";
import ImageWithMessage from "../msgExplicativa/ImageWithMessage.jsx";
import MsgRequired from "../msgExplicativa/msgRequired";

export default function CompraVacina() {
  const [msg, setMsg] = useState("");
  const [valor, setValor] = useState();
  const [exibe, setExibe] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [listaVacina, setListaVacina] = useState();
  const [listaCompra, setListaCompra] = useState([]);
  const [listaFornecedor, setListaFornecedor] = useState();
  const [vacinaSelecionada, setVacinaSelecionada] = useState();
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState();

  const [dataSelecionada, setDataSelecionada] = useState({
    dataCompra: "",
  });

  const [editCompra, setEditCompra] = useState({
    id: 0,
    descricao: "",
    quantidade: "",
    precoUni: "",
    fornecedor_id: 0,
    vacina_id: 0,
    dataCompra: "",
  });
  const [msgExplicativa, setMsgExplicativa] = useState(
    "Função responsável por registrar as compras das vacinas dos fornecedores"
  );

  const getData = (e) => {
    setDataSelecionada({
      dataCompra: e.target.value,
    });
  };

  const getDias = (data) => {
    return data.split("T")[0].split("-")[2];
  };

  const handleChange = (event) => {
    setPesquisa(event.target.value);
    if (event.target.value == "") {
      Axios.get("http://localhost:3001/getCompra").then((response) => {
        setListaCompra(response.data);
      });
    } else {
      setListaCompra(
        listaCompra.filter((item) => {
          return (
            item["nomeVacina"].toLowerCase().includes(pesquisa.toLowerCase()) ||
            item["nomeFornecedor"]
              .toLowerCase()
              .includes(pesquisa.toLowerCase()) ||
            getDias(item["dataCompra"])
              .toLowerCase()
              .includes(pesquisa.toLowerCase())
          );
        })
      );
    }
  };

  const limpaCampos = () => {
    setEditCompra({
      id: 0,
      descricao: "",
      quantidade: "",
      precoUni: "",
      fornecedor_id: 0,
      vacina_id: 0,
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getVacina").then((response) => {
      setListaVacina(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getFornecedor").then((response) => {
      setListaFornecedor(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getCompra").then((response) => {
      setListaCompra(response.data);
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
      if (typeof fornecedorSelecionado.id == "undefined") {
        setMsg("Escolha um Fornecedor");
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
      if (typeof valor.precoUni == "undefined" || valor.precoUni == "") {
        setMsg("Defina um Preço");
        setExibe(true);
        return false;
      }
      if (typeof valor.descricao == "undefined" || valor.descricao == "") {
        setMsg("Preencha a Descrição");
        setExibe(true);
        return false;
      }
      if (dataSelecionada.dataCompra == "") {
        setMsg("Preencha o Campo Data");
        setExibe(true);
        return false;
      }
    }
    return true;
  };

  const clickButton = () => {
    if (verificaDados()) {
      if (typeof editCompra.id == "undefined" || editCompra.id == 0) {
        Axios.post("http://localhost:3001/cadastrarCompra", {
          descricao: valor.descricao,
          quantidade: valor.quantidade,
          precoUni: valor.precoUni,
          dataCompra: dataSelecionada.dataCompra,
          fornecedor_id: fornecedorSelecionado.id,
          vacina_id: vacinaSelecionada.id,
        }).then(() => {
          setListaCompra([
            ...listaCompra,
            {
              descricao: valor.descricao,
              quantidade: valor.quantidade,
              precoUni: valor.precoUni,
              dataCompra: dataSelecionada.dataCompra,
              fornecedor_id: fornecedorSelecionado.id,
              vacina_id: vacinaSelecionada.id,
            },
          ]);
          Axios.get("http://localhost:3001/getCompra").then((response) => {
            setListaCompra(response.data);
          });
          limpaCampos();
        });
      } else {
        Axios.put("http://localhost:3001/editarCompra", {
          id: editCompra.id,
          descricao: valor.descricao,
          quantidade: valor.quantidade,
          precoUni: valor.precoUni,
          dataCompra: dataSelecionada.dataCompra,
          fornecedor_id: fornecedorSelecionado.id,
          vacina_id: vacinaSelecionada.id,
        }).then(() => {
          setListaCompra(
            listaCompra.map((value) => {
              return value.id == editCompra.id
                ? {
                    descricao: valor.descricao,
                    quantidade: valor.quantidade,
                    precoUni: valor.precoUni,
                    dataCompra: dataSelecionada.dataCompra,
                    fornecedor_id: fornecedorSelecionado.id,
                    vacina_id: vacinaSelecionada.id,
                  }
                : value;
            })
          );
          Axios.get("http://localhost:3001/getCompra").then((response) => {
            setListaCompra(response.data);
          });
        });
        limpaCampos();
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
      <br />
      <div className="container">
        <h1>Comprar Vacina</h1>
        <div className="row">
          <div className="col-md-3">
            <MsgRequired id={"vacinaID"} texto={"Vacina"} obrigatorio={true} />
            <CaixaSelecao
              id="vacinaID"
              enderecoFonteDados="http://localhost:3001/getVacina"
              campoChave="id"
              campoExibicao="nome"
              funcaoSelecao={setVacinaSelecionada}
            />
          </div>
          <br />
          <div className="col-md-3">
            <MsgRequired
              id={"fornecedorID"}
              texto={"Fornecedor"}
              obrigatorio={true}
            />
            <CaixaSelecao
              id="fornecedorID"
              enderecoFonteDados="http://localhost:3001/getFornecedor"
              campoChave="id"
              campoExibicao="nome"
              funcaoSelecao={setFornecedorSelecionado}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-2">
            <MsgRequired
              id={"quantidadeID"}
              texto={"Quantidade"}
              obrigatorio={true}
            />
            <input
              id="quantidadeID"
              className="form-control"
              defaultValue={editCompra.quantidade}
              type="number"
              name="quantidade"
              placeholder=""
              onChange={mudarValores}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              hidden
              defaultValue={editCompra.id}
              type="text"
              name="id"
            />
            <MsgRequired id={"precoID"} texto={"Preço"} obrigatorio={true} />
            <input
              id="precoID"
              className="form-control"
              defaultValue={editCompra.precoUni}
              type="number"
              name="precoUni"
              placeholder=""
              onChange={mudarValores}
            />
          </div>
          <div className="col-md-2">
            <MsgRequired
              id={"dataCompraID"}
              texto={"Data da Compra"}
              obrigatorio={true}
            />
            <input
              className="form-control"
              type="datetime-local"
              id="dataCompraID"
              defaultValue={editCompra.dataCompra}
              onChange={(e) => {
                getData(e);
              }}
              name="dataCompra"
            ></input>
          </div>
        </div>
        <br />
        <div className="form-group col-md-3">
          <MsgRequired
            id={"descricaoID"}
            texto={"Descrição"}
            obrigatorio={false}
          />
          <input
            id="descricaoID"
            className="form-control"
            defaultValue={editCompra.descricao}
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
        <div className="form-group">
          <button className="btn btn-success" onClick={() => clickButton()}>
            Comprar
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
                <th className="th-vacinaId">Vacina</th>
                <th className="th-fornecedorId">Fornecedor</th>
                <th className="th-dataId">Data Compra</th>
                <th className="th-descricaoId">Descrição</th>
                <th className="th-precoId">Preço Unitário</th>
                <th className="th-quantidadeId">Quantidade</th>
                <th className="th-valorId">Valor Total</th>
                <th className="th-acoesId">Ações</th>
              </tr>
            </thead>

            <tbody>
              {typeof listaCompra != "undefined" &&
                listaCompra.map((item) => {
                  return (
                    <Tabela
                      id={item.id}
                      descricao={item.descricao}
                      precoUni={item.precoUni}
                      dataCompra={item.dataCompra}
                      quantidade={item.quantidade}
                      fornecedor={item.fornecedor_id}
                      vacina={item.vacina_id}
                      nomeFornecedor={item.nomeFornecedor}
                      nomeVacina={item.nomeVacina}
                      pesquisa={pesquisa}
                      setLista={setListaCompra}
                      listaFunc={listaCompra}
                      editFunc={setEditCompra}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div style={{ marginLeft: 1200 }}>
          <ImageWithMessage msg={msgExplicativa} />
        </div>
        <br />
      </div>
    </>
  );
}
