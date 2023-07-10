import React, { useState } from 'react';
import useHotels from '../Hooks/useHotels';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const hotels = useHotels([]);

  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [hasPool, setHasPool] = useState(false);
  

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleSearch = () => {
    if (!city && !experience && !hasPool) {
      return hotels;
    }

    const filteredHotels = hotels.filter((hotel) => {
      return (
        hotel.location === city &&
        hotel.experience === experience &&
        (!hasPool || hotel.haspool)
      );
    });
    console.log(filteredHotels);

    return filteredHotels;
  };

  const filteredHotels = handleSearch();

  const goToHotelDetail = (hotelId) => {
    navigate(`/hotel/${hotelId}`); // Navigate to the HotelDetail page with the hotelId
  };

  return (
    <>
      <div>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Lahore">Lahore</option>
        </select>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="Budget">Budget</option>
          <option value="Business">Business</option>
          <option value="Luxury">Luxury</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={hasPool}
            onChange={(e) => setHasPool(e.target.checked)}
          />
          Pool Required
        </label>

        <button onClick={handleSearch}>Search</button>
      </div>

      {filteredHotels.length > 0 && (
        <div>
          <h2>Matching Hotels:</h2>
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} onClick={() => goToHotelDetail(hotel.id)}>
              <h3>{hotel.name}</h3>
              <p>{hotel.shortDescription}</p>
              <img src={hotel.imageLink} alt={hotel.name} />
              <p>Price: {hotel.price}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
