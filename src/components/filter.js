import {createElement} from '../util';

const createFilterMarkup = (filter) => {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${filter.name}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.name}"
        ${filter.isActive ? `checked` : ``}
      >
      <label
        class="trip-filters__filter-label"
        for="filter-${filter.name}"
      >
        ${filter.name[0].toUpperCase() + filter.name.slice(1)}
      </label>
    </div>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
};

export default class Filter {
  constructor(filter) {
    this._filter = filter;

    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filter);
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
