import React from "react";
import Login from "../login/Login";

const Logout = () => {
  return(
    <>
      <p className="logoutText">¡has salido de la sesión con éxito!</p>
      <p className="logoutText">¿Quieres volver a entrar?</p>
      <Login/>
    </>
  )
}

export default Logout;