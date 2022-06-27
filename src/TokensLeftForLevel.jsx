import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";
import { TOKEN, TokenInfo } from "./helpers/smartContract";

export const TokensLeftForLevel = ({ tokenType }) => {
  const { contract, mintInfo } = useSmartContract();
  const [totalLeft, setTotalLeft] = useState("0");

  useEffect(() => {
    if (!mintInfo) return;
    let count = mintInfo[tokenType * 2];
    setTotalLeft(count.toNumber());
  }, [mintInfo]);

  return (
    <>
      {totalLeft}/{TokenInfo[tokenType].total}
    </>
  );
};

export default TokensLeftForLevel;
