import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createGame, updateGame } from '../../api/gameAPI';

const initialState = {
  name: '',
  image: '',
  desc: '',
};

function CreateGameForm({ gameObj, user = undefined }) {
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
      updateGame(formInput, user).then(() => {
        router.back();
      });
    } else {
      const payload = {
        name: formInput.name,
        image: formInput.image,
        game: formInput.desc,
      };
      createGame(payload);
      router.back();
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

          {/* GAME DESC INPUT */}
          <FloatingLabel controlId="floatingInput2" label="Game Description" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a desc"
              name="desc"
              value={formInput.desc}
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
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
};

CreateGameForm.defaultProps = {
  gameObj: initialState,
  user: undefined,
};

export default CreateGameForm;
