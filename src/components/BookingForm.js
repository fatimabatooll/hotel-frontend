import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHotels from '../Hooks/useHotels';
import { Button, TextField, Typography, Box } from '@mui/material';
import useBooking from '../Hooks/useBooking';
const BookForm = () => {
  const { hotelId } = useParams();
  const hotels = useHotels([]);
  const [hotel, setHotel] = useState(null);
  useEffect(() => {
    const selectedHotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));
    if (selectedHotel) {
      setHotel(selectedHotel);
    }
  }, [hotels, hotelId]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const navigate = useNavigate();
  const { saveBookings} = useBooking();
  const calculateTotalPrice = (e) => {
    e.preventDefault();
    const numberOfNights = getNumberOfNights();
    const roomRate = hotel.price;
    const taxRate = 0.12;
    const price = numberOfNights * roomRate;
    const calculatedTax = price * taxRate;
    setTotalPrice(price);
    setTax(calculatedTax);
  };
  const getNumberOfNights = () => {
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((departure - arrival) / oneDay));
    return diffDays;
  };
  const handleBookStay = () => {
    const bookingData = {
      hotelId: hotel.id,
      name: hotel.name,
      guestName: name,
      guestAddress: address,
      guestEmail: email,
      arrivalDate,
      departureDate,
      totalPrice,
      tax,
    };
    saveBookings(
      bookingData,
      (responseData) => {
        console.log('Booking saved successfully:', responseData);
        navigate('/confirmation', { state: { bookingData } });
      },
      (error) => {
        console.log('Error saving booking:', error);
      }
    );
  };
  const handleCancel = () => {
    navigate('/');
  };
  if (!hotel) {
    return <p>Loading...</p>;
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ maxWidth: '400px', p: 4, border: '1px solid #ccc', borderRadius: '4px' }}>
        <Typography variant="h4" align="center" mb={4}>
          Book Now
        </Typography>
        <Typography variant="h6" align="center" mb={2}>
          {hotel.name}
        </Typography>
        <form>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}} />
          <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required fullWidth mb={2}sx={{ marginTop: '20px'}} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth mb={2} sx={{ marginTop: '20px'}}/>
          <TextField
            type="date"
            label="Arrival Date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px'}}
          />
          <TextField
            type="date"
            label="Departure Date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px'}}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: '20px'}} onClick={calculateTotalPrice} fullWidth mb={2}>
            Calculate Total Price
          </Button>
          <div>
            <Typography variant="body1" mb={1}>
              Total Price: {totalPrice}
            </Typography>
            <Typography variant="body1" mb={2}>
              Tax: {tax}
            </Typography>
          </div>
          <Button variant="contained"  onClick={handleBookStay} fullWidth mb={2}>
            Book My Stay
          </Button>
          <Button variant="contained" sx={{ marginTop: '20px'}} onClick={handleCancel} fullWidth >
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default BookForm;