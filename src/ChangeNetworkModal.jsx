import React from "react";
import Modal from "react-modal";
import { useConnect, useNetwork } from "./AppContext";
import NETWORK from "./helpers/chain";
import { flexCenteredStyle } from './helpers/styles'

const customStyles = {
  content: {
    zIndex: "9999",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#react-newtork-modal");

export function ChangeNetworkModal() {
  const { isConnected } = useConnect();
  const { isEthereumNetwork, switchToSupportedNetwork, name } = useNetwork();

  function closeModal() {}

  return (
    <Modal
      isOpen={isConnected && !isEthereumNetwork}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Nework Modal"
    >
      <div style={{...flexCenteredStyle, flexDirection: "column"}}>
        <h2 className="mint-modal-title">Network {name} not supported</h2>
        {switchToSupportedNetwork && (
          <button
            className="primary-button freight-text w-button"
            style={{ fontSize: '18px' }}
            onClick={switchToSupportedNetwork}
          >
            Switch to {NETWORK.chainName}
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ChangeNetworkModal;
