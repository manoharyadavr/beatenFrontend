import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Cake as CakeIcon,
  Home as HomeIcon,
  Star as StarIcon,
  ShoppingCart as ShoppingCartIcon,
  AddLocationAlt as AddLocationIcon,
  Logout as LogoutIcon,
  DeleteForever as DeleteIcon,
  WorkspacePremium as PremiumIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required')
});

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const { cart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Demo/mock data for not logged in
  const demoUser = {
    name: 'John Doe',
    gender: 'Male',
    dob: '1990-01-01',
    phone: '1234567890',
    email: 'demo@example.com',
    membership: {
      isPremium: true,
      daysLeft: 23,
      amountSaved: 1200
    },
    addresses: [
      {
        id: 1,
        label: 'Home',
        address: '123 Demo Street, City, State, 123456'
      }
    ],
    savedCards: [
      { id: 1, brand: 'Visa', last4: '1234', expiry: '12/26' },
      { id: 2, brand: 'Mastercard', last4: '5678', expiry: '09/25' }
    ]
  };
  const demoCart = [
    { id: 1, name: 'Demo Product 1', price: 999, quantity: 1 },
    { id: 2, name: 'Demo Product 2', price: 499, quantity: 2 }
  ];

  const profileUser = user || demoUser;
  const savedCart = user ? cart : demoCart;
  const addresses = user?.addresses || demoUser.addresses;
  const membership = user?.membership || demoUser.membership;
  const savedCards = user?.savedCards || demoUser.savedCards;

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      pincode: user?.pincode || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        setSuccess('');
        await updateProfile(values);
        setSuccess('Profile updated successfully');
        setIsEditing(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    }
  });

  // Sign out handler
  const handleSignOut = () => {
    logout && logout();
    navigate('/');
  };

  // Delete account handler (demo only)
  const handleDeleteAccount = () => {
    setDeleteDialog(false);
    // Add real delete logic here
    logout && logout();
    navigate('/');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      py: { xs: 0, md: 4 },
      px: 0
    }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 7 }, px: { xs: 1, md: 2 }, bgcolor: '#f7f8fa' }}>
        {/* Profile Header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5, color: 'text.primary' }}>
              {profileUser.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 400 }}>
              Welcome back! Manage your account and preferences below.
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {/* Personal Info */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0 }}>
                    Personal Information
                  </Typography>
                  <Box sx={{ width: 36, height: 3, bgcolor: 'primary.main', borderRadius: 2, mt: 0.5 }} />
                </Box>
                <Button startIcon={<EditIcon />} onClick={() => setIsEditing(!isEditing)} variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 500, minWidth: 120, ml: 2 }}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>
              {isEditing ? (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Name" value={profileUser.name} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Gender" value={profileUser.gender} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Date of Birth" value={profileUser.dob} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone" value={profileUser.phone} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email" value={profileUser.email} disabled />
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 500, minWidth: 110, color: 'text.secondary' }}>Name:</Typography>
                      <Typography sx={{ ml: 1, color: 'text.primary', fontWeight: 400 }}>{profileUser.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 500, minWidth: 110, color: 'text.secondary' }}>Gender:</Typography>
                      <Typography sx={{ ml: 1, color: 'text.primary', fontWeight: 400 }}>{profileUser.gender}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 500, minWidth: 110, color: 'text.secondary' }}>Date of Birth:</Typography>
                      <Typography sx={{ ml: 1, color: 'text.primary', fontWeight: 400 }}>{profileUser.dob}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 500, minWidth: 110, color: 'text.secondary' }}>Phone:</Typography>
                      <Typography sx={{ ml: 1, color: 'text.primary', fontWeight: 400 }}>{profileUser.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 500, minWidth: 110, color: 'text.secondary' }}>Email:</Typography>
                      <Typography sx={{ ml: 1, color: 'text.primary', fontWeight: 400 }}>{profileUser.email}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Paper>

            {/* Addresses */}
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0 }}>
                    Addresses
                  </Typography>
                  <Box sx={{ width: 36, height: 3, bgcolor: 'primary.main', borderRadius: 2, mt: 0.5 }} />
                </Box>
                <Button size="small" variant="contained" color="primary" startIcon={<AddLocationIcon />} sx={{ borderRadius: 2, fontWeight: 500, minWidth: 120, ml: 2 }}>
                  Add Address
                </Button>
              </Box>
              <List sx={{ mt: 1 }}>
                {addresses.map(addr => (
                  <ListItem key={addr.id} sx={{ borderRadius: 2, mb: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #f0f0f0', p: 2, alignItems: 'center' }}>
                    <ListItemText primary={addr.label} secondary={addr.address} />
                    <Button size="small" variant="outlined" sx={{ borderRadius: 2, fontWeight: 500, ml: 2 }}>Edit</Button>
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Saved Cards (Payment Methods) */}
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0 }}>
                  Saved Cards
                </Typography>
                <CreditCardIcon color="primary" sx={{ ml: 1, fontSize: 22, verticalAlign: 'middle' }} />
              </Box>
              {savedCards.length === 0 ? (
                <Typography color="text.secondary">No saved cards.</Typography>
              ) : (
                <List sx={{ mt: 1 }}>
                  {savedCards.map(card => (
                    <ListItem key={card.id} sx={{ borderRadius: 2, mb: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #f0f0f0', p: 2, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <CreditCardIcon color="primary" sx={{ mr: 1, fontSize: 22, verticalAlign: 'middle' }} />
                        <Box>
                          <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>{`${card.brand} ending in ${card.last4}`}</Typography>
                          <Typography sx={{ fontSize: '0.95rem', color: 'text.secondary' }}>{`Expiry: ${card.expiry}`}</Typography>
                        </Box>
                      </Box>
                      <Button size="small" variant="outlined" sx={{ borderRadius: 2, fontWeight: 500, ml: 2 }}>Remove</Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>

          {/* Account Actions & Membership */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0 }}>
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    <PremiumIcon color={membership.isPremium ? 'warning' : 'disabled'} sx={{ fontSize: 22, verticalAlign: 'middle' }} /> Membership
                  </Box>
                </Typography>
                <Box sx={{ width: 36, height: 3, bgcolor: 'primary.main', borderRadius: 2, mt: 0.5 }} />
              </Box>
              {membership.isPremium ? (
                <>
                  <Typography color="warning.main" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <StarIcon sx={{ color: '#FFD700', fontSize: 18, verticalAlign: 'middle' }} /> Premium Member
                  </Typography>
                  <Typography variant="body2">Days left: <b>{membership.daysLeft}</b></Typography>
                  <Typography variant="body2">Amount saved: <b>₹{membership.amountSaved}</b></Typography>
                </>
              ) : (
                <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/premium')} sx={{ borderRadius: 2, fontWeight: 600, mt: 2 }}>Upgrade to Premium</Button>
              )}
            </Paper>

            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0 }}>
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    <LockIcon color="action" sx={{ fontSize: 20, verticalAlign: 'middle' }} /> Account Actions
                  </Box>
                </Typography>
                <Box sx={{ width: 36, height: 3, bgcolor: 'primary.main', borderRadius: 2, mt: 0.5 }} />
              </Box>
              <Button variant="outlined" color="primary" fullWidth sx={{ mb: 2, borderRadius: 2, fontWeight: 600, py: 1, transition: 'background 0.2s', '&:hover': { background: 'rgba(58,123,213,0.07)' } }} onClick={handleSignOut}>
                Sign Out
              </Button>
              <Button variant="outlined" color="error" fullWidth sx={{ borderRadius: 2, fontWeight: 600, py: 1, transition: 'background 0.2s', '&:hover': { background: 'rgba(255,0,0,0.07)' } }} onClick={() => setDeleteDialog(true)}>
                Delete Account
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Delete Account Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteAccount} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Profile; 