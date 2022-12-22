import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { CardContainer } from '../../Components/CardContainer';
import { FormAddCard } from '../../Components/FormAddCard';
import { saveOnStorage } from '../../helpers/SaveOnStorage';
import profilePhoto from "../../img/userProfile.png"

const Main = () => {
  const navigate = useNavigate();

  const [userMail, setUserMail] = useState(null);
  const [cards, setCards] = useState([])

  const userSessionLink = useRef(null);
  const titleElement = useRef(null);
  const messageElement = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
      return;
    }
  });

  useEffect(() => {
    getCards()
  }, [])

  // De primeras quiero que aparezcan las tarjetas, ¿cómo llamo a la base de datos?
  const getCards = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
      return;
    }
    console.log("ncoerinifer")
    axios.get(`http://localhost:3030/getCards/${user.id}`).then((res) => {
      if(res.data.error){
        alert("Error al hacer la petición");
        return;
      }
      console.log(res.data.data);
      setCards(res.data.data);
    });
  };

  const addCard = () => {
    const title = titleElement.current.value;
    const message = messageElement.current.value;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (!title) {
      alert("Titulo vacío");
      return;
    }
    // Petición POST al backend, en el cual le enviamos un objeto
    // Después, en el .then() se gestiona la respuesta del backend
    axios
      .post("http://localhost:3030/addCard", {
        userId: user.id,
        title,
        message,
      })
      .then((res) => {
        if (res.error) {
          return;
        }
        // Resetear el creador de tarjetas
        titleElement.current.value = "";
        messageElement.current.value = "";

        // Pintar cards desde la base de datos
        getCards();
      });
  };

  // Logout
  const setSesion = () => {
    if (localStorage.user) {
      setUserMail(JSON.parse(localStorage.user).mail);
    }
  };
  useEffect(() => {
    setSesion();
  }, [userMail]);

  // Borrar carta
  const deleteCard = (id) => {
    axios.post(`http://localhost:3030/deleteCard/${id}`).then( (res) => {
      if(res.data.error){
        alert(res.data.text);
        return;
      }
      getCards();
    })
  }

  // Editar carta
  const editCard = (cardId, newTitle, newMessage) => {
    const updatedCard = {cardId, newTitle, newMessage};
    axios.post(`http://localhost:3030/editCard`, updatedCard).then( (res) => {
      if (res.data.error) {
        alert(res.data.text);
        return;
      }
      getCards();
    });
  }

  return (
    <div className="App">
      {userMail ? (
        <div
          className="userSession"
          onMouseEnter={() => userSessionLink.current.classList.add("appear")}
          onMouseLeave={() =>
            userSessionLink.current.classList.remove("appear")
          }
        >
          <img className="userSession__photo" src={profilePhoto} />
          <p className="userSession__userData">Bienvenido {userMail}</p>
          <button
            className="userSession__link"
            ref={userSessionLink}
            onClick={() => {
              localStorage.clear();
              setUserMail(null);
              window.location.href = "/logout";
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
      { cards && cards.length && <CardContainer deleteCard={deleteCard} editCard={editCard} cardList={cards} />}
      <FormAddCard
        addCard={addCard}
        titleElement={titleElement}
        messageElement={messageElement}
      />
    </div>
  );
}

export default Main;