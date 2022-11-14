import React from 'react'
import { CardContainer } from '../../Components/CardContainer';
import { FormAddCard } from '../../Components/FormAddCard';

const Main = () => {
  return (
    <div className="App">
      <div className="header">
        <h1 className="header__h1">Juego de tarjetas</h1>
      </div>
      <CardContainer />
      <FormAddCard />
    </div>
  )
}

export default Main
