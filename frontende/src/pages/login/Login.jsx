import React, { useState } from 'react'
import axios from "axios";

const Login = () => {

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

    const onClick = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3030/login", data)
        .then((res) => {

          if(!res || !res.data){
            alert("Error general");
            return;
          }
          if(res.data.error){
            alert(res.data.text);
            return;
          }
          alert(`Hola ${res.data.mail}`);
          localStorage.setItem("user", JSON.stringify(res.data))
        });
      console.log(data);
    };

  return (
    <div>
      <form>
        <input
          name="mail"
          type="text"
          placeholder="Email"
          onChange={handleOnChange}
        />
        <br />
        <input
          name="paswd"
          type="password"
          placeholder="password"
          onChange={handleOnChange}
        />
        <br />
        <input type="submit" value="Enviar" onClick={onClick}/>
      </form>
    </div>
  );
}

export default Login