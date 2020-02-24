export default class TripEvent {
  constructor(data) {
    this.id = data[`id`];
    this.price = data[`base_price`];
    this.startDate = new Date(data[`date_from`]);
    this.endDate = new Date(data[`date_to`]);
    this.type = data[`type`];
    this.destination = data[`destination`];
    this.offers = data[`offers`] ? data[`offers`] : [];
    this.isFavorite = Boolean(data[`is_favorite`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'base_price': this.price,
      'date_from': this.startDate.toISOString(),
      'date_to': this.endDate.toISOString(),
      'type': this.type,
      'destination': this.destination,
      'offers': Array.from(this.offers),
      'is_favorite': this.isFavorite,
    };
  }

  static toRawFromCustom(point) {
    return {
      'type': point[`type`],
      'base_price': point[`price`],
      'date_from': point[`startDate`],
      'date_to': point[`endDate`],
      'is_favorite': point[`isFavorite`],
      'offers': point[`offers`],
      'destination': point[`destination`]
    };
  }

  static parseTripEvent(data) {
    return new TripEvent(data);
  }

  static parseTripEvents(data) {
    return data.map(TripEvent.parseTripEvent);
  }

  static clone(data) {
    return new TripEvent(data.toRAW());
  }
}
