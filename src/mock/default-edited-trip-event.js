export const defaultEditedTripEvent = {
  type: `flight`,
  destination: `Saint Petersburg`,
  photos: [
    `img/photos/1.jpg`,
    `img/photos/2.jpg`,
    `img/photos/3.jpg`,
    `img/photos/4.jpg`,
    `img/photos/5.jpg`,
  ],
  description: `Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
  startDate: new Date(2019, 3, 18, 12, 25),
  endDate: new Date(2019, 3, 18, 13, 35),
  price: 160,
  offers: [
    {
      name: `Add luggage`,
      type: `luggage`,
      price: 30,
      active: true,
    },
    {
      name: `Switch to comfort class`,
      type: `comfort`,
      price: 100,
      active: true,
    },
    {
      name: `Add meal`,
      type: `meal`,
      price: 15,
      active: false,
    },
    {
      name: `Choose seats`,
      type: `seats`,
      price: 5,
      active: false,
    },
    {
      name: `Travel by train`,
      type: `train`,
      price: 40,
      active: false,
    },
  ],
};
