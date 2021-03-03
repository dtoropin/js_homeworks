export default class Messages {
  constructor(element) {
    this.element = element;
    this.userName = '';
    this.currentName = '';
    this.total = 0;
  }

  setMainName(name) {
    this.userName = name;
    this.currentName = name;
  }

  systemMessage(message) {
    const item = document.createElement('div');
    item.classList.add('messages');
    item.innerHTML = `
      <div class="messages__info">${message}</div>
    `;

    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
  }

  addMessage(name, message) {
    if (name !== this.currentName) {
      this.total = 0;
      this.currentName = name;
    }

    if (this.total === 0) {
      const item = document.createElement('div');
      item.classList.add('messages');

      if (name === this.userName) item.classList.add('opposite');

      const block = document.createElement('div');
      block.classList.add('messages__send');
      block.innerHTML = `
        <span class="messages__nick">${name}</span>
      `;

      this.ul = document.createElement('ul');
      this.ul.classList.add('messages__list');

      block.append(this.ul);
      item.append(this.messageUser());
      item.append(block);
      this.element.append(item);
    }

    this.ul.append(this.messageText(message));
    this.element.scrollTop = this.element.scrollHeight;
    this.total++;
  }

  messageUser() {
    const div = document.createElement('div');
    div.classList.add('messages__user');
    div.innerHTML = `
      <span class="messages__img"></span>
    `;

    return div;
  }

  messageText(message) {
    const li = document.createElement('li');
    li.classList.add('messages__item');
    li.innerHTML = `
      <span class="messages__text">${message}</span>
      <sub class="messages__time">${this.getTime()}</sub>
    `;

    return li;
  }

  getTime() {
    const time = new Date();
    const Hour = ('0' + time.getHours()).slice(-2);
    const Minutes = ('0' + time.getMinutes()).slice(-2);

    return `${Hour}:${Minutes}`;
  }
}
