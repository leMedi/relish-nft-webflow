import React, { useEffect, useState } from "react";
import { useSmartContract } from "./AppContext";
import { TOKEN, TokenInfo } from "./helpers/smartContract";

export const TokensLeftForLevel = ({tokenType}) => {
  const contract = useSmartContract();
  const [totalLeft, setTotalLeft] = useState('0');

  useEffect(() => {
    const loadData = async () => {
      if(!contract) return;
      const result = await contract.mintInfo();
      let count =  result[tokenType*2];
      console.log('loadData totalTokensLeft for', tokenType, ':', count);
      setTotalLeft(count.toNumber());
    }

    loadData().catch(console.error);
  }, [contract]);

  return (
    <>{totalLeft}/{TokenInfo[tokenType].total}</>
  );
};

export default TokensLeftForLevel;
