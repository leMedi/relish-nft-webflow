import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { TokenInfo } from "./helpers/smartContract";
import { Oval } from "react-loader-spinner";
import { MINT_STATUS } from "./AppContext";
import ErrorIcon from "./assets/error.svg";
import CloseIcon from "./assets/close.svg";
import { flexCenteredStyle } from './helpers/styles'

const genModalStyles = (status) => {
  const isSuccess = status === MINT_STATUS.SUCCESS;
  return {
    content: {
      borderRadius: "0",
      zIndex: "9999",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      minWidth: !isSuccess ? "750px" : undefined,
      maxWidth: !isSuccess ? "850px" : undefined,
      maxWidth: isSuccess ? "450px" : undefined,
      padding: "14px 16px",
      textAlign: "center",
      transform: "translate(-50%, -50%)",
    },
  };
};

Modal.setAppElement("#react-tx-modal");

const Loader = ({ title, content }) => (
  <div style={{ padding: "18px 26px", width: "100%", boxSizing: "border-box" }}>
    <div
      style={{
        ...flexCenteredStyle,
        boxSizing: "border-box",
        padding: "48px 19px",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#F8FFFE",
      }}
    >
      <Oval
        ariaLabel="loading-indicator"
        height={56}
        width={56}
        strokeWidth={8}
        color="#2c5a52"
        secondaryColor="#cfd1d5"
      />
      <h3 className="mint-modal-title">{title}</h3>
      <p className="mint-modal-content">{content}</p>
    </div>
  </div>
);

const Loader2 = ({ title, content }) => (
  <div
    style={{
      ...flexCenteredStyle,
      flexDirection: "column",
      backgroundColor: "#F8FFFE",
    }}
  >
    <h3 className="mint-modal-title">{title}</h3>
    <p className="mint-modal-content">{content}</p>
  </div>
);

const DisplayError = ({ message, onClose }) => (
  <div style={{ ...flexCenteredStyle, flexDirection: "column" }}>
    <div style={{ ...flexCenteredStyle, width: "100%", justifyContent: "end" }}>
      <a href="#" onClick={onClose}>
        <CloseIcon />
      </a>
    </div>
    <div
      style={{ padding: "0 22px 28px", width: "100%", boxSizing: "border-box" }}
    >
      <div
        style={{
          ...flexCenteredStyle,
          boxSizing: "border-box",
          padding: "48px 19px",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#FFF9F8",
        }}
      >
        <ErrorIcon />
        <h3 className="mint-modal-title" style={{ color: "#F43F5E" }}>
          Minting Error!
        </h3>
        {message && <p className="mint-modal-content">{message}</p>}
      </div>
    </div>
  </div>
);

const MintSuccess = ({ mintedToken, onClose }) => (
  <div
    style={{
      ...flexCenteredStyle,
      flexDirection: "column",
      boxSizing: "border-box",
      padding: "34px 38px",
    }}
  >
    {mintedToken && TokenInfo[mintedToken.type] && (
      <img alt="minted token" src={TokenInfo[mintedToken.type].asset} />
    )}
    <div style={{ width: "100%", textAlign: "center" }}>
      <h3 className="mint-modal-title">MINTING SUCCESSFUL!</h3>
      {/* <p className="mint-modal-content">MINTING SUCCESSFUL!</p> */}
    </div>
    {/* <div
      style={{
        ...flexCenteredStyle,
        marginTop: "48px",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <button
        className="primary-button freight-text mint-modal-btn secondary"
      >
        Secondary CTA
      </button>

      <button
        className="primary-button freight-text mint-modal-btn"
      >
        See more
      </button>
    </div> */}
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
      style={{
        ...genModalStyles(mintStatus),
      }}
      contentLabel="Nework Modal"
    >
      {mintStatus === MINT_STATUS.SUBMITED && (
        <Loader
          title="Please approve transaction"
          content=""
        />
      )}
      {mintStatus === MINT_STATUS.FAILED && (
        <DisplayError message={error} onClose={requestClose} />
      )}
      {mintStatus === MINT_STATUS.PENDING && (
        <Loader
          title="Loading..."
          content="Please wait while we process your mint."
        />
      )}
      {mintStatus === MINT_STATUS.SUCCESS && (
        <MintSuccess mintedToken={mintedToken} onClose={requestClose} />
      )}
    </Modal>
  );
}

export default MintModal;
