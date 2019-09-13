export default function formatPhoneNumbers(number) {
  let phoneNumber = number;
  const areaCode = phoneNumber.substring(0, 3);
  const firstThree = phoneNumber.substring(3, 6);
  const lastFour = phoneNumber.substring(6, 10);
  phoneNumber = `(${areaCode}) ${firstThree}-${lastFour}`;
  return phoneNumber;
}
