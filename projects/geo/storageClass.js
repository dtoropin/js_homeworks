export default class Storage {
  constructor() {
    this.data = JSON.parse(localStorage.getItem('geo')) || {};
  }

  callStorage(method, body = {}) {
    if (method === 'add') this.add(body);

    if (method === 'coords') return this.coords();

    if (method === 'list') return this.list(body);
  }

  add(body) {
    const index = body.coords;
    this.data[index] = this.data[index] || [];
    this.data[index].push(JSON.stringify(body.review));

    localStorage.setItem('geo', JSON.stringify(this.data));
  }

  coords() {
    const items = JSON.parse(localStorage.getItem('geo'));
    const coords = [];

    if (items) {
      for (const item of Object.keys(items)) {
        const total = items[item].length;
        coords.push({ total: total, coords: item.split('_') });
      }
    }

    return coords;
  }

  list(body) {
    const items = JSON.parse(localStorage.getItem('geo'));

    if (items) {
      for (const item in items) {
        if (item === body.coords.join('_')) return items[item];
      }
    }
  }
}
