import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteGame } from '../api/gameAPI';

function gameCard({ gameObj, onUpdate }) {
  const deleteThisGame = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${gameObj.name}? This action cannot be undone.`)) {
      deleteGame(gameObj.id).then(() => {
        onUpdate();
      });
    }
  };
  return (
    <Card className="gameard" style={{ width: '18rem' }}>
      <Card.Img className="imageFormat" variant="top" src={gameObj.image} />
      <Card.Body>
        <Card.Title>{gameObj.name}</Card.Title>
        <Link href={`/games/${gameObj.id}`} passHref>
          <Button variant="primary" className="m-2">View Games</Button>
        </Link>
        <Link href={`/games/edit/${gameObj.id}`} passHref>
          <Button variant="info">Edit Game</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGame} className="m-2">Delete Game</Button>
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
