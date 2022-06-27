import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";

export const EthRaised = () => {
  const [ethRaised, setEthRaised] = useState("0");
  const { mintInfo } = useSmartContract();

  useEffect(() => {
    if (!mintInfo) return;
    const [l1Count, l1Price, l2Count, l2Price, l3Count, l3Price] = mintInfo;
    const totalEthRaised =
      l1Count * l1Price + l2Count * l2Price + l3Count * l3Price;
    console.log("loadData totalEthRaised", totalEthRaised);
    setEthRaised(ethers.utils.formatEther(totalEthRaised));
  }, [mintInfo]);

  return <div className="text-block-21">{ethRaised}</div>;
};

export default EthRaised;
