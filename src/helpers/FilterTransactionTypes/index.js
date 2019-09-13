export function filterTransactionTypes(data, func, filter) {
  if (filter && filter !== "All Transaction Types") {
    func(
      data.filter(type => {
        return type.typeDesc.indexOf(filter) !== -1;
      })
    );
  } else {
    func(data);
  }
}
