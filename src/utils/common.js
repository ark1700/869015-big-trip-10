import moment from 'moment';

const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
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


export {formatTime, formatSubstractTime, getTitle};
