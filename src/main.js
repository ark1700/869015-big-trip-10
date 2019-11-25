import {createDayTemplate} from './components/day';
import {createFilterTemplate} from './components/filter';
import {createSiteMenuTemplate} from './components/site-menu';
import {createSortFilterTemplate} from './components/sort-filter';
import {createTripDaysTemplate} from './components/trip-days';
import {createTripEventTemplate} from './components/trip-event';
import {createTripEventEditTemplate} from './components/trip-event-edit';
import {createTripInfoTitleTemplate} from './components/trip-info-title';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Отрисовка в index
const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, createTripInfoTitleTemplate(), `afterbegin`); // Информация о маршруте.

const tripControlsElement = document.querySelector(`.trip-controls`);
render(tripControlsElement, createSiteMenuTemplate(), `afterbegin`); // «Меню»
render(tripControlsElement, createFilterTemplate()); // «Фильтры»

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortFilterTemplate());
render(tripEventsElement, createTripEventEditTemplate()); // «Форма создания»
tripEventsElement.querySelector(`.event--edit`).classList.add(`trip-events__item`);
const tripEventEditElement = tripEventsElement.querySelector(`.event--edit`);
tripEventEditElement.querySelector(`.event__favorite-checkbox`).remove();
tripEventEditElement.querySelector(`.event__favorite-btn`).remove();
tripEventEditElement.querySelector(`.event__rollup-btn`).remove();

render(tripEventsElement, createTripDaysTemplate());

const tripDaysElement = document.querySelector(`.trip-days`);
render(tripDaysElement, createDayTemplate());

const tripEventsListElement = document.querySelector(`.trip-events__list`);
render(tripEventsListElement, createTripEventEditTemplate()); // «Форма редактирования»

new Array(3)
  .fill(``)
  .forEach(
      () => render(tripEventsListElement, createTripEventTemplate()) // «Карточка»
  );

