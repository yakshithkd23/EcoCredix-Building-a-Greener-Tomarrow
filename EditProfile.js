import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [credits, setCredits] = useState(0); // Credits are fetched but won't be editable
  const [loading, setLoading] = useState(false);  // State to handle loading
  const [error, setError] = useState(null); // Error state to capture any errors
  const navigate = useNavigate();

  useEffect(() => {
    const userData = auth.currentUser;
    if (userData) {
      setUser(userData);
      setName(userData.displayName || '');
      setBio(userData.bio || '');
      setCredits(userData.credits || 0);  // Fetch credits, but don't allow editing
    } else {
      navigate('/');  // Redirect to login if user not found
    }
  }, [navigate]);

  const handleSaveChanges = async () => {
    if (!user) return;

    // Start loading
    setLoading(true);
    setError(null);

    const userRef = doc(db, 'users', user.uid);
    try {
      // Update the user document in Firestore
      await updateDoc(userRef, {
        displayName: name,  // Update the name
        bio: bio,  // Update the bio
      });

      // After successful update, redirect to profile page with new data
      navigate('/profile');
    } catch (error) {
      // Handle error (e.g., network issues, permission issues)
      setError('Error updating profile, please try again later.');
      console.error('Error updating user data:', error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Edit Profile</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Bio"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Credits"
        variant="outlined"
        fullWidth
        value={credits}  // Display the credits, but don't allow modification
        disabled  // Make the credits field read-only
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        disabled={loading}  // Disable button when loading
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </Box>
  );
};

export default EditProfile;
