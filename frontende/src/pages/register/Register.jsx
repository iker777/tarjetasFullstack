import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
      return;
    }
  });

  const [data, setData] = useState({
    mail: null,
    paswd: null
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const registerNewUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/register", data)
      .then((res) => {
        console.log(res.data.newUserRegisted)
        if (res.data.newUserRegisted) {
          localStorage.setItem("user", JSON.stringify(res.data.user))
          alert(`${res.data.user.mail} has sido registrado con éxito, estás dentro de la aplicación`)
          navigate("/");
        }
      });
  }

  return (
    <>
      <h1 className="form__h1">Registro</h1>
      <div className="formContainer">
        <form className="form">
          <input
            name="mail"
            type="text"
            placeholder="Email"
            onChange={handleOnChange}
            className="form__textInput"
          />
          <input
            name="paswd"
            type="password"
            placeholder="password"
            onChange={handleOnChange}
            className="form__textInput"
          />
          <input
            type="submit"
            value="Enviar"
            onClick={(e) => registerNewUser(e)}
            className="form__submit"
          />
          <Link className="form__link" to="/login">
            ¿Ya tienes cuenta?
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register