import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function GamePage() {
  const router = useRouter();

  const handleViewAllGames = () => {
    router.push('/games');
  };

  const handleCreateNewGame = () => {
    router.push('/games/newGame');
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Games Menu</h1>
      <Button
        variant="primary"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleViewAllGames}
      >
        View My Games
      </Button>
      <Button
        variant="success"
        type="button"
        size="lg"
        className="m-2"
        onClick={handleCreateNewGame}
      >
        Create New Game
      </Button>
    </div>
  );
}

export default GamePage;
