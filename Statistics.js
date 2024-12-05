import React from 'react';
import { Paper, Typography, Box, Grid, Card, CardContent, Divider } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement } from 'chart.js';

// Register the necessary components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement // Ensure the PointElement is registered here
);

const Statistics = () => {
  // Bar chart data for participation trends
  const barData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Participation',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data for challenge status distribution
  const pieData = {
    labels: ['Completed', 'Ongoing', 'Upcoming'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#66bb6a', '#ffa726', '#42a5f5'],
      },
    ],
  };

  // Line chart data with fluctuation
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Daily Active Users',
        data: [
          Math.random() * 300 + 100, // Random value between 100 and 400
          Math.random() * 300 + 100,
          Math.random() * 300 + 100,
          Math.random() * 300 + 100,
        ],
        fill: false,
        borderColor: '#388e3c',
        tension: 0.4, // Making the line more fluctuating
      },
    ],
  };

  // Data for trending reels
  const reelsTrendingData = [
    { title: 'Reel 1', views: 5000, likes: 1000, account: 'user123' },
    { title: 'Reel 2', views: 12000, likes: 3500, account: 'user456' },
    { title: 'Reel 3', views: 8000, likes: 1500, account: 'user789' },
    { title: 'Reel 4', views: 25000, likes: 8000, account: 'user234' },
    { title: 'Reel 5', views: 30000, likes: 10000, account: 'user567' },
  ];

  // Sorting reels by highest views
  const sortedReels = reelsTrendingData.sort((a, b) => b.views - a.views);

  return (
    <Paper sx={{ padding: '30px', borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ marginBottom: '30px', color: '#388e3c', fontWeight: 600 }}>
        Statistics
      </Typography>

      <Grid container spacing={4}>
        {/* Participation Trends */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#616161', marginBottom: '10px' }}>
                Participation Trends
              </Typography>
              <Divider sx={{ marginBottom: '20px' }} />
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => `Participation: ${tooltipItem.raw}`,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Challenge Status Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#616161', marginBottom: '10px' }}>
                Challenge Status Distribution
              </Typography>
              <Divider sx={{ marginBottom: '20px' }} />
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Reels Trending Section */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 600, marginBottom: '20px' }}>
          Reels Trending
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#616161', marginBottom: '20px' }}>
                  Top 5 Trending Reels
                </Typography>
                <Grid container spacing={2}>
                  {sortedReels.slice(0, 5).map((reel, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '12px' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {reel.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#388e3c' }}>
                          Views: {reel.views} | Likes: {reel.likes}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          Account: {reel.account}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* App Performance Section */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 600, marginBottom: '20px' }}>
         App performance
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#616161', marginBottom: '10px' }}>
                  Daily Active Users
                </Typography>
                <Divider sx={{ marginBottom: '20px' }} />
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => `Active Users: ${tooltipItem.raw}`,
                        },
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Statistics;
