import {TypeItems} from '../const';

const MIN_PHOTOS_NUMBER = 6;
const MAX_PHOTOS_NUMBER = 6;
const MIN_DESCR_NUMBER = 1;
const MAX_DESCR_NUMBER = 3;
const MIN_PRICE = 100;
const MAX_PRICE = 900;
const MIN_OFFERS_NUMBER = 2;
const MAX_OFFERS_NUMBER = 3;
const MIN_OFFER_PRICE = 5;
const MAX_OFFER_PRICE = 100;

const ONE_BIG_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const DestinationItems = [
  `Geneva`,
  `Chamonix`,
  `Chamonix`,
  `Amsterdam`,
  `Heinola`,
  `Kitee`,
  `Lieksa`,
  `Porvoo`,
  `Helsinki`,
];

const offerNameByType = {
  'luggage': `Add luggage`,
  'comfort': `Switch to comfort class`,
  'meal': `Add meal`,
  'train': `Travel by train`,
  'seats': `Choose seats`,
};

const OfferTypeItems = [
  `luggage`,
  `comfort`,
  `meal`,
  `train`,
  `seats`,
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Генерирует начальную и конечную дату в промежутке randomHourInterval часов от случайной даты
const generateDate = () => {
  const randomHourInterval = 12;
  const date = getRandomDate(new Date(2019, 11, 1), new Date());
  const startDateInterval = date.setHours(date.getHours() - randomHourInterval / 2);
  const endDateInterval = date.setHours(date.getHours() + randomHourInterval / 2);
  return {
    startDate: getRandomDate(new Date(startDateInterval), new Date(date)),
    endDate: getRandomDate(new Date(date), new Date(endDateInterval)),
  };
};

const generateType = () => {
  return getRandomArrayItem(TypeItems);
};

const generateDestination = () => {
  return getRandomArrayItem(DestinationItems);
};

const generatePhotos = () => {
  return new Array(getRandomIntegerNumber(MIN_PHOTOS_NUMBER, MAX_PHOTOS_NUMBER))
    .fill(``)
    .map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generateDescr = () => {
  const DescrItems = ONE_BIG_DESCRIPTION.split(`. `);
  let descr = ``;
  for (let i = 0; i < getRandomIntegerNumber(MIN_DESCR_NUMBER, MAX_DESCR_NUMBER); i++) {
    descr += getRandomArrayItem(DescrItems);
  }
  return descr;
};

const generatePrice = () => {
  return getRandomIntegerNumber(MIN_PRICE, MAX_PRICE);
};

const generateOffers = () => {
  let offerItems = OfferTypeItems.slice();
  const generateOffer = () => {
    const type = getRandomArrayItem(offerItems);
    offerItems.splice(offerItems.indexOf(type), 1);
    return {
      title: offerNameByType[type],
      type,
      price: getRandomIntegerNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      active: true,
    };
  };

  return new Array(getRandomIntegerNumber(MIN_OFFERS_NUMBER, MAX_OFFERS_NUMBER))
    .fill(``)
    .map(() => generateOffer());
};

const generateTripEvent = () => {
  const date = generateDate();
  return {
    id: String(new Date() + Math.random()),
    type: generateType(),
    destination: generateDestination(),
    photos: generatePhotos(),
    descr: generateDescr(),
    startDate: date.startDate,
    endDate: date.endDate,
    price: generatePrice(),
    offers: generateOffers(),
    isFavorite: Math.random() < 0.5,
  };
};

const generateTripEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTripEvent);
};

export {generateTripEvent, generateTripEvents};
