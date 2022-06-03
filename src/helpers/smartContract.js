export const SMARTCONTRACT_ADDRESS = window.SMARTCONTRACT_ADDRESS;

export const ABI = window.ABI;

export const TOKEN = {
  FAN: "0",
  REGULAR: "1",
  VIP: "2",
};

export const PRICE = {
  [TOKEN.FAN]: "0.000005",
  [TOKEN.REGULAR]: "0.00001",
  [TOKEN.VIP]: "0.00002",
};

export const TokenInfo = {
  [TOKEN.FAN]: { name: "FAN", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/fan.png' },
  [TOKEN.REGULAR]: { name: "REGULAR", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/regular.png' },
  [TOKEN.VIP]: { name: "VIP", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/vip.png' },
};
