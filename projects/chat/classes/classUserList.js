export default class UserList {
  constructor(element) {
    this.element = element;
    this.items = new Set();
    this.userName = '';
  }

  setMainName(name) {
    this.userName = name;
  }

  add(data) {
    for (const user of data) {
      this.items.add(user);
    }

    this.addHTML();
  }

  remove(name) {
    this.items.delete(name);
    this.addHTML();
  }

  getCount() {
    return this.items.size;
  }

  addHTML() {
    const fragment = document.createDocumentFragment();
    this.element.innerHTML = '';

    for (const name of this.items) {
      if (name === this.userName) continue;
      const element = document.createElement('li');
      element.classList.add('userList__item');

      const elImg = document.createElement('span');
      elImg.classList.add('userList__img');

      const elName = document.createElement('span');
      elName.classList.add('userList__info');
      elName.textContent = name;

      element.append(elImg, elName);
      fragment.append(element);
    }

    this.element.append(fragment);
  }
}
