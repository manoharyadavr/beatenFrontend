import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, IconButton, TextField, Avatar, Rating, Divider, Paper, Breadcrumbs, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Add as AddIcon, Remove as RemoveIcon, Star as StarIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Sample data for now
  const product = {
    _id: productId,
    name: 'Sample Product Name',
    description: 'This is a sample product description. It should provide extensive details about the product, covering its features, materials, and any other relevant information a customer might want to know before making a purchase. It is designed to give a comprehensive overview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
    ],
    category: 'Sample Category',
    collection: 'Sample Collection',
    inStock: true,
    material: 'Cotton Blend',
    brand: 'BEATEN',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray', 'Navy']
  };

  const [mainImage, setMainImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);

  // Move reviews to state for dynamic updates
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      rating: 5,
      date: '2024-03-15',
      comment: 'Excellent quality and perfect fit. The material is premium and the stitching is impeccable. Highly recommended!'
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      rating: 4,
      date: '2024-03-10',
      comment: 'Great product, very comfortable. The only reason for 4 stars is that the color is slightly different from the picture.'
    },
    {
      id: 3,
      user: {
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      rating: 5,
      date: '2024-03-05',
      comment: 'Absolutely love this product! The quality is outstanding and it exceeded my expectations.'
    }
  ]);

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userRating || !userReview.trim()) return;
    // Add new review to the top
    setReviews([
      {
        id: Date.now(),
        user: {
          name: 'You', // Replace with real user name if available
          avatar: 'https://i.pravatar.cc/150?img=4' // Replace with real user avatar if available
        },
        rating: userRating,
        date: new Date().toISOString(),
        comment: userReview.trim()
      },
      ...reviews
    ]);
    setUserRating(0);
    setUserReview('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 2000);
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  if (!product) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h5">Product not found</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="flex-start">
          {/* Image Gallery */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {/* Thumbnail Images */}
              <Grid item xs={3} md={3}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: 1.5
                }}>
                  <Box
                    component="img"
                    src={product.image}
                    alt="Main product thumbnail"
                    sx={{
                      width: { xs: '60px', md: '75px' },
                      height: { xs: '60px', md: '75px' },
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: mainImage === product.image ? '2px solid #000' : '1px solid #ddd',
                      '&:hover': { borderColor: '#000' }
                    }}
                    onClick={() => setMainImage(product.image)}
                  />
                  {product.additionalImages && product.additionalImages.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      alt={`Product thumbnail ${index + 1}`}
                      sx={{
                        width: { xs: '60px', md: '75px' },
                        height: { xs: '60px', md: '75px' },
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: mainImage === img ? '2px solid #000' : '1px solid #ddd',
                        '&:hover': { borderColor: '#000' }
                      }}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Main Product Image */}
              <Grid item xs={9} md={9}>
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    paddingTop: '110%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <Box 
                    key={mainImage}
                    component="img"
                    src={mainImage}
                    alt={product.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'opacity 0.3s ease-in-out',
                      opacity: 1,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={5}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                mb: 1.5,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}>
                {product.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ 
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}>
                {product.category}
              </Typography>

              {/* Price and Rating */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                  ₹{product.price}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={averageRating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({reviews.length} reviews)
                  </Typography>
                </Box>
              </Box>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Color:</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    flexWrap: 'wrap'
                  }}>
                    {product.colors.map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: color.toLowerCase(),
                          border: selectedColor === color ? '2px solid #000' : '1px solid #ddd',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': { 
                            borderColor: '#000',
                            transform: 'scale(1.05)'
                          }
                        }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Size:</Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    flexWrap: 'wrap'
                  }}>
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setSelectedSize(size)}
                        sx={{ 
                          minWidth: 38,
                          height: 38,
                          borderRadius: 1,
                          transition: 'all 0.2s ease',
                          fontWeight: 600,
                          fontSize: '1rem',
                          p: 0,
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Quantity and Add to Cart */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Quantity:</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 2
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    borderRadius: 1
                  }}>
                    <IconButton 
                      size="small" 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      sx={{ 
                        borderRadius: 0,
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      variant="standard"
                      value={quantity}
                      inputProps={{ 
                        readOnly: true, 
                        style: { 
                          textAlign: 'center',
                          width: '38px'
                        } 
                      }}
                      sx={{ 
                        '& .MuiInputBase-root': { 
                          height: '38px'
                        }
                      }}
                    />
                    <IconButton 
                      size="small" 
                      onClick={() => setQuantity(prev => prev + 1)}
                      sx={{ 
                        borderRadius: 0,
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={!product.inStock}
                  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                  sx={{ 
                    height: 42,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </Box>

              {/* Product Details */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Product Details:</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 1
                }}>
                  {product.material && (
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 600 }}>Material:</Typography> {product.material}
                    </Typography>
                  )}
                  {product.brand && (
                    <Typography variant="body2">
                      <Typography component="span" sx={{ fontWeight: 600 }}>Brand:</Typography> {product.brand}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    <Typography component="span" sx={{ fontWeight: 600 }}>Collection:</Typography> {product.collection}
                  </Typography>
                </Box>
              </Box>

              {/* Stock Status */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: product.inStock ? 'success.main' : 'error.main'
                  }}
                />
                <Typography 
                  variant="body2" 
                  color={product.inStock ? 'success.main' : 'error.main'} 
                  sx={{ fontWeight: 600 }}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Full-width Product Description */}
        <Box sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={0} sx={{ maxWidth: 900, width: '100%', p: { xs: 2, md: 3 }, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary', fontSize: { xs: '0.98rem', md: '1.05rem' } }}>
              {product.description}
            </Typography>
          </Paper>
        </Box>

        {/* Reviews Section */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Customer Reviews
          </Typography>

          {/* Overall Rating */}
          <Paper elevation={0} sx={{ 
            maxWidth: 900, 
            mx: 'auto', 
            p: { xs: 2, md: 3 }, 
            mb: 3, 
            bgcolor: 'grey.50', 
            borderRadius: 2,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main', 
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 1
                  }}>
                    {averageRating.toFixed(1)}
                  </Typography>
                  <Rating 
                    value={averageRating} 
                    precision={0.5} 
                    readOnly 
                    size="large"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(review => review.rating === rating).length;
                    const percentage = (count / reviews.length) * 100;
                    return (
                      <Box key={rating} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="body2" sx={{ minWidth: 45, fontWeight: 500 }}>
                          {rating} Stars
                        </Typography>
                        <Box sx={{ 
                          flexGrow: 1, 
                          height: 8, 
                          bgcolor: 'grey.200', 
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}>
                          <Box
                            sx={{
                              width: `${percentage}%`,
                              height: '100%',
                              bgcolor: 'primary.main',
                              borderRadius: 1,
                              transition: 'width 0.5s ease-in-out'
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35, textAlign: 'right' }}>
                          {count}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Write a Review */}
          <Paper elevation={0} sx={{ 
            maxWidth: 900, 
            mx: 'auto', 
            p: { xs: 2, md: 3 }, 
            mb: 3, 
            bgcolor: 'grey.50', 
            borderRadius: 2,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Write a Review
            </Typography>
            {reviewSuccess && (
              <Typography 
                variant="body2" 
                color="success.main" 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  animation: 'fadeIn 0.3s ease-in-out',
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                ✓ Review posted successfully!
              </Typography>
            )}
            <form onSubmit={handleReviewSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography component="legend" sx={{ mb: 1, fontWeight: 500 }}>Your Rating</Typography>
                <Rating
                  value={userRating}
                  onChange={(event, newValue) => setUserRating(newValue)}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'primary.main',
                    },
                    '& .MuiRating-iconHover': {
                      color: 'primary.light',
                    }
                  }}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your experience with this product..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!userRating || !userReview.trim()}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  height: 42,
                  px: 3,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                Submit Review
              </Button>
            </form>
          </Paper>

          {/* Individual Reviews */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
            maxWidth: 900, 
            mx: 'auto' 
          }}>
            {reviews.map((review, index) => (
              <Paper 
                key={review.id} 
                elevation={0} 
                sx={{ 
                  p: { xs: 2, md: 2.5 }, 
                  bgcolor: 'grey.50', 
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s`,
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                  <Avatar 
                    src={review.user.avatar} 
                    alt={review.user.name}
                    sx={{ 
                      width: { xs: 40, md: 48 }, 
                      height: { xs: 40, md: 48 },
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      fontSize: { xs: '0.95rem', md: '1.1rem' },
                      mb: 0.5
                    }}>
                      {review.user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: { xs: '0.85rem', md: '0.9rem' }
                    }}>
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Rating 
                  value={review.rating} 
                  readOnly 
                  size="small" 
                  sx={{ mb: 1.5 }} 
                />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    lineHeight: 1.6, 
                    fontSize: { xs: '0.95rem', md: '1rem' }
                  }}
                >
                  {review.comment}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetail; 