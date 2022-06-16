import React from 'react';


function InfoTooltip(props) {
  function handleClose() {
    props.handleCloseInfo();
    props.history.push(`/${props.path}`);
  }

  return (
    <div className={`info ${props.isDone && 'info_opened'}` }>
      <div className="info__container">
        <img className="info__image" src={props.img} />
        <p className="info__text">{props.text}</p>
        <button className="info__close-button" onClick={handleClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;