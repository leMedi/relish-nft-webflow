const mainnet = {
  chainId: "0x1",
  chainName: "Ethereum Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.infura.io/v3/"],
  blockExplorerUrls: [`https://etherscan.io/`],
};

const testnet = {
  chainId: "0x4",
  chainName: "Rinkeby Test Network",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rinkeby.infura.io/v3/"],
  blockExplorerUrls: [`https://rinkeby.etherscan.io`],
};

export default testnet;
