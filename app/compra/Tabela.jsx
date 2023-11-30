import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Tabela(props) {
  const arrumaData = (dataCompra) => {
    const horas =
      dataCompra.split("T")[1].split(":")[0] +
      ":" +
      dataCompra.split("T")[1].split(":")[1];
    const hora = horas.split(":")[0] - 3;
    const segundos = horas.split(":")[1];
    const newHora = hora + ":" + segundos;
    const data =
      dataCompra.split("T")[0].split("-")[2] +
      "/" +
      dataCompra.split("T")[0].split("-")[1] +
      "/" +
      dataCompra.split("T")[0].split("-")[0];

    return data + " " + newHora;
  };

  const arrumaDataToSave = (data) => {
    const horas =
      data.split("T")[1].split(":")[0] -
      3 +
      ":" +
      data.split("T")[1].split(":")[1] +
      ":" +
      data.split("T")[1].split(":")[2];
    const dataCompleta = data.split("T")[0] + "T" + horas;
    //data: 2023-11-30T15:33:00
    return dataCompleta;
  };

  const editCompra = (
    id,
    descricao,
    quantidade,
    precoUni,
    fornecedor_id,
    vacina_id,
    dataCompra
  ) => {
    console.log("data: " + dataCompra);
    props.editFunc({
      id: id,
      descricao: descricao,
      quantidade: quantidade,
      precoUni: precoUni,
      fornecedor_id: fornecedor_id,
      vacina_id: vacina_id,
      dataCompra: arrumaDataToSave(dataCompra.split(".")[0]),
    });
  };

  const deleteCompra = (id) => {
    Axios.delete(`http://localhost:3001/deleteCompra/${id}`).then(() => {
      props.setLista(
        props.listaFunc.filter((value) => {
          return value.id != id;
        })
      );
    });
  };

  const somaTotal = (qtde, preco) => {
    return qtde * preco;
  };

  return (
    <>
      <tr key={props.id}>
        <td className="">{props.nomeVacina}</td>
        <td className="">{props.nomeFornecedor}</td>
        <td className="">{arrumaData(props.dataCompra)}</td>
        <td className="">{props.descricao}</td>
        <td className="">R$: {props.precoUni},00</td>
        <td className="">{props.quantidade}</td>
        <td className="">
          R$: {somaTotal(props.quantidade, props.precoUni)},00
        </td>
        <td className="col-md-2">
          <button
            className="btn btn-info"
            onClick={() =>
              editCompra(
                props.id,
                props.descricao,
                props.quantidade,
                props.precoUni,
                props.fornecedor_id,
                props.vacina_id,
                props.dataCompra
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteCompra(props.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
}
