import React from "react";
import { MINT_STATUS, useConnect, useMint } from "./AppContext";
import { TOKEN } from "./helpers/smartContract";
import MintModal from "./MintModal";

const BUTTOM_MSG = {
  [MINT_STATUS.PENDING]: "Minting ...",
  [MINT_STATUS.SUBMITED]: "Minting ...",
};

export const MintBtn = ({ tokenId }) => {
  const { isConnected, connect } = useConnect();
  const { mint, mintStatus, error, mintedToken } = useMint(tokenId);

  const doMint = async () => {
    if (!isConnected) await connect();
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
