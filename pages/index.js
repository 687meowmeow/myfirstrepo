import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    }}
    >
      <div
        style={{
          position: 'fixed', // Changed from 'absolute' to cover the entire viewport
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://www.dexerto.com/cdn-cgi/image/width=3840,quality=60,format=auto/https://editors.dexerto.com/wp-content/uploads/2021/02/cr1tikal.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      />

      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ color: 'red' }}>Hello {user.fbUser.displayName}!</h1>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          thats about it see ya
        </Button>
      </div>
    </div>
  );
}

export default Home;
