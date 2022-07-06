import React, { useEffect, useState } from "react";
import { MINT_STATUS, useConnect, useMint } from "./AppContext";
import { TOKEN, TokenInfo } from "./helpers/smartContract";
import MintModal from "./MintModal";
import { useSmartContract } from "./SmartContractContext";

export const MintBtn = ({ tokenId }) => {
  const { isConnected, connect } = useConnect();
  const [shouldMintAfterConnect, setShouldMintAfterConnect] = useState(false);
  const { mint, mintStatus, error, mintedToken } = useMint(tokenId);
  const { mintInfo } = useSmartContract();
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!mintInfo) return;
    let count = mintInfo[tokenId * 2];
    if(TokenInfo[tokenId].total === count.toNumber()) {
      setIsEnabled(false);
      console.log('lint disabled for token', tokenId);
    }
  }, [mintInfo]);

  // return (
  //   <>
  //     {totalLeft}/{TokenInfo[tokenType].total}
  //   </>
  // );

  useEffect(() => {
    console.log('mint', 'useEffect', isConnected && shouldMintAfterConnect, {isConnected, shouldMintAfterConnect});
    if (isConnected && shouldMintAfterConnect) {
      mint();
      setShouldMintAfterConnect(false);
    }
  }, [isConnected, shouldMintAfterConnect]);

  const doMint = async () => {
    if(!isEnabled) return;
    if (!isConnected) {
      console.log('mint', 'not connected');
      await connect();
      return setShouldMintAfterConnect(true);
    }
    mint();
  };

  return (
    <>
      <a
        className={`primary-button freight-text mint-btn mint ${isEnabled ? '' : 'disabled'}`}
        href="#"
        onClick={doMint}
        disabled={!isEnabled}
      >
        Mint now
      </a>
      {isConnected && mintStatus && (
        <MintModal
          error={error}
          mintStatus={mintStatus}
          mintedToken={mintedToken}
        />
      )}
    </>
  );
};

export default MintBtn;
