import React from "react";
//import logo from "../public/assets/img/—Pngtree—beer glass_5379343.png";
import Image from "next/image";

function Header() {
  return (
    <aside>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand*/}
        <a className="navbar-brand ps-3" href="/">
          <Image
            src="/assets/img/jacare001.png"
            width={50}
            height={50}
            alt="Logo"
          />
          Clí. Dr. Jacaré
        </a>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Navbar Search* 
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Procurar..."
              aria-label="Procurar..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search" />
            </button>
          </div>
        </form>
        {/* Navbar*/}
      </nav>
    </aside>
  );
}
export default Header;
