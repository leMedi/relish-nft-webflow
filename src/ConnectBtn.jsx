import React from "react";

import { useConnect, useWallet } from "./AppContext";

export const ConnectBtn = () => {
  const { connect, isConnected } = useConnect(true);
  const { truncatedAddress } = useWallet();

  if (isConnected)
    return (
      <div className="wallet-info">
        <span className="text-block-25">{truncatedAddress}</span>
      </div>
    );

  return (
    <a className="primary-button small w-button" href="#" onClick={connect}>
      CONNECT WALLET
    </a>
  );
};

export default ConnectBtn;
