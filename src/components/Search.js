import React, { useState } from 'react';
import useHotels from '../Hooks/useHotels';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid, Button, Typography, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox } from '@mui/material';


const Search = () => {
  const hotels = useHotels([]);

  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [hasPool, setHasPool] = useState(false);
  
  

  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (!city && !experience && !hasPool) {
      return hotels;
    }
  
    const filteredHotels = hotels.filter((hotel) => {
      return (
        (!city || hotel.location === city) &&
        (!experience || hotel.experience === experience) &&
        (!hasPool || hotel.haspool)
      );
    });
  
    console.log(filteredHotels);
  
    return filteredHotels;
  };
  
  const filteredHotels = handleSearch();
  
  const goToHotelDetail = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'30px'}}>
      
      <Card sx={{ maxWidth: 345 }}>
        <Button onClick={handleSearch}>Search</Button>

        
          <Box>
            <FormControl sx={{marginLeft:'10px'}}>
              <RadioGroup value={city} onChange={(e) => setCity(e.target.value)}>
                <FormControlLabel value="Karachi" control={<Radio />} label="Karachi" />
                <FormControlLabel value="Islamabad" control={<Radio />} label="Islamabad" />
                <FormControlLabel value="Lahore" control={<Radio />} label="Lahore" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <RadioGroup value={experience} onChange={(e) => setExperience(e.target.value)}>
                <FormControlLabel value="Budget" control={<Radio />} label="Budget" />
                <FormControlLabel value="Business" control={<Radio />} label="Business" />
                <FormControlLabel value="Luxury" control={<Radio />} label="Luxury" />
              </RadioGroup>
            </FormControl>

            <FormControlLabel sx={{marginLeft:'10px'}}
              control={<Checkbox checked={hasPool} onChange={(e) => setHasPool(e.target.checked)} />}
              label="Pool Required"
            />
          </Box>
        
      </Card>
    </div>
     <Box sx={{ marginLeft:'100px'}}>
     <h2 >Matching Hotels:</h2>

   {filteredHotels.length > 0 && (
  <Grid container spacing={2} justifyContent="center" >
    
    {filteredHotels.map((hotel) => (
      <Grid item key={hotel.id} xs={12} sm={6} md={4} onClick={() => goToHotelDetail(hotel.id)}>
        <Card style={{ width: '400px' }}>
       
          <CardMedia
            component="img"
            height="240"
            image={hotel.imageLink}
            alt={hotel.name}
          />
          <CardContent>
            <Typography variant="h5">{hotel.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {hotel.shortDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {hotel.price}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}
</Box>
    </>
  );
};

export default Search;
