import {render, RenderPosition} from './utils/render';
import Filter from './components/filter';
import SiteMenu from './components/site-menu';
import TripDays from './components/trip-days';
import TripInfoTitle from './components/trip-info-title';
import GetResultPrice from './components/get-result-price';
import {generateTripEvents} from './mock/trip-event';
import {filters} from './mock/filter';
import {menuItems} from './mock/site-menu';
import TripController from './controllers/trip-controller';

const TRIP_EVENT_COUNT = 5;

const tripEvents = generateTripEvents(TRIP_EVENT_COUNT);

const tripControlsElement = document.querySelector(`.trip-controls`);
render(tripControlsElement, new SiteMenu(menuItems), RenderPosition.AFTERBEGIN); // «Меню»


render(tripControlsElement, new Filter(filters)); // «Фильтры»

const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoTitle(), RenderPosition.AFTERBEGIN); // Информация о маршруте.


const tripEventsElement = document.querySelector(`.trip-events`);
const tripDays = new TripDays();
render(tripEventsElement, tripDays); // «Фильтры»

const tripController = new TripController(tripDays);
tripController.render(tripEvents);

const costValue = document.querySelector(`.trip-info__cost-value`);
render(costValue, new GetResultPrice(tripEvents));
