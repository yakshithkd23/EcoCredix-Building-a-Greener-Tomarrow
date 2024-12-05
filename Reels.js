import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Card, CardContent, CardActions } from '@mui/material';
import { ThumbUp, ChatBubble, PersonAdd } from '@mui/icons-material';

const Reels = () => {
  // Sample data for reels
  const [reels, setReels] = useState([
    {
      id: 1,
      videoUrl: '/video/video1.mp4', // Corrected path for video stored in the public folder
      uploader: 'EcoWarrior123',
      description: 'Cleaning the community park',
      likes: 45,
      comments: [],
      isLiked: false,
      isFollowed: false,
    },
    {
      id: 2,
      videoUrl: '/video/vido2.mp4', // Sample video URL
      uploader: 'GreenPlanetHero',
      description: 'Reducing plastic waste',
      likes: 25,
      comments: ['Important initiative!', 'More people should join!', 'We need this!'],
      isLiked: false,
      isFollowed: false,
    },
    {
      id:3,
      videoUrl: '/video/vido2.mp4', // Sample video URL
      uploader: 'GreenPlanetHero',
      description: 'Reducing plastic waste',
      likes: 25,
      comments: ['Important initiative!', 'More people should join!', 'We need this!'],
      isLiked: false,
      isFollowed: false,
    },
    {
      id: 4,
      videoUrl: '/video/vido2.mp4', // Sample video URL
      uploader: 'GreenPlanetHero',
      description: 'Reducing plastic waste',
      likes: 25,
      comments: ['Important initiative!', 'More people should join!', 'We need this!'],
      isLiked: false,
      isFollowed: false,
    },
  ]);

  const handleLike = (id) => {
    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel.id === id
          ? { ...reel, isLiked: !reel.isLiked, likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1 }
          : reel
      )
    );
  };

  const handleFollow = (id) => {
    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel.id === id ? { ...reel, isFollowed: !reel.isFollowed } : reel
      )
    );
  };

  const handleAddComment = (id, comment) => {
    if (comment.trim()) {
      setReels((prevReels) =>
        prevReels.map((reel) =>
          reel.id === id
            ? { ...reel, comments: [...reel.comments, comment] }
            : reel
        )
      );
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Community Reels
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {reels.map((reel) => (
          <Grid item xs={12} sm={6} md={4} key={reel.id}>
            <Card sx={{ maxWidth: 345, position: 'relative' }}>
              {/* Uploader's Name */}
              <Typography
                variant="body1"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontSize: '0.9rem',
                }}
              >
                {reel.uploader}
              </Typography>
              {/* Video */}
              <video
                src={reel.videoUrl}
                controls
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <CardContent>
                <Typography variant="body1">{reel.description}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ThumbUp />}
                    onClick={() => handleLike(reel.id)}
                    sx={{ marginRight: 2 }}
                  >
                    {reel.isLiked ? 'Unlike' : 'Like'} ({reel.likes})
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PersonAdd />}
                    onClick={() => handleFollow(reel.id)}
                  >
                    {reel.isFollowed ? 'Unfollow' : 'Follow'}
                  </Button>
                </Box>
              </CardContent>
              <CardActions>
                <TextField
                  label="Add a comment"
                  fullWidth
                  variant="outlined"
                  size="small"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(reel.id, e.target.value)}
                />
              </CardActions>
              <CardContent>
                {reel.comments.length > 0 && (
                  <Box>
                    {reel.comments.map((comment, index) => (
                      <Typography variant="body2" color="text.secondary" key={index}>
                        {comment}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reels;
