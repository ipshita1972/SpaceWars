import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGlobalContext } from "../context";

const Market = () => {
    const { contracts, accounts } = useGlobalContext();
    const [selectedItem, setSelectedItem] = useState(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const skinsRef = useRef(null);
    const backgroundsRef = useRef(null);
    const skinsItemsRef = useRef([]);
    const backgroundsItemsRef = useRef([]);
    const overlayRef = useRef(null);
    const [spaceshipNFTs, setSpaceshipNFTs] = useState([]);
    const [backgroundNFTs, setBackgroundNFTs] = useState([]);
    
    const handleBuyNFT = (e) => {
        const buyNFT = async () => {
        try {
            const result = await contracts.NFT_MarketPlace.methods
            .buyNFT(selectedItem.tokenId.tokenId)
            .send({
                from: accounts[0],
                value: selectedItem.price,
            });
            console.log("Purchase successful:", result);
          // Update the NFTs state to remove the purchased item
            if (selectedItem.type === "spaceship") {
            setSpaceshipNFTs((prevNFTs) =>
                prevNFTs.filter((nft) => nft.tokenId.tokenId !== selectedItem.tokenId.tokenId)
            );
            } else if (selectedItem.type === "background") {
            setBackgroundNFTs((prevNFTs) =>
                prevNFTs.filter((nft) => nft.tokenId.tokenId !== selectedItem.tokenId.tokenId)
            );
            }
            setSelectedItem(null);
        } catch (error) {
            console.error("Error during purchase:", error);
        }
        };
        buyNFT();
    };
    
    useEffect(() => {
        gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
        );
        gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power4.out" }
        );
        gsap.fromTo(
        [skinsRef.current, backgroundsRef.current],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.7, ease: "power4.out" }
        );
        const getNFTs = async () => {
        const tokenIds = await contracts.NFT_MarketPlace.methods
            .getListedNFTs()
            .call({ from: accounts[0] });
        const fetchNFTData = async (tokenId) => {
            const tokenURI = await contracts.NFT_MarketPlace.methods
            .tokenURI(tokenId.tokenId)
            .call({ from: accounts[0] });
            const dataUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            const response = await fetch(dataUrl);
            let jsonData = await response.json();
            jsonData.image = jsonData.image.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
            );
            jsonData.tokenId = tokenId;
            jsonData.price = tokenId.price;
            return jsonData;
        };
        const NFTs = await Promise.all(tokenIds.map(fetchNFTData));
        let spaceships = [];
        for (let i = 0; i < NFTs.length; i++) {
            if (NFTs[i].type === "spaceship") {
            spaceships.push(NFTs[i]);
            }
        }
        setSpaceshipNFTs(spaceships);
        let backgrounds = [];
        for (let i = 0; i < NFTs.length; i++) {
            if (NFTs[i].type === "background") {
            backgrounds.push(NFTs[i]);
            }
        }
        setBackgroundNFTs(backgrounds);
        };
        getNFTs();
    }, [contracts, accounts]);
    const closeOverlay = () => setSelectedItem(null);
    return (
        <div className="flex flex-col items-center min-h-screen overflow-hidden text-white bg-gradient-to-b from-gray-900 via-black to-gray-800">
        <h1
        ref={titleRef}
        className="mt-10 text-5xl font-extrabold text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
        Galactic Marketplace
        </h1>
        <p ref={subtitleRef} className="mt-4 text-lg text-gray-400 md:text-xl">
        Buy exclusive rocket skins and space backgrounds for your journey!
        </p>
        <div
        ref={skinsRef}
        className="z-10 w-11/12 p-6 mt-10 overflow-y-auto bg-gray-800 rounded-lg shadow-lg md:w-2/4 max-h-80 scrollable-container"
        >
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-200">
            Rocket Skins
        </h2>
        {spaceshipNFTs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {spaceshipNFTs.map((skin, index) => (
                <div
                ref={(el) => (skinsItemsRef.current[index] = el)}
                key={index}
                className="w-64 p-4 rounded-lg shadow-lg bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900"
                onClick={() => setSelectedItem(skin)}
                >
                <div className="flex items-center justify-center w-full h-40 overflow-hidden bg-gray-600 rounded-md md:h-60">
                    <img
                    src={skin.image}
                    alt={skin.name}
                    className="object-cover w-full h-full"
                    />
                </div>
                <div className="mt-4 text-center">
                    <h4 className="text-xl font-semibold text-gray-200">
                    {skin.name}
                    </h4>
                    <p className="mt-2 text-sm text-gray-400">{skin.description}</p>
                </div>
                </div>
            ))}
            </div>
            ) : (
                <p className="text-center text-gray-400">No Rocket Skins available.</p>
        )}
        </div>
        <div
        ref={backgroundsRef}
        className="w-11/12 p-6 mt-10 mb-10 overflow-y-auto bg-gray-800 rounded-lg shadow-lg md:w-2/4 max-h-80 scrollable-container">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-200">
            Space Backgrounds
        </h2>
        {backgroundNFTs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {backgroundNFTs.map((background, index) => (
                <div
                ref={(el) => (backgroundsItemsRef.current[index] = el)}
                key={index}
                className="w-64 p-4 rounded-lg shadow-lg bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900"
                onClick={() => setSelectedItem(background)}>
                <div className="flex items-center justify-center w-full h-40 overflow-hidden bg-gray-600 rounded-md md:h-60">
                <img
                    src={background.image}
                    alt={background.name}
                    className="object-cover w-full h-full"
                />
                </div>
                <div className="mt-4 text-center">
                <h4 className="text-xl font-semibold text-gray-200">
                    {background.name}
                </h4>
                <p className="mt-2 text-sm text-gray-400">
                    {background.description}
                </p>
                </div>
            </div>
            ))}
        </div>
        ) : (
        <p className="text-center text-gray-400">
            No Space Backgrounds available.
        </p>
        )}
    </div>
    {selectedItem && (
        <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        >
        <div className="w-11/12 p-6 text-center bg-gray-800 rounded-lg shadow-lg md:w-1/3">
            <h3 className="mb-4 text-2xl font-bold">{selectedItem.name}</h3>
            <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="object-cover w-full h-full mb-4 rounded-md"
            />
            <p className="mb-6 text-lg font-semibold text-gray-300">
            Price: {Number(selectedItem.price)}
            </p>
            <div className="flex justify-center gap-4 mt-4">
            <button
                onClick={closeOverlay}
                className="px-6 py-2 font-bold text-white transition-all rounded-lg w-36 bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500"
            >
                Close
            </button>
            <button
                onClick={handleBuyNFT}
                className="px-6 py-2 font-bold text-white transition-all rounded-lg w-36 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500"
            >
                Purchase
            </button>
            </div>
        </div>
        </div>
    )}
      {/* Floating Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-16 h-16 bg-blue-500 rounded-full top-10 left-20 blur-2xl animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-pink-500 rounded-full bottom-20 right-20 blur-3xl animate-pulse"></div>
        <div className="absolute w-40 h-40 bg-purple-500 rounded-full top-1/3 left-1/3 blur-3xl animate-pulse"></div>
    </div>
    </div>
    );
};


export default Market;