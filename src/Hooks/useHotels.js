import { useEffect, useState } from "react";

const useHotels = (initialValue) => {
  const [hotels, setHotels] = useState(initialValue);

  useEffect(() => {
    async function loadData() {
      const url = `http://localhost:8080/hotels/getall`;
      const response = await fetch(url);
      if (response.status !== 200) {
        setHotels([]);
        return;
      }
      const data = await response.json();
      setHotels(data);
      console.log("Fetched data:", data);
    }
    if (hotels.length === 0) {
      loadData();
    }
  }, [hotels]);

  return hotels;
};

export default useHotels;
