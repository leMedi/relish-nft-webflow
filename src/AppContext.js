import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Contract, providers, utils } from "ethers";
import { web3Modal, parseMintEvent } from "./helpers/web3";
import { computeTruncatedAccountId } from "./helpers/wallet";
import { ABI, PRICE, SMARTCONTRACT_ADDRESS } from "./helpers/smartContract";
import NETWORK from "./helpers/chain";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [context, setContext] = useState({});
  const value = { ...context, setContext };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useConnect(shouldConnectToCachedProvider = false) {
  const { provider, web3Provider, address, setContext } = useContext(AppContext);

  const connect = useCallback(async function () {
    const _provider = await web3Modal.connect();
    
    const _web3Provider = new providers.Web3Provider(_provider, "any");
    const _signer = _web3Provider.getSigner();
    const currentAddress = await _signer.getAddress();

    const { name, chainId } = await _web3Provider.getNetwork();

    _web3Provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });

    console.log(
      "Web3 Connect Done - ",
      "networkName:",
      name,
      "- chainId:",
      chainId,
      "- address:",
      currentAddress
    );

    setContext({
      web3Provider: _web3Provider,
      provider: _provider,
      signer: _signer,
      address: currentAddress,
      network: {
        name,
        id: chainId,
      },
    });
  }, []);

  const disconnect = async () => {
    console.log('disconnect')
    try {
      if(provider && provider.close)
        await provider.close();

      if(web3Provider && web3Provider.close)
        await web3web3Provider.close();

      await web3Modal.clearCachedProvider();
    } catch (err) {
      console.error('Error disconnect wallet', err);
    }
    setContext({});
    window.localStorage.clear();
  }

  useEffect(() => {
    if (shouldConnectToCachedProvider && web3Modal.cachedProvider) {
      connect();
    }
  }, [shouldConnectToCachedProvider, connect]);

  return {
    connect,
    disconnect,
    isConnected: web3Provider && address,
  };
}

export function useWallet() {
  const { address } = useContext(AppContext);

  if (!address) return {};

  return {
    address,
    truncatedAddress: computeTruncatedAccountId(address),
  };
}

export function useNetwork() {
  const { network } = useContext(AppContext);

  if (!network) return {};

  let switchToSupportedNetwork;

  if (window.ethereum) {
    switchToSupportedNetwork = async () => {
      const provider = window.ethereum;

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: NETWORK.chainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [NETWORK],
            });
          } catch (addError) {
            console.log(addError);
          }
        }
        console.log(switchError);
      }
    };
  }

  console.log(
    "useNetwork",
    network.id === Number(NETWORK.chainId),
    Number(NETWORK.chainId)
  );
  return {
    isEthereumNetwork: network.id === Number(NETWORK.chainId),
    switchToSupportedNetwork,
    ...network,
  };
}

export const MINT_STATUS = {
  SUBMITED: "SUBMITED",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export function useMint(tokenId) {
  const { signer, address } = useContext(AppContext);

  const [mintStatus, setMintStatus] = useState(null);
  const [error, setError] = useState(null);
  const [mintedToken, setMintedToken] = useState(null);

  const contract = useMemo(() => {
    if (!signer) return null;
    return new Contract(SMARTCONTRACT_ADDRESS, ABI, signer);
  }, [signer]);

  const mint = useCallback(async () => {
    try {
      console.log(contract);
      setMintedToken(null);
      setError(null);
      setMintStatus(MINT_STATUS.SUBMITED);
      const mint = await contract.mint(address, tokenId, {
        value: utils.parseEther(PRICE[tokenId]),
        gasLimit: 300000,
      });
      setMintStatus(MINT_STATUS.PENDING);
      const txReciept = await mint.wait();
      console.log("txReciept", txReciept);
      setMintStatus(MINT_STATUS.SUCCESS);
      const mintedEvent = parseMintEvent(contract, txReciept);
      if (!mintedEvent) return;
      console.log("event", mintedEvent);
      const _mintedTokenId = mintedEvent.args.tokenId;
      setMintedToken({
        id: _mintedTokenId.toNumber(),
        type: mintedEvent.args.tokenType
      });
    } catch (error) {
      console.error(error);
      setMintStatus(MINT_STATUS.FAILED);
      setError(error.message);
    }
  }, [contract]);

  return { mint, mintStatus, error, mintedToken };
}
