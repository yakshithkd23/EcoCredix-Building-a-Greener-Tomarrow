import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterChallenge = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate(); // Hook to handle navigation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status

  const challenges = {
    1: 'Plastic-Free Day',
    2: 'Commute Green',
    3: 'Community Cleanup',
  };

  // Check if user is already registered for the challenge
  useEffect(() => {
    const registeredChallenges = JSON.parse(localStorage.getItem('registeredChallenges')) || [];
    if (registeredChallenges.includes(challengeId)) {
      setIsRegistered(true); // Set state to true if the user has already registered for this challenge
    }
  }, [challengeId]);

  // Function to check if all fields are filled
  const isFormValid = () => {
    return name && email && phone && address;
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const participantData = {
        name,
        email,
        phone,
        address,
        challengeName: challenges[challengeId],
      };

      const response = await axios.post('http://localhost:5000/send-confirmation', participantData);

      if (response.data.success) {
        alert('Registration successful! A confirmation email will be sent.');
        setIsRegistered(true); // Mark as registered
        // Save the registered challenge ID to localStorage
        const registeredChallenges = JSON.parse(localStorage.getItem('registeredChallenges')) || [];
        if (!registeredChallenges.includes(challengeId)) {
          registeredChallenges.push(challengeId);
          localStorage.setItem('registeredChallenges', JSON.stringify(registeredChallenges));
        }

        // Redirect to Eco-Challenge page
        setTimeout(() => navigate('/eco-challenge'), 2000);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering participant:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    handleRegister();
    handleCloseDialog();
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        padding: 4,
        marginTop:'50px',
        backgroundColor: '#e8f5e9',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: 3, color: '#388e3c', fontWeight: '600' }}>
        Register for {challenges[challengeId]}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
        </Grid>
      </Grid>

      {/* Preview Registration Button */}
      <Button
        variant="contained"
        color="info"
        fullWidth
        sx={{
          padding: '10px',
          marginTop: 3,
          textTransform: 'none',
          fontSize: '16px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#0288d1',
          },
        }}
        onClick={handlePreview}
      >
        Preview Registration
      </Button>

      {/* Dialog Box for Confirmation */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Your Registration</DialogTitle>
        <DialogContent>
          <Typography><strong>Name:</strong> {name}</Typography>
          <Typography><strong>Email:</strong> {email}</Typography>
          <Typography><strong>Phone:</strong> {phone}</Typography>
          <Typography><strong>Address:</strong> {address}</Typography>
          <Typography><strong>Challenge:</strong> {challenges[challengeId]}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={loading}>
            {loading ? 'Registering...' : 'Confirm Registration'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Eco-Challenge Button */}
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{
          padding: '10px',
          marginTop: 3,
          textTransform: 'none',
          fontSize: '16px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#388e3c',
          },
        }}
        disabled={isRegistered || !isFormValid()} // Disable if already registered or form is incomplete
        onClick={() => navigate('/eco-challenge')} // Navigate to Eco-Challenge page
      >
        {isRegistered ? 'Joined' : 'Join'} {/* Update the text based on registration status */}
      </Button>
    </Box>
  );
};

export default RegisterChallenge;
