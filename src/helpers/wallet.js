export const computeTruncatedAccountId = (address) =>
  address.length ? `${address.slice(0, 7)}...${address.slice(-2)}` : "";
