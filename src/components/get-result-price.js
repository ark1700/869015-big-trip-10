export const getResultPrice = (events) => {
  let result = 0;
  events.forEach((event) => {
    result += +event.price;
    event.offers.forEach((offer) => {
      result += +offer.price;
    });
  });

  return result;
};
