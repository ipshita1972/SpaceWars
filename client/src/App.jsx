import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Market from "./pages/Market";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  console.log("App is rendering!");

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<Game />} />
          <Route path="/market" element={<Market />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
