export const getFormatDate = (value) => {
  const date = value ? new Date(value) : new Date();
  // console.log(getFormatDate, {date});
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return {
    value: date.valueOf(),
    formatValue: `${year}-${month}-${day}`
  }
}

export const getDateOrder = (dateArray, date) => {
  if (dateArray.length <= 0) return 0;

  let order;
  dateArray.some((item, index, array) => {
    if (date.formatValue === item.date.formatValue) return true;
    if (date.value > item.date.value && (!array[index + 1] || date.value < array[index + 1])) {
      order = index + 1;
      return true;
    }
    if (date.value < item.date.value && (!array[index - 1] || date.value > array[index - 1])) {
      order = index;
      return true;
    }
  });
  return order;
}