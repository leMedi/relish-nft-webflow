export const SMARTCONTRACT_ADDRESS = window.SMARTCONTRACT_ADDRESS;

export const ABI = window.ABI;

export const TOKEN = {
  LEVEL1: "0",
  LEVEL2: "1",
  LEVEL3: "2",
};

export const PRICE = {
  [TOKEN.LEVEL1]: "0.000005",
  [TOKEN.LEVEL2]: "0.00001",
  [TOKEN.LEVEL3]: "0.00002",
};

export const TokenInfo = {
  [TOKEN.LEVEL1]: { name: "FAN", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/fan.png' },
  [TOKEN.LEVEL2]: { name: "REGULAR", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/regular.png' },
  [TOKEN.LEVEL3]: { name: "VIP", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/vip.png' },
};
