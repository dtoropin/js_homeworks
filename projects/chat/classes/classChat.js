export default class Chat {
  constructor(element, messSend) {
    this.element = element;
    this.userCount = element.querySelector('[data-role="user-count"]');

    const messageInput = document.querySelector('[data-role="message-input"]');
    const messageSend = document.querySelector('[data-role="message-send"]');

    messageSend.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) sendMessage();
    });

    function sendMessage() {
      const message = messageInput.value
        .trim()
        .replace(/[^a-zA-Z0-9а-яА-Я:;.,?() ]/g, '');
      messageInput.value = '';

      if (message !== '') messSend(message);
    }
  }

  member(number) {
    const words = ['участник', 'участника', 'участников'];
    const cases = [2, 0, 1, 1, 1, 2];
    const word =
      words[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];

    this.userCount.textContent = `${number} ${word}`;
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  blur() {
    this.element.classList.add('blur');
  }

  sharpness() {
    this.element.classList.remove('blur');
  }
}
