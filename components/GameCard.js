import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteGame, buyGame } from '../api/gameAPI';

function gameCard({ gameObj, onUpdate, user = undefined }) {
  console.warn(gameObj);
  const deleteThisGame = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${gameObj.name}? This action cannot be undone.`)) {
      deleteGame(gameObj.firebaseKey, `-${user.uid}`).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card className="gameCard" class="card text-light bg-black mb-3" style={{ width: '18rem' }}>
      <Card.Img className="imageFormat" variant="top" src={gameObj.image} />
      <Card.Body>
        <Card.Title>{gameObj.name}</Card.Title>
        <Link href={`/games/${gameObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View Game</Button>
        </Link>
        <Link href={`/games/edit/${gameObj.firebaseKey}?user=-${user.uid}`} passHref>
          <Button variant="info">Edit Game</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGame} className="m-2">Delete Game</Button>
        <Button variant="secondary" onClick={() => buyGame(gameObj.firebaseKey, `-${user.uid}`)} className="m-2">buy game</Button>
      </Card.Body>
    </Card>
  );
}

gameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default gameCard;
