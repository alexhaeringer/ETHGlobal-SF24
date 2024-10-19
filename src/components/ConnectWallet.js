import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';

function ConnectWallet() {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask not found. Please install MetaMask extension.');
    }
  };

  return (
    <div >
      <button onClick={connectWallet} style={{ fontFamily: 'Pixel-regular', position: 'absolute', top: '33px', right: '33px' }} >
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </div>
  );
}

export default ConnectWallet;

