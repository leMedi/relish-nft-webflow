import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSmartContract } from "./AppContext";

export const EthRaised = () => {
  const [ethRaised, setEthRaised] = useState('0');
  const contract = useSmartContract();

  useEffect(() => {
    const loadData = async () => {
      if(!contract) return;
      const [
        l1Count, l1Price,
        l2Count, l2Price,
        l3Count, l3Price,
      ] = await contract.mintInfo();
      console.log('loadData EthRaised', [
        l1Count, l1Price,
        l2Count, l2Price,
        l3Count, l3Price,
      ])
      const totalEthRaised = l1Count * l1Price + l2Count * l2Price + l3Count * l3Price;
      console.log('loadData totalEthRaised', totalEthRaised);
      setEthRaised(ethers.utils.formatEther(totalEthRaised));
    }

    loadData();
  }, [contract]);

  return (
    <div className="text-block-21">{ethRaised}</div>
  );
};

export default EthRaised;
