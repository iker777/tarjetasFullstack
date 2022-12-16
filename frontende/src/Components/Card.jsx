import React from 'react'

export const Card = ({title, message, setCardList, myKey}) => {
  console.log(myKey)
  return (
      <article className="card">
        <div className="card__head">
          <h2 className="card__h2 h2">{title}</h2>
        </div>
        <div className="card__body">
          <div className="card__text">
            <p className="card__p">
              {message}
            </p>
          </div>
          <div className="card__btns">
            <button className="card__btn card__btn--editar">Editar</button>
            <button 
              className="card__btn card__btn--delete"
              onClick={() => {
                setCardList(current => current.filter((card, index) => index != myKey))
              }}
            >
              Borrar
            </button>
          </div>
        </div>
      </article>
  );
}
