import {render} from '../utils/render';
import Day from '../components/day';
import SortFilter, {SortType} from '../components/sort-filter';
import TripDays from '../components/trip-days';
import PointController from '../controllers/point-controller';
import NoPoints from '../components/no-points';
// import TripEventEdit from '../components/trip-event-edit';
// import {defaultEditedTripEvent} from '../mock/default-edited-trip-event';

const renderTripEvents = (tripDaysElement, tripEvents, onDataChange, onViewChange) => {
  let dayCounter = 1;
  return tripEvents.map((tripEvent) => {
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
    const tripEventController = new PointController(tripEventsListLastDayElement, onDataChange, onViewChange);
    tripEventController.render(tripEvent);

    return tripEventController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoints = new NoPoints();
    this._sortComponent = new SortFilter();
    this._tripDays = new TripDays();
    this._tripEvents = [];
    this._showedTripEventControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tripEvents) {
    this._tripEvents = tripEvents;

    const container = this._container.getElement();

    const isTripEventsExist = !!tripEvents.length;
    if (!isTripEventsExist) {
      render(container, new NoPoints());
      return;
    }

    render(container, this._sortComponent);
    // render(container, new TripEventEdit(defaultEditedTripEvent, true, 0));
    render(container, this._tripDays);

    tripEvents.sort((a, b) => a.startDate - b.startDate);

    const tripDaysElement = this._tripDays.getElement();

    const newTripEvents = renderTripEvents(tripDaysElement, this._tripEvents.slice(), this._onDataChange, this._onViewChange);
    this._showedTripEventControllers = this._showedTripEventControllers.concat(newTripEvents);
  }

  _onDataChange(tripEventController, oldData, newData) {
    const index = this._tripEvents.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tripEvents = [].concat(this._tripEvents.slice(0, index), newData, this._tripEvents.slice(index + 1));

    tripEventController.render(this._tripEvents[index]);
  }

  _onViewChange() {
    this._showedTripEventControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTripEvents = [];

    switch (sortType) {
      case SortType.TIME:
        sortedTripEvents = this._tripEvents.slice().sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
        break;
      case SortType.PRICE:
        sortedTripEvents = this._tripEvents.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        sortedTripEvents = this._tripEvents.slice();
        break;
    }

    const tripDaysElement = this._tripDays.getElement();

    tripDaysElement.innerHTML = ``;

    const newTripEvents = renderTripEvents(tripDaysElement, sortedTripEvents, this._onDataChange, this._onViewChange);
    this._showedTripEventControllers = newTripEvents;
  }
}
