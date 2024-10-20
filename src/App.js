import './App.css';
import ConnectWallet from './components/ConnectWallet';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './config'; 

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          const _provider = new ethers.providers.Web3Provider(window.ethereum);
          await _provider.send("eth_requestAccounts", []); 
          setProvider(_provider);

          const signer = _provider.getSigner();

          const _contract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(_contract);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error("MetaMask is not installed!");
      }
    };
    initProvider();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Pixel-bold', color: "white" }}>ETH Movie Database</h1>
      
      <ConnectWallet />

      <MovieList provider={provider} contract={contract} />
    </div>
  );
}

export default App;

