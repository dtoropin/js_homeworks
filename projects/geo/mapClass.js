/* global ymaps */

export default class Map {
  constructor(id, action) {
    this.id = id;
    this.action = action;
  }

  async init() {
    await this.addScript();
    await this.loadYMaps();
    this.initMap();
  }

  addScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      document.body.appendChild(script);
      script.addEventListener('load', resolve);
    });
  }

  loadYMaps() {
    return new Promise((resolve) => ymaps.ready(resolve));
  }

  initMap() {
    this.clusterer = new ymaps.Clusterer({
      groupByCoordinates: true,
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
    });
    this.clusterer.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.action(coords);
    });
    this.map = new ymaps.Map(this.id, {
      center: [59.8, 30.52],
      zoom: 12,
      controls: [],
    });
    this.map.events.add('click', (e) => this.action(e.get('coords')));
    this.map.geoObjects.add(this.clusterer);
  }

  openBalloon(coords, content) {
    this.map.balloon.open(coords, content);
  }

  closeBalloon() {
    this.map.balloon.close();
  }

  createPlacemark(coords) {
    const placemark = new ymaps.Placemark(coords);
    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.action(coords);
    });
    this.clusterer.add(placemark);
  }
}
