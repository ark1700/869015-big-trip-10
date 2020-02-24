import {render, remove, RenderPosition} from '../utils/render';
import Day from '../components/day';
import SortFilter, {SortType} from '../components/sort-filter';
import TripDays from '../components/trip-days';
import PointController, {Mode as TripEventControllerMode, NewTripEvent} from '../controllers/point-controller';
import NoPoints from '../components/no-points';
import {getTripInfoContent} from '../utils/trip-info';
import TripInfoComponent from '../components/trip-info-component';

// import TripEventEdit from '../components/trip-event-edit';
// import {defaultEditedTripEvent} from '../mock/default-edited-trip-event';

const EMPTY_NUMBER = 0;

const renderTripEvents = (tripDaysElement, tripEvents, onDataChange, onViewChange, onFavorriteChange, tripEventsModel) => {
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
    const tripEventController = new PointController(tripEventsListLastDayElement, onDataChange, onViewChange, onFavorriteChange, tripEventsModel);
    tripEventController.render(tripEvent, TripEventControllerMode.DEFAULT);

    return tripEventController;
  });
};

export default class TripController {
  constructor(container, tripEventsModel, api, newTripEventButton, infoElement) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;
    this._api = api;

    this._noPoints = new NoPoints();
    this._sortComponent = new SortFilter();
    this._showedTripEventControllers = [];
    this._creatingTripEvent = null;
    this._tripInfoComponent = null;
    this._newTripEventButton = newTripEventButton;
    this._infoElement = infoElement;


    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataModulChange = this._onDataModulChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tripEventsModel.setFilterChangeHandler(this._onFilterChange);
    this._tripEventsModel.setDataChangeHandler(this._onDataModulChange);
  }

  hide() {
    this._sortComponent.hide();
    this._container.hide();
  }

  show() {
    this._sortComponent.show();
    this._container.show();
  }

  render() {
    const container = this._container.getElement();
    const tripEvents = this._tripEventsModel.getTripEvents();
    render(container.parentNode, this._sortComponent, RenderPosition.AFTERBEGIN);

    tripEvents.sort((a, b) => a.startDate - b.startDate);
    this._renderTripEvents(tripEvents);
  }

  _renderTripEvents(tripEvents) {
    const tripDaysElement = this._container.getElement();

    const newTripEvents = renderTripEvents(tripDaysElement, tripEvents.slice(), this._onDataChange, this._onViewChange, this._onFavorriteChange, this._tripEventsModel);
    this._showedTripEventControllers = this._showedTripEventControllers.concat(newTripEvents);
  }

  createTripEvent() {
    this._showedTripEventControllers.forEach((point) => point.setDefaultView());

    if (this._creatingTripEvent) {
      return;
    }

    const tripEventListElement = this._container.getElement();
    this._creatingTripEvent = new PointController(tripEventListElement, this._onDataChange, this._onViewChange, null, this._eventsModel);
    this._creatingTripEvent.render(NewTripEvent, TripEventControllerMode.ADDING);
  }

  _removeTripEvents() {
    this._showedTripEventControllers.forEach((tripEventController) => tripEventController.destroy());
    this._showedTripEventControllers = [];
    this._container.getElement().innerHTML = ``;
  }

  _updateTripEvents() {
    this._removeTripEvents();
    this._renderTripEvents(this._tripEventsModel.getTripEvents().slice());
  }

  _onDataChange(tripEventController, oldData, newData) {
    if (oldData === NewTripEvent) {
      this._creatingTripEvent = null;
      if (newData === null) {
        tripEventController.destroy();
        this._updateTripEvents();
        if (this._showedTripEventControllers.length === EMPTY_NUMBER) {
          // render(this._container, this._noPoints);
        }
      } else {
        this._api.createEvent(newData)
          .then((eventModel) => {
            this._tripEventsModel.addTripEvent(eventModel);
            tripEventController.destroy();
            this._updateTripEvents();
          })
          .catch(() => {
            tripEventController.shake();
          });
      }
    } else
    if (newData === null) {
      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._tripEventsModel.removeTripEvent(oldData.id);
          this._updateTripEvents();
        })
        .catch(() => {
          tripEventController.shake();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((eventModel) => {
          const isSuccess = this._tripEventsModel.updateTripEvent(oldData.id, eventModel);
          if (isSuccess) {
            this._updateTripEvents();
            this._updateHeaderInfo(this._pointsModel.getPoints());
            this._statisticsComponent.setNewData(this._pointsModel.getPoints());
          }
        })
        .catch(() => {
          tripEventController.shake();
        });
    }
  }

  _onViewChange() {
    this._showedTripEventControllers.forEach((it) => it.setDefaultView());
  }

  _onFavoriteChange(editComponent, oldData, newData, tripEventController) {
    this._api.updateEvent(oldData.id, newData)
      .then((eventModel) => {
        const isSuccess = this._tripEventsModel.updateTripEvent(oldData.id, eventModel);
        if (isSuccess) {
          editComponent.rerender(eventModel);
        }
      })
      .catch(() => {
        tripEventController.shake();
      });
  }

  _onSortTypeChange(sortType) {
    let sortedTripEvents = [];
    const tripEvents = this._tripEventsModel.getTripEvents();

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

    this._removeTripEvents();
    this._renderTripEvents(sortedTripEvents);
  }

  _onFilterChange() {
    this._updateTripEvents();
  }

  _onDataModulChange() {
    const sortedEvents = this._tripEventsModel.getTripEvents()
      .sort((a, b) => a.startDate - b.startDate);
    if (this._tripEventsModel.getTripEventsAll().length === EMPTY_NUMBER) {
      remove(this._sortComponent);
      render(this._container.getElement(), this._noPoints);
    }
    const totalPrice = sortedEvents.reduce((total, event) => {
      const {price, offers} = event;
      const offersPrice = offers.reduce((totalOffer, offer) => {
        return totalOffer + offer.price;
      }, EMPTY_NUMBER);
      return total + price + offersPrice;
    }, EMPTY_NUMBER);
    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
    }
    this._tripInfoComponent = new TripInfoComponent(getTripInfoContent(sortedEvents), totalPrice);
    render(this._infoElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }
}


