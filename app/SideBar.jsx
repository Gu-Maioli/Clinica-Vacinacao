import "./style.css";
import { Routes, Route, Link } from "react-router-dom";
import Funcionario from "./funcionario/page.js";
import Paciente from "./cadastro/paciente/page.js";
import Vacina from "./cadastro/vacina/page.js";
import CompraVacina from "./vacina/compra/page.js";
import VendaVacina from "./vacina/venda/page.js";
import DescarteVacina from "./vacina/descarte/page.js";

export default function SideBar() {
  return (
    <>
      <Routes>
        <Route path="/cadastrarFuncionario" element={<Funcionario />} />
        <Route path="/cadastrarPaciente" element={<Paciente />} />
        <Route path="/cadastrarVacina" element={<Vacina />} />
        <Route path="/compraVacina" element={<CompraVacina />} />
        <Route path="/vendaVacina" element={<VendaVacina />} />
        <Route path="/descarteVacina" element={<DescarteVacina />} />
      </Routes>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />

      <aside className="sidebar" style={{ left: "10px" }}>
        <nav>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
              </svg>
              <span>Clínica Dr. Jacaré</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/cadastrarFuncionario">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-people"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </svg>
              <span>Cad.F</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/cadastrarPaciente">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-person-video"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z" />
              </svg>
              <span>Cad.P</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/cadastrarVacina">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M112.182 18.393c-.37-.007-.77 0-1.205.023-3.172.16-8.473 2.174-14.688 7.078-9.654 32.85-35.603 60.926-71.335 72.012-3.3 6.59-4.446 11.897-4.215 15.156.268 3.77 1.223 5.062 3.895 6.502 5.342 2.88 21.9 2.56 44.19-10.31l4.843-2.795 4.752 2.944c35.087 21.744 53.66 39.973 72.885 69.553l23.517-23.518c-31.97-18.754-48.732-38.902-68.935-73.91l-2.696-4.67 2.7-4.673c15.082-26.124 14.602-44.643 11.354-50.133-1.42-2.4-2.482-3.214-5.062-3.26zM275.8 87.45c-28.745 0-52.638 21.59-56.323 49.36l-84.444 84.448c-27.773 3.684-49.36 27.58-49.36 56.322 0 31.276 25.553 56.832 56.83 56.832 30.934 0 56.253-25 56.808-55.805l96.89 96.89 13.214-13.216L185.88 238.747l25.31-25.312 93.576 93.574 13.214-13.215-93.574-93.574 12.614-12.613 123.535 123.536 13.215-13.215-96.842-96.842c30.76-.608 55.703-25.906 55.703-56.803 0-31.276-25.553-56.832-56.83-56.832zm0 18.69c21.176 0 38.143 16.968 38.143 38.143 0 21.176-16.967 38.143-38.144 38.143-21.18 0-38.144-16.967-38.144-38.143 0-21.175 16.965-38.144 38.143-38.144zM142.503 239.437c21.177 0 38.142 16.966 38.142 38.142 0 21.176-16.965 38.145-38.142 38.145-21.178 0-38.145-16.97-38.145-38.145 0-21.176 16.966-38.142 38.144-38.142zm263.168 61.544c-5.287 0-10.573 2.044-14.66 6.13l-29.858 29.86-27.183-27.19-13.214 13.214 27.183 27.19-42.594 42.593h-.002c-8.18 8.186-8.176 21.15 0 29.33 8.172 8.175 21.147 8.175 29.326-.005l85.664-85.668c8.18-8.177 8.18-21.147.002-29.322-4.09-4.09-9.378-6.133-14.664-6.133zm-8.352 84.9L384.105 399.1l97.885 97.884 13.215-13.214-97.885-97.885z"></path>
              </svg>
              <span>Cad.V</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/compraVacina">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M237.66,66.34l-48-48a8,8,0,0,0-11.32,11.32L196.69,48,168,76.69,133.66,42.34a8,8,0,0,0-11.32,11.32L128.69,60l-84,84A15.86,15.86,0,0,0,40,155.31v49.38L18.34,226.34a8,8,0,0,0,11.32,11.32L51.31,216h49.38A15.86,15.86,0,0,0,112,211.31l84-84,6.34,6.35a8,8,0,0,0,11.32-11.32L179.31,88,208,59.31l18.34,18.35a8,8,0,0,0,11.32-11.32ZM100.69,200H56V155.31l18-18,20.34,20.35a8,8,0,0,0,11.32-11.32L85.31,126,98,113.31l20.34,20.35a8,8,0,0,0,11.32-11.32L109.31,102,140,71.31,184.69,116Z"></path>
              </svg>
              <span>Com.V</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/vendaVacina">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M21.41 11.41l-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83zM12.83 20L4 11.17V4h7.17L20 12.83 12.83 20z"></path>
                <circle cx="6.5" cy="6.5" r="1.5"></circle>
              </svg>
              <span>Venda</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
                <path d="M3 10h5"></path>
                <path d="M17.5 17.5 16 16.25V14"></path>
                <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
              </svg>
              <span>Agen.</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/descarteVacina">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g></g>
                <path d="M10.935 2.016c-0.218-0.869-0.999-1.516-1.935-1.516-0.932 0-1.71 0.643-1.931 1.516h-3.569v1h11v-1h-3.565zM9 1.5c0.382 0 0.705 0.221 0.875 0.516h-1.733c0.172-0.303 0.485-0.516 0.858-0.516zM13 4h1v10.516c0 0.827-0.673 1.5-1.5 1.5h-7c-0.827 0-1.5-0.673-1.5-1.5v-10.516h1v10.516c0 0.275 0.224 0.5 0.5 0.5h7c0.276 0 0.5-0.225 0.5-0.5v-10.516zM8 5v8h-1v-8h1zM11 5v8h-1v-8h1z"></path>
              </svg>
              <span>Excluir</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Rel.1</span>
            </Link>
          </button>
          <button type="button" style={{ width: "80px" }}>
            <Link to="/">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="35"
                width="35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 17v-5"></path>
                <path d="M12 17v-1"></path>
                <path d="M15 17v-3"></path>
              </svg>
              <span>Rel.2</span>
            </Link>
          </button>
        </nav>
      </aside>
    </>
  );
}
