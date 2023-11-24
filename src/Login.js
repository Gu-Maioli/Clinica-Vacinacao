"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "../app/AppLogin.css";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserContext from "../app/context/userContext";
import * as yup from "yup";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teste, setTeste] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [listaFuncionario, setListaFuncionario] = useState();

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      Axios.get(`http://localhost:3001/getLogin/${values.email}`).then(
        (resp) => {
          setTeste(resp.data);
        }
      );
      //setUser(response.data);
      onLogin({ username, password });
    });
  };
  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((resp) => {
      console.log("registro: " + resp);
    });
  };

  const validationLogin = yup.object().shape({
    email: yup.string().email("Email Inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .min(4, "A Senha deve ter 4 caracter")
      .required("Campo Obrigatório"),
  });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Email Inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .min(4, "A Senha deve ter 4 caracter")
      .required("Campo Obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As Senhas devem ser iguais"),
  });

  return (
    <div className="container-login">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          <div className="login-form-group">
            <Field name="password" className="form-field" placeholder="Senha" />
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          <div className="login-form-group">
            <Field
              name="confirmPassword"
              className="form-field"
              placeholder="Confirme sua Senha"
            />
            <ErrorMessage
              component="span"
              name="confirmPassword"
              className="form-error"
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}
