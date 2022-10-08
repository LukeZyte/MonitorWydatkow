export const getSimpleDate = (date) => {
  //   const day = `0${new Date(date).getDay()}`.slice(-2);
  const day = `0${new Date(date).getDate()}`.slice(-2);
  const month = `0${new Date(date).getMonth() + 1}`.slice(-2);
  const year = `${new Date(date).getFullYear()}`.slice(-2);
  return `${day}.${month}.${year}`;
};

export const getMonthName = (number) => {
  let month = "Styczeń";
  switch (number) {
    case 1:
      month = "Styczeń";
      break;
    case 2:
      month = "Luty";
      break;
    case 3:
      month = "Marzec";
      break;
    case 4:
      month = "Kwiecień";
      break;
    case 5:
      month = "Maj";
      break;
    case 6:
      month = "Czerwiec";
      break;
    case 7:
      month = "Lipiec";
      break;
    case 8:
      month = "Sierpień";
      break;
    case 9:
      month = "Wrzesień";
      break;
    case 10:
      month = "Październik";
      break;
    case 11:
      month = "Listopad";
      break;
    case 12:
      month = "Grudzień";
      break;
    default:
      month = "Styczeń";
      break;
  }

  return month;
};
