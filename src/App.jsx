import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import DoctorList from './Components/DoctorCard/DoctorCard';
import BookingConsultation from './Components/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import GiveReviews from './Components/ReviewForm/GiveReviews';
import ReviewFormApp from './Components/ReviewForm/ReviewFormApp';
import Notification from './Components/Notification/Notification';
import ProfileForm from './Components/ProfileCard/ProfileForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Notification>
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/sign-up" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/find-doctor" element={<FindDoctorSearch />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/booking" element={<BookingConsultation />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/give-reviews" element={<GiveReviews />} />
          <Route path="/appointments" element={<ReviewFormApp />} />
          <Route path="/profile" element={<ProfileForm />} />
        </Routes>
      </Notification>
    </BrowserRouter>
  );
}

export default App;
