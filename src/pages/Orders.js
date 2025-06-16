import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Avatar
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Cancel as CancelledIcon,
  RemoveRedEye as ViewIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const getStatusColor = (status) => {
  switch (status) {
    case 'delivered': return 'success';
    case 'shipped': return 'info';
    case 'processing': return 'warning';
    case 'cancelled': return 'error';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'shipped': return <ShippingIcon />;
    case 'delivered': return <DeliveredIcon />;
    case 'cancelled': return <CancelledIcon />;
    default: return null;
  }
};

const orders = [
  {
    _id: 'ORD-1001',
    createdAt: '2024-06-01',
    status: 'delivered',
    totalAmount: 2499,
    address: '123 Demo Street, City, State, 123456',
    items: [
      { name: 'Black Graphic T-shirt', image: '/products/tshirt1.jpg', qty: 1, price: 999 },
      { name: 'Oversized Hoodie', image: '/products/hoodie1.jpg', qty: 1, price: 1500 }
    ]
  },
  {
    _id: 'ORD-1002',
    createdAt: '2024-05-28',
    status: 'shipped',
    totalAmount: 1799,
    address: '456 Example Ave, City, State, 654321',
    items: [
      { name: 'White Cap', image: '/products/cap1.jpg', qty: 1, price: 1799 }
    ]
  },
  {
    _id: 'ORD-1003',
    createdAt: '2024-05-20',
    status: 'processing',
    totalAmount: 3499,
    address: '789 Sample Road, City, State, 789123',
    items: [
      { name: 'Joggers', image: '/products/joggers1.jpg', qty: 1, price: 1499 },
      { name: 'Sneakers', image: '/products/sneakers1.jpg', qty: 1, price: 1799 },
      { name: 'Socks', image: '/products/socks1.jpg', qty: 1, price: 201 }
    ]
  }
];

const trackingSteps = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const Orders = () => {
  const navigate = useNavigate();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setTrackOpen(true);
  };

  const handleClose = () => {
    setDetailsOpen(false);
    setTrackOpen(false);
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, textAlign: 'center' }}>
          My Orders
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            You have no orders yet.
          </Typography>
          <Button variant="contained" color="primary" href="/products">
            Shop Now
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, textAlign: 'center' }}>
        My Orders
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order._id}>
            <Paper elevation={3} sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {/* Order Summary */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', mb: 1 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5 }}>
                    Order #{order._id}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Total: <b>₹{order.totalAmount}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Delivery Address: {order.address}
                  </Typography>
                </Box>
                <Chip
                  label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  color={getStatusColor(order.status)}
                  icon={getStatusIcon(order.status)}
                  sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1, mt: { xs: 2, sm: 0 } }}
                />
              </Box>
              {/* Product Thumbnails */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                {order.items.slice(0, 3).map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={item.image} alt={item.name} sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: '#fafafa', border: '1px solid #eee' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
                {order.items.length > 3 && (
                  <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                    +{order.items.length - 3} more
                  </Typography>
                )}
              </Box>
              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ViewIcon />}
                  sx={{ fontWeight: 600, minWidth: 120 }}
                  onClick={() => handleViewDetails(order)}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 600, minWidth: 120 }}
                  onClick={() => handleTrackOrder(order)}
                >
                  Track Order
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* View Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Order #{selectedOrder._id}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Placed on: {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Delivery Address: {selectedOrder.address}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Products
              </Typography>
              {selectedOrder.items.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar src={item.image} alt={item.name} sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#fafafa', border: '1px solid #eee' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Qty: {item.qty} | Price: ₹{item.price}</Typography>
                  </Box>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Total: ₹{selectedOrder.totalAmount}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>
                Status: <Chip label={selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)} color={getStatusColor(selectedOrder.status)} size="small" />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Track Order Dialog */}
      <Dialog open={trackOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Track Order</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box>
              <Stepper
                activeStep={
                  selectedOrder.status === 'delivered' ? 4 :
                  selectedOrder.status === 'shipped' ? 2 :
                  selectedOrder.status === 'processing' ? 1 : 0
                }
                orientation="vertical"
              >
                {trackingSteps.map((label, idx) => (
                  <Step key={label} completed={
                    (selectedOrder.status === 'delivered' && idx <= 4) ||
                    (selectedOrder.status === 'shipped' && idx <= 2) ||
                    (selectedOrder.status === 'processing' && idx <= 1)
                  }>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Current Status: <Chip label={selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)} color={getStatusColor(selectedOrder.status)} size="small" />
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Orders; 