import React from 'react';
import { Box, Button, Typography, Container, Slide, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import background from '../assets/main_back.jpeg'; // Import the image

// Nature-inspired animations
const growIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

const floatUp = keyframes` 
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`; 

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 200, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 200, 0, 0.7); }
  100% { box-shadow: 0 0 10px rgba(0, 200, 0, 0.5); }
`;

const waveIn = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const bloomIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
        backgroundColor: '#2e7d32',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#ffffff',
        textAlign: 'center',
        animation: `${growIn} 2s ease-in-out`,
      }}
    >
      <Container>
        <Slide direction="down" in={true} timeout={1500}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: '#90caf9',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
              animation: `${waveIn} 2s ease-out`,
              animationDelay: '0.3s',
              animationFillMode: 'both',
            }}
          >
            Welcome to EcoConnect
          </Typography>
        </Slide>
        <Fade in={true} timeout={2000}>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              fontSize: '1.2rem',
              fontWeight: '500',
              maxWidth: '600px',
              color: '#ffeb3b',
              margin: 'auto',
              lineHeight: '1.6',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
              animation: `${bloomIn} 2.5s ease-out`,
              animationDelay: '1s',
              animationFillMode: 'both',
            }}
          >
            Join us in creating a cleaner, greener, and more sustainable future. Every step counts.
          </Typography>
        </Fade>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            animation: `${floatUp} 2s ease-out`,
            animationDelay: '1.5s',
            animationFillMode: 'both',
          }}
        >
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/login"
            sx={{
              fontSize: '1.2rem',
              padding: '10px 30px',
              borderRadius: '20px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(0, 100, 0, 0.85)',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#1b5e20',
                animation: `${pulseGlow} 1.5s infinite`,
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/signup"
            sx={{
              fontSize: '1.2rem',
              padding: '10px 30px',
              borderRadius: '20px',
              fontWeight: 'bold',
              color: '#ffffff',
              borderColor: '#ffffff',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
                borderColor: '#90caf9',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Vision Section */}
        <Box
          sx={{
            marginTop: '50px',
            animation: `${floatUp} 2s ease-out`,
            animationDelay: '1s',
            animationFillMode: 'both',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#90caf9',
              marginBottom: '10px',
              fontSize: '1.5rem',
              textAlign: 'center',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            Our Vision
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              maxWidth: '800px',
              margin: 'auto',
              fontSize: '1.2rem',
              textAlign: 'center',
              lineHeight: '1.8',
              animation: `${bloomIn} 2s ease-out`,
            }}
          >
            To inspire communities to protect and preserve the environment, creating sustainable ecosystems
            where future generations can thrive.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Box
          sx={{
            marginTop: '30px',
            animation: `${floatUp} 2s ease-out`,
            animationDelay: '1.5s',
            animationFillMode: 'both',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              marginBottom: '10px',
              fontSize: '1.5rem',
              textAlign: 'center',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              maxWidth: '800px',
              margin: 'auto',
              fontSize: '1.2rem',
              textAlign: 'center',
              lineHeight: '1.8',
              animation: `${bloomIn} 2s ease-out`,
            }}
          >
            To empower individuals and communities to take actionable steps towards a healthier environment,
            using innovative solutions and collaboration to drive positive change.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
