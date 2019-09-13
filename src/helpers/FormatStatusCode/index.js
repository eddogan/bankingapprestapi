export function formatStatusCode(statusCode) {
  let statusString = "";

  switch (statusCode) {
    case "Y":
      statusString = "Active";
      break;

    case "V":
      statusString = "Void";
      break;

    case "R":
      statusString = "Reversed";
      break;

    case "H":
      statusString = "Hold";
      break;

    case "P":
      statusString = "Pending";
      break;

    case "C":
      statusString = "Clear";
      break;

    case "X":
      statusString = "Canceled";
      break;

    case "N":
      statusString = "Insufficient Funds";
      break;

    default:
      statusString = "Inactive";
  }
  return statusString;
}
