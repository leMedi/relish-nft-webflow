import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { TokenInfo } from "./helpers/smartContract";
import { RiLoader3Fill } from 'react-icons/ri';

const customStyles = {
  content: {
    zIndex: '9999',
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: "450px",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#react-tx-modal");

const MintStatusMessages = {
  SUBMITED: "Please approve transaction",
  PENDING: "Minting ...",
  SUCCESS: "Mint successful!",
  FAILED: "Sorry, an error occurred",
};

const ShowToken = ({ tokenType }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={TokenInfo[tokenType].asset}
      />
      <h3 style={{ color: "#2c5a52" }}>{TokenInfo[tokenType].name}</h3>
    </div>
  );
};

export function MintModal({ error, mintStatus, mintedToken }) {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    if (mintStatus !== "FAILED" && mintStatus !== "SUCCESS") setOpen(true);
  }, [mintStatus]);

  function requestClose() {
    if (mintStatus === "FAILED" || mintStatus === "SUCCESS") setOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={requestClose}
      style={customStyles}
      contentLabel="Nework Modal"
    >
      <h2 style={{ fontSize: '1em' }}>{MintStatusMessages[mintStatus]}</h2>
      {error && <p className="error-msg">{error}</p>}
      {mintStatus === "PENDING" && (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
        <RiLoader3Fill className="rotate" color="#2c5a52" style={{fontSize: "40px"}} />
      </div>)}
      {mintedToken && <ShowToken tokenType={mintedToken.type} tokenId={mintedToken.id} />}
    </Modal>
  );
}

export default MintModal;
