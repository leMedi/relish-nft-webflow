import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";

export const TokenLevelPrice = ({tokenType}) => {
  const {mintInfo} = useSmartContract();
  const [tokenPrice, setTokenPrice] = useState("0");

  useEffect(() => {
    if (!mintInfo) return;
    const tokenPrice = mintInfo[tokenType * 2 + 1];
    console.log("loadData token level", tokenType, tokenPrice);
    setTokenPrice(ethers.utils.formatEther(tokenPrice));
  }, [mintInfo]);

  return (
    <div className="text-block-25">{tokenPrice} ETH</div>
  );
};

export default TokenLevelPrice;
