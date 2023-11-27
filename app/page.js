"use client";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import pacientesPDF from "./reports/pacientes/pacientes";
import fornecedorPDF from "./reports/fornecedor/fornecedor";

export default function Home() {
  const [pacientes, setPacientes] = useState();
  const [fornecedor, setFornecedor] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/getVendasPaciente").then((response) => {
      setPacientes(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getComprasFornecedor").then((response) => {
      setFornecedor(response.data);
    });
  }, []);

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Clínica Dr. Jacaré</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active"></li>
      </ol>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body" style={{ textAlign: "center" }}>
              Relatório <br /> Vendas por Pacientes
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a
                onClick={(e) => pacientesPDF(pacientes)}
                className="small text-white stretched-link"
                href="#"
              >
                Gerar
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body" style={{ textAlign: "center" }}>
              Relatório <br /> Compras por Fornecedores
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a
                onClick={(e) => fornecedorPDF(fornecedor)}
                className="small text-white stretched-link"
                href="#"
              >
                Gerar
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row"></div>
      <div className="card mb-4"></div>
    </div>
  );
}
