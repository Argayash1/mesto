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

  // Огромное Вам спасибо за этот метод, с большим интересом разобрался и использовал его!
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserInfo() {
    return this._request(this._baseUrl + '/users/me', {
      headers: this._headers
    })
  }

  getInitialCards() {
    return this._request(this._baseUrl + '/cards', {
      headers: this._headers
    })
  }

  editProfile(formValues) {
    return this._request(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about
      })
    })
  }

  addNewCard(formValues) {
    return this._request(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: formValues.place,
        link: formValues.url
      })
    })
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  setLike(cardId, method) {
    return this._request(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: method,
      headers: this._headers
    })
  }

  addNewAvatar(formValues) {
    return this._request(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: formValues.url
      })
    })
  }
}

export { Api }