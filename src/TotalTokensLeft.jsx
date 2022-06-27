import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";

export const TotalTokensLeft = () => {
  const {contract} = useSmartContract();
  const [totalLeft, setTotalLeft] = useState('0');

  useEffect(() => {
    const loadData = async () => {
      if(!contract) return;
      const totalTokensLeft = await contract.totalTokensLeft();
      console.log('loadData totalTokensLeft', totalTokensLeft);
      setTotalLeft(totalTokensLeft.toNumber());
    }

    loadData().catch(console.error);
  }, [contract]);

  return (
    <div className="text-block-22">{totalLeft} left</div>
  );
};

export default TotalTokensLeft;
