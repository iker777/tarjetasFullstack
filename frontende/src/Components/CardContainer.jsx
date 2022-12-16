import React from 'react';
import { Card } from './Card';

export const CardContainer = ({ cardList, setCardList, storagedCardList }) => {

  return (
    <section className="card__container">
      {
        storagedCardList.map((cardText, index) => { 
          return (
            <Card 
              title={cardText.title} 
              message={cardText.message} 
              // If I don't use key={index} there is an error. However, I can't use it as prop, so I needed to create myKey to use it inside Card. Why?
              key={index}
              myKey={index}
              cardList={cardList}
              setCardList={setCardList}
            />
          )
        })
      }
    </section>
  )
}
