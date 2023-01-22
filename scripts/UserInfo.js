class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        // создаём пустой объект
        this._userInfo = {};

        // Присваиваем полю name объекта userInfo значение элемента имени пользователя из блока профиля
        this._userInfo.name = this._nameElement.textContent

        // Присваиваем полю info объекта userInfo значение элемента информации о себе из блока профиля
        this._userInfo.info = this._infoElement.textContent

        // Возвращаем объект userInfo с полями name и info, которым присвоены значения элементов имени пользователя
        // и информации о себе из блока профиля 
        return this._userInfo;
    }

    setUserInfo({ name, job }) {
        // Присваиваем элементу имени пользователя из блока профиля значение name, которое передаётся а качестве
        // аргумента при вызове метода setUserInfo
        this._nameElement.textContent = name;

        // Присваиваем элементу информации о себе из блока профиля значение info, которое передаётся в качестве 
        // аргумента при вызове метода setUserInfo
        this._infoElement.textContent = job;
    }

}

export {UserInfo}
