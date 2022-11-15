import React from 'react';
import { Card } from './Card';

export const CardContainer = ({ cardList }) => {
  return (
    <section className="card__container">
      {
        cardList.map((cardText, index) => { 
          return (
            <Card 
              title={cardText.title} 
              message={cardText.message} 
              key={index}
            />
          )
        })
      }
    </section>
  )
}
