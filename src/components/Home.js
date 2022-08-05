import React from 'react';
import api from '../utils/api';
import Main from './Main';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardConfirmPopup from './DeleteCardConfirmPopup';


function Home(props) {
  //Необходимые для работы приложения стейты
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]  = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]  = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]  = React.useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen]  = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState({});
  const currentUser = props.currentUser;
  const setCurrentUser = props.setCurrentUser;

  //Эффект создания списка карточек через API
  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data.data.map((item) => (item)));
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  //Эффект получения инфо о пользователе
  React.useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setCurrentUser(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function signOut(){
    localStorage.removeItem('jwt');
    props.history.push('/sign-in');
  }

  //Функция добавления карточки
  function handleAddPlaceSubmit(addPlaceValues) {
    api.setNewCard(addPlaceValues)
    .then(data => {
      setCards([data.data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  //Функция лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((likedCard) => likedCard._id === card._id ? newCard : likedCard));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция удаления карточки
  function handleCardDelete() {
    api.deleteUserCard(deleteCard._id)
    .then((
      setCards((cards) => {
        return cards.filter(item => {return item._id !== deleteCard._id})
      })
    ))
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция обновления данных о пользователе
  function handleUpdateUser(values) {
    api.setNewUserInfo(values)
    .then(data => {
      setCurrentUser(data.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Функция обновление аватара пользователя
  function handleUpdateAvatar(value) {
    api.setNewUserAvatar(value)
    .then(data => {
      setCurrentUser(data.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Обработчики попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardOpen(!isDeleteCardOpen);
    setDeleteCard(card);
  }

  //Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardOpen(false);
    setSelectedCard({});
  }

  //Передаем выбранную карточку в попап с картинкой
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  return (
    <div className="home">
      {<Header>
        <div className="header__nav">
          <p className="header__user-email">{props.userEmail}</p>
          <a onClick={signOut} className="header__signout-button">Выйти</a>
        </div>
      </Header>}

      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onDeleteCard={handleDeleteCardClick}
        handleCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
      />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <DeleteCardConfirmPopup isOpen={isDeleteCardOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete}/>

      
      

      {<ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />}
    </div>
  );
}

export default Home;