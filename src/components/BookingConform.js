import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const {
    hotelName,
    guestName,
    guestAddress,
    guestEmail,
    arrivalDate,
    departureDate,
    totalPrice,
    tax,
  } = location.state;

  return (
    <div>
      <h2>Your stay has been booked.</h2>
      <p>Summary of important information:</p>
      <p>Hotel: {hotelName}</p>
      <p>Name: {guestName}</p>
      <p>Address: {guestAddress}</p>
      <p>Email: {guestEmail}</p>
      <p>Arrival Date: {arrivalDate}</p>
      <p>Departure Date: {departureDate}</p>
      <p>Total Price: {totalPrice}</p>
      <p>Tax: {tax}</p>
    </div>
  );
};

export default BookingConfirmation;
