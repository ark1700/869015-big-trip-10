import {render, RenderPosition, getResultPrice} from './util';
import Day from './components/day';
import Filter from './components/filter';
import SiteMenu from './components/site-menu';
import SortFilter from './components/sort-filter';
import TripDays from './components/trip-days';
import TripEvent from './components/trip-event';
import TripEventEdit from './components/trip-event-edit';
import TripInfoTitle from './components/trip-info-title';
import {generateTripEvents} from './mock/trip-event';
import {filters} from './mock/filter';
import {menuItems} from './mock/site-menu';
import {defaultEditedTripEvent} from './mock/default-edited-trip-event';

const TRIP_EVENT_COUNT = 5;

const tripEvents = generateTripEvents(TRIP_EVENT_COUNT);

const renderTripEvent = (tripEvent, place, count) => {
  const tripEventComponent = new TripEvent(tripEvent);
  const tripEventEditComponent = new TripEventEdit(tripEvent, false, count);

  const editButton = tripEventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    place.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
  });

  tripEventEditComponent.getElement().addEventListener(`submit`, () => {
    place.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  });

  render(place, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

// Отрисовка в index
const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoTitle().getElement(), RenderPosition.AFTERBEGIN); // Информация о маршруте.

const tripControlsElement = document.querySelector(`.trip-controls`);
render(tripControlsElement, new SiteMenu(menuItems).getElement(), RenderPosition.AFTERBEGIN); // «Меню»
render(tripControlsElement, new Filter(filters).getElement()); // «Фильтры»

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortFilter().getElement());
render(tripEventsElement, new TripEventEdit(defaultEditedTripEvent, true, 0).getElement()); // «Форма создания»
tripEventsElement.querySelector(`.event--edit`).classList.add(`trip-events__item`);

const tripDays = new TripDays();
render(tripEventsElement, tripDays.getElement());

tripEvents.sort((a, b) => a.startDate - b.startDate);

const tripDaysElement = tripDays.getElement();

let dayCounter = 1;
let eventCounter = 1;
tripEvents.forEach((tripEvent) => {
  const tripEventDataTime = `${tripEvent.startDate.getYear() + 1900}-${tripEvent.startDate.getMonth() + 1}-${tripEvent.startDate.getDay() + 1}`;

  const lastDayElement = tripDaysElement.querySelector(`.day:last-child`);
  let lastDayElementDataTime;
  if (lastDayElement) {
    lastDayElementDataTime = lastDayElement.querySelector(`.day__date`).dateTime;
  }

  if (lastDayElementDataTime !== tripEventDataTime) {
    render(tripDaysElement, new Day(dayCounter, tripEvent.startDate).getElement());
    dayCounter++;
  }

  const newLastDayElement = tripDaysElement.querySelector(`.day:last-child`);
  const tripEventsListLastDayElement = newLastDayElement.querySelector(`.trip-events__list`);
  renderTripEvent(tripEvent, tripEventsListLastDayElement, eventCounter); // «Карточка»
});

const costValue = document.querySelector(`.trip-info__cost-value`);
render(costValue, getResultPrice(tripEvents));
