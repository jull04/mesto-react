import React from 'react';

function Card ({card, onCardClick, onDeleteCard}) {
  return (
    <div className="cards__item">
      <img src={card.link} className="cards__image" alt={card.name} onClick={() => onCardClick({link: card.link, name: card.name})}/>
      <button type="button" className="cards__trash" aria-label="Удалить" onClick={onDeleteCard}/> 
      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
        <button type="button" className="cards__like" aria-label="Лайк"/>
        <span className="cards__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>

  )
}

export default Card