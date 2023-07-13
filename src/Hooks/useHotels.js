import { useEffect, useState } from "react";

const useHotels = (initialValue) => {
  const [hotels, setHotels] = useState(initialValue);

  useEffect(() => {
    const loadData = () => {
      const url = "http://localhost:8080/hotels/getall";
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            setHotels([]);
            throw new Error("Error fetching hotels");
          }
          return response.json();
        })
        .then((data) => {
          setHotels(data);
          console.log("Fetched data:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (hotels.length === 0) {
      loadData();
    }
  }, [hotels]);

  return hotels;
};

export default useHotels;
