import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  IconButton
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Star as StarIcon,
  KeyboardArrowDown as ScrollIcon,
  KeyboardArrowLeft as ArrowLeftIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@mui/icons-material';

const matteColors = {
  900: '#1a1a1a', // Deepest matte black
  800: '#2d2d2d', // Rich matte black
  700: '#404040', // Medium matte black
  600: '#525252', // Light matte black
  100: '#f5f5f5'  // Off-white
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCollection, setCurrentCollection] = useState(0);
  const collectionsRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'BEATEN',
      subtitle: 'URBAN DROP VOL . 1',
      description: 'Experience premium streetwear with our inaugural collection. Limited pieces, exceptional quality.'
    },
    {
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'PREMIUM STREET',
      subtitle: 'ELEVATE YOUR STYLE',
      description: 'Discover our premium collection crafted with exceptional materials and attention to detail.'
    },
    {
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'LIMITED EDITION',
      subtitle: 'EXCLUSIVE DROPS',
      description: 'Be the first to get your hands on our limited edition pieces. Join the premium club for early access.'
    },
    {
      image: '/Beaten/hero1.jpeg',
      // title: 'LIMITED EDITION',
      // subtitle: 'EXCLUSIVE DROPS',
      // description: 'Be the first to get your hands on our limited edition pieces. Join the premium club for early access.'
    }
  ];

  const collections = [
    {
      title: 'Urban Essentials',
      description: 'Core streetwear pieces that define urban style. Essential for every wardrobe.',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/collections/urban-essentials'
    },
    {
      title: 'Premium Street',
      description: 'Elevated streetwear with premium materials and exceptional craftsmanship.',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/collections/premium-street'
    },
    {
      title: 'Limited Edition',
      description: 'Exclusive drops with unique designs. Limited quantities, maximum impact.',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/collections/limited-edition'
    },
    {
      title: 'Signature Series',
      description: 'Our most iconic designs, reimagined for the modern streetwear enthusiast.',
      image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/collections/signature'
    }
  ];

  const features = [
    {
      icon: <ShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Express Shipping',
      description: 'Free express shipping on all orders over $100'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Shopping',
      description: '100% secure payment processing'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Dedicated customer service team'
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Premium Quality',
      description: 'Crafted with premium materials'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentCollection((prev) => {
          const next = (prev + 1) % collections.length;
          handleCollectionScroll(next);
          return next;
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleCollectionScroll = (index) => {
    if (collectionsRef.current) {
      const cardWidth = 280;
      const gap = 16;
      const scrollPosition = index * (cardWidth + gap);
      collectionsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentCollection(index);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCollectionClick = (collection) => {
    navigate(`/products?collection=${encodeURIComponent(collection)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ overflowX: 'hidden', width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', sm: '80vh', md: '90vh' },
          minHeight: { xs: 450, md: 600 },
          overflow: 'hidden',
          bgcolor: 'black',
        }}
      >
        {heroSlides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Overlay for readability */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
                zIndex: 1,
              }}
            />
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  justifyContent: 'center',
                  color: 'white',
                  maxWidth: { xs: '100%', md: '50%' },
                  px: { xs: 2, md: 0 },
                  py: { xs: 2, md: 0 },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    fontFamily: ['Roboto', 'sans-serif'],
                    mb: 2,
                    fontSize: { xs: '1.7rem', sm: '2.3rem', md: '3.5rem' },
                    letterSpacing: { xs: '0.09em', md: '0.18em' },
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: { xs: '1.15rem', sm: '1.4rem', md: '2rem' },
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    opacity: 0.92,
                  }}
                >
                  {slide.subtitle}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 1.5,
                    opacity: 0.85,
                    maxWidth: 600,
                    fontSize: { xs: '0.98rem', sm: '1.08rem', md: '1.2rem' },
                  }}
                >
                  {slide.description}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: { xs: 4, sm: 0 }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    size={isMobile ? 'large' : 'medium'}
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      navigate('/collections/launch-sale');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{
                      backgroundColor: matteColors[900],
                      color: 'white',
                      py: isMobile ? 1.2 : 1,
                      px: isMobile ? 3 : 4,
                      fontSize: { xs: '1.04rem', md: '0.9rem' },
                      borderRadius: 10,
                      width: 'auto',
                      minWidth: 0,
                      '&:hover': {
                        backgroundColor: matteColors[800],
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease',
                      alignSelf: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    SHOP NOW
                  </Button>
                  <Button
                    variant="outlined"
                    size={isMobile ? 'large' : 'medium'}
                    onClick={() => {
                      navigate('/premium');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{
                      borderColor: matteColors[900],
                      color: matteColors[900],
                      backgroundColor: 'white',
                      py: isMobile ? 1.2 : 1,
                      px: isMobile ? 3 : 4,
                      fontSize: { xs: '1.04rem', md: '0.9rem' },
                      borderRadius: 10,
                      width: 'auto',
                      minWidth: 0,
                      '&:hover': {
                        backgroundColor: matteColors[100],
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease',
                      alignSelf: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Join Premium
                  </Button>
                </Stack>
              </Box>
            </Container>
          </Box>
        ))}

        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrevSlide}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            zIndex: 3
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={handleNextSlide}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.5)'
            },
            zIndex: 3
          }}
        >
          <ArrowRightIcon />
        </IconButton>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 3
          }}
        >
          {heroSlides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            />
          ))}
        </Box>

        {/* Scroll Indicator */}
        <Box
          onClick={scrollToContent}
          sx={{
            position: 'absolute',
            bottom: { xs: 20, sm: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateY(0) translateX(-50%)'
              },
              '40%': {
                transform: 'translateY(-20px) translateX(-50%)'
              },
              '60%': {
                transform: 'translateY(-10px) translateX(-50%)'
              }
            },
            zIndex: 3
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              opacity: 0.8,
              mb: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem'
            }}
          >
            Scroll to explore
          </Typography>
          <ScrollIcon sx={{ color: 'white', opacity: 0.8, fontSize: 40 }} />
        </Box>
      </Box>

      {/* Shop By Category */}
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'white', position: 'relative' }}>
        <Container maxWidth="xl">
          {/* <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, letterSpacing: '-0.02em', color: 'text.primary', textAlign: 'center', fontSize: { xs: '1.15rem', sm: '1.4rem', md: '2rem' } }}>
            SHOP BY CATEGORY
            <Box sx={{ 
              height: 2, 
              width: 48, 
              bgcolor: 'black', 
              borderRadius: 2, 
              mt: 1,
              mx: 'auto'
            }} />
          </Typography> */}
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: { xs: 2, md: 3 },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: '#000000',
              borderRadius: '2px'
            }
          }}>
            SHOP BY CATEGORY
          </Typography>
          {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2, fontWeight: 500, letterSpacing: '0.01em' }}>
            Discover our most popular categories and shop the latest trends
          </Typography> */}
          {/* <Box sx={{ width: '100%', mb: 1 }}>
            <Box sx={{ height: 2, width: 48, bgcolor: 'black', borderRadius: 2, mb: 0.5 }} />
            <Box sx={{ height: 1, width: '100%', bgcolor: 'grey.100', borderRadius: 1 }} />
          </Box> */}
          <Grid container spacing={0} sx={{ mt: 1.5, flexWrap: { xs: 'wrap', md: 'nowrap' }, overflowX: 'hidden', py: { xs: 0, md: 2 } }}>
            {[
              { label: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80', category: 't-shirts' },
              { label: 'Shirts', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80', category: 'shirts' },
              { label: 'Cargo Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80', category: 'cargo-pants' },
              { label: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80', category: 'jackets' },
              { label: 'Co-Ord Sets', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', category: 'co-ord-sets' }
            ].map((cat, index, arr) => (
              <Grid 
                item
                xs={6}
                sm={6}
                md={2.4}
                key={cat.label}
                sx={{ display: 'flex', justifyContent: 'flex-start', p: 0 }}
              >
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 0, 
                    overflow: 'hidden', 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    minHeight: { xs: 220, md: 280 },
                    width: '100%',
                    '&:hover': { 
                      boxShadow: 4,
                      transform: 'translateY(-8px) scale(1.04)'
                    } 
                  }}
                  onClick={() => handleCategoryClick(cat.category)}
                >
                  <Box sx={{ position: 'relative', width: '100%', pt: '140%', overflow: 'hidden' }}>
                    <CardMedia 
                      component="img" 
                      image={cat.image} 
                      alt={cat.label} 
                      sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                  <CardContent sx={{ textAlign: 'center', p: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.18rem' } }}>{cat.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Best Sellers */}
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ 
            fontSize:  { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: { xs: 2, md: 3 },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: '#000000',
              borderRadius: '2px'
            }
          }}>
            BEST SELLERS
          </Typography>
          <Box
            sx={{
              display: { xs: 'flex', md: 'grid' },
              gridTemplateColumns: { md: 'repeat(5, 1fr)' },
              gap: 0,
              overflowX: { xs: 'auto', md: 'visible' },
              py: { xs: 0, md: 2 },
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {[1,2,3,4,5].map((i) => {
              // Sample colors for demo
              const colors = [
                ['#000', '#fff', '#c00'],
                ['#1976d2', '#ffeb3b', '#43a047'],
                ['#f44336', '#e91e63', '#9c27b0'],
                ['#ff9800', '#795548', '#607d8b'],
                ['#212121', '#bdbdbd', '#ffd600']
              ][(i-1)%5];
              return (
                <Box
                  key={i}
                  sx={{
                    flex: { xs: '0 0 50%', md: 'unset' },
                    minWidth: { xs: '50%', md: 'unset' },
                    maxWidth: { xs: '50%', md: 'unset' },
                    p: 0,
                    display: 'flex',
                  }}
                >
                  <Card 
                    elevation={0} 
                    sx={{ 
                      borderRadius: 0, 
                      overflow: 'hidden', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease',
                      minHeight: { xs: 240, md: 300 },
                      width: '100%',
                      '&:hover': { 
                        boxShadow: 4,
                        transform: 'translateY(-8px) scale(1.04)'
                      } 
                    }}
                    onClick={() => handleProductClick(i)}
                  >
                    <Box sx={{ position: 'relative', width: '100%', pt: '160%', overflow: 'hidden' }}>
                      <CardMedia 
                        component="img" 
                        image={[
                          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
                          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
                          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
                          'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=600&q=80',
                          'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
                        ][i-1]} 
                        alt={`Best Seller ${i}`} 
                        sx={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out'
                        }} 
                      />
                    </Box>
                    <CardContent sx={{ textAlign: 'center', p: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Product {i}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.7, my: 1 }}>
                        {colors.map((color, idx) => (
                          <Box key={idx} sx={{ width: 18, height: 18, borderRadius: '50%', background: color, border: '1.5px solid #eee', boxShadow: '0 1px 2px rgba(0,0,0,0.07)' }} />
                        ))}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.82rem', sm: '0.92rem', md: '1rem' } }}>₹{1999 + i * 100}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              size={isMobile ? 'large' : 'medium'}
              sx={{
                backgroundColor: matteColors[900],
                color: 'white',
                py: isMobile ? 1 : 1,
                px: isMobile ? 2 : 4,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                borderRadius: 10,
                width: 'auto',
                minWidth: 0,
                '&:hover': {
                  backgroundColor: matteColors[800],
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                transition: 'all 0.3s ease',
                alignSelf: 'center',
                whiteSpace: 'nowrap'
              }}
              onClick={() => navigate('/products?sort=best-sellers')}
            >
              SEE MORE
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Sectioned Collections */}
      {[
        { name: 'T-SHIRTS', key: 't-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80' },
        { name: 'SHIRTS', key: 'shirts', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80' },
        { name: 'OVERSIZED T-SHIRTS', key: 'oversized-t-shirts', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80' },
        { name: 'BOTTOM WEAR', key: 'bottom-wear', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80' },
        { name: 'CARGO PANTS', key: 'cargo-pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80' },
        { name: 'JACKETS', key: 'jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80' },
        { name: 'HOODIES', key: 'hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80' },
        { name: 'CO-ORD SETS', key: 'co-ord-sets', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80' }
      ].map((section, idx) => (
        <Box key={section.key} sx={{ py: { xs: 4, md: 6 }, bgcolor: idx % 2 === 0 ? 'white' : 'grey.50' }}>
          <Container maxWidth="xl">
            <Typography variant="h2" sx={{
              fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: { xs: 2, md: 3 },
              position: 'relative',
              letterSpacing: '-0.02em',
              color: matteColors[900],
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: '#000000',
                borderRadius: '2px'
              }
            }}>{section.name}</Typography>
            <Box sx={{ position: 'relative', width: '100%', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
              <img 
                src={section.image} 
                alt={section.name} 
                style={{ 
                  width: '100%', 
                  height: isMobile ? '180px' : '320px', 
                  objectFit: 'cover', 
                  display: 'block' 
                }} 
              />
              <Button
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: matteColors[900],
                  color: 'white',
                  fontSize: { xs: '0.92rem', md: '1.15rem' },
                  py: { xs: 0.7, md: 1.5 },
                  px: { xs: 2, md: 5 },
                  borderRadius: { xs: 8, md: 10 },
                  width: 'auto',
                  minWidth: 0,
                  '&:hover': {
                    backgroundColor: matteColors[800],
                    transform: 'translate(-50%, -52%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s ease',
                  alignSelf: 'center',
                  whiteSpace: 'nowrap',
                  zIndex: 2
                }}
                onClick={() => navigate(`/products?category=${encodeURIComponent(section.key)}`)}
              >
                SHOP ALL
              </Button>
            </Box>
            <Box
              sx={{
                mt: 1.5,
                display: { xs: 'flex', md: 'grid' },
                gridTemplateColumns: { md: 'repeat(5, 1fr)' },
                gap: 0,
                overflowX: { xs: 'auto', md: 'visible' },
                py: { xs: 0, md: 2 },
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {[1,2,3,4,5].map((i) => {
                // Sample colors for demo
                const colors = [
                  ['#000', '#fff', '#c00'],
                  ['#1976d2', '#ffeb3b', '#43a047'],
                  ['#f44336', '#e91e63', '#9c27b0'],
                  ['#ff9800', '#795548', '#607d8b'],
                  ['#212121', '#bdbdbd', '#ffd600']
                ][(i-1)%5];
                return (
                  <Box
                    key={i}
                    sx={{
                      flex: { xs: '0 0 50%', md: 'unset' },
                      minWidth: { xs: '50%', md: 'unset' },
                      maxWidth: { xs: '50%', md: 'unset' },
                      p: 0,
                      display: 'flex',
                    }}
                  >
                    <Card 
                      elevation={0} 
                      sx={{ 
                        borderRadius: 0, 
                        overflow: 'hidden', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        minHeight: { xs: 180, md: 260 },
                        width: '100%',
                        '&:hover': { 
                          boxShadow: 4,
                          transform: 'translateY(-8px) scale(1.04)'
                        } 
                      }}
                      onClick={() => handleProductClick(i)}
                    >
                      <Box sx={{ position: 'relative', width: '100%', pt: '120%', overflow: 'hidden' }}>
                        <CardMedia 
                          component="img" 
                          image={[
                            'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
                          ][(i-1)%5]} 
                          alt={`Product ${i}`} 
                          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease-in-out' }} 
                        />
                      </Box>
                      <CardContent sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{section.name} {i}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.7, my: 1 }}>
                          {colors.map((color, idx) => (
                            <Box key={idx} sx={{ width: 18, height: 18, borderRadius: '50%', background: color, border: '1.5px solid #eee', boxShadow: '0 1px 2px rgba(0,0,0,0.07)' }} />
                          ))}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.82rem', sm: '0.92rem', md: '1rem' } }}>₹{1999 + i * 100}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
              <Button
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  backgroundColor: matteColors[900],
                  color: 'white',
                  fontSize: { xs: '0.92rem', md: '1.15rem' },
                  py: { xs: 0.7, md: 1.5 },
                  px: { xs: 2, md: 5 },
                  borderRadius: { xs: 8, md: 10 },
                  width: 'auto',
                  minWidth: 0,
                  '&:hover': {
                    backgroundColor: matteColors[800],
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s ease',
                  alignSelf: 'center',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => navigate(`/products?category=${encodeURIComponent(section.key)}`)}
              >
                SEE MORE
              </Button>
            </Box>
          </Container>
        </Box>
      ))}

      {/* Features Section */}
      <Box sx={{ py: { xs: 3, md: 2 }, mt: { xs: 3, md: 2 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: { xs: 1.5, md: 2 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box sx={{ color: 'black' }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      fontSize: { xs: '0.95rem', md: '1.1rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      maxWidth: '250px',
                      fontSize: { xs: '0.8rem', md: '1rem' }
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Premium Membership Banner */}
      <Box sx={{ py: { xs: 2, md: 3 }, pb: { xs: 2, md: 2 }, mb: 0, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          <Paper
            sx={{
              p: { xs: 2, md: 6 },
              background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
              color: 'white',
              mb: { xs: 0, md: 6 },
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{
                  bgcolor: 'transparent',
                  color: 'white',
                  borderRadius: 2,
                  p: { xs: 2, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: '100%'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.2, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #C9A14A 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: { xs: '1.1rem', md: '2rem' } }}>
                    Join BEATEN CLUB
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.85, mb: 2, color: 'white', fontWeight: 400, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                    Unlock exclusive streetwear experiences, rewards, and VIP treatment as a BEATEN CLUB member.
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size={isMobile ? 'large' : 'medium'}
                      sx={{
                        background: 'linear-gradient(90deg, #FFD700 0%, #C9A14A 100%)',
                        color: 'black',
                        py: isMobile ? 1.2 : 1,
                        px: isMobile ? 3 : 4,
                        fontSize: { xs: '0.7rem', md: '0.9rem' },
                        borderRadius: 10,
                        width: 'auto',
                        minWidth: 0,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #C9A14A 0%, #FFD700 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        },
                        transition: 'all 0.3s ease',
                        alignSelf: 'center',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => navigate('/premium')}
                    >
                      JOIN NOW
                    </Button>
                    <Button
                      variant="outlined"
                      size={isMobile ? 'large' : 'medium'}
                      onClick={() => navigate('/premium')}
                      sx={{
                        borderColor: matteColors[900],
                        color: matteColors[900],
                        backgroundColor: 'white',
                        py: isMobile ? 1.2 : 1,
                        px: isMobile ? 3 : 4,
                        fontSize: { xs: '0.7rem', md: '0.9rem' },
                        borderRadius: 10,
                        width: 'auto',
                        minWidth: 0,
                        '&:hover': {
                          backgroundColor: matteColors[100],
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        },
                        transition: 'all 0.3s ease',
                        alignSelf: 'center',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      LEARN MORE
                    </Button>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{
                  bgcolor: '#181818',
                  color: 'white',
                  borderRadius: 2,
                  p: { xs: 2, md: 3 },
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}>
                  <Grid container spacing={1.2} sx={{ width: '100%' }}>
                    {[
                      'Early Access to new drops',
                      'Exclusive Member Discounts',
                      'Free Express Shipping',
                      'VIP Customer Support',
                      'Special Birthday Rewards'
                    ].map((point, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                            <defs>
                              <linearGradient id={`gold-gradient-${idx}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#C9A14A" />
                                <stop offset="100%" stopColor="#FFD700" />
                              </linearGradient>
                            </defs>
                            <path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z" fill={`url(#gold-gradient-${idx})`} />
                            <circle cx="12" cy="12" r="11" stroke={`url(#gold-gradient-${idx})`} strokeWidth="2" fill="none" />
                          </svg>
                          <span style={{
                            fontWeight: 500,
                            color: 'white',
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' }
                          }}>{point}</span>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 