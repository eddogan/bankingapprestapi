export default function getBrandingConfig() {
  switch (window.location.hostname) {
    case "paysmith.com":
      return "paysmith";
    case "paymentconcepts.com":
      return "paymentconcepts";
    case "trans2pay.com":
      return "trans2pay";
    default:
      return "globalclientsolutions";
  }
}
