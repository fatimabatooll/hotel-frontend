import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHotels from '../Hooks/useHotels';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HotelDetail = () => {
  const { hotelId } = useParams();
  const hotels = useHotels([]);

  const navigate = useNavigate(); 

  const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));

  if (!hotel) {
    return <p>Loading...</p>;
  }
  const goToSearch = () => {
    navigate('/'); 
  };

  const goToBookForm = () => {
    navigate(`/hotel/${hotelId}/book`);
  };

  return (
    <Card sx={{ maxWidth: 500,  margin: 'auto', marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h2">{hotel.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {hotel.shortDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.longDescription}
        </Typography>
        <CardMedia
          component="img"
          height="240"         
          image={hotel.imageLink}
          alt={hotel.name}
        />
        <Typography variant="body2">Location: {hotel.location}</Typography>
        <Typography variant="body2">Experience: {hotel.experience}</Typography>
        <Typography variant="body2">
          Has Pool: {hotel.haspool ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body2">Price: {hotel.price}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={goToSearch} variant="contained">
          Return to Results
        </Button>
        <Button onClick={goToBookForm} variant="contained" color="primary">
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotelDetail;
