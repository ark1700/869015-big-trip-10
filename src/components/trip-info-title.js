import AbstractComponent from './abstract-component.js';

const createTripInfoTitleTemplate = () => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>
  `;

export default class TripInfoTitle extends AbstractComponent {
  getTemplate() {
    return createTripInfoTitleTemplate();
  }
}
