import {createElement} from '../util';

const createSiteMenuMarkup = (menuItem) => {
  return (
    `<a
      class="trip-tabs__btn ${menuItem.isActive ? `trip-tabs__btn--active` : ``}"
      href="#"
      >
      ${menuItem.name[0].toUpperCase() + menuItem.name.slice(1)}
    </a>`
  );
};

const createSiteMenuTemplate = (menuItems) => {
  const menuMarkup = menuItems.map((it) => createSiteMenuMarkup(it)).join(`\n`);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkup}
    </nav>`
  );
};

export default class SiteMenu {
  constructor(menuItem) {
    this._menuItem = menuItem;

    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItem);
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
