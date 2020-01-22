import TripEventComponent from '../components/trip-event.js';
import TripEventEditComponent from '../components/trip-event-edit.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._tripEventComponent = null;
    this._tripEventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(tripEvent) {
    const oldtripEventComponent = this._tripEventComponent;
    const oldtripEventEditComponent = this._tripEventEditComponent;

    this._tripEventComponent = new TripEventComponent(tripEvent);
    this._tripEventEditComponent = new TripEventEditComponent(tripEvent);

    this._tripEventComponent.setEditButtonClickHandler(() => {
      this._replaceTripEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._tripEventEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, tripEvent, Object.assign({}, tripEvent, {
        isFavorite: !tripEvent.isFavorite,
      }));
    });

    this._tripEventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTripEvent();
    });

    this._tripEventEditComponent.setCloseEditButtonClickHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTripEvent();
    });

    if (oldtripEventEditComponent && oldtripEventComponent) {
      replace(this._tripEventComponent, oldtripEventComponent);
      replace(this._tripEventEditComponent, oldtripEventEditComponent);
    } else {
      render(this._container, this._tripEventComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTripEvent();
    }
  }

  _replaceEditToTripEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._tripEventEditComponent.reset();

    replace(this._tripEventComponent, this._tripEventEditComponent);
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
      this._replaceEditTotripEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
