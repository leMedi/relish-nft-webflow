import React, { useEffect, useState } from "react";
import { MINT_STATUS, useConnect, useMint } from "./AppContext";
import { TOKEN } from "./helpers/smartContract";
import MintModal from "./MintModal";

const BUTTOM_MSG = {
  [MINT_STATUS.PENDING]: "Minting ...",
  [MINT_STATUS.SUBMITED]: "Minting ...",
};

export const MintBtn = ({ tokenId }) => {
  const { isConnected, connect } = useConnect();
  const [shouldMintAfterConnect, setShouldMintAfterConnect] = useState(false);
  const { mint, mintStatus, error, mintedToken } = useMint(tokenId);

  useEffect(() => {
    console.log('mint', 'useEffect', isConnected && shouldMintAfterConnect, {isConnected, shouldMintAfterConnect});
    if (isConnected && shouldMintAfterConnect) {
      mint();
      setShouldMintAfterConnect(false);
    }
  }, [isConnected, shouldMintAfterConnect]);

  const doMint = async () => {
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
        className="primary-button freight-text w-button"
        href="#"
        onClick={doMint}
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
