import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { CardContainer } from '../../Components/CardContainer';
import { FormAddCard } from '../../Components/FormAddCard';
import profilePhoto from "../../img/userProfile.png"

const Main = () => {

  const navigate = useNavigate()

  const [userMail, setUserMail] = useState(null)

  const [cardList, setcardList] = useState([])

  const userSessionLink = useRef(null)

  const titleElement = useRef(null)
  const messageElement = useRef(null)

  const addCard = () => {
    const title = titleElement.current.value;
    const message = titleElement.current.value;
    
    setcardList([
      ...cardList,
      {
        title: title,
        message: message,
      },
    ]);

    titleElement.current.value = "";
    messageElement.current.value = "";
  };

  const setSesion = () => {
    if (localStorage.user) {
      setUserMail(JSON.parse(localStorage.user).mail);
    }
  }

  useEffect(() => {
    setSesion()
  }, [userMail])

  return (
    <div className="App">
      {userMail ? (
        <div
          className="userSession"
          onMouseEnter={() => userSessionLink.current.classList.add("appear")}
          onMouseLeave={() => userSessionLink.current.classList.remove("appear")}
        >
          <img className="userSession__photo" src={profilePhoto} />
          <p className="userSession__userData">Bienvenido {userMail}</p>
          <button
            className="userSession__link"
            ref={userSessionLink}
            onClick={() => {
              localStorage.clear();
              setUserMail(null);
              navigate("/logout");
            }}
          >
            Salir de la sesión
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="header">
        <h1 className="header__h1">Juego de tarjetas</h1>
      </div>
      {cardList.length > 0 ? <CardContainer cardList={cardList} /> : ""}
      <FormAddCard 
        addCard={addCard} 
        titleElement={titleElement} 
        messageElement={messageElement}
      />
    </div>
  );
}

export default Main;