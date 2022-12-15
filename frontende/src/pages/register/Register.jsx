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
      <form className='registerForm'>
        <input
          name="mail"
          className='registerForm__input'
          type="text"
          placeholder="Email"
          onChange={handleOnChange}
        />
        <input
          name="paswd"
          className='registerForm__input'
          type="password"
          placeholder="password"
          onChange={handleOnChange}
        />
        <br />
        <input
          className='registerForm__submit'
          type="submit" 
          value="Enviar" 
          onClick={onClick}
        />
      </form>
    </div>
  );
}

export default Register