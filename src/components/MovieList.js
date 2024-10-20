import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../config.js";

function MovieList () {
    const initialMovies = [
        { id: 1, title: 'Dune 2', year: 2024, image: 'Dune2.jpeg', votes: 0 },
        { id: 2, title: 'Ex Machina', year: 2014, image: 'Exmachina.jpg', votes: 0 },
        { id: 3, title: 'Interstellar', year: 2014, image: 'Interstellar.jpg', votes: 0 },
        { id: 4, title: 'Oceans 11', year: 2001, image: 'oceans11.jpg', votes: 0 },
        { id: 5, title: 'The Big Short', year: 2015, image: 'thebigshort.jpg', votes: 0 },
        { id: 6, title: 'The Wolf of Wallstreet', year: 2013, image: 'wolfofwallstreet.jpg', votes: 0 },
        { id: 7, title: 'The Hunger Games', year: 2012, image: 'hungergames.jpg', votes: 0 },
        { id: 8, title: 'Titanic', year: 1997, image: 'titanic.png', votes: 0 },
        { id: 9, title: 'The Intouchables', year: 2011, image: 'intouchables.webp', votes: 0 },
        { id: 10, title: 'LalaLand', year: 2016, image: 'lalaland.webp', votes: 0 },
    ]

    const [movies, setMovies] = useState(initialMovies);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const connectToBlockchain = async () => {
          if (window.ethereum) {
            try {
              const newProvider = new ethers.providers.Web3Provider(window.ethereum);
              await newProvider.send("eth_requestAccounts", []);
              const newSigner = newProvider.getSigner();
              const newContract = new ethers.Contract(contractAddress, contractABI, newSigner);
    
              setProvider(newProvider);
              setSigner(newSigner);
              setContract(newContract);
            } catch (error) {
              console.error("Error connecting to MetaMask:", error);
            }
          } else {
            console.error("MetaMask is not installed!");
          }
        };

        connectToBlockchain();
    }, []);


    const handleVote = async (id, type) => {
        if (!contract) return;

        try {
            const tx = await contract.vote(id, type === 'up');
            await tx.wait();
            // Fetch updated votes after the transaction is confirmed
            fetchVotes();
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    const fetchVotes = async () => {
        if (!contract) return;
    
        try {
          const updatedMovies = await Promise.all(
            movies.map(async (movie) => {
              const [upvotes, downvotes] = await contract.getVotes(movie.id);
              return { ...movie, votes: upvotes - downvotes };
            })
          );
          setMovies(updatedMovies);
        } catch (error) {
          console.error("Error fetching votes:", error);
        }
      };


      useEffect(() => {
        fetchVotes();
      }, [contract]);

    const sortedMovies = [...movies].sort((a, b) => b.votes - a.votes);

    const calculateRankings = () => {
        const rankings = [];
        let currentRank = 1;

        for (let i = 0; i < sortedMovies.length; i++) {
        if (i > 0 && sortedMovies[i].votes !== sortedMovies[i - 1].votes) {
            currentRank = rankings[rankings.length - 1] + 1;
        }
        rankings.push(currentRank);
        }

        return rankings;
    };

    const rankings = calculateRankings();

    return (
        <div style={{ color: 'white', fontFamily: 'Pixel-regular' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', padding: '20px' }}>
            {sortedMovies.map((movie, index) => (
              <div
                key={movie.id}
                style={{
                  flex: '0 1 calc(33.333% - 40px)',
                  boxSizing: 'border-box',
                  marginBottom: '40px',
                  textAlign: 'center'
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/pictures/${movie.image}`}
                  alt={movie.title}
                  style={{
                    width: '200px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <div style={{ fontSize: 30 }}>{movie.title}</div>
                <div style={{ fontSize: 20 }}>({movie.year})</div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  <span>Rank: {sortedMovies.every((m) => m.votes === 0) ? "-" : rankings[index]}</span>
                  <img
                    src={`${process.env.PUBLIC_URL}/arrows/uparrow.png`}
                    alt="Upvote"
                    onClick={() => handleVote(movie.id, 'up')}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginLeft: '10px',
                      cursor: 'pointer'
                    }}
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/arrows/downarrow.png`}
                    alt="Downvote"
                    onClick={() => handleVote(movie.id, 'down')}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginLeft: '10px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default MovieList;