import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Button, Box, Container, Snackbar, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Nature, Assessment, Notifications } from '@mui/icons-material'; // Use Nature as the eco-friendly icon

const AdminDashboard = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <Paper sx={{ padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', backgroundColor: '#e8f5e9' }}>
      <Container>
        <Typography variant="h4" sx={{ color: '#388e3c', fontWeight: '600', marginBottom: '30px' }}>
          Eco-Friendly Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Manage Challenges Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Nature sx={{ fontSize: 50, color: '#388e3c' }} /> {/* Updated icon */}
                <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: '500', marginBottom: '15px' }}>
                  Manage Challenges
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161', marginBottom: '15px' }}>
                  Oversee and create new environmental challenges to engage the community.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Link to="/manage-challenges">
                  <Button variant="contained" color="success">Go to Challenges</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>

          {/* Credit Requests Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Assessment sx={{ fontSize: 50, color: '#388e3c' }} />
                <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: '500', marginBottom: '15px' }}>
                  Credit Requests
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161', marginBottom: '15px' }}>
                  Review and approve credit requests for users taking part in challenges.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Link to="/credit-requests">
                  <Button variant="contained" color="success">View Requests</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>

          {/* Participation Statistics Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Notifications sx={{ fontSize: 50, color: '#388e3c' }} />
                <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: '500', marginBottom: '15px' }}>
                  Participation Statistics
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161', marginBottom: '15px' }}>
                  View how participants are engaging with the challenges and track their progress.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Link to="/statistics">
                  <Button variant="contained" color="success">View Statistics</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Key Metrics Section */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: '600', marginBottom: '15px' }}>
            Recent Environmental Activity
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: '500' }}>Completed Challenges</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>245</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: '500' }}>Total Credits Requested</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>123</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: '500' }}>Pending Requests</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>15</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Notification Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Container>
    </Paper>
  );
};

export default AdminDashboard;
