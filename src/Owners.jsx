import React, { useEffect, useState } from "react";
import { useSmartContract } from "./SmartContractContext";
import { TOKEN, TokenInfo } from "./helpers/smartContract";
import { computeTruncatedAccountId } from "./helpers/wallet";

const Owner = ({ address, type }) => (
  <div class="div-block-30">
    <div>
      <div class="text-block-28">No username</div>
      <div class="text-block-29">{computeTruncatedAccountId(address)}</div>
    </div>
    <div class="text-block-28">{TokenInfo[type].name}</div>
  </div>
);

export const Owners = () => {
  const [showAll, setShowAll] = useState(false);
  const [owners, setOwners] = useState([]);
  const {contract} = useSmartContract();

  useEffect(() => {
    const loadData = async () => {
      if (!contract) return;
      const [L1Owners, L2Owners, L3Owners] = await Promise.all([
        contract.currentOwnersForType(TOKEN.LEVEL1),
        contract.currentOwnersForType(TOKEN.LEVEL2),
        contract.currentOwnersForType(TOKEN.LEVEL3),
      ]);
      console.log("loadData owners", [L1Owners, L2Owners, L3Owners]);
      const ownersList = [];
      [L1Owners, L2Owners, L3Owners].forEach((list, i) =>
        list.forEach((address) => ownersList.push({ address, type: i }))
      );
      setOwners(ownersList.reverse());
    };

    loadData();
  }, [contract]);


  const listToRender =  showAll ? owners : owners.slice(0, 10);

  return (
    <>
      <div className="div-block-29 slide-bottom">
        {listToRender.map(({address, type}) => <Owner key={address} address={address} type={type} />)}
      </div>
      {(!showAll && owners.length > 10) && <a href="#" onClick={() => setShowAll(true)} class="primary-button see-more freight-text w-button">See more</a>}
    </>
  );
};

export default Owners;
