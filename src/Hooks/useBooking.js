import React, { useState } from 'react'
import axios from 'axios'

const useBooking = () => {
    const [isLoad, setLoad] = useState(false)
    const [error, setError] = useState(null)

    const saveBookings = (bookingData, onSuccess, onError) => {
        setLoad(true)

        axios.post('http://localhost:8081/bookings/add', bookingData)
        .then((response) => {
            setLoad(false)
            onSuccess(response.data)
        })
        .catch((error) => {
            setLoad(false)
            setError(error)
            onError(error)
        })
        
    }
    return {saveBookings, isLoad, error}
}

export default useBooking