import {render, replace} from '../utils/render';
import Day from '../components/day';
import SortFilter, {SortType} from '../components/sort-filter';
import TripDays from '../components/trip-days';
import TripEvent from '../components/trip-event';
import TripEventEdit from '../components/trip-event-edit';
import NoPoints from '../components/no-points';
import {defaultEditedTripEvent} from '../mock/default-edited-trip-event';

const renderTripEvent = (tripEvent, place, count) => {
  const tripEventComponent = new TripEvent(tripEvent);
  const tripEventEditComponent = new TripEventEdit(tripEvent, false, count);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replace(tripEventComponent, tripEventEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventComponent.setEditButtonClickHandler(() => {
    replace(tripEventEditComponent, tripEventComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replace(tripEventComponent, tripEventEditComponent);
  });

  render(place, tripEventComponent);
};

const renderTripEvents = (tripDaysElement, tripEvents) => {
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
      render(tripDaysElement, new Day(dayCounter, tripEvent.startDate));
      dayCounter++;
    }

    const newLastDayElement = tripDaysElement.querySelector(`.day:last-child`);
    const tripEventsListLastDayElement = newLastDayElement.querySelector(`.trip-events__list`);
    renderTripEvent(tripEvent, tripEventsListLastDayElement, eventCounter); // «Карточка»
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoints = new NoPoints();
    this._sortFilter = new SortFilter();
    this._tripEventEdit = new TripEventEdit();
    this._tripDays = new TripDays();
  }

  render(tripEvents) {
    const container = this._container.getElement();
    const sortFilter = this._sortFilter;
    render(container, sortFilter);

    const tripDays = new TripDays();
    const isTripEventsExist = !!tripEvents.length;
    if (!isTripEventsExist) {
      render(container, new NoPoints());
      return;
    }


    render(container, new TripEventEdit(defaultEditedTripEvent, true, 0));// «Форма создания»

    render(container, tripDays);

    tripEvents.sort((a, b) => a.startDate - b.startDate);

    const tripDaysElement = tripDays.getElement();

    renderTripEvents(tripDaysElement, tripEvents);

    this._sortFilter.setSortTypeChangeHandler((sortType) => {
      let sortedTripEvents = [];

      switch (sortType) {
        case SortType.TIME:
          sortedTripEvents = tripEvents.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
          break;
        case SortType.PRICE:
          sortedTripEvents = tripEvents.slice().sort((a, b) => b.price - a.price);
          break;
        case SortType.DEFAULT:
          sortedTripEvents = tripEvents.slice();
          break;
      }

      tripDaysElement.innerHTML = ``;

      renderTripEvents(tripDaysElement, sortedTripEvents);
    });
  }
}

