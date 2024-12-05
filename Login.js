import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import authorityData from './authority.json'; // Assuming you have the JSON file here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state to show the loader
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true); // Start loading animation

    // Validate Authority Credentials from JSON if role is 'authority'
    if (role === 'authority') {
      const authority = authorityData.Administor;
      if (email === authority.email && password === authority.password) {
        // Simulate a loading delay, then navigate to the authority dashboard
        setTimeout(() => {
          setLoading(false); // Stop loading animation
          navigate('/admin-dashboard');
        }, 1500); // Simulate loading delay for demo
      } else {
        setError('Invalid authority credentials');
        setLoading(false); // Stop loading on error
      }
    } else {
      // Validate User Credentials using Firebase
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Simulate a loading delay, then navigate to the user dashboard
        setTimeout(() => {
          setLoading(false); // Stop loading animation
          navigate('/community'); // Navigate to user dashboard
        }, 1500); // Simulate loading delay for demo
      } catch (err) {
        setError('Error logging in: ' + err.message);
        setLoading(false); // Stop loading on error
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xs" sx={styles.card}>
        <Typography variant="h4" sx={styles.header}>
          {role === 'authority' ? 'Authority Login' : 'User Login'}
        </Typography>
        <Typography variant="body1" sx={styles.subHeader}>
          {role === 'authority' ? 'Enter your authority credentials' : 'Please log in to your account'}
        </Typography>
        <form onSubmit={handleLogin} style={styles.form}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={styles.input}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={styles.input}
          />
          {error && <Typography sx={styles.errorText}>{error}</Typography>}
          
          {/* Show loader if loading is true */}
          {loading ? (
            <CircularProgress sx={styles.loader} />
          ) : (
            <Button type="submit" variant="contained" fullWidth sx={styles.button}>
              Login
            </Button>
          )}

          <Typography sx={styles.roleSwitchLink}>
            {role === 'authority' ? (
              <>
                Not an authority?{' '}
                <Button onClick={() => setRole('user')} sx={styles.link}>Switch to User Login</Button>
              </>
            ) : (
              <>
                Are you an authority?{' '}
                <Button onClick={() => setRole('authority')} sx={styles.link}>Switch to Authority Login</Button>
              </>
            )}
          </Typography>
        </form>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundImage: `url(${backgroundImage})`, // You can keep the background image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    color: '#2E7D32',
    marginBottom: '10px',
    fontWeight: '600',
  },
  subHeader: {
    color: '#6b6b6b',
    marginBottom: '30px',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '20px',
    '& fieldset': {
      borderColor: '#c8e6c9',
    },
    '&:hover fieldset': {
      borderColor: '#388e3c',
    },
  },
  button: {
    backgroundColor: '#2E7D32',
    color: '#ffffff',
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#1b5e20',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.05)',
      transition: 'all 0.3s ease-in-out',
    },
  },
  loader: {
    marginTop: '20px',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    marginBottom: '10px',
    textAlign: 'center',
  },
  roleSwitchLink: {
    marginTop: '15px',
    color: '#6b6b6b',
  },
  link: {
    color: '#2E7D32',
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default Login;
