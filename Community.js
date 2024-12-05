import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  CardMedia,
  TextField,
} from "@mui/material";
import { ThumbUp, Favorite, EmojiEmotions } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Community() {
  const [ecoNews, setEcoNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reactions, setReactions] = useState({});
  const navigate = useNavigate(); // Hook to navigate

  const fundingAlerts = [
    {
      title: "🌱 Green Fundraiser: Support Urban Tree Planting",
      description: "Target: $10,000 | Raised: $8,500",
      action: "Donate Now",
    },
    {
      title: "🌊 Save the Oceans Campaign",
      description: "Target: $25,000 | Raised: $18,000",
      action: "Contribute",
    },
    {
      title: "🌳 Forest Preservation Fund",
      description: "Target: $50,000 | Raised: $20,000",
      action: "Donate to Preserve",
    },
    {
      title: "💧 Clean Water Initiative",
      description: "Target: $30,000 | Raised: $10,000",
      action: "Contribute Now",
    },
  ];

  useEffect(() => {
    const fetchEcoNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=eco OR environment OR "eco-friendly" OR "green initiatives" OR sustainability&sortBy=publishedAt&apiKey=4900417be534438288eceeea64e5028c`
        );
        const data = await response.json();
        if (data.articles) {
          setEcoNews(data.articles.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching eco-friendly news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEcoNews();
  }, []);

  const handleReaction = (index, emoji) => {
    setReactions((prev) => ({
      ...prev,
      [index]: emoji,
    }));
  };

  const handleDonateClick = () => {
    navigate('./donationPage'); // Directly navigate to the donation page
  };

  return (
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(to bottom right, #f0f4f8, #e8f5e9)",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "#2e7d32",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        Community Hub 🌿
      </Typography>

      {/* Funding Alerts Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: "#00796b",
          }}
        >
          🌱 Funding Alerts
        </Typography>
        <Grid container spacing={3}>
          {fundingAlerts.map((fundingAlertData, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {fundingAlertData.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {fundingAlertData.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleDonateClick} // Just call navigate here directly
                  >
                    {fundingAlertData.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Eco News Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: "#1b5e20",
          }}
        >
          🌍 Latest Eco-Friendly News
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : ecoNews.length > 0 ? (
          <Grid container spacing={3}>
            {ecoNews.map((news, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.02)" },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {news.urlToImage && (
                    <CardMedia
                      component="img"
                      height="150"
                      image={news.urlToImage}
                      alt={news.title}
                      sx={{
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                  )}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#004d40",
                        mb: 1,
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {news.description}
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      fullWidth
                      onClick={() => window.open(news.url, "_blank")}
                    >
                      Read More
                    </Button>
                  </CardContent>

                  {/* Reaction Buttons Section */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      padding: 1,
                      borderTop: "1px solid #e0e0e0",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleReaction(index, "👍")}
                    >
                      <ThumbUp />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleReaction(index, "❤️")}
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => handleReaction(index, "😊")}
                    >
                      <EmojiEmotions />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: "#00796b" }}>
                      {reactions[index]}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
            No eco-related news available at the moment.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Community;
