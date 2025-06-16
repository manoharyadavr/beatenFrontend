import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/format';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistDialog, setWishlistDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const discount = user?.isPremium ? 250 : 0;
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal - discount + shipping;

  // Handlers
  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(item.product._id, item.size, item.color, newQuantity);
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await removeFromCart(item.product._id, item.size, item.color);
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleWishlistToggle = (item) => {
    setSelectedItem(item);
    setWishlistDialog(true);
  };

  const handleWishlistConfirm = async () => {
    try {
      const productToAdd = {
        _id: selectedItem.product._id,
        name: selectedItem.product.name,
        price: selectedItem.product.price,
        image: selectedItem.product.image,
        description: selectedItem.product.description,
        category: selectedItem.product.category,
        subCategory: selectedItem.product.subCategory,
        collection: selectedItem.product.collection,
        colors: selectedItem.product.colors,
        gender: selectedItem.product.gender
      };
      
      addToWishlist(productToAdd);
      await removeFromCart(selectedItem.product._id, selectedItem.size, selectedItem.color);
      setWishlistDialog(false);
    } catch (err) {
      setError('Failed to move item to wishlist');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}
        >
          <ShoppingBagIcon 
            sx={{ 
              fontSize: '4rem', 
              color: 'text.secondary',
              opacity: 0.5,
              mb: 2
            }} 
          />
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 2
            }}
          >
            Your cart is empty
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ 
              fontSize: { xs: '0.9rem', md: '1rem' },
              maxWidth: '400px',
              mx: 'auto',
              mb: 3
            }}
          >
            Looks like you haven't added any items to your cart yet.
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
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            letterSpacing: '-0.02em',
            mb: 1
          }}
        >
          Shopping Cart
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.875rem', md: '1rem' },
            maxWidth: '600px'
          }}
        >
          Review your items and proceed to checkout when you're ready.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {cart.map((item) => (
            <Card 
              key={item._id} 
              sx={{ 
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Grid container spacing={2}>
                  <Grid item xs={5} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      image={item.product.image}
                      alt={item.name}
                      sx={{ 
                        width: '100%',
                        height: { xs: 160, sm: 200 },
                        borderRadius: 1,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: 'divider',
                        p: 1,
                        bgcolor: 'background.paper',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                      onClick={() => navigate(`/products/${item.product._id}`)}
                    />
                  </Grid>
                  <Grid item xs={7} sm={8} sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    pl: { xs: 2, sm: 3 }
                  }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          cursor: 'pointer',
                          '&:hover': { color: 'primary.main' }
                        }}
                        onClick={() => navigate(`/products/${item.product._id}`)}
                      >
                        {item.product.name}
                      </Typography>
                      <Tooltip title="Move to Wishlist">
                        <IconButton
                          onClick={() => handleWishlistToggle(item)}
                          size="small"
                          color="primary"
                          sx={{ 
                            ml: 1,
                            '&:hover': { transform: 'scale(1.1)' }
                          }}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 0.5 }}
                    >
                      Size: {item.size}
                    </Typography>
                    {item.color && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 0.5 }}
                      >
                        Color: {item.color}
                      </Typography>
                    )}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2 }}
                    >
                      Price: {formatPrice(item.product.price)}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        gap: 2
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}>
                        <IconButton
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          size="small"
                          sx={{ 
                            p: 0.5,
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item,
                              parseInt(e.target.value) || 1
                            )
                          }
                          type="number"
                          inputProps={{ 
                            min: 1,
                            style: { 
                              textAlign: 'center',
                              padding: '4px',
                              width: '40px'
                            }
                          }}
                          sx={{ 
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { border: 'none' },
                              '&:hover fieldset': { border: 'none' },
                              '&.Mui-focused fieldset': { border: 'none' }
                            }
                          }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          size="small"
                          sx={{ 
                            p: 0.5,
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.1rem' }
                        }}
                      >
                        {formatPrice(item.product.price * item.quantity)}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemoveItem(item)}
                        color="error"
                        size="small"
                        sx={{ 
                          ml: 'auto',
                          '&:hover': { 
                            bgcolor: 'error.light',
                            color: 'white'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/products')}
              startIcon={<ArrowForwardIcon />}
              sx={{ 
                px: 3,
                py: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '0.9rem'
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                position: { md: 'sticky' },
                top: { md: 24 },
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper'
              }}
            >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                mb: 2
              }}
            >
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1.5
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Subtotal
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  {formatPrice(subtotal)}
                </Typography>
              </Box>
              {user?.isPremium && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}
                >
                  <Typography 
                    sx={{ 
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    Premium Discount
                  </Typography>
                  <Typography 
                    color="success.main"
                    sx={{ 
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    -{formatPrice(discount)}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1.5
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Shipping
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  {formatPrice(shipping)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  Total
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {formatPrice(total)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={loading}
                sx={{ 
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Move to Wishlist Dialog */}
      <Dialog 
        open={wishlistDialog} 
        onClose={() => setWishlistDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          Move to Wishlist
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography>
            Would you like to move this item to your wishlist? You can access it from your wishlist page.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setWishlistDialog(false)}
            sx={{ 
              textTransform: 'none',
              px: 2
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleWishlistConfirm} 
            color="primary"
            variant="contained"
            sx={{ 
              textTransform: 'none',
              px: 2
            }}
          >
            Move to Wishlist
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
