import React, { useRef, useState } from 'react'

export const Card = ({title, message, cardList, setCardList, myKey}) => {
  
  const [editingCard, setEditingCard] = useState(false)

  const titleInput = useRef(null)
  const messageInput = useRef(null)

  const updateCard = () => {
    let items = cardList;
    items[myKey].title = titleInput.current.value;
    items[myKey].message = messageInput.current.value;
    setCardList([...items])
    localStorage.removeItem("cards")
    localStorage.setItem("cards", JSON.stringify(cardList));
    setEditingCard(false);
  }

  // El primer click no lo borra...
  const deleteCard = () => {
    let items = cardList;
    items = items.filter((card, index) => index != myKey);
    setCardList([...items])
    localStorage.removeItem("cards");
    localStorage.setItem("cards", JSON.stringify(cardList));
  };

  return (
    <article className="card">
      <div className="card__head">
        {editingCard ? (
          <input className="" type="text" placeholder={title} ref={titleInput}/>
        ) : (
          <h2 className="card__h2 h2">{title}</h2>
        )}
      </div>
      <div className="card__body">
        <div className="card__text">
          {editingCard ? (
            <input className="" type="text" placeholder={message} ref={messageInput}/>
          ) : (
            <p className="card__p">{message}</p>
          )}
        </div>
        <div className="card__btns">
          {editingCard ? (
            <button
              className="card__btn card__btn--editar"
              onClick={updateCard}
            >
              Actualizar
            </button>
          ) : (
            <div>
              <button
                className="card__btn card__btn--editar"
                onClick={() => setEditingCard(true)}
              >
                Editar
              </button>
              <button
                className="card__btn card__btn--delete"
                onClick={deleteCard}
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
