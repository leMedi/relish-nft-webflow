const mainnet = {
  chainId: "0x1",
  chainName: "Ethereum Mainnet",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.infura.io/v3/"],
  infuraId: '',
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
  infuraId: '0c18f4e330084b83a0de9c2559074e59',
  blockExplorerUrls: [`https://rinkeby.etherscan.io`],
};

export default testnet;
