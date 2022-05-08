import Web3Modal from "web3modal";

const providerOptions = {};
export const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true,
  providerOptions,
});

export const parseMintEvent = (contract, txReciept) => {
  for (let i = 0; i < txReciept.logs.length; i++) {
    try {
      console.log("parseMintEvent", i, "log", txReciept.logs[i]);
      const logDescription = contract.interface.parseLog(txReciept.logs[i]);
      console.log("parseMintEvent", i, "logDescription", logDescription);
      console.log(
        "parseMintEvent",
        i,
        "Minted",
        logDescription.name === "Minted"
      );
      if (logDescription.name === "Minted") return logDescription;
    } catch (error) {
      continue;
    }
  }
  return null;
};

export const ipfsLinkToHttp = (ipfs) =>
  `https://cloudflare-ipfs.com/ipfs/${ipfs.substr(7)}`;
