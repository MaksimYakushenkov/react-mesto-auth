import React from 'react';

function DeleteCardConfirmPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard();
    props.onClose();
  }

  return (
    <div className={`popup ${props.popupName} ${props.isOpen && 'popup_opened'}` }>
    <div className="popup__container popup__container_handle-form">
      <p className="popup__title">Вы уверены?</p>
      <form name={props.popupName} className="popup__form" onSubmit={handleSubmit} noValidate>
        {props.children}
        <button type="submit" className="popup__button popup__button_confirm">Да</button>
      </form>
      <button className="popup__close-button" onClick={props.onClose}></button>
    </div>
  </div>
  );
}

export default DeleteCardConfirmPopup;