// import { useEffect, useState } from 'react';
// import { getAllGames } from '../api/gameAPI';
// import { parseGames } from '../api/gameAPI';
// import GameCard from '../components/GameCard';

// export default function ViewGames() {
//   const [games, setGames] = useState([]);

//   useEffect(() => {
//     // getAllGames()
//     //   .then((data) => {
//     //     console.warn('Fetched games:', data);
//     //     setGames(data);
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error fetching games:', error);
//     //   });
//     parseGames("-JV7mHmwp80fDq3o1ojGb9WIiN6x2")
//     .then((data) => {
//       setGames(data); // ✅ set the whole array at once
//     })
//     .catch(console.error);
//   }, []);

//   return (
//     <div>
//       {/* <div className="button-container">
//         <button className="btn btn-success">Add Game</button>
//       </div> */}
//       <div className="content-container">
//         <h1 style={{ color: 'white' }} className="text-center margin-y-large">My Games</h1>
//         <div className="d-flex flex-wrap">
//           {games.map((game) => (
//             <GameCard key={game.id} gameObj={game} onUpdate={() => getAllGames().then(setGames)} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
