import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUserSingleGame = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${uid}/games/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createGame = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())

  // After the Agame object  is created, patch in the actual Firebase key for indexing.
    .then((data) => {
      const patchPayload = { firebaseKey: data.name }; // data.name is the generated key
      return fetch(`${endpoint}/games/${data.name}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchPayload),
      }).then(() => resolve({ ...payload, firebaseKey: data.name }));
    })
    .catch(reject);
});

const updateGame = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const parseUserGames = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${id}/games.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const gameIds = Object.values(data);
      const firebaseKeys = gameIds.map((game) => game.firebaseKey);// gets keys so i dont have to change other code because i changed how games were stored
      Promise.all(firebaseKeys.map((key) => getUserSingleGame(key, id)))
        .then(resolve)
        .catch(reject);
    })
    .catch(reject);
});

const buyGame = (id, uid) => new Promise((resolve, reject) => {
  getSingleGame(id)
    .then((game) => {
      fetch(`${endpoint}/user/${uid}/games.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
      })
        .then((response) => response.json())
        .then((data) => {
          const key = data.name;
          console.log(key);
          console.log(game.firebaseKey);
          return fetch(`${endpoint}/user/${uid}/games/${key}.json`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firebaseKey: key }),
          }).then(() => resolve(key));
        })
        .catch(reject);
    })
    .catch(reject);
});

export {
  getAllGames,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame,
  parseUserGames,
  getUserSingleGame,
  buyGame,
};
