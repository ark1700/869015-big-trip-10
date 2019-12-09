import {createElement} from '../util';


const createTripInfoTitleTemplate = () => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>
  `;

export default class TripInfoTitle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTitleTemplate();
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
