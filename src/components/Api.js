class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  editProfile(formValues) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about
      })
    })
    .then(this._checkResponse)
  }

  addNewCard(formValues) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.place,
        link: formValues.url
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(IdOfCard) {
    return fetch(this._baseUrl + '/cards/' + IdOfCard, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setLike(cardId, method) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: method,
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  addNewAvatar(formValues) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: formValues.url
      })
    })
    .then(this._checkResponse)
  }
}

export { Api }