import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { TokenInfo } from "./helpers/smartContract";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#react-tx-modal");

const MintStatusMessages = {
  SUBMITED: "Please Accept Transaction",
  PENDING: "Transactions sent to blockchain",
  SUCCESS: "Yaaay new token minted",
  FAILED: "Ouups",
};

const ShowToken = ({ tokenId }) => {
  return (
    <div>
      <img
        src={`https://cloudflare-ipfs.com/ipfs/QmNdqjqUgc1Zp2WSugFdnA8qTFzXzY1NQtQVCwqzBxVKBJ/${tokenId}.json`}
      />
      <h3 style={{ color: "#1783d6" }}>{TokenInfo[tokenId].name}</h3>
    </div>
  );
};

export function MintModal({ error, mintStatus, mintedToken }) {
  const [isOpen, setOpen] = useState(true);
  console.log("mintedToken", mintedToken);

  useEffect(() => {
    if (mintStatus !== "FAILED") setOpen(true);
  }, [mintStatus]);

  function requestClose() {
    if (mintStatus === "FAILED") setOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={requestClose}
      style={customStyles}
      contentLabel="Nework Modal"
    >
      <h2>{MintStatusMessages[mintStatus]}</h2>
      {error && <p className="error-msg">{error}</p>}
      {mintedToken && <ShowToken tokenId={mintedToken.id} />}
    </Modal>
  );
}

export default MintModal;
