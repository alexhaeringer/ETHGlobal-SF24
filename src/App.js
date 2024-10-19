import logo from './logo.svg';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { BrowserProvider } from 'ethers';

function App() {
  return (
    <div>
      <h1 style = {{textAlign: 'center', fontFamily: 'Pixel-bold', color: "white"}}>ETH Movie Database</h1>
      
      <ConnectWallet />

      <MovieList />
    </div>
  );
}

export default App;
