import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const collections = [
  {
    id: 'best-sellers',
    name: 'Best Sellars',
    image: 'https://i.pinimg.com/736x/81/e9/ab/81e9abe7ceaf1b46ed0ee2027646aa26.jpg' },
  {
    id: 'tshirts',
    name: 'Tshirts',
    image: 'https://i.pinimg.com/736x/74/e1/d1/74e1d14d3d3ac7331ab9efca9ecf9e6e.jpg',
  },
  {
    id: 'shirts',
    name: 'Shirts',
    image: 'https://burst.shopifycdn.com/photos/white-collar-shirts-on-rack-in-sun.jpg?width=1000&format=pjpg&exif=0&iptc=0',
  },
  {
    id: 'polo-t-shirts',
    name: 'Polo T-shirts',
    image: 'https://i.pinimg.com/736x/21/fc/56/21fc56b1fd4ae1fff4b1311dd57e264d.jpg',
  },
  {
    id: 'oversized-t-shirts',
    name: 'Oversized T-shirts',
    image: 'https://i.pinimg.com/736x/67/70/e3/6770e30d3aa59d0aa59cd1b9592c7903.jpg',
  },
  {
    id: 'bottom-wear',
    name: 'Bottom Wear',
    image: 'https://i.pinimg.com/736x/05/0f/b2/050fb2d6939e3614ad5a61807f19d22e.jpg',
  },
  {
    id: 'cargo-pants',
    name: 'Cargo Pants',
    image: 'https://i.pinimg.com/736x/94/03/0b/94030be325f5d12082139018f6c2e079.jpg',
  },
    {
    id: 'jackets',
    name: 'Jackets',
    image: 'https://i.pinimg.com/736x/26/5a/7a/265a7add90f5682fc56ad7ccb656fd01.jpg',
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: 'https://ideogram.ai/assets/image/lossless/response/aF72yuw5RU-Z5T95m8FS2g',
  },
    {
    id: 'co-ord-sets',
    name: 'Co-Ord Sets',
    image: 'https://ideogram.ai/assets/image/lossless/response/eOzvuoTISKijWYlPlEA-ZA',
  },
];

// Add a royalty-free human PNG image URL
const humanPng = 'https://pngimg.com/uploads/businessman/businessman_PNG6567.png'; // Example PNG with transparency

const Collections = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 3, md: 8 },
        px: { xs: 2, md: 3 }
      }}
    >
      {/* Hero Section */}
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: { xs: 1.5, md: 2 },
            letterSpacing: { xs: '-0.02em', md: '-0.03em' }
          }}
        >
          Our Collections
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            px: { xs: 2, md: 0 }
          }}
        >
          Discover our carefully curated collections, each telling its own unique story
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {collections.map((collection, index) => (
          <Card
            key={collection.id}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: { xs: '8px', md: '12px' },
              height: { xs: '80px', sm: '90px', md: '100px' },
              p: 0,
              background: 'linear-gradient(90deg, #111 60%, #444 100%)',
            }}
          >
            <CardActionArea 
              onClick={() => navigate(`/collections/${collection.id}`)}
              sx={{
                height: '100%',
                p: 0,
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Human PNG overlay, alternate left/right, bigger and centered */}
              <Box
                component="img"
                src={humanPng}
                alt="Human"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: index % 2 === 1 ? 0 : 'auto',
                  right: index % 2 === 0 ? 0 : 'auto',
                  transform: 'translateY(-50%)',
                  height: { xs: 90, sm: 110, md: 130 },
                  zIndex: 3,
                  opacity: 0.92,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))',
                  userSelect: 'none',
                  display: { xs: 'block', md: 'block' }
                }}
              />
              {/* Centered collection name */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 4,
                  textAlign: 'center',
                  p: 0
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                    fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.35rem' },
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    px: 1
                  }}
                >
                  {collection.name}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Collections; 