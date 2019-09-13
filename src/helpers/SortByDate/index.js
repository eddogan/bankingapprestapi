export function sortByDate(order, data) {
  function compareDescending(a, b) {
    if (new Date(a.transactionDate) < new Date(b.transactionDate)) {
      return 1;
    }
    if (new Date(a.transactionDate) > new Date(b.transactionDate)) {
      return -1;
    }
    return 0;
  }

  function compareAscending(a, b) {
    if (new Date(a.transactionDate) < new Date(b.transactionDate)) {
      return -1;
    }
    if (new Date(a.transactionDate) > new Date(b.transactionDate)) {
      return 1;
    }
    return 0;
  }
  if (Array.isArray(data)) {
    if (order === "descending") {
      data.sort(compareDescending);
    } else if (order === "ascending") {
      data.sort(compareAscending);
    }
    return data;
  }
}
