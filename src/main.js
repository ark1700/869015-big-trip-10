import {createDayTemplate} from './components/day';
import {createFiltersTemplate} from './components/filter';
import {createSiteMenuTemplate} from './components/site-menu';
import {createSortFilterTemplate} from './components/sort-filter';
import {createTripDaysTemplate} from './components/trip-days';
import {createTripEventTemplate} from './components/trip-event';
import {createTripEventEditTemplate} from './components/trip-event-edit';
import {createTripInfoTitleTemplate} from './components/trip-info-title';
import {getResultPrice} from './components/get-result-price';
import {generateTripEvents} from './mock/trip-event';
import {filters} from './mock/filter';
import {menuItems} from './mock/site-menu';
import {defaultEditedTripEvent} from './mock/default-edited-trip-event';

const TRIP_EVENT_COUNT = 5;

const tripEvents = generateTripEvents(TRIP_EVENT_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Отрисовка в index
const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, createTripInfoTitleTemplate(), `afterbegin`); // Информация о маршруте.

const tripControlsElement = document.querySelector(`.trip-controls`);
render(tripControlsElement, createSiteMenuTemplate(menuItems), `afterbegin`); // «Меню»
render(tripControlsElement, createFiltersTemplate(filters)); // «Фильтры»

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortFilterTemplate());
render(tripEventsElement, createTripEventEditTemplate(defaultEditedTripEvent, true)); // «Форма создания»
tripEventsElement.querySelector(`.event--edit`).classList.add(`trip-events__item`);

render(tripEventsElement, createTripDaysTemplate());

tripEvents.sort((a, b) => a.startDate - b.startDate);

const tripDaysElement = document.querySelector(`.trip-days`);

let dayCounter = 1;
tripEvents.forEach((tripEvent) => {
  const tripEventDataTime = `${tripEvent.startDate.getYear() + 1900}-${tripEvent.startDate.getMonth() + 1}-${tripEvent.startDate.getDay() + 1}`;

  const lastDayElement = tripDaysElement.querySelector(`.day:last-child`);
  let lastDayElementDataTime;
  if (lastDayElement) {
    lastDayElementDataTime = lastDayElement.querySelector(`.day__date`).dateTime;
  }

  if (lastDayElementDataTime !== tripEventDataTime) {
    render(tripDaysElement, createDayTemplate(dayCounter, tripEvent.startDate));
    dayCounter++;
  }

  const newLastDayElement = tripDaysElement.querySelector(`.day:last-child`);
  const tripEventsListLastDayElement = newLastDayElement.querySelector(`.trip-events__list`);
  render(tripEventsListLastDayElement, createTripEventTemplate(tripEvent)); // «Карточка»
});

const costValue = document.querySelector(`.trip-info__cost-value`);
render(costValue, getResultPrice(tripEvents));
