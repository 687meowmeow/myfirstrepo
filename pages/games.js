import { useEffect, useState } from 'react';
import { getAllGames } from '../api/gameAPI';
import GameCard from '../components/GameCard';

export default function ViewGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div>
      <div className="full-page-background my-games-background" />
      <div className="overlay" />
      <div className="content-container">
        <h1 className="text-center margin-y-large">My Games</h1>
        <div className="d-flex flex-wrap">
          {games.map((game) => (
            <GameCard key={game.id} gameObj={game} onUpdate={() => getAllGames().then(setGames)} />
          ))}
        </div>
      </div>
    </div>
  );
}
