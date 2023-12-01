// utils/util.ts

const formatPriceWithCommas = (price: number): string => {
  // Use toLocaleString to format the price with commas
  return price.toLocaleString('en-US');
};

export { formatPriceWithCommas };
