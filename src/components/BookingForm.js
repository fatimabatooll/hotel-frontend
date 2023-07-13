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

  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [address, setAddress] = useState(localStorage.getItem('address') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [arrivalDate, setArrivalDate] = useState(localStorage.getItem('arrivalDate') || '');
  const [departureDate, setDepartureDate] = useState(localStorage.getItem('departureDate') || '');
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);

  const navigate = useNavigate();

  const { saveBookings } = useBooking();

  useEffect(() => {
    // Calculate total price when arrival or departure date changes
    calculateTotalPrice();
  }, [arrivalDate, departureDate]);

  const calculateTotalPrice = () => {
    if (hotel && arrivalDate && departureDate) {
      const numberOfNights = getNumberOfNights();
      const roomRate = hotel.price;
      const taxRate = 0.12;
      const price = numberOfNights * roomRate;
      const calculatedTax = price * taxRate;
      setTotalPrice(price);
      setTax(calculatedTax);
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem(name, value);
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'arrivalDate':
        setArrivalDate(value);
        break;
      case 'departureDate':
        setDepartureDate(value);
        break;
      default:
        break;
    }
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
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px' }}
          />
          <TextField
            label="Address"
            name="address"
            value={address}
            onChange={handleInputChange}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px' }}
          />
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px' }}
          />
          <TextField
            type="date"
            label="Arrival Date"
            name="arrivalDate"
            value={arrivalDate}
            onChange={handleInputChange}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px' }}
          />
          <TextField
            type="date"
            label="Departure Date"
            name="departureDate"
            value={departureDate}
            onChange={handleInputChange}
            required
            fullWidth
            mb={2}
            sx={{ marginTop: '20px' }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: '20px' }}
            onClick={calculateTotalPrice}
            fullWidth
            mb={2}
          >
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
          <Button variant="contained" onClick={handleBookStay} fullWidth mb={2}>
            Book My Stay
          </Button>
          <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleCancel} fullWidth>
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default BookForm;
