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

const mintBtnInvestorNode = prepareDiv("mint-btn-investor");
const mintBtnRestaurantNode = prepareDiv("mint-btn-restaurant");
const mintBtnArtistNode = prepareDiv("mint-btn-artist");

const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
root.render(
  <>
    <AppProvider>
      {connectBtnNode && createPortal(<ConnectBtn />, connectBtnNode)}
      {mintBtnInvestorNode && createPortal(<MintBtn tokenId={TOKEN.INVESTOR} />, mintBtnInvestorNode)}
      {mintBtnRestaurantNode && createPortal(
        <MintBtn tokenId={TOKEN.RESTAURANT} />,
        mintBtnRestaurantNode
      )}
      {mintBtnArtistNode && createPortal(<MintBtn tokenId={TOKEN.ARTIST} />, mintBtnArtistNode)}
      <ChangeNetworkModal />
    </AppProvider>
  </>
);
