export const formatBalance = (balance: number | null) => {
  if (balance === null) return "0";
  return balance.toFixed(5);
};
