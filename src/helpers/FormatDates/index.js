export function getToday() {
  let date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}

export function getYear() {
  let date = new Date();
  return date.getFullYear();
}

export function getNextWeeksDate() {
  let today = new Date();
  let nextWeek = new Date(today.setDate(today.getDate() + 7));
  let dd = nextWeek.getDate();
  let mm = nextWeek.getMonth() + 1;
  const yyyy = nextWeek.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}

export function getLastWeeksDate() {
  let today = new Date();
  let lastWeek = new Date(today.setDate(today.getDate() - 7));
  let dd = lastWeek.getDate();
  let mm = lastWeek.getMonth() + 1;
  const yyyy = lastWeek.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}

export function getFirstOfTheMonth() {
  let date = new Date();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/01/${yyyy}`;
}

export function getFirstDayOfLastMonth() {
  let date = new Date();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (mm === 12) {
    yyyy = yyyy - 1;
  }
  return `${mm - 1}/01/${yyyy}`;
}

export function getFirstDayOfLastThreeMonths() {
  let date = new Date();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (mm === 12) {
    yyyy = yyyy - 1;
  }
  return `${mm - 2}/01/${yyyy}`;
}

export function getLastDayOfLastMonth() {
  let date = new Date();
  date = new Date(date.getFullYear(), date.getMonth() + 0, 0);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}

export function formatDate(passedDate) {
  let date = new Date(passedDate);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}

export function formatCompletedTransactionDate(passedDate) {
  /* Strip the passedDate to dd/mm/yyy only */
  let date = new Date(passedDate.substr(0, 9));
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${mm}/${dd}/${yyyy}`;
}
