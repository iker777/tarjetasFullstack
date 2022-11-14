import React from 'react'

export const Card = () => {
  return (
      <article className="card">
        <div className="card__head">
          <h2 className="card__h2 h2">Título tarjeta</h2>
        </div>
        <div className="card__body">
          <div className="card__text">
            <p className="card__p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              consectetur eveniet sequi quasi excepturi
            </p>
          </div>
          <div className="card__btns">
            <button className="card__btn card__btn--editar">Editar</button>
            <button className="card__btn card__btn--delete">Borrar</button>
          </div>
        </div>
      </article>
  );
}
