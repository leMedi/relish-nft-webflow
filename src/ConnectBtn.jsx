import React from "react";
import { ImExit } from "react-icons/im";
import { flexCenteredStyle } from './helpers/styles'

import { useConnect, useWallet } from "./AppContext";

export const ConnectBtn = () => {
  const { connect, isConnected, disconnect } = useConnect(true);
  const { truncatedAddress } = useWallet();

  if (isConnected)
    return (
      <div className="wallet-info" style={{ ...flexCenteredStyle }}>
        <span className="text-block-25" style={{ fontSize: "19px" }}>{truncatedAddress}</span>
        <a
          className="text-block-25"
          style={{
            ...flexCenteredStyle,
            fontSize: "18px",
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
