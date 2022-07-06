import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";

export const EthRaised = () => {
  const [ethRaised, setEthRaised] = useState("0");
  const { mintInfo } = useSmartContract();

  useEffect(() => {
    if (!mintInfo) return;
    console.log('EthRaised mintInfo', mintInfo);
    const [l1Count, l1Price, l2Count, l2Price, l3Count, l3Price] = mintInfo;
    console.log("EthRaised l1Count", l1Count.toNumber());
    console.log("EthRaised l1Price", l1Price.toString());

    const totalEthRaised =
      l1Count * l1Price + l2Count * l2Price + l3Count * l3Price;
    console.log("loadData totalEthRaised", totalEthRaised);
    setEthRaised(ethers.utils.formatEther(totalEthRaised.toString()));
  }, [mintInfo]);

  return <div className="text-block-21">{ethRaised}</div>;
};

export default EthRaised;
