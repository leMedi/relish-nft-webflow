import React from "react";
import { ImExit } from "react-icons/im";

import { useConnect, useWallet } from "./AppContext";

export const ConnectBtn = () => {
  const { connect, isConnected, disconnect } = useConnect(true);
  const { truncatedAddress } = useWallet();

  if (isConnected)
    return (
      <div className="wallet-info">
        <span className="text-block-25">{truncatedAddress}</span>
        <a
          className="text-block-25"
          style={{
            fontSize: "22px",
            marginLeft: "15px",
          }}
          href="#"
          onClick={disconnect}
        >
          <ImExit />
        </a>
      </div>
    );

  return (
    <a className="primary-button small w-button" href="#" onClick={connect}>
      CONNECT WALLET
    </a>
  );
};

export default ConnectBtn;
