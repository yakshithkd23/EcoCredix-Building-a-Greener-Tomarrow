import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Typography,
  Button,
  Paper,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  Divider,
  LinearProgress,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UploadIcon from '@mui/icons-material/Upload';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('A short bio about the user.');
  const [credits] = useState(100);
  const [reelsEarnings] = useState(0);
  const [reelsCount] = useState(5);
  const [reelsReach] = useState(2250); // Total reach of reels
  const [activeParticipation] = useState(80); // Percentage of active participation
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const adminEmails = ['admin@example.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setName(user.displayName || `${user.name}`);
        if (adminEmails.includes(user.email)) {
          setIsAdmin(true);
        }
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleEditProfile = () => setEditMode(true);

  const handleSaveChanges = async () => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: name });
        setEditMode(false);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Data for the pie chart and bar chart
  const dataPie = [
    { name: 'Earnings', value: reelsEarnings },
    { name: 'Participation', value: activeParticipation },
    { name: 'Reach', value: reelsReach / 10 },
  ];

  const dataBar = [
    { name: 'Earnings', value: reelsEarnings },
    { name: 'Reels Count', value: reelsCount },
    { name: 'Reach', value: reelsReach / 100 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: '90%',
          maxWidth: '900px',
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left Column: Profile, Reach, and Participation */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                width: 120,
                height: 120,
                fontSize: '48px',
                margin: 'auto',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 600, color: '#333' }}>
              {name || 'User Name'}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              {email || 'user@example.com'}
            </Typography>

            {editMode ? (
              <>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Bio"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleSaveChanges}
                  sx={{
                    backgroundColor: '#4caf50',
                    '&:hover': { backgroundColor: '#388e3c' },
                  }}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                {bio}
              </Typography>
            )}

            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={editMode ? handleSaveChanges : handleEditProfile}
              sx={{ mb: 2, width: '100%' }}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ width: '100%' }}
            >
              Logout
            </Button>
          </Grid>

          {/* Right Column: Profile Stats and Reach/Participation */}
          <Grid item xs={12} sm={8}>
            {/* Profile and Reach/Participation Card */}
            <Card sx={{ mb: 4, borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#1976d2' }}
                >
                  My Reels
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">
                    <AttachMoneyIcon /> Total Earnings:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {reelsEarnings} coins
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="body1">
                    <UploadIcon /> Reels Uploaded:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {reelsCount}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">
                    <PeopleIcon /> Total Reach:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {reelsReach} views
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Active Participation: {activeParticipation}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={activeParticipation}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4caf50',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Graphical Representation Card */}
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 3,
                marginBottom: 4,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, textAlign: 'center', color: '#4caf50' }}
                >
                  Graphical Representation
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <PieChart width={250} height={250}>
                      <Pie
                        data={dataPie}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BarChart width={250} height={250} data={dataBar}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
