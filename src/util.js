const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatSubstractTime = (firstDate, secondDate) => {
  const diff = parseInt((secondDate.getTime() - firstDate.getTime()), 10);
  const days = (Math.floor(diff / 24 / 60 / 60 / 1000));
  const hours = (Math.floor(diff / 60 / 60 / 1000)) % 24;
  const minutes = (Math.floor(diff / 60 / 1000)) % 60;

  return `${days ? `D` + castTimeFormat(days) : ``} ${hours ? `H` + castTimeFormat(hours) : ``} ${minutes ? `M` + castTimeFormat(minutes) : ``}`;
};

const getTitle = (tripType) => {
  let title = ``;
  switch (tripType) {
    case `check`:
      title = title + `Check into `;
      break;

    case `sightseeing`:
    case `restaurant`:
      break;

    default:
      title += `${tripType[0].toUpperCase() + tripType.slice(1)} to `;
      break;
  }

  return title;
};

const getResultPrice = (events) => {
  let result = 0;
  events.forEach((event) => {
    result += +event.price;
    event.offers.forEach((offer) => {
      result += +offer.price;
    });
  });

  return result;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    default:
      container.append(element);
      break;
  }
};

export {castTimeFormat, formatTime, formatSubstractTime, getTitle, getResultPrice, createElement, RenderPosition, render};
