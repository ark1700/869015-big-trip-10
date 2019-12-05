import {formatTime, formatSubstractTime, getTitle} from '../util';

export const createTripEventTemplate = (tripEvent) => {
  const {destination, type, price, startDate, endDate, offers} = tripEvent;

  const getOffer = (offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`
    );
  };

  const offersMarkup = offers.map((offer) => getOffer(offer)).join(`\n`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type === `check` ? `check-in` : type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getTitle(type)} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatTime(endDate)}</time>
          </p>
          <p class="event__duration">${formatSubstractTime(startDate, endDate)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
