import React from "react";
import { Contract, providers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ABI, SMARTCONTRACT_ADDRESS } from "./helpers/smartContract";

export const SmartContractContext = createContext();

export function SmartContractProvider({ children }) {
  const [context, setContext] = useState({});
  const [usdPrice, setUsdPrice] = useState(null);

  const getUsdPrice = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=ETH-USDT"
      )
        .then((response) => response.json())
        .then((data) => data.tickers[0]);
      setUsdPrice(Number(response.price));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getUsdPrice();
  }, []);

  const value = { ...context, usdPrice, setContext };

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
