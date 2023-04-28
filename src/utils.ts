export const converter = (value: number) => {
  if (value >= 100000000000)
    return (value / 1000000000000).toFixed(2).toString() + " T"; // trillion
  if (value >= 1000000000)
    return (value / 1000000000).toFixed(2).toString() + " B"; // billion
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2).toString() + " M"; // million
  }
  return value.toFixed(2).toString();
};