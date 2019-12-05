import {MonthItems} from '../const';
export const createDayTemplate = (counter, date) => `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDay() + 1}">${MonthItems[date.getMonth() + 1]} ${date.getDay() + 1}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>
  `;
