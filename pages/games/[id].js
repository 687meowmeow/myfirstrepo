/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../api/gameAPI';

export default function ViewGame() {
  const [gameName, setGameName] = useState('');
  const [gameImage, setGameImage] = useState('');
  const [gameDesc, setGameDesc] = useState('');
  const [gameGenre, setGameGenre] = useState('');
  const router = useRouter();
  const { id, user = undefined } = router.query;

  const viewGameData = useCallback(() => {
    if (id) {
      getSingleGame(id, user).then((gameData) => {
        setGameName(gameData.name);
        setGameImage(gameData.image);
        setGameDesc(gameData.desc);
        setGameGenre(gameData.genre);
      });
    }
  }, [id]);

  useEffect(() => {
    viewGameData();
  }, [viewGameData]);

  return (
    <div>
      <div className="content-container">
        <div className="d-flex flex-wrap">
          <div className="gameInfo">
            <div className="top-left">
              <h3 style={{ fontSize: 70 }}>{gameName}</h3>
              <p>{gameGenre}</p>
              <p style={{ fontSize: 20 }}>{gameDesc}</p>
            </div>
            <div className="top-right">
              <img src={gameImage} className="game-img" />
            </div>
            <div className="bottom-left">
              <Button onClick={router.back} variant="danger" size="lg">Go back</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
