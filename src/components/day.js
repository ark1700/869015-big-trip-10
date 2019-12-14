import AbstractComponent from './abstract-component.js';
import {MonthItems} from '../const';

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

export default class Day extends AbstractComponent {
  constructor(counter, date) {
    super();

    this._counter = counter;
    this._date = date;
  }

  getTemplate() {
    return createDayTemplate(this._counter, this._date);
  }
}
