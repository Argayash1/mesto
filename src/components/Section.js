class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector); // container - это найденный по селектору 
    // контейнер, в который будут добавляться (вставляться) отрендеренные карточки
  }

  renderItems(data) {
    this._renderedItems = data; // data — это массив с объектами карточек, в каждом объекте 2 поля - name и link;
    this._renderedItems.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section }