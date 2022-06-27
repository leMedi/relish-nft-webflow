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

export const SmartContractContext = createContext();

export function SmartContractProvider({ children }) {
  const [context, setContext] = useState({});
  const value = { ...context, setContext };
  return (
    <SmartContractContext.Provider value={value}>
      {children}
    </SmartContractContext.Provider>
  );
}

const noSignerProvider = new providers.AlchemyProvider(
  "rinkeby",
  "njXvjmtpVNQBph_dw1gdkZ7qeHzsbbc_"
);

export const useSmartContract = () => {
  const { setContext, ...context } = useContext(SmartContractContext);

  console.log("useSmartContractcontext", context);

  const contract = useMemo(() => {
    if (!noSignerProvider) return null;
    return new Contract(SMARTCONTRACT_ADDRESS, ABI, noSignerProvider);
  }, [noSignerProvider]);

  const getMintInfo = useCallback(async () => {
    try {
      if (!contract) return;
      const info = await contract.mintInfo();
      setContext({ ...context, mintInfo: info });
    } catch (error) {
      console.error(error);
    }
  }, [contract]);

  useEffect(() => {
    getMintInfo();
  }, [contract]);

  return { ...context, contract, getMintInfo };
};
