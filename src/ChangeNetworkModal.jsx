import React from "react";
import Modal from "react-modal";
import { useConnect, useNetwork } from "./AppContext";
import NETWORK from "./helpers/chain";

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
      <h2>Network {name} not supported</h2>
      {switchToSupportedNetwork && (
        <button
          className="primary-button freight-text w-button"
          onClick={switchToSupportedNetwork}
        >
          Switch to {NETWORK.chainName}
        </button>
      )}
    </Modal>
  );
}

export default ChangeNetworkModal;
