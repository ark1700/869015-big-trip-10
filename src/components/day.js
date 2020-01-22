import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createDayTemplate = (counter, date) => {
  return (`<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${moment(date).format(`YYYY-MM-DD`)}">${moment(date).format(`MMM`)} ${moment(date).format(`D`)}</time>
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
