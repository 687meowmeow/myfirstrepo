// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
// import PropTypes from 'prop-types';
// import { deleteGame } from '../callapi/gameapi';

// function gameCard({ gameObj, onUpdate }) {
//     const deleteThisGame = () => {
//       if (window.confirm(`Are you 1000% positive you want to delete ${gameObj.name}? This action cannot be undone.`)) {
//         deleteGame(gameObj.id).then(() => {
//           onUpdate();
//         });
//       }
//     };
  
//     return (
//       <Card className="gameard" style={{ width: '18rem' }}>
//         <Card.Img className="imageFormat" variant="top" src={gameObj.image} />
//         <Card.Body>
//           <Card.Title>{gameObj.name}</Card.Title>
//           <Link href={`/games/${gameObj.firebaseKey}`} passHref>
//             <Button variant="primary" className="m-2">View Items</Button>
//           </Link>
//           <Link href={`/games/edit/${gameObj.firebaseKey}`} passHref> 
//             <Button variant="info">Edit Room</Button>
//           </Link>
//           <Button variant="danger" onClick={deleteThisRoom} className="m-2">Delete Room</Button>
//         </Card.Body>
//       </Card>
//     );
//   }
  