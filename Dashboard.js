import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Container,
  Paper,
} from '@mui/material';
import { getDatabase, ref, push } from 'firebase/database';
import { database } from '../firebase';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('John Doe');
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const healthScore = 85;

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const API_KEY = 'bcbb35af5421403782b2d29df1b5303b'; // Replace with your OpenWeatherMap API key
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
            setLoadingWeather(false);
            fetchRecommendations(data);  // Fetch AI-based recommendations
          });
        } else {
          alert('Geolocation is not supported by your browser.');
          setLoadingWeather(false);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  const fetchRecommendations = async (weatherData) => {
    const genAI = new GoogleGenerativeAI("AIzaSyCHddQfySr8xEJ0oEOt7sPHGiUJ7KIwv9U");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Based on the following weather conditions:
      - Temperature: ${weatherData.main.temp}°C
      - Humidity: ${weatherData.main.humidity}%
      - Wind Speed: ${weatherData.wind.speed} m/s
      Provide  environmentally friendly recommendations for trees to plant in these condition to keep climate sustainable in point wise  and thier name also.`;

      const result = await model.generateContent(prompt);
      const recommendationsArray = result.response.text().split("\n").map((line) => line.trim()).filter((line) => line !== "");
      const headings = recommendationsArray.map((item) => item.split(":")[0]); // Only take the heading (before the colon)
      setRecommendations(headings);  // Set the recommendations in state
      setLoadingRecommendations(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations(["Unable to fetch recommendations at this time."]);
      setLoadingRecommendations(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClaimReward = async () => {
    if (!userId) {
      alert('Please log in first to claim your reward!');
      return;
    }

    const rewardRequest = {
      user: username,
      reward: `Health Score Reward (${healthScore}%)`,
      status: 'Pending',
      timestamp: new Date().toLocaleString(),
    };

    setLoading(true);

    try {
      const rewardRef = ref(database, `rewardRequests/${userId}`);
      await push(rewardRef, rewardRequest);

      alert('Your reward request has been sent to the admin.');
      setLoading(false);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error sending reward request: ', error);
      alert('There was an error submitting your request. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 5, px: 3, backgroundColor: '#f7f7f7', fontFamily: "'Poppins', sans-serif" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ fontWeight: 600, textAlign: 'center', mb: 4, fontFamily: "'Lora', serif" }}
        >
          🌍 EcoConnect Dashboard
        </Typography>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 600, textAlign: 'center', fontFamily: "'Lora', serif" }}
            >
              🎉 Congratulations!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>
              Your Environmental Health Score is excellent at {healthScore}%! Keep up the great work!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClaimReward}
                disabled={loading}
                sx={{
                  padding: '10px 20px',
                  backgroundColor: '#56ab2f',
                  '&:hover': { backgroundColor: '#4b8d29' },
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Claim your reward'}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <Grid container spacing={3}>
          {/* Health Score Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={5}
              sx={{
                minHeight: 300,
                borderRadius: 4,
                padding: 3,
                background: '#e8f5e9', // Light green
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                🏆 Health Score
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                {healthScore}%
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                You are a true eco-soldier! Click here to claim your reward.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenDialog}
                  sx={{
                    padding: '10px 20px',
                    backgroundColor: '#56ab2f',
                    '&:hover': { backgroundColor: '#4b8d29' },
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Claim Reward
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Weather Information Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={5}
              sx={{
                minHeight: 300,
                borderRadius: 4,
                padding: 3,
                background: '#e1f5fe', // Light sky blue
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {loadingWeather ? (
                <CircularProgress color="inherit" />
              ) : weatherData && weatherData.main && weatherData.weather ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    ☀️ Current Weather in {weatherData.name}
                  </Typography>
                 
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {weatherData.main.temp}°C
                  </Typography>
                  <Typography variant="body1">
                    Temperatuer: {weatherData.main.temp}
                  </Typography>
                  <Typography variant="body1">
                    Humidity: {weatherData.main.humidity}% | Wind Speed: {weatherData.wind.speed} m/s
                  </Typography>
                  <Typography variant="body1">
                  sunset: {weatherData.sys.sunset}pm | sunrise {weatherData.sys.sunrise}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">Weather data unavailable</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Recommendations Section (Moved below the other cards) */}
        <Grid item xs={12}>
          <Paper
            elevation={5}
            sx={{
              minHeight: 400,
              mt:5,
              borderRadius: 4,
              padding: 3,
              background: '#fff3e0', // Light orange
              color: 'black',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              🌱 Environmental Recommendations
            </Typography>
            {loadingRecommendations ? (
              <CircularProgress color="inherit" />
            ) : (
              <Box sx={{ mt: 2 }}>
                {recommendations.length > 0 ? (
                  recommendations.map((recommendation, index) => (
                    <Typography variant="body1" key={index} sx={{ mb: 1, fontSize: '1.1rem', lineHeight: 1.6 }}>
                      - {recommendation}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1">No recommendations available.</Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
