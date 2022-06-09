import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { TokenInfo } from "./helpers/smartContract";
import { Oval } from "react-loader-spinner";
import { MINT_STATUS } from "./AppContext";

const customStyles = {
  content: {
    zIndex: "9999",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: "500px",
    maxWidth: "700px",
    padding: "48px 90px",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#react-tx-modal");

const flexCenteredStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Loader = ({ title, content }) => (
  <div style={{ ...flexCenteredStyle, flexDirection: "column" }}>
    <Oval
      ariaLabel="loading-indicator"
      height={56}
      width={56}
      strokeWidth={8}
      color="#2c5a52"
      secondaryColor="#cfd1d5"
    />
    <h3 className="mint-modal-title">{title}</h3>
    <p className="mint-modal-content">
      {content}
    </p>
  </div>
);

const DisplayError = ({ message, onClose }) => (
  <div style={{ ...flexCenteredStyle, flexDirection: "column" }}>
    <h3 className="mint-modal-title" style={{ color: "#F43F5E" }}>
      Minting Error!
    </h3>
    {message && <p className="mint-modal-content">{message}</p>}
    <button
      className="primary-button freight-text mint-modal-close-btn"
      style={{ backgroundColor: "#F43F5E" }}
      onClick={onClose}
    >
      Close
    </button>
  </div>
);

const MintSuccess = ({ mintedToken, onClose }) => (
  <div style={{ ...flexCenteredStyle, flexDirection: "column" }}>
    {mintedToken && TokenInfo[mintedToken.type] && <img src={TokenInfo[mintedToken.type].asset} />}
    <h3 className="mint-modal-title">
      Minting Successful!
    </h3>
    <p className="mint-modal-content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi labore quo, magni nobis itaque aspernatur optio corporis</p>
    <button
      className="primary-button freight-text mint-modal-close-btn"
      onClick={onClose}
    >
      Close
    </button>
  </div>
);

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
      <div style={{ ...flexCenteredStyle }}>
        {mintStatus === MINT_STATUS.SUBMITED && <Loader title="Please approve transaction" content="Lorem, ipsum dolor sit amet consectetur adipisicing elit." />}
        {mintStatus === MINT_STATUS.FAILED && <DisplayError message={error} onClose={requestClose} />}
        {mintStatus === MINT_STATUS.PENDING && <Loader title="Loading..." content="Please wait while we process your mint." />}
        {mintStatus === MINT_STATUS.SUCCESS && <MintSuccess mintedToken={mintedToken} onClose={requestClose} />}
      </div>
    </Modal>
  );
}

export default MintModal;
