export const discount = (price, discount) => {
  const percentage = discount / 100;
  const discountPrice = price - price * percentage;
  return discountPrice;
};
