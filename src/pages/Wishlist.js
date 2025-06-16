import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Fade,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ py: { xs: 0, md: 0 }, px: 0 }}>
      {/* Header Section */}
      <Box sx={{ mb: 0, px: { xs: 2, md: 0 }, pt: { xs: 3, md: 6 }, pb: 2, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            fontSize: { xs: '2.1rem', md: '2.8rem' },
            letterSpacing: '-0.03em',
            mb: 0.5,
            color: 'primary.main',
            textShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          My Wishlist
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '1rem', md: '1.15rem' },
            maxWidth: '600px',
            mx: 'auto',
            mb: 1.5,
            fontWeight: 400,
            letterSpacing: 0.1,
            lineHeight: 1.6
          }}
        >
          Save your favorite items and keep track of what you love. Add items to your cart when you're ready to purchase.
        </Typography>
      </Box>

      <Divider sx={{ mb: 0 }} />

      {wishlist.length === 0 ? (
        <Fade in={true}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: { xs: 6, md: 12 },
              px: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
            }}
          >
            <FavoriteBorderIcon 
              sx={{ 
                fontSize: '4rem', 
                color: 'text.secondary',
                opacity: 0.5,
                mb: 2
              }} 
            />
            <Typography 
              variant="h6" 
              color="text.secondary" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                mb: 2
              }}
            >
              Your wishlist is empty
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: 3, maxWidth: '400px', mx: 'auto' }}
            >
              Start adding items to your wishlist by clicking the heart icon on any product you like.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/products')}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Browse Products
            </Button>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={0} sx={{ margin: 0, width: '100%', padding: 0 }}>
          {wishlist.map((product, index) => (
            <Grid item key={product._id} xs={6} md={2.4} sx={{ padding: 0, margin: 0 }}>
              <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    borderRadius: 0,
                    overflow: 'hidden',
                    boxShadow: 'none',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                      '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  <Box sx={{ 
                    position: 'relative', 
                    overflow: 'hidden',
                    width: '100%',
                    minHeight: { xs: 280, md: 320 },
                    borderRadius: 0
                  }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: { xs: 280, md: 320 },
                        width: '100%',
                        cursor: 'pointer',
                        transition: 'transform 0.5s ease',
                        objectFit: 'cover',
                        borderRadius: 0
                      }}
                      image={product.image}
                      alt={product.name}
                      onClick={() => handleProductClick(product._id)}
                    />
                    <Tooltip title="Remove from wishlist">
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease-in-out',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onClick={() => removeFromWishlist(product._id)}
                      >
                        <FavoriteIcon sx={{ color: '#ff1744' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    borderRadius: 0
                  }}>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        '&:hover': { color: 'primary.main' },
                        lineHeight: 1.4,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                      onClick={() => handleProductClick(product._id)}
                    >
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        mb: 1
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    {product.colors && product.colors.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        {product.colors.map(color => (
                          <Box
                            key={color}
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              bgcolor: color.toLowerCase().replace(' ', ''),
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                              transition: 'transform 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.2)'
                              }
                            }}
                            title={color}
                          />
                        ))}
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      sx={{ 
                        mt: 'auto',
                        py: 0.5,
                        px: 1,
                        borderRadius: 0,
                        textTransform: 'none',
                        fontSize: { xs: '0.75rem', md: '0.8rem' },
                        fontWeight: 500,
                        minHeight: '32px',
                        '& .MuiButton-startIcon': {
                          marginRight: 0.5,
                          '& svg': {
                            fontSize: '0.9rem'
                          }
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Wishlist;