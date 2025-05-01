import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateGameForm from '../../../components/forms/GameForm';
import { getSingleGame } from '../../../api/gameAPI';

export default function EditGameForm() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    console.log(router.query);
    getSingleGame(firebaseKey).then(setEditGame);
  }, [firebaseKey]);

  return (
    <CreateGameForm gameObj={editGame} />
  );
}
