import moment from "moment";

const InfoConsts = {
  FIRST_ELEMENT: 0,
  MIN_LENGTH: 1,
  MIDDLE_LENGTH: 2,
  MAX_LENGTH: 3
};

const formatForTitle = (date) => {
  return moment(date).format(`D MMM`);
};

const getTripInfoContent = (events) => {
  let title = ``;
  let date = ``;
  switch (true) {
    case (events.length === InfoConsts.MIN_LENGTH):
      title = events[InfoConsts.FIRST_ELEMENT].destination.name;
      break;
    case (events.length === InfoConsts.MIDDLE_LENGTH):
      title = `${events[InfoConsts.FIRST_ELEMENT].destination.name} &mdash; ${events[events.length - InfoConsts.MIN_LENGTH].destination.name}`;
      break;
    case (events.length === InfoConsts.MAX_LENGTH):
      title = `${events[InfoConsts.FIRST_ELEMENT].destination.name} &mdash; ${events[InfoConsts.MIN_LENGTH].destination.name} &mdash; ${events[events.length - InfoConsts.MIN_LENGTH].destination.name}`;
      break;
    case (events.length > InfoConsts.MAX_LENGTH):
      title = `${events[InfoConsts.FIRST_ELEMENT].destination.name} &mdash; ... &mdash; ${events[events.length - InfoConsts.MIN_LENGTH].destination.name}`;
      break;
  }
  if (events.length === InfoConsts.MIN_LENGTH) {
    date = formatForTitle(events[InfoConsts.FIRST_ELEMENT].startDate);
  } else if (events.length > InfoConsts.MIN_LENGTH) {
    date = `${formatForTitle(events[InfoConsts.FIRST_ELEMENT].startDate)} &mdash; ${formatForTitle(events[events.length - InfoConsts.MIN_LENGTH].endDate)}`;
  }

  return {
    title,
    date
  };
};

export {getTripInfoContent};
