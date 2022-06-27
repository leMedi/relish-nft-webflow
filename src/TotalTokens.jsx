import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";

export const TotalTokens = () => {
  const {contract} = useSmartContract();
  const [totalTokens, setTotalTokens] = useState('0');

  useEffect(() => {
    const loadData = async () => {
      if(!contract) return;

      const totalTokens = await contract.totalSupply();
      console.log('loadData totalTokens', totalTokens);
      setTotalTokens(totalTokens.toNumber());
    }

    loadData().catch(console.error);
  }, [contract]);

  return (
    <div className="text-block-21">{totalTokens}</div>
  );
};

export default TotalTokens;
