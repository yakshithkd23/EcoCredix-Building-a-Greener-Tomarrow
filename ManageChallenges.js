import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box, Grid, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    place: '',
    mentors: '',
    reason: '',
    description: '',
  });

  useEffect(() => {
    const storedChallenges = localStorage.getItem('challenges');
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    }
  }, []);

  const handleAddChallenge = () => {
    const updatedChallenges = [
      ...challenges,
      {
        id: challenges.length + 1,
        title: newChallenge.title,
        place: newChallenge.place,
        mentors: newChallenge.mentors,
        reason: newChallenge.reason,
        description: newChallenge.description,
      },
    ];
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    setChallenges(updatedChallenges);
    setNewChallenge({
      title: '',
      place: '',
      mentors: '',
      reason: '',
      description: '',
    });
  };

  const handleRemoveChallenge = (id) => {
    const updatedChallenges = challenges.filter((challenge) => challenge.id !== id);
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    setChallenges(updatedChallenges);
  };

  return (
    <Paper sx={{ padding: '30px', borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#388e3c', fontWeight: 600 }}>
        Manage Challenges
      </Typography>

      <Box sx={{ marginBottom: '30px' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px', color: '#616161' }}>
          Add New Challenge
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Challenge Title"
              fullWidth
              value={newChallenge.title}
              onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
              sx={{ marginBottom: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Location"
              fullWidth
              value={newChallenge.place}
              onChange={(e) => setNewChallenge({ ...newChallenge, place: e.target.value })}
              sx={{ marginBottom: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Mentors"
              fullWidth
              value={newChallenge.mentors}
              onChange={(e) => setNewChallenge({ ...newChallenge, mentors: e.target.value })}
              sx={{ marginBottom: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Reason for Challenge"
              fullWidth
              value={newChallenge.reason}
              onChange={(e) => setNewChallenge({ ...newChallenge, reason: e.target.value })}
              sx={{ marginBottom: '10px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={newChallenge.description}
              onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
              sx={{ marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddChallenge}
          sx={{ textTransform: 'none', padding: '10px 20px' }}
        >
          Add Challenge
        </Button>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: '20px', color: '#616161' }}>
        Existing Challenges
      </Typography>

      <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {challenges.map((challenge) => (
          <ListItem
            key={challenge.id}
            sx={{
              borderBottom: '1px solid #e0e0e0',
              paddingBottom: '10px',
              paddingTop: '10px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
            }}
          >
            <ListItemText
              primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{challenge.title}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    Location: {challenge.place}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    Mentors: {challenge.mentors}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    Reason: {challenge.reason}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    Description: {challenge.description}
                  </Typography>
                </>
              }
            />
            <IconButton color="error" onClick={() => handleRemoveChallenge(challenge.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ManageChallenges;
