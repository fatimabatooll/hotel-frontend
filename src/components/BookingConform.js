import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const navigate = useNavigate(); 

  const handleStart = () => {
    navigate('/');
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ maxWidth: '400px', p: 4, border: '1px solid #ccc', borderRadius: '4px' }}>
        <Typography variant="h4" align="center" mb={4}>
          Confirmation
        </Typography>
        {bookingData && (
          <div>
            <Typography variant="body1" mb={2}>
              Hotel Name: {bookingData.name}
            </Typography>
            <Typography variant="body1" mb={2}>
              Guest Name: {bookingData.guestName}
            </Typography>
            <Typography variant="body1" mb={2}>
              Guest Address: {bookingData.guestAddress}
            </Typography>
            <Typography variant="body1" mb={2}>
              Guest Email: {bookingData.guestEmail}
            </Typography>
            <Typography variant="body1" mb={2}>
              Arrival Date: {bookingData.arrivalDate}
            </Typography>
            <Typography variant="body1" mb={2}>
              Departure Date: {bookingData.departureDate}
            </Typography>
            <Typography variant="body1" mb={2}>
              Total Price: {bookingData.totalPrice}
            </Typography>
            <Typography variant="body1" mb={2}>
              Tax: {bookingData.tax}
            </Typography>
            <Button variant="contained" sx={{ marginTop: '20px'}} onClick={handleStart} fullWidth >
            startOver
          </Button>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default BookingConfirmation;
