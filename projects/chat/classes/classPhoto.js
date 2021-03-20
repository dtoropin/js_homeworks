import defaultPhoto from '../img/anonim.png';

export default class Photo {
  constructor(element, onCancel, savePhoto) {
    this.element = element;
    this.tmpPhoto = null;
    this.save = element.querySelector('.tuning__save');
    this.cancel = element.querySelector('.tuning__cancel');
    this.photo = element.querySelector('.tuning__img');

    this.cancel.addEventListener('click', onCancel);

    this.save.addEventListener('click', () => {
      if (this.tmpPhoto) savePhoto(this.tmpPhoto);
    });

    this.photo.addEventListener('dragover', (e) => {
      if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
        e.preventDefault();
      }
    });

    this.photo.addEventListener('drop', (e) => this.loadPhoto(e));
  }

  async loadPhoto(e) {
    e.preventDefault();

    return await new Promise((resolve) => {
      const file = e.dataTransfer.items[0].getAsFile();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.photo.style.backgroundImage = `url(${reader.result})`;
        resolve((this.tmpPhoto = reader.result));
      });
    });
  }

  show() {
    this.element.classList.remove('hidden');
    this.photo.style.backgroundImage = `url(${defaultPhoto})`;
  }

  hide() {
    this.element.classList.add('hidden');
    this.photo.style.backgroundImage = `url(${defaultPhoto})`;
  }
}
