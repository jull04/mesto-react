import React from "react";
import Header from "./Header.jsx";
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDeletePopup, setDeleteCardPopup] = React.useState(false);
  const [isImagePopup, setImagePopup] = React.useState(false);

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

  function handleDeleteCard() {
    setDeleteCardPopup(true);
  }

  function closeAllPopups() { 
    setEditPopupOpen(false)
    setAvatarPopupOpen(false)
    setAddPopupOpen(false)
    setDeleteCardPopup(false)
    setImagePopup(false)
  }

  return (
  <div className="page__content">
  <Header/>
  <Main
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
    onDeleteCard={handleDeleteCard}
  />
  <Footer/>

  <ImagePopup
    card={selectedCard}
    isOpen={isImagePopup}
    onClose={closeAllPopups}
  /> 

  <PopupWithForm
    name="edit"
    title="Редактировать профиль"
    btnText="Сохранить"
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    >
    <input
      id="name"
      className="popup__input popup__input_type_name"
      type="text"
      name="firstname"
      placeholder="Имя"
      defaultValue="Юля Хабибова"
      minLength={2}
      maxLength={40}
      required=""
    />
    <span className="name-error popup__error popup__error_visible"/>
    <input
      id="job"
      className="popup__input popup__input_type_job"
      type="text"
      name="job"
      placeholder="О себе"
      defaultValue="Природа и коты"
      minLength={2}
      maxLength={200}
      required=""
    />
    <span className="job-error popup__error popup__error_visible"/>
  </PopupWithForm>

  <PopupWithForm
    name="add"
    title="Новое место"
    btnText="Создать"
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    >
    <input
      id="add"
      className="popup__input popup__input_title"
      type="text"
      name="title"
      placeholder="Название"
      required=""
    />
    <span className="add-error popup__error popup__error_visible"/>
    <input
      id="url"
      className="popup__input popup__input_link"
      type="url"
      name="link"
      placeholder="Ссылка на картинку"
      required=""
    />
    <span className="url-error popup__error popup__error_visible"/>
  </PopupWithForm>

  <PopupWithForm
    name="edit-avatar"
    title="Обновить аватар"
    btnText="Сохранить"
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    >
    <input
    id="avatar"
    className="popup__input popup__input_title"
    type="url"
    name="avatar"
    placeholder="Ссылка на картинку"
    required=""
    />
    <span className="avatar-error popup__error popup__error_visible"/>
  </PopupWithForm>

  <PopupWithForm
    name="delete"
    title="Вы уверены?"
    btnText="Да"
    isOpen={isDeletePopup}
    onClose={closeAllPopups}
    >
  </PopupWithForm>

  </div>
  );
}

export default App;
