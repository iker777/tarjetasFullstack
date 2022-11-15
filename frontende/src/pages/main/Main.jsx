import React, { useState } from 'react'
import { CardContainer } from '../../Components/CardContainer';
import { FormAddCard } from '../../Components/FormAddCard';

const Main = () => {

  const [cardText, setcardText] = useState({});
  
  const [cardList, setcardList] = useState([])

  const addCard = () => {
    const title = document.querySelector(".formAddCard__input--title").value;
    const message = document.querySelector(".formAddCard__input--message").value;
    
    setcardList([
      ...cardList,
      {
        title: title,
        message: message,
      },
    ]);

    document.querySelector(".formAddCard__input--title").value = "";
    document.querySelector(".formAddCard__input--message").value = "";
  };


  return (
    <div className="App">
      <div className="header">
        <h1 className="header__h1">Juego de tarjetas</h1>
      </div>
      <CardContainer cardList={cardList}/>
      <FormAddCard addCard={addCard}/>
    </div>
  )
}

export default Main
