import TripEventComponent from '../components/trip-event.js';
import TripEventEditComponent, {SHAKE_ANIMATION_TIMEOUT} from '../components/trip-event-edit.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import TripEventModel from '../models/trip-event';
import moment from 'moment';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const NewTripEvent = {
  type: `flight`,
  offers: [],
  price: ``,
  startDate: new Date(),
  endDate: new Date(),
  isFavorite: false,
  destination: {
    name: ``,
    pictures: [],
    description: ``
  }
};

const CustomText = {
  SAVE: `Save`,
  DELETE: `Delete`,
  SAVING: `Saving...`,
  DELETING: `Deleting...`,
  CANCEL: `Cancel`
};

const getDateStructure = (date) => {
  return moment(date, `DD/MM/YYYY HH:mm`).toDate();
};

const getDestinations = (destinationName, allDestinations) => {
  return allDestinations.find((destination) => destination[`name`] === destinationName);
};

const parseFormData = (rawData, allDestinations) => {
  const {formData, type, offers, isFavorite} = rawData;
  console.log(rawData);
  const result = new TripEventModel(TripEventModel.toRawFromCustom({
    type,
    offers,
    price: parseInt(formData.get(`price`), 10),
    startDate: getDateStructure(formData.get(`event-start-time`)),
    endDate: getDateStructure(formData.get(`event-end-time`)),
    isFavorite,
    destination: getDestinations(formData.get(`destination`), allDestinations)
  }));
  return result;
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, onFavorriteChange, tripEventsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onFavorriteChange = onFavorriteChange;
    this._tripEventsModel = tripEventsModel;

    this._mode = Mode.DEFAULT;

    this._tripEventComponent = null;
    this._tripEventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(tripEvent, mode) {
    const oldTripEventComponent = this._tripEventComponent;
    const oldTripEventEditComponent = this._tripEventEditComponent;
    this._mode = mode;
    const destinations = this._tripEventsModel.getDestinations();
    const offers = this._tripEventsModel.getOffers();

    this._tripEventComponent = new TripEventComponent(tripEvent);
    this._tripEventEditComponent = new TripEventEditComponent(tripEvent, this._onFavorriteChange, destinations, offers);

    this._tripEventComponent.setEditButtonClickHandler(() => {
      this._replaceTripEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditComponent.setFavoritesButtonClickHandler((evt, isFavorite) => {
      evt.preventDefault();
      const newEvent = TripEventModel.clone(event);
      newEvent.isFavorite = !isFavorite;
      this._onFavoriteChange(this._tripEventEditComponent, event, newEvent, this);
    });

    this._tripEventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      if (this._tripEventEditComponent.getSendingState()) {
        return;
      }
      if (this._mode === Mode.ADDING) {
        this._tripEventEditComponent.setCustomText({
          saveButtonText: CustomText.SAVING,
          deleteButtonText: CustomText.CANCEL
        });
      } else {
        this._tripEventEditComponent.setCustomText({
          saveButtonText: CustomText.SAVING
        });
      }
      const rawData = this._tripEventEditComponent.getData();
      const data = parseFormData(rawData, this._tripEventsModel.getDestinations());
      this._tripEventEditComponent.setDisabledState();
      this._onDataChange(this, event, data);
      // ////////
      // evt.preventDefault();
      // // const data = this._tripEventEditComponent.getData();
      // this._onDataChange(this, tripEvent, data);
    });

    this._tripEventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, tripEvent, null));

    this._tripEventEditComponent.setCloseEditButtonClickHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTripEvent();
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTripEventEditComponent && oldTripEventComponent) {
          replace(this._tripEventComponent, oldTripEventComponent);
          replace(this._tripEventEditComponent, oldTripEventEditComponent);
          this._replaceEditToTripEvent();
        } else {
          render(this._container, this._tripEventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldTripEventEditComponent && oldTripEventComponent) {
          remove(oldTripEventComponent);
          remove(oldTripEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._tripEventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTripEvent();
    }
  }

  destroy() {
    remove(this._tripEventEditComponent);
    remove(this._tripEventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToTripEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._tripEventEditComponent.reset();

    if (document.contains(this._tripEventEditComponent.getElement())) {
      replace(this._tripEventComponent, this._tripEventEditComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _replaceTripEventToEdit() {
    this._onViewChange();

    replace(this._tripEventEditComponent, this._tripEventComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, NewTripEvent, null);
      }

      this._replaceEditTotripEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  shake() {
    this._eventEditComponent.runAnimation();
    setTimeout(() => {
      this._eventEditComponent.removeAnimation();
      if (this._mode === Mode.ADDING) {
        this._eventEditComponent.setCustomText({
          saveButtonText: CustomText.SAVE,
          deleteButtonText: CustomText.CANCEL
        });
      } else {
        this._eventEditComponent.setCustomText({
          saveButtonText: CustomText.SAVE,
          deleteButtonText: CustomText.DELETE
        });
      }
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
