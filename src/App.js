import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import HotelDetail from './components/HotelDetail';
import BookingForm from './components/BookingForm';
import BookingConform from './components/BookingConform';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Search/>}/>
      <Route path='/hotel/:hotelId' element={<HotelDetail/>}/>
      <Route path='/hotel/:hotelId/book' element={<BookingForm/>}/>
      <Route path='/confirmation' element={<BookingConform/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;