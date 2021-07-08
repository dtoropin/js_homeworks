export default class Socket {
  constructor(url, onMessage) {
    this.url = url;
    this.onMessage = onMessage;
  }

  connect() {
    return new Promise((resolve) => {
      this.socket = new WebSocket(this.url);
      this.socket.addEventListener('open', resolve);
      this.socket.addEventListener('message', (e) => {
        this.onMessage(JSON.parse(e.data));
      });
    });
  }

  signIn(name) {
    this.sendMessage('signin', { name });
  }

  signUp(name) {
    this.sendMessage('signup', { name });
  }

  sendMessage(type, data) {
    this.socket.send(
      JSON.stringify({
        type,
        data,
      })
    );
  }
}
