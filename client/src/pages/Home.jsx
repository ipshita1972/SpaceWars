import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
// import Web3 from 'web3';

const Home = () => {
  const { contracts, accounts, setAccounts, updateRegistrationStatus } = useGlobalContext();
  const [username, setUsername] = useState("");
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const decorationsRef = useRef([]);
  const navigate = useNavigate();

  const handleRegister = () => {
    const registerPlayer = async () => {
      try {
        await contracts.SpaceWars.methods.registerPlayer(username).send({ from: accounts[0] });
        updateRegistrationStatus();
        navigate("/profile");
      } catch (error) {
        console.log("Registration failed:", error);
        alert("An error occurred during registration. Please try again.");
      }
    };
  
    registerPlayer();
  };
  

  const connectWallet = async () => {
    try {
      const acc = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccounts(acc); 
      console.log("Account connected: ", acc[0]);
      const alreadyRegistered = await contracts.SpaceWars.methods.isPlayerRegistered(acc[0]).call();
  
      if (alreadyRegistered) {
        console.log("Navigating.....");
        navigate("/profile"); 
      } else {
        console.log("Player is not registered");
      }
    } catch (error) {
      console.error("Error connecting wallet: ", error);
    }
  }
  

  useEffect(() => {
    // Title and Subtitle Animations
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power4.out" }
    );

    // Form Animation
    gsap.fromTo(
      formRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 1, ease: "back.out(1.7)" }
    );

    // Decorations Animation
    decorationsRef.current.forEach((decoration, i) => {
      gsap.fromTo(
        decoration,
        { opacity: 0, scale: 0 },
        {
          opacity: 0.2,
          scale: 1,
          duration: 1.5,
          delay: 1 + i * 0.3,
          ease: "elastic.out(1, 0.5)",
        }
      );
    });

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col justify-center items-center text-white relative overflow-hidden">
      <h1
        ref={titleRef}
        className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        SPACEWARS
      </h1>
      <p ref={subtitleRef} className="text-gray-400 mt-4 text-lg md:text-xl">
        The Ultimate Space Shooter Game
      </p>
      <div ref={formRef} className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        {accounts.length == 0 ? (<button
          type="submit"
          className="w-64 md:w-80 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
          onClick={connectWallet}
        >
          CONNECT WALLET
        </button>) : (<div className="flex flex-col items-center"><h2 className="text-xl font-semibold text-gray-200 mb-4 text-center">
          Enter the Battle Zone
        </h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-64 md:w-80 p-3 mb-4 text-black text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-64 md:w-80 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
              onClick={handleRegister}
            >
              REGISTER
            </button>
          </div>)}
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={(el) => (decorationsRef.current[0] = el)}
          className="absolute top-10 left-20 w-16 h-16 bg-blue-500 rounded-full blur-2xl"
        ></div>
        <div
          ref={(el) => (decorationsRef.current[1] = el)}
          className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full blur-3xl"
        ></div>
        <div
          ref={(el) => (decorationsRef.current[2] = el)}
          className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-500 rounded-full blur-3xl"
        ></div>
      </div>
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-20 w-16 h-16 bg-blue-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Home;
