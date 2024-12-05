import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Use `useNavigate` instead of `useHistory`

const EcoChallenge = () => {
  const [challenges, setChallenges] = useState([]); // State to store challenges

  // Load challenges from localStorage when the component mounts
  useEffect(() => {
    const storedChallenges = localStorage.getItem('challenges'); // Get challenges from localStorage
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges)); // Update state with the challenges
    }
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  const navigate = useNavigate();  // Initialize `useNavigate` hook

  const handleJoin = (challengeId) => {
    // Use absolute path to navigate
    navigate(`/register-challenge/${challengeId}`);  // Absolute path to the register challenge page
  };

  return (
    <Paper
      className="p-6 max-w-2xl mx-auto my-10 shadow-lg rounded-lg"
      style={{
        backgroundColor: '#e8f5e9',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" style={{ fontWeight: 600, color: '#388e3c', marginBottom: '20px' }}>
        EcoChallenges
      </Typography>
      <List>
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ListItem
              key={challenge.id}
              style={{ borderBottom: '1px solid #c8e6c9', paddingBottom: '15px', marginBottom: '15px' }}
            >
              <Box sx={{ flex: 1 }}>
                <ListItemText
                  primary={<Typography variant="h6" style={{ color: '#388e3c', fontWeight: '500' }}>{challenge.name}</Typography>}
                  secondary={<Typography variant="body2" style={{ color: '#616161' }}>{challenge.description}</Typography>}
                />
              </Box>
              <Button
                variant="outlined"
                color="success"
                sx={{
                  borderRadius: '20px',
                  '&:hover': { backgroundColor: '#388e3c', color: '#fff' },
                  padding: '8px 16px',
                  textTransform: 'none',
                }}
                onClick={() => handleJoin(challenge.id)}  // Call handleJoin with the challenge ID
              >
                Join
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>No challenges available. Please check back later!</Typography>
        )}
      </List>
    </Paper>
  );
};
 
export default EcoChallenge;
