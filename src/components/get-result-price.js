import AbstractComponent from './abstract-component.js';


const getResultPrice = (events) => {
  let result = 0;
  events.forEach((event) => {
    result += +event.price;
    event.offers.forEach((offer) => {
      result += +offer.price;
    });
  });

  return result;
};

export default class Day extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return getResultPrice(this._events);
  }
}
