import moment from "moment";

export const isCurrentYear = (date) =>
  new Date().getFullYear() === new Date(date).getFullYear();

export const dateTimeUsabilityFormat = (date) =>
  moment(date).format("DD " + (isCurrentYear(date) ? "MMMM" : "MM YY"));
