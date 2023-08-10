import React from "react";
import Header from "./Header.jsx";
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDeletePopup, setDeleteCardPopup] = React.useState(false);
  const [isImagePopup, setImagePopup] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCardId, setDeleteCardId] = React.useState("");

  React.useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {
      setCurrentUser(dataUser);
      setCards(dataCard);
    }) 
    .catch((error => console.error(`Ошибка ${error}`)))
  }, [])

  function handleEditProfileClick() {
    setEditPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPopupOpen(true)
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true)
  }
 
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function handleDeleteCard(cardId) {
    setDeleteCardPopup(true);  
    setDeleteCardId(cardId) 
  }

  function closeAllPopups() { 
    setEditPopupOpen(false)
    setAvatarPopupOpen(false)
    setAddPopupOpen(false)
    setDeleteCardPopup(false)
    setImagePopup(false)
  }

  // function ClosePopupByOverlay (evt) {
  //   if(evt.target === evt.currentTarget) {
  //     closeAllPopups()
  //   }
  // }
 
  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        } ))
        closeAllPopups()
      })
    .catch((error => console.error(`Ошибка удаления карточки ${error}`)))
  }

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
        reset()
      })
    .catch((err) => console.log(`Ошибка редактирования профиля ${err}`));
  }

  function handleUpdateAvatar(dataUser, reset){
    api.setAvatar(dataUser)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
      reset()
    })
    .catch((err) => console.log(`Ошибка обновления аватара ${err}`));
  }

  function handleAddPlace(cardInfo, reset){
    api.addCard(cardInfo)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
      reset()
    })
    .catch((err) => console.log(`Ошибка добавления карточки ${err}`));
  }
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
  <div className="page__content">
  <Header/>
  <Main
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
    onDeleteCard={handleDeleteCard}
    cards={cards}
  />
  
  <Footer/>

  <ImagePopup
    card={selectedCard}
    isOpen={isImagePopup}
    onClose={closeAllPopups}
  /> 

  <EditProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}  
    onUpdateUser={handleUpdateUser} 
  />

  <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    onAddPlace={handleAddPlace}
  />
  
  <EditAvatarPopup
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    onUpdateAvatar={handleUpdateAvatar}
  />

  <PopupWithForm
    name="delete"
    title="Вы уверены?"
    btnText="Да"
    isOpen={isDeletePopup}
    onClose={closeAllPopups}
    onSubmit={handleDeleteSubmit}
  />
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
