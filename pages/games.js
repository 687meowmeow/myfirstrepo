import { useEffect, useState } from 'react';
import { getAllGames } from '../api/gameAPI';
import GameCard from '../components/GameCard';
import { useAuth } from '../utils/context/authContext';

export default function ViewGames() {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllGames()
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
      });
  }, []);

  return (
    <div>
      {/* <div className="button-container">n
         <button className="btn btn-success">Add Game</button>
       </div> */}
      <div className="content-container">
        <h1 style={{ color: 'white' }} className="text-center margin-y-large">Games</h1>
        <div className="d-flex flex-wrap">
          {games.map((game) => (
            <GameCard key={game.id} gameObj={game} user={user} onUpdate={() => getAllGames().then(setGames)} />
          ))}
        </div>
      </div>
    </div>
  );
}
