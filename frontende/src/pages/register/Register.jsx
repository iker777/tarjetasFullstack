import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Register = () => {

  const [data, setData] = useState({
    mail: null,
    paswd: null
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data);
  }

  const onClick = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3030/register", data).then((res) => console.log(res));
    console.log(data);
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
            onClick={onClick}
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