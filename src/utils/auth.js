class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email })
      })
    .then(res => {
      return this._checkResponse(res);
    })};

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })}; 
  
  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })};
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});

export default auth;
