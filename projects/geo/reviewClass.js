import Map from './mapClass';
import Storage from './storageClass';

export default class Review {
  constructor() {
    this.template = document.querySelector('#baloonTemplate').innerHTML;
    this.storage = new Storage();
    this.map = new Map('map', this.action.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  onInit() {
    const coords = this.storage.callStorage('coords');

    for (const item of coords) {
      for (let i = 0; i < item.total; i++) {
        this.map.createPlacemark(item.coords);
      }
    }

    document.body.addEventListener('click', this.onDocumentClick.bind(this));
  }

  createForm(coords, reviews = []) {
    const root = document.createElement('div');
    root.innerHTML = this.template;
    const reviewList = root.querySelector('.review');
    const reviewForm = root.querySelector('[data-role=review-form]');
    reviewForm.dataset.coords = JSON.stringify(coords);

    for (let item of reviews) {
      item = JSON.parse(item);
      const li = document.createElement('li');
      li.classList.add('review__item');
      li.innerHTML = `
      <span class="review__name">${item.name}</span>
      <span class="review__place">[${item.place}]</span>
      <p class="review__text">${item.text}</p>
      `;
      reviewList.appendChild(li);
    }

    return root;
  }

  action(coords) {
    const list = this.storage.callStorage('list', { coords });
    const form = this.createForm(coords, list);
    this.map.openBalloon(coords, form.innerHTML);
  }

  onDocumentClick(e) {
    if (e.target.dataset.role === 'review-add') {
      const reviewForm = document.querySelector('[data-role=review-form]');
      const coords = JSON.parse(reviewForm.dataset.coords).join('_');
      const data = {
        coords,
        review: {
          name: document.querySelector('[data-role=review-name]').value,
          place: document.querySelector('[data-role=review-place]').value,
          text: document.querySelector('[data-role=review-text]').value,
        },
      };

      this.storage.callStorage('add', data);
      this.map.closeBalloon();
      this.map.createPlacemark(coords.split('_'));
    }
  }
}
