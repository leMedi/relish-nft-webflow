import React from "react";
import { createPortal } from "react-dom";
import * as ReactDOMClient from "react-dom/client";

import { AppProvider } from "./AppContext";
import ChangeNetworkModal from "./ChangeNetworkModal";
import ConnectBtn from "./ConnectBtn";
import EthRaised from "./EthRaised";
import { TOKEN } from "./helpers/smartContract";
import MintBtn from "./MintBtn";
import Owners from "./Owners";
import { SmartContractProvider } from "./SmartContractContext";
import TokenLevelPrice from "./TokenLevelPrice";
import TokenLevelPriceUSD from "./TokenLevelPriceUSD";
import TokensLeftForLevel from "./TokensLeftForLevel";
import TotalTokens from "./TotalTokens";
import TotalTokensLeft from "./TotalTokensLeft";

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
const tokenOwnersNode = prepareDiv("token-owners");

const tokenLevel1PriceNode = prepareDiv("token-level1-price");
const tokenLevel2PriceNode = prepareDiv("token-level2-price");
const tokenLevel3PriceNode = prepareDiv("token-level3-price");

const tokenLevel1PriceUsdNode = prepareDiv("token-level1-price-usd");
const tokenLevel2PriceUsdNode = prepareDiv("token-level2-price-usd");
const tokenLevel3PriceUsdNode = prepareDiv("token-level3-price-usd");


const root = ReactDOMClient.createRoot(document.getElementById("react-root"));
root.render(
  <>
    <SmartContractProvider>
      {tokenLevel1PriceNode && createPortal(<TokenLevelPrice tokenType={TOKEN.LEVEL1} />, tokenLevel1PriceNode)}
      {tokenLevel2PriceNode && createPortal(<TokenLevelPrice tokenType={TOKEN.LEVEL2} />, tokenLevel2PriceNode)}
      {tokenLevel3PriceNode && createPortal(<TokenLevelPrice tokenType={TOKEN.LEVEL3} />, tokenLevel3PriceNode)}

      {tokenLevel1PriceUsdNode && createPortal(<TokenLevelPriceUSD tokenType={TOKEN.LEVEL1} />, tokenLevel1PriceUsdNode)}
      {tokenLevel2PriceUsdNode && createPortal(<TokenLevelPriceUSD tokenType={TOKEN.LEVEL2} />, tokenLevel2PriceUsdNode)}
      {tokenLevel3PriceUsdNode && createPortal(<TokenLevelPriceUSD tokenType={TOKEN.LEVEL3} />, tokenLevel3PriceUsdNode)}

      {totalEthRaisedNode && createPortal(<EthRaised />, totalEthRaisedNode)}
      {totalTokensNode &&
        createPortal(<TotalTokens />, totalTokensNode)}
      {totalTokensLeftNode &&
        createPortal(<TotalTokensLeft />, totalTokensLeftNode)}
      {tokenOwnersNode && createPortal(<Owners />, tokenOwnersNode)}
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
    </SmartContractProvider>
  </>
);
