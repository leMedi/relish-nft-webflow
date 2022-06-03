import React from "react";
import { createPortal } from "react-dom";
import * as ReactDOMClient from "react-dom/client";

import ConnectBtn from "./ConnectBtn";
import MintBtn from "./MintBtn";
import { AppProvider } from "./AppContext";
import ChangeNetworkModal from "./ChangeNetworkModal";
import { TOKEN } from "./helpers/smartContract";

const prepareDiv = (id) => {
  const div = document.getElementById(id);
  if (div) div.innerHTML = "";
  return div;
};

const connectBtnNode = prepareDiv("header-web3-btn");

const mintBtnFanNode = prepareDiv("mint-btn-fan");
const mintBtnRegularNode = prepareDiv("mint-btn-regular");
const mintBtnVipNode = prepareDiv("mint-btn-vip");

const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
root.render(
  <>
    <AppProvider>
      {connectBtnNode && createPortal(<ConnectBtn />, connectBtnNode)}
      {mintBtnFanNode && createPortal(<MintBtn tokenId={TOKEN.FAN} />, mintBtnFanNode)}
      {mintBtnRegularNode && createPortal(
        <MintBtn tokenId={TOKEN.REGULAR} />,
        mintBtnRegularNode
      )}
      {mintBtnVipNode && createPortal(<MintBtn tokenId={TOKEN.VIP} />, mintBtnVipNode)}
      <ChangeNetworkModal />
    </AppProvider>
  </>
);
