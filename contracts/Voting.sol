// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Movie {
        uint256 id;
        string title;
        uint256 upvotes;
        uint256 downvotes;
        mapping(address => bool) hasVoted;
    }

    uint256 public movieCount;
    mapping(uint256 => Movie) public movies;

    event MovieAdded(uint256 id, string title);
    event VoteCast(uint256 id, address voter, bool inFavor);

    function addMovie(string memory _title) public {
        movieCount++;
        Movie storage newMovie = movies[movieCount];
        newMovie.id = movieCount;
        newMovie.title = _title;
        newMovie.upvotes = 0;
        newMovie.downvotes = 0;

        emit MovieAdded(movieCount, _title);
    }

    function vote(uint256 _movieId, bool _inFavor) public {
        Movie storage movie = movies[_movieId];
        require(
            !movie.hasVoted[msg.sender],
            "You have already voted for this movie!"
        );

        if (_inFavor) {
            movie.upvotes++;
        } else {
            movie.downvotes++;
        }

        movie.hasVoted[msg.sender] = true;

        emit VoteCast(_movieId, msg.sender, _inFavor);
    }

    function getVotes(uint256 _movieId) public view returns (uint256, uint256) {
        Movie storage movie = movies[_movieId];
        return (movie.upvotes, movie.downvotes);
    }
}
