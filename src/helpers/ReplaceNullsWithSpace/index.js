export default function replaceNullsWithSpace(obj = {}) {
  return Object.keys(obj).forEach(function(key) {
    if (obj[key] === null) {
      obj[key] = " ";
    }
  });
}
