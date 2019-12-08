import {MonthItems} from '../const';
import {createElement} from '../util';

const createDayTemplate = (counter, date) => {
  return (`<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDay() + 1}">${MonthItems[date.getMonth() + 1]} ${date.getDay() + 1}</time>
    </div>

    <ul class="trip-events__list">

    </ul>
  </li>`);
};

export default class Day {
  constructor(counter, date) {
    this._counter = counter;
    this._date = date;

    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._counter, this._date);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
