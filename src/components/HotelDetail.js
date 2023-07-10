import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHotels from '../Hooks/useHotels';
import { Button } from '@mui/material';


const HotelDetail = () => {
  const { hotelId } = useParams();
  const hotels = useHotels([]);

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  // Find the hotel with the matching hotelId
  const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));

  if (!hotel) {
    return <p>Loading...</p>;
  }
  const goToSearch = () => {
    navigate('/'); // Navigate back to the previous location (filtered results)

  };
  const goToBookForm = () => {
    navigate(`/hotel/${hotelId}/book`)
  };

  return (
    <div>
      <h2>{hotel.name}</h2>
      <p>{hotel.shortDescription}</p>
      <p>{hotel.longDescription}</p>
      <img src={hotel.imageLink} alt={hotel.name} />
      <p>Location: {hotel.location}</p>
      <p>Experience: {hotel.experience}</p>
      <p>Has Pool: {hotel.haspool ? 'Yes' : 'No'}</p>
      <p>Price: {hotel.price}</p>
      <Button onClick={goToSearch}>Return to result</Button>
      <Button onClick={() => goToBookForm(hotel.id)}>Book now</Button>


    </div>
  );
};

export default HotelDetail;
