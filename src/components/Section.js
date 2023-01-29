class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector); // container - это найденный по селектору 
    // контейнер, в который будут добавляться (вставляться) отрендеренные карточки
  }

  renderItems(data) {
    data.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section }