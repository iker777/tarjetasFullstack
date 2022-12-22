import React, { useEffect, useRef, useState } from 'react'

export const Card = ({card, deleteCard, editCard}) => {
  
  const [isCardEditing, setisCardEditing] = useState(false)

  const titleInput = useRef(null)
  const messageInput = useRef(null)

  return (
    <article className="card">
      <div className="card__head">
        {isCardEditing ? (
          <input
            className=""
            type="text"
            placeholder={card.title}
            ref={titleInput}
          />
        ) : (
          <h2 className="card__h2 h2">{card.title}</h2>
        )}
      </div>
      <div className="card__body">
        <div className="card__text">
          {isCardEditing ? (
            <input
              className=""
              type="text"
              placeholder={card.message}
              ref={messageInput}
            />
          ) : (
            <p className="card__p">{card.message}</p>
          )}
        </div>
        <div className="card__btns">
          {isCardEditing ? (
            <button
              className="card__btn card__btn--editar"
              onClick={() => {
                editCard(card.id, titleInput.current.value, messageInput.current.value);
                setisCardEditing(false);
              }}
            >
              Actualizar
            </button>
          ) : (
            <div>
              <button
                className="card__btn card__btn--editar"
                onClick={() => setisCardEditing(true)}
              >
                Editar
              </button>
              <button
                className="card__btn card__btn--delete"
                onClick={() => deleteCard(card.id)}
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
