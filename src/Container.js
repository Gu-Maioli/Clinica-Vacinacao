"use client";
import { CookiesProvider, useCookies } from "react-cookie";
import Sidenav from "./Sidenav";
import Login from "./Login";

function Container({ children }) {
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <CookiesProvider>
      {
        /*cookies.user*/ true ? (
          <div id="layoutSidenav">
            <Sidenav setCookie />
            <div id="layoutSidenav_content">
              <main>{children}</main>
            </div>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )
      }
    </CookiesProvider>
  );
}

export default Container;
