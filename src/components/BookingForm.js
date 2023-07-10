import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHotels from '../Hooks/useHotels';
import { Button, TextField } from '@mui/material';

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

  const calculateTotalPrice = (e) => {
    e.preventDefault();

    const numberOfNights = getNumberOfNights();
    const roomRate = hotel.price;
    const taxRate = 0.12; // 12% tax rate

    const price = numberOfNights * roomRate;
    const calculatedTax = price * taxRate;

    setTotalPrice(price);
    setTax(calculatedTax);
  };

  const getNumberOfNights = () => {
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    const diffDays = Math.round(Math.abs((departure - arrival) / oneDay));
    return diffDays;
  };

  const handleBookStay = () => {
    // Perform any additional booking logic here
    navigate('/confirmation', {
      state: {
        hotelName: hotel.name,
        guestName: name,
        guestAddress: address,
        guestEmail: email,
        arrivalDate,
        departureDate,
        totalPrice,
        tax,
      },
    });
  };

  const handleCancel = () => {
    navigate('/'); // Navigate back to the main search page
  };
  if (!hotel) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Book Now</h2>
      <p>{hotel.name}</p>
      <form>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="date"
          label="Arrival Date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          required
        />
        <TextField
          type="date"
          label="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
        <Button type="submit" onClick={calculateTotalPrice}>
          Calculate Total Price
        </Button>
        <div>
          <p>Total Price: {totalPrice}</p>
          <p>Tax: {tax}</p>
        </div>
        <Button onClick={handleBookStay}>Book My Stay</Button>
        <Button onClick={handleCancel}>Cancel</Button>

      </form>
    </div>
  );
};

export default BookForm;
