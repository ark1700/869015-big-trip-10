import AbstractSmartComponent from './abstract-smart-component.js';

export const MenuItem = {
  STATISTICS: {
    name: `stats`,
    active: false,
  },
  TRIP_EVENTS: {
    name: `table`,
    active: true,
  },
};

const createSiteMenuMarkup = (menuItem) => {
  return (
    `<a
      class="trip-tabs__btn ${menuItem.active ? `trip-tabs__btn--active` : ``}"
      href="#"
      data-menu-item="${menuItem.name}"
      >
      ${menuItem.name[0].toUpperCase() + menuItem.name.slice(1)}
    </a>`
  );
};

const createSiteMenuTemplate = (menuItems) => {
  const menuMarkup = Object.keys(menuItems)
    .map((key) => menuItems[key])
    .map((it) => createSiteMenuMarkup(it)).join(`\n`);
  // console.log(menuItems.forEach((item) => {
  //   menuMarkup += createSiteMenuMarkup(item);
  // }));
  // console.log(Object.keys(menuItems)
  //   .map(key => menuItems[key])
  //   .map((it) => createSiteMenuMarkup(it)).join(`\n`));
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${menuMarkup}
    </nav>`
  );
};

export default class SiteMenu extends AbstractSmartComponent {
  constructor(menuItem) {
    super();

    this._menuItems = menuItem;
    this._onClickHandeler = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItems);
  }

  recoveryListeners() {
    this.setOnClick(this._onClickHandeler);
  }

  setActiveItem(menuItem) {
    const menuItems = this._menuItems;
    Object.keys(menuItems)
      .map((key) => menuItems[key])
      .forEach((item) => {
        if (item.name === menuItem) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
  }

  setOnClick(handler) {
    this._onClickHandeler = handler;
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const activeMenuItemName = evt.target.dataset.menuItem;
      this.setActiveItem(activeMenuItemName);
      super.rerender();
      handler(activeMenuItemName);
    });
  }
}
