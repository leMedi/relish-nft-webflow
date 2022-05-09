export const SMARTCONTRACT_ADDRESS = window.SMARTCONTRACT_ADDRESS;

export const ABI = window.ABI;

export const TOKEN = {
  INVESTOR: "0",
  RESTAURANT: "1",
  ARTIST: "2",
};

export const PRICE = {
  [TOKEN.INVESTOR]: "0.000005",
  [TOKEN.RESTAURANT]: "0.00001",
  [TOKEN.ARTIST]: "0.000005",
};

export const TokenInfo = {
  [TOKEN.INVESTOR]: { name: "INVESTOR", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/investor.png' },
  [TOKEN.RESTAURANT]: { name: "RESTAURANT", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/restaurant.png' },
  [TOKEN.ARTIST]: { name: "ARTIST", asset: 'https://lemedi.github.io/relish-nft-webflow/dist/artist.png' },
};
