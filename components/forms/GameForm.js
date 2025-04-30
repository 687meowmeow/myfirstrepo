import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createGame, updateGame } from '../../api/gameAPI';
// import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: '',
};

function CreateGameForm({ gameObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  // Define the handleChange function to update formInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  useEffect(() => {
    // Populate form if gameObj is provided and has a Firebase Key
    if (gameObj.firebaseKey) {
      setFormInput(gameObj);
    }
  }, [gameObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameObj.firebaseKey) {
      updateGame(formInput).then(() => {
        router.push('/games');
      });
    } else {
      const payload = {
        name: formInput.name,
        image: formInput.image,
      };
      createGame(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGame(patchPayload).then(() => {
          router.push('/games');
        });
      });
    }
  };

  return (
    <div>
      <div className="full-page-background my-rooms-background" />
      <div className="overlay" />
      <div className="content-container">
        <Form onSubmit={handleSubmit}>
          <h2 className="text-white mt-5">{gameObj.firebaseKey ? 'Update Game' : 'Create Game'}</h2>

          {/* ROOM NAME INPUT */}
          <FloatingLabel controlId="floatingInput1" label="Game Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Room Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* ROOM IMAGE INPUT */}
          <FloatingLabel controlId="floatingInput2" label="Game Image" className="mb-3">
            <Form.Control
              type="url"
              placeholder="Enter an image url"
              name="image"
              value={formInput.image}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* SUBMIT BUTTON */}
          <Button type="submit">{gameObj.firebaseKey ? 'Update Game' : 'Create Game'}</Button>
        </Form>
      </div>
    </div>
  );
}

CreateGameForm.propTypes = {
  gameObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};

CreateGameForm.defaultProps = {
  gameObj: initialState,
};

export default CreateGameForm;
