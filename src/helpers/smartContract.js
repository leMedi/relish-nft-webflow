export const SMARTCONTRACT_ADDRESS = window.SMARTCONTRACT_ADDRESS;

export const ABI = window.ABI;

export const TOKEN = {
  LEVEL1: "0",
  LEVEL2: "1",
  LEVEL3: "2",
};

export const PRICE = {
  [TOKEN.LEVEL1]: "0.01",
  [TOKEN.LEVEL2]: "0.033",
  [TOKEN.LEVEL3]: "0.15",
};

export const TokenInfo = {
  [TOKEN.LEVEL1]: { total: 200, name: "FAN", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/fan.jpg' },
  [TOKEN.LEVEL2]: { total: 10, name: "REGULAR", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/regular.jpg' },
  [TOKEN.LEVEL3]: { total: 1, name: "VIP", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/vip.jpg' },
};
