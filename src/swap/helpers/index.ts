export const formatBalance = (balance: number | null) => {
  if (balance === null) return "0";
  return balance.toFixed(5);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};
