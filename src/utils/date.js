export const getFancyDate = (stringDate, locale = 'es') => {
  const date = new Date(stringDate);
  const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString(locale, options);
  return formattedDate;
};
