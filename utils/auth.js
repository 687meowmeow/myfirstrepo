import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { app } from './client'; // Import the initialized Firebase app
import { clientCredentials } from './client';

// Initialize authentication
const auth = getAuth(app);

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/checkuser.json`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ uid }),
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/register`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const signIn = () => {
  const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User signed in:', user);

        createUser({
          id: "-" + user.uid,
          name: user.displayName,
          email: user.email,
          games: "",
        });
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  };

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error('Sign-out error:', error);
    });
};

const createUser = (userInfo) => {
  
  return fetch(`${clientCredentials.databaseURL}/user/${userInfo.id}.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((existingUser) => {
      if (existingUser) {
        console.log('User already exists, skipping creation.');
        return null; 
      }

      return fetch(`${clientCredentials.databaseURL}/user/${userInfo.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(() => {
          console.log('User record created');
        });
    })
    .catch((error) => {
      console.error('Error checking or creating user:', error);
    });
};



export {
  signIn, //
  signOutUser as signOut, // Renaming for consistency
  checkUser,
  registerUser,
  createUser,
};