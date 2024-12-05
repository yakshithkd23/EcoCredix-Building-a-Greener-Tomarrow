import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import { CreditCard, Lock } from '@mui/icons-material';

const handleOnClick = () => {
  window.alert("Thank you for your donation!");
};

function DonationPage() {
  return (
    <Box sx={{ p: 4, backgroundColor: '#e8f5e9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#2e7d32', fontWeight: 700 }}>
        🌱 Donation Page
      </Typography>
      <Card sx={{ maxWidth: 800, margin: '0 auto', p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#004d40' }}>
            Support the Cause with Your Generosity
          </Typography>

          {/* Donor Information Section */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                placeholder="Enter your full name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                placeholder="Enter your email address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount ($)"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                type="number"
                placeholder="Enter donation amount"
              />
            </Grid>
          </Grid>

          {/* Credit Card Payment Section */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#004d40' }}>
            Payment Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                placeholder="Enter your card number"
                InputProps={{
                  startAdornment: (
                    <CreditCard sx={{ color: '#004d40', mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                type="number"
                placeholder="CVV"
                InputProps={{
                  startAdornment: (
                    <Lock sx={{ color: '#004d40', mr: 1 }} />
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Donate Button */}
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleOnClick}  
            sx={{
              mt: 3,
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' },
            }}
          >
            Donate Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DonationPage;
