import React, { useEffect, useState } from "react";
import { useSmartContract } from "./AppContext";

export const Owners = () => {
  const [owners, setOwners] = useState([]);
  const contract = useSmartContract();

  useEffect(() => {
    const loadData = async () => {
      if(!contract) return;
      const _owners = await contract.currentOwners();
      console.log('loadData owners', _owners)
      setOwners(_owners);
    }

    loadData();
  }, [contract]);

  return (
    <>
      <p>total owners: {owners.length}</p>
    </>
  );
};

export default Owners;
