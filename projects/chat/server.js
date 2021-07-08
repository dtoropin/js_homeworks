// start server:> node ./projects/chat/server.js

const WebSocketServer = new require('ws');

const clients = {};
const user = {};
let currentId = 1;

const webSocketServer = new WebSocketServer.Server({ port: 5501 });

webSocketServer.on('connection', function (ws) {
  const id = currentId++;
  clients[id] = ws;
  console.log('новое соединение ' + id);

  ws.on('message', function (message) {
    console.log('получено сообщение ' + message);
    const data = JSON.parse(message);

    if (data.type === 'signin') {
      user[id] = data.data.name;
      userList();
    }

    for (const key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function () {
    console.log('соединение закрыто ' + id);
    delete clients[id];
    userExit(user[id]);
    delete user[id];
    userList();
  });
});
console.log('Сервер запущен на порту 5501');

function userList() {
  let message = {};
  message.type = 'list';
  message.data = [];

  for (const key in user) {
    message.data.push(user[key]);
  }

  message = JSON.stringify(message);

  for (const key in clients) {
    clients[key].send(message);
  }
}

function userExit(name) {
  let message = {};
  message.type = 'signup';
  message.data = { name };

  message = JSON.stringify(message);

  for (const key in clients) {
    clients[key].send(message);
  }
}
