import React from 'react'

export const FormAddCard = () => {

  
  const addCard = () => {
    const title = document.querySelector(".formAddCard__input--title").value;
    const message = document.querySelector(".formAddCard__input--message").value;
    const cardText = {
      title: title,
      message: message 
    }
  }

  return (
    <section className="formContainer">
      <article className="formAddCard">
        <h2 className="formAddCard__h2 h2">Añadir nueva tarjeta</h2>
        <div className="formAddCard__inputContainer">
          <input
            className="formAddCard__input formAddCard__input--title"
            type="text"
            placeholder="Escribe el título..."
          />
          <input
            className="formAddCard__input formAddCard__input--message"
            type="text"
            placeholder="Escribe el texto..."
          />
        </div>
        <div className="card__btns">
          <button className="card__btn card__btn--add" onClick={addCard}>
            Crear nueva tarjeta
          </button>
        </div>
      </article>
    </section>
  );
}
