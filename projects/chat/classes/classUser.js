export default class User {
  constructor(element, changePhoto) {
    this.userName = element.querySelector('.userList__info');
    this.userPhoto = element.querySelector('.userList__img');
    this.userPhoto.addEventListener('click', changePhoto);
  }

  set(name) {
    this.name = name;
    this.userName.textContent = name;
  }

  change(photo) {
    this.userPhoto.style.backgroundImage = `url(${photo})`;
  }

  get() {
    return this.name;
  }
}
