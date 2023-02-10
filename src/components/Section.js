class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector); // container - это найденный по селектору 
    // контейнер, в который будут добавляться (вставляться) отрендеренные карточки
  }

  renderItems(data) {
    data.reverse().forEach(item => {
      this._renderer(item); // вызываем renderer, передав item. Метод reverse() здесь применён для того, чтобы
      // при переборе массива мкарточек методом forEach развернуть массив в обратном порядке, благодаря чему
      // созданная пользователем карточка будет в начале массива как в момент создания карточки, так и после 
      // перезагрузки (рефреша) страницы, то есть она при каждом создании карточки другим пользотвателем будет 
      // продвигаться по порядку сверху вниз, а не снизу вверх, как это было без применения этого метода.
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section }