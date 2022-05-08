import React from "react";
import { createPortal } from "react-dom";
import * as ReactDOMClient from "react-dom/client";

import ConnectBtn from "./ConnectBtn";
import MintBtn from "./MintBtn";
import { AppProvider } from "./AppContext";
import ChangeNetworkModal from "./ChangeNetworkModal";
import { TOKEN } from "./helpers/smartContract";

const connectBtnNode = document.getElementById("header-web3-btn");
const mintBtnInvestorNode = document.getElementById("mint-btn-investor");
const mintBtnRestaurantNode = document.getElementById("mint-btn-restaurant");
const mintBtnArtistNode = document.getElementById("mint-btn-artist");
const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
root.render(
  <>
    <AppProvider>
      {createPortal(<ConnectBtn />, connectBtnNode)}
      {createPortal(<MintBtn tokenId={TOKEN.INVESTOR} />, mintBtnInvestorNode)}
      {createPortal(
        <MintBtn tokenId={TOKEN.RESTAURANT} />,
        mintBtnRestaurantNode
      )}
      {createPortal(<MintBtn tokenId={TOKEN.ARTIST} />, mintBtnArtistNode)}
      <ChangeNetworkModal />
    </AppProvider>
  </>
);
