import Login from './classLogin';
import Chat from './classChat';
import User from './classUser';
import UserList from './classUserList';
import Socket from './classSocket';
import Messages from './classMessages';
import Photo from './classPhoto';

export default class Main {
  constructor() {
    this.socket = new Socket(`ws://localhost:5501`, this.onMessage.bind(this));
    this.login = new Login(document.querySelector('#login'), this.onLogin.bind(this));
    this.chat = new Chat(document.querySelector('#chat'), this.messSend.bind(this));
    this.user = new User(
      document.querySelector('[data-role="user-info"]'),
      this.changePhoto.bind(this)
    );
    this.userList = new UserList(document.querySelector('[data-role="user-list"]'));
    this.messages = new Messages(document.querySelector('[data-role="messages-list"]'));
    this.photo = new Photo(
      document.querySelector('#photo'),
      this.onCancel.bind(this),
      this.savePhoto.bind(this)
    );
  }

  async onLogin(name) {
    await this.socket.connect();
    this.socket.signIn(name);
    this.login.hide();
    this.chat.show();
    this.user.set(name);
    this.userList.setMainName(name);
    this.messages.setMainName(name);
  }

  changePhoto() {
    this.chat.blur();
    this.photo.show();
  }

  onCancel() {
    this.photo.hide();
    this.chat.sharpness();
  }

  savePhoto(tmpPhoto) {
    this.photo.hide();
    this.chat.sharpness();
    this.user.change(tmpPhoto);
    // console.log('saving photo', tmpPhoto);
  }

  onMessage({ type, data }) {
    if (type === 'signin') {
      this.messages.systemMessage(`в чат пришел ${data.name}`);
    } else if (type === 'signup') {
      this.userList.remove(data.name);
      this.messages.systemMessage(`${data.name} вышел из чата`);
    } else if (type === 'list') {
      this.userList.add(data);
      this.chat.member(this.userList.getCount());
    } else {
      this.messages.addMessage(data.name, data.message);
    }
  }

  messSend(message) {
    const type = 'text';
    const data = {};
    data.name = this.user.get();
    data.message = message;

    this.socket.sendMessage(type, data);
  }
}
