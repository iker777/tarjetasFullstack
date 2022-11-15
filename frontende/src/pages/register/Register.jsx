import React, { useState } from 'react';
import axios from 'axios';

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

export default Register