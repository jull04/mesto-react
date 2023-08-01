import React from 'react';
import api from '../utils/api';
import Card from "./Card.jsx";

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteCard}) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserJob] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
      Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserJob(dataUser.about)
        setUserAvatar(dataUser.avatar)
        dataCard.forEach(data => data.myid = dataUser._id)
        setCards(dataCard);
      }) 
      .catch((error => console.error(`Ошибка ${error}`)))
    }, [])

       
  return (
      <main className="content">
      <section className="profile">
        <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img src={userAvatar} className="profile__avatar" alt="аватар"/>
        </button>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
              />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}/>
      </section>
      <section className="cards">
      {cards.map(data => {
            return (
              <Card
                card={data}
                key={data._id}
                onCardClick={onCardClick}
                onDeleteCard = {onDeleteCard}
              />
            )
          })}
      </section>
      </main>
  )
}
  
export default Main