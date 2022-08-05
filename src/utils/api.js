class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  setNewCard(newdata) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
        name: newdata.namePlace,
        link: newdata.linkPlace
      })
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }
  
  deleteUserCard(idCard) {
    return fetch(`${this._baseUrl}cards/${idCard}`, {
      method: 'DELETE',
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }

  changeLikeCardStatus(idCard, isLiked) {
    if(isLiked) {
      return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
        method: 'PUT',
        headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
      })
      .then(res => {
       return this._getResponseData(res);
      })
    } else {
      return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
        method: 'DELETE',
        headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
      })
      .then(res => {
       return this._getResponseData(res);
      })
    }
  }


  getUserInfo() {
   return fetch(`${this._baseUrl}users/me`, {
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }
  setNewUserAvatar(newAvatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
        avatar: newAvatarLink})
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }

  setNewUserInfo(newValues) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
        name: newValues.name,
        about: newValues.about
      })
    })
    .then(res => {
     return this._getResponseData(res);
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.thebestfront.nomoredomains.sbs/',
});

export default api;