import './App.css';
import ConnectWallet from './components/ConnectWallet';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { BrowserProvider } from 'ethers';

function App() {

  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);

        // Replace with your deployed contract address and ABI
        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const contractABI = [/* YOUR_CONTRACT_ABI */];
        const _contract = new ethers.Contract(contractAddress, contractABI, _provider);
        setContract(_contract);
      }
    };
    initProvider();
  }, []);

  return (
    <div>
      <h1 style = {{textAlign: 'center', fontFamily: 'Pixel-bold', color: "white"}}>ETH Movie Database</h1>
      
      <ConnectWallet />

      <MovieList />
    </div>
  );
}

export default App;
