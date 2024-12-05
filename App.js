import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup'; 
import Profile from './components/Profile';
import Reels from './components/Reels';
import EcoChallenge from './components/EcoChallenge';
import ImpactVisualizer from './components/ImpactVisulizer'; // Corrected spelling
import Navbar from './components/Navbar';
import RecordReel from './components/RecordReel'; 
import EditProfile from './components/EditProfile';
import RegisterChallenge from './components/RegisterChallenge';
import AdminDashboard from './components/AdminDashboard'; 
import Community from './components/Community';
import DonationPage from './components/DonationPage';
import CreditRequests from './components/CreditRequests';
import ManageChallenges from './components/ManageChallenges';
import Statistics from './components/Statistics';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/eco-challenge" element={<EcoChallenge />} />
        <Route path="/register-challenge/:challengeId" element={<RegisterChallenge />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/record-reel" element={<RecordReel />} />
        <Route path="/impact" element={<ImpactVisualizer />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/donationPage" element={<DonationPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/credit-requests" element={<CreditRequests />} />
        <Route path="/manage-challenges" element={<ManageChallenges/>} />
        <Route path="/statistics" element={<Statistics/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
