import AbstractComponent from './abstract-component.js';

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

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();

    this._filter = filter;
  }

  getTemplate() {
    return createFiltersTemplate(this._filter);
  }
}
