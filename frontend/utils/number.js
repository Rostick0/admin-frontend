export const formatNumber = (val) => val?.toLocaleString?.("ru-RU");

export const formatFloatNumber = (num) => {
  const formattedNum = num?.toFixed?.(2);

  if (formattedNum?.endsWith(".00")) return formattedNum?.slice?.(0, -3);

  if (formattedNum?.endsWith("0")) return formattedNum?.slice?.(0, -1);

  return formattedNum;
};
