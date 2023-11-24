import Link from "next/link";

function Sidenav(acesso, setCookie) {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Cadastros</div>
            <Link className="nav-link" href="/agendar">
              Agendar Aplicação
            </Link>
            <Link className="nav-link" href="/funcionario">
              Funcionário
            </Link>
            <Link className="nav-link" href="/paciente">
              Paciente
            </Link>
            <Link className="nav-link" href="/vacina">
              Vacina
            </Link>
            <div className="sb-sidenav-menu-heading">Caixa</div>
            <Link className="nav-link" href="/compra">
              Compra
            </Link>
            <Link className="nav-link" href="/venda">
              Venda
            </Link>
            <Link className="nav-link" href="/descarte">
              Descarte
            </Link>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <a className="nav-link" href="index.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt" />
              </div>
              Dashboard
            </a>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Perfil:</div>
          Admin
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              onClick={""}
              type="button"
              class="btn btn-outline-secondary btn-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidenav;
