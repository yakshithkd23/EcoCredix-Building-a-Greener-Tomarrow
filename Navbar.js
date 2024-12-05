import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Select, MenuItem, FormControl, InputLabel, Drawer, IconButton, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from './back.jpeg'; // Replace this with your logo
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import { Height } from '@mui/icons-material';

function Navbar({ user }) {
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState('user');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [openDrawer, setOpenDrawer] = useState(false); // Drawer state for mobile
  const navigate = useNavigate();

  // Fetch user role and language on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedLanguage = localStorage.getItem('language');
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage); // Set language in i18next on component mount
    }
  }, [i18n]);

  const handleLanguageChange = (event) => {
    const languageCode = event.target.value;
    setSelectedLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleUploadPageRedirect = () => {
    navigate('/record-reel');
  };

  const handleDashboardRedirect = () => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <Container sx={styles.container}>
          {/* Logo and EcoConnect Name */}
          <div sx={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />
          </div>

          {/* Hamburger Icon for mobile */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: 'block', sm: 'none' }, marginLeft: 'auto' }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Buttons (Desktop View) */}
          <Box sx={styles.navButtons}>
            <Button color="inherit" onClick={handleDashboardRedirect} sx={styles.button}>
              {t('dashboard')}
            </Button>
            <Button color="inherit" component={Link} to="/reels" sx={styles.button}>
              {t('reels')}
            </Button>
            <Button color="inherit" component={Link} to="/eco-challenge" sx={styles.button}>
              {t('ecoChallenge')}
            </Button>
            <Button color="inherit" component={Link} to="/community" sx={styles.button}>
              {t('community')}
            </Button>
            <Button color="inherit" component={Link} to="/profile" sx={styles.button}>
              {t('profile')}
            </Button>

            {/* Language Dropdown */}
            <FormControl sx={styles.select}>
              <InputLabel id="language-select-label"></InputLabel>
              <Select
                labelId="language-select-label"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={styles.selectBox}
              >
                <MenuItem value="en">{t('english')}</MenuItem>
                <MenuItem value="hi">{t('hindi')}</MenuItem>
                <MenuItem value="es">{t('spanish')}</MenuItem>
                <MenuItem value="ka">{t('kannada')}</MenuItem>
                <MenuItem value="mr">{t('marathi')}</MenuItem>
                <MenuItem value="ta">{t('tamil')}</MenuItem>
              </Select>
            </FormControl>

            {/* Upload Button */}
            <Button color="inherit" sx={styles.uploadButton} onClick={handleUploadPageRedirect}>
              {t('uploadReel')}
            </Button>
          </Box>
        </Container>
      </Toolbar>

      {/* Drawer (Mobile View) */}
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerToggle}>
        <List sx={styles.drawerList}>
          <ListItem button onClick={handleDashboardRedirect}>
            <ListItemText primary={t('dashboard')} />
          </ListItem>
          <ListItem button component={Link} to="/reels">
            <ListItemText primary={t('reels')} />
          </ListItem>
          <ListItem button component={Link} to="/eco-challenge">
            <ListItemText primary={t('ecoChallenge')} />
          </ListItem>
          <ListItem button component={Link} to="/community">
            <ListItemText primary={t('community')} />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemText primary={t('profile')} />
          </ListItem>

          {/* Language Dropdown (Mobile) */}
          <ListItem>
            <FormControl sx={styles.select}>
              <InputLabel id="language-select-label-mobile">{t('language')}</InputLabel>
              <Select
                labelId="language-select-label-mobile"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={styles.selectBox}
              >
                <MenuItem value="en">{t('english')}</MenuItem>
                <MenuItem value="hi">{t('hindi')}</MenuItem>
                <MenuItem value="es">{t('spanish')}</MenuItem>
                <MenuItem value="ka">{t('kannada')}</MenuItem>
                <MenuItem value="mr">{t('marathi')}</MenuItem>
                <MenuItem value="ta">{t('tamil')}</MenuItem>
              </Select>
            </FormControl>
          </ListItem>

          {/* Upload Button (Mobile) */}
          <ListItem button onClick={handleUploadPageRedirect}>
            <ListItemText primary={t('uploadReel')} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

const styles = {
  appBar: {
    backgroundColor: '#388e3c',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: 0,
    display: 'flex',
    mt:-1,
    // Make sure the AppBar is properly aligned and displayed on mobile and desktop.
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between', // Center logo and buttons on mobile, space around on desktop.
    width: '100%',
    alignItems: 'center', // Ensure items are aligned vertically
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
    marginRight: '15px',
    borderRadius: '50%',
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '15px',
  },
  button: {
    color: '#ffffff',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#2c6e1f',
    },
  },
  uploadButton: {
    color: '#ffffff',
    backgroundColor: '#1b5e20',
    fontWeight: '600',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#2e7d32',
    },
  },
  select: {
    marginLeft: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    '& .MuiInputBase-root': {
      color: '#388e3c',
    },
  },
  selectBox: {
    '& .MuiOutlinedInput-root': {
      borderColor: '#388e3c',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#388e3c',
    },
  },
  drawerList: {
    width: 250,
    padding: '20px',
  },
};

export default Navbar;
