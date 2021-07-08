export default class Login {
  constructor(element, onLogin) {
    this.element = element;

    const loginInput = element.querySelector('[data-role=login-input]');
    const loginButton = element.querySelector('[data-role=login-button]');
    const loginError = element.querySelector('[data-role=login-error]');

    loginButton.addEventListener('click', signIn);
    loginInput.addEventListener('keydown', (e) => {
      loginError.textContent = '';
      if (e.keyCode === 13) signIn();
    });

    function signIn() {
      const nikname = loginInput.value.trim();
      loginError.textContent = '';

      if (!nikname) {
        loginError.textContent = 'введите никнейм';
      } else {
        loginInput.value = '';
        onLogin(nikname);
      }
    }
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
