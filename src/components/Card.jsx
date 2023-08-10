import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Like from './Like';

function Card ({card, onCardClick, onDeleteCard}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="cards__item">
      <img src={card.link} className="cards__image" alt={card.name} onClick={() => onCardClick({link: card.link, name: card.name})}/>
      {currentUser._id===card.owner._id  && <button type="button" className="cards__trash" aria-label="Удалить" onClick={() => onDeleteCard(card._id)}/>}
      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
        <Like likes={card.likes} myid={currentUser._id} cardid={card._id}/>
        </div>
      </div>
    </div>
  )
}

export default Card