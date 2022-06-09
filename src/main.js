import React from "react";
import { createPortal } from "react-dom";
import * as ReactDOMClient from "react-dom/client";

import ConnectBtn from "./ConnectBtn";
import MintBtn from "./MintBtn";
import EthRaised from "./EthRaised";
import TotalTokensLeft from "./TotalTokensLeft";
// import Owners from "./Owners";
import { AppProvider } from "./AppContext";
import ChangeNetworkModal from "./ChangeNetworkModal";
import { TOKEN } from "./helpers/smartContract";

const prepareDiv = (id) => {
  const div = document.getElementById(id);
  if (div) div.innerHTML = "";
  return div;
};

const connectBtnNode = prepareDiv("header-web3-btn");

const mintBtnLevel1Node = prepareDiv("mint-btn-level1");
const mintBtnLevel2Node = prepareDiv("mint-btn-level2");
const mintBtnLevel3Node = prepareDiv("mint-btn-level3");

const totalEthRaisedNode = prepareDiv("total-eth-raised");
const totalTokensLeftNode = prepareDiv("total-tokens-left");

const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
root.render(
  <>
    {totalEthRaisedNode && createPortal(<EthRaised />, totalEthRaisedNode)}
    {totalTokensLeftNode && createPortal(<TotalTokensLeft />, totalTokensLeftNode)}
    <AppProvider>
      {connectBtnNode && createPortal(<ConnectBtn />, connectBtnNode)}
      {mintBtnLevel1Node &&
        createPortal(<MintBtn tokenId={TOKEN.LEVEL1} />, mintBtnLevel1Node)}
      {mintBtnLevel2Node &&
        createPortal(<MintBtn tokenId={TOKEN.LEVEL2} />, mintBtnLevel2Node)}
      {mintBtnLevel3Node &&
        createPortal(<MintBtn tokenId={TOKEN.LEVEL3} />, mintBtnLevel3Node)}
      <ChangeNetworkModal />
    </AppProvider>
  </>
);
