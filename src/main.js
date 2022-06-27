import React from "react";
import { createPortal } from "react-dom";
import * as ReactDOMClient from "react-dom/client";

import ConnectBtn from "./ConnectBtn";
import MintBtn from "./MintBtn";
import EthRaised from "./EthRaised";
import TotalTokens from "./TotalTokens";
import TotalTokensLeft from "./TotalTokensLeft";
import TokenLevelPrice from "./TokenLevelPrice";
import Owners from "./Owners";
import { AppProvider } from "./AppContext";
import ChangeNetworkModal from "./ChangeNetworkModal";
import { TOKEN } from "./helpers/smartContract";
import TokensLeftForLevel from "./TokensLeftForLevel";
import { SmartContractProvider } from "./SmartContractContext";

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
const totalTokensNode = prepareDiv("total-tokens");
const totalTokensLeftNode = prepareDiv("total-tokens-left");
const tokensLevel1Node = prepareDiv("tokens-level1");
const tokensLevel2Node = prepareDiv("tokens-level2");
const tokensLevel3Node = prepareDiv("tokens-level3");
const tokenOwnersLeftNode = prepareDiv("token-owners");

const tokenLevel1PriceNode = prepareDiv("token-level1-price");
const tokenLevel2PriceNode = prepareDiv("token-level2-price");
const tokenLevel3PriceNode = prepareDiv("token-level3-price");


const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
root.render(
  <>
    <SmartContractProvider>
    {tokenLevel1PriceNode && createPortal(<TokenLevelPrice tokenType={TOKEN.LEVEL1} />, tokenLevel1PriceNode)}
    {tokenLevel2PriceNode && createPortal(<TokenLevelPrice tokenType={TOKEN.LEVEL2} />, tokenLevel2PriceNode)}
    {tokenLevel3PriceNode && createPortal(<TokenLevelPrice tokenType={TOKEN.LEVEL3} />, tokenLevel3PriceNode)}

    {totalEthRaisedNode && createPortal(<EthRaised />, totalEthRaisedNode)}
    {totalTokensNode &&
      createPortal(<TotalTokens />, totalTokensNode)}
    {totalTokensLeftNode &&
      createPortal(<TotalTokensLeft />, totalTokensLeftNode)}
    {tokenOwnersLeftNode && createPortal(<Owners />, tokenOwnersLeftNode)}
    {tokensLevel1Node &&
      createPortal(
        <TokensLeftForLevel tokenType={TOKEN.LEVEL1} />,
        tokensLevel1Node
      )}
    {tokensLevel2Node &&
      createPortal(
        <TokensLeftForLevel tokenType={TOKEN.LEVEL2} />,
        tokensLevel2Node
      )}
    {tokensLevel3Node &&
      createPortal(
        <TokensLeftForLevel tokenType={TOKEN.LEVEL3} />,
        tokensLevel3Node
      )}
    </SmartContractProvider>

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
