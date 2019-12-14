import AbstractComponent from './abstract-component.js';

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

export default class SiteMenu extends AbstractComponent {
  constructor(menuItem) {
    super();

    this._menuItem = menuItem;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItem);
  }
}
