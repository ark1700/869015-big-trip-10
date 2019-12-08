import {getTitle, castTimeFormat, createElement} from '../util';

const DestinationItems = [
  `Geneva`,
  `Chamonix`,
  `Chamonix`,
  `Amsterdam`,
  `Heinola`,
];

const TranserList = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const ActivityList = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const createTripEventEditTemplate = (editedTripEvent, isNewEvent, count) => {
  const getDestinationOption = (destination) => {
    return (
      `<option value="${destination}"></option>`
    );
  };

  const destinationListOptionsMarkup = DestinationItems.map((destination) => getDestinationOption(destination)).join(`\n`);

  const getEventTypeMarkup = (transfer) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${transfer}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transfer}">
        <label class="event__type-label  event__type-label--${transfer}" for="event-type-${transfer}-1">${transfer[0].toUpperCase() + transfer.slice(1)}</label>
      </div>`
    );
  };

  const transferListMarkup = TranserList.map((eventType) => getEventTypeMarkup(eventType)).join(`\n`);
  const activityListMarkup = ActivityList.map((eventType) => getEventTypeMarkup(eventType)).join(`\n`);

  const getPhotoMarkup = (photoSrc) => {
    return (
      `<img class="event__photo" src="${photoSrc}" alt="Event photo">`
    );
  };

  const photosMarkup = editedTripEvent.photos.map((photoSrc) => getPhotoMarkup(photoSrc)).join(`\n`);

  const getOfferMarkup = (offer) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${count}" type="checkbox" name="event-offer-${offer.type}" ${offer.active ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.type}-1">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  };

  const offersMarkup = editedTripEvent.offers.map((offer) => getOfferMarkup(offer)).join(`\n`);

  return (
    `<form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${count}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${editedTripEvent.type === `check` ? `check-in` : editedTripEvent.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${count}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            ${transferListMarkup}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${activityListMarkup}
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${count}">
          ${getTitle(editedTripEvent.type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${count}" type="text" name="event-destination" value="${editedTripEvent.destination}" list="destination-list-${count}">
        <datalist id="destination-list-${count}">
          ${destinationListOptionsMarkup}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${count}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${count}" type="text" name="event-start-time" value="${castTimeFormat(editedTripEvent.startDate.getDay() + 1)}/${castTimeFormat(editedTripEvent.startDate.getMonth() + 1)}/${castTimeFormat(editedTripEvent.startDate.getYear().toString().slice(1))} ${castTimeFormat(editedTripEvent.startDate.getHours())}:${castTimeFormat(editedTripEvent.startDate.getMinutes())}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${count}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${count}" type="text" name="event-end-time" value="${castTimeFormat(editedTripEvent.endDate.getDay() + 1)}/${castTimeFormat(editedTripEvent.endDate.getMonth() + 1)}/${castTimeFormat(editedTripEvent.endDate.getYear().toString().slice(1))} ${castTimeFormat(editedTripEvent.endDate.getHours())}:${castTimeFormat(editedTripEvent.endDate.getMinutes())}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${count}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${count}" type="text" name="event-price" value="${editedTripEvent.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      ${isNewEvent ? `` : `<input id="event-favorite-${count}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${editedTripEvent.isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${count}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}
    </header>

    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersMarkup}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${editedTripEvent.descr}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosMarkup}
          </div>
        </div>
      </section>
    </section>
  </form>`
  );
};

export default class TripEventEdit {
  constructor(editedTripEvent, isNewEvent, count) {
    this._editedTripEvent = editedTripEvent;
    this._isNewEvent = isNewEvent;
    this._count = count;

    this._element = null;
  }

  getTemplate() {
    return createTripEventEditTemplate(this._editedTripEvent, this._isNewEvent, this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
