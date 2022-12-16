import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { CardContainer } from '../../Components/CardContainer';
import { FormAddCard } from '../../Components/FormAddCard';
import { saveOnStorage } from '../../helpers/SaveOnStorage';
import profilePhoto from "../../img/userProfile.png"

const Main = () => {

  const navigate = useNavigate()

  const [userMail, setUserMail] = useState(null)

  const [cardList, setCardList] = useState([])

  const userSessionLink = useRef(null)

  const titleElement = useRef(null)
  const messageElement = useRef(null)

  const addCard = () => {
    const title = titleElement.current.value;
    const message = messageElement.current.value;
    
    setCardList([
      ...cardList,
      {
        title: title,
        message: message,
      },
    ]);

    saveOnStorage("cards", {
      title: title,
      message: message
    })

    
    titleElement.current.value = "";
    messageElement.current.value = "";
  };

  const storagedCardList = JSON.parse(localStorage.getItem("cards")) || [];

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
      {
        storagedCardList.length > 0 ? 
          (
            <CardContainer cardList={cardList} setCardList={setCardList} storagedCardList={storagedCardList}/>
          ) 
        : 
          (
            ""
          )
      }
      <FormAddCard
        addCard={addCard}
        titleElement={titleElement}
        messageElement={messageElement}
      />
    </div>
  );
}

export default Main;