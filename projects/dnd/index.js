/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousedown', (e) => {
  // mousemove

  if (e.buttons !== 1 || !e.target.classList.contains('draggable-div')) return;

  const elem = e.target;
  elem.style.zIndex = 1000;

  const coords = getCoords(elem);
  const shiftX = e.pageX - coords.left;
  const shiftY = e.pageY - coords.top;

  document.onmousemove = function (e) {
    move(e);
  };

  elem.onmouseup = function () {
    document.onmousemove = null;
    return null;
  };

  function move(e) {
    elem.style.left = e.pageX - shiftX + 'px';
    elem.style.top = e.pageY - shiftY + 'px';
  }
});

function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createDiv() {
  const box = document.createElement('div');
  box.classList.add('draggable-div');

  box.style.width = getRandomInRange(10, 500) + 'px';
  box.style.height = getRandomInRange(10, 300) + 'px';
  box.style.backgroundColor =
    '#' + (Math.random().toString(16) + '000000').substring(2, 8);

  box.style.position = 'absolute';
  box.style.top = getRandomInRange(20, 500) + 'px';
  box.style.left = getRandomInRange(0, 500) + 'px';

  return box;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
