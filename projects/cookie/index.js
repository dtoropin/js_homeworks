/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', showTable);

addButton.addEventListener('click', () => {
  const cookieName = encodeURIComponent(addNameInput.value.trim());
  const cookieValue = encodeURIComponent(addValueInput.value.trim());

  document.cookie = `${cookieName}=${cookieValue}`;

  addNameInput.value = '';
  addValueInput.value = '';

  showTable();
});

listTable.addEventListener('click', (e) => {
  const { cookieName } = e.target.dataset;

  if (cookieName) {
    document.cookie = `${cookieName}=; max-age=-1`;

    showTable();
  }
});

showTable();

// help functions
function showTable() {
  const cookies = getCookies();
  const filter = filterNameInput.value.trim();
  const fragment = document.createDocumentFragment();
  listTable.innerHTML = '';

  for (const key in cookies) {
    if (
      filter &&
      !key.toLowerCase().includes(filter.toLowerCase()) &&
      !cookies[key].toLowerCase().includes(filter.toLowerCase())
    )
      continue;

    if (key) fragment.append(createItemTable(key, cookies[key]));
  }

  listTable.append(fragment);
}

function getCookies() {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;

    return prev;
  }, {});
}

function createItemTable(key, value) {
  const item = document.createElement('tr');

  // поле name
  const nameTD = document.createElement('td');
  nameTD.innerText = key;

  // поле value
  const valueTD = document.createElement('td');
  valueTD.innerText = value;
  valueTD.classList.add('value');

  // поле с кнопкой
  const buttonTD = document.createElement('td');
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.dataset.cookieName = key;
  buttonTD.append(button);

  // добавляем все в <tr>
  item.append(nameTD, valueTD, buttonTD);

  return item;
}
