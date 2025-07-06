import React, { createContext, useContext, useEffect, useState } from "react";
import defaultSpaceshipImage from "../assets/spaceship.png";
import gameBackgroundImage from "../assets/background.jpg";
// import Web3Modal from "web3modal";
import {
  NFT_MarketPlace_ADDRESS,
  NFT_MarketPlace_ABI,
  SpaceWars_ADDRESS,
  SpaceWars_ABI,
} from "../contract/contractConfig.js";
import Web3 from "web3";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState({
    NFT_MarketPlace: "",
    SpaceWars: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeSkin, setActiveSkin] = useState(defaultSpaceshipImage);
  const [activeBackground, setActiveBackground] = useState(gameBackgroundImage);
  
  const updateRegistrationStatus = async () => {
    const name = await contracts.SpaceWars.methods
      .getPlayerName()
      .call({ from: accounts[0] });

    setIsRegistered(!!name);
  };
  useEffect(() => {
    try {
      const web3 = new Web3(window.ethereum);

      const NFT_MarketPlace_Contract = new web3.eth.Contract(
        NFT_MarketPlace_ABI,
        NFT_MarketPlace_ADDRESS
      );
      const SpaceWars_Contract = new web3.eth.Contract(
        SpaceWars_ABI,
        SpaceWars_ADDRESS
      );

      setContracts({
        NFT_MarketPlace: NFT_MarketPlace_Contract,
        SpaceWars: SpaceWars_Contract,
      });

      console.log(contracts);

      const getAccounts = async () => {
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        console.log(accounts);
      };

      getAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        accounts,
        contracts,
        setAccounts,
        isRegistered,
        updateRegistrationStatus,
        activeSkin,
        setActiveSkin,
        activeBackground,
        setActiveBackground
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
