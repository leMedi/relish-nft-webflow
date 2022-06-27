import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSmartContract } from "./SmartContractContext";

export const TokenLevelPriceUSD = ({ tokenType }) => {
  const { mintInfo, usdPrice } = useSmartContract();
  const [tokenPrice, setTokenPrice] = useState("0");

  useEffect(() => {
    if (!mintInfo || !usdPrice) return;
    const tokenPrice = mintInfo[tokenType * 2 + 1];
    const tokenUsdPrice =
      Number(ethers.utils.formatEther(tokenPrice)) * usdPrice;
    setTokenPrice(tokenUsdPrice.toFixed(3));
  }, [mintInfo, usdPrice]);

  return <div className="text-block-26">$ {tokenPrice}</div>;
};

export default TokenLevelPriceUSD;
