export const getSimpleDate = (date) => {
  //   const day = `0${new Date(date).getDay()}`.slice(-2);
  const day = `0${new Date(date).getDate()}`.slice(-2);
  const month = `0${new Date(date).getMonth() + 1}`.slice(-2);
  const year = `${new Date(date).getFullYear()}`.slice(-2);
  return `${day}.${month}.${year}`;
};
