import logo from './logo.svg';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import React from 'react';
import MovieList from './components/MovieList';

function App() {
  return (
    <div>
      <h1>ETH Movie Database</h1>
      <ConnectWallet />

      <MovieList />
    </div>
  );
}

export default App;
