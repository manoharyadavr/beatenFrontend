import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Paper,
  Box,
  Avatar
} from '@mui/material';
import {
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';

const bottomNavItems = [
  { name: 'Explore', path: '/collections', icon: <ExploreIcon /> },
  { name: 'Products', path: '/products', icon: <ShoppingBagIcon /> },
  { 
    name: 'Home', 
    path: '/', 
    icon: (
      <Box 
        component="img" 
        src="/Beaten/Artboard 3 copy.png" 
        alt="Beaten Logo" 
        sx={{
          width: 40,
          height: 40,
          objectFit: 'contain',
        }}
      />
    ) 
  },
  { name: 'Wishlist', path: '/wishlist', icon: <FavoriteIcon /> },
  { name: 'Account', path: '/profile', icon: (
    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.18)', width: 32, height: 32 }}>
      <PersonIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
    </Avatar>
  ) }
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) return null;

  const currentPath = location.pathname;
  const activeItem = bottomNavItems.find(item => item.path === currentPath) || bottomNavItems[0];

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0
      }}
    >
      <BottomNavigation
        value={activeItem.path}
        onChange={(event, newValue) => {
          if (newValue !== location.pathname) {
             navigate(newValue);
             window.scrollTo(0, 0);
          }
        }}
        sx={{
          backgroundColor: 'transparent',
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.2s ease',
            minWidth: 'auto',
            padding: '6px 8px',
            '&.Mui-selected': {
              color: '#FFFFFF',
              '& .MuiBottomNavigationAction-label': {
                fontWeight: 500,
                fontSize: '0.7rem',
              }
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
              transition: 'all 0.2s ease',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
              marginBottom: '2px'
            }
          }
        }}
      >
        {bottomNavItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.name}
            value={item.path}
            icon={item.icon}
            component={RouterLink}
            to={item.path}
            sx={{
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav; 