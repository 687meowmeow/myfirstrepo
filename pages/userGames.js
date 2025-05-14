import { useEffect, useState } from 'react';
import { parseUserGames } from '../api/gameAPI';
import GameCard from '../components/GameCard';
import { useAuth } from '../utils/context/authContext';

export default function ViewUserGames() {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    parseUserGames(`-${user.uid}`)
      .then((data) => {
        setGames(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* <div className="button-container">
          <button className="btn btn-success">Add Game</button>
        </div> */}
      <div className="content-container">
        <h1 style={{ color: 'white' }} className="text-center margin-y-large">My Games</h1>
        <div className="d-flex flex-wrap">
          {games.map((game) => (
            <GameCard key={game.id} gameObj={game} user={user} userFlag onUpdate={() => parseUserGames(`-${user.uid}`).then(setGames)} />
          ))}
        </div>
      </div>
    </div>
  );
}
