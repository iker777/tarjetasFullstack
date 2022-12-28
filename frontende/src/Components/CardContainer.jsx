import React from 'react';
import { Card } from './Card';

export const CardContainer = ({ cardList, deleteCard, editCard }) => {
  return (
    <section className="card__container">
      {
        cardList.map((card, index) => { 
          return (
            <Card 
              card={card}
              deleteCard={deleteCard}
              key={index}
              editCard={editCard}
            />
          )
        })
      }
    </section>
  )
}
