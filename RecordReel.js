import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, LinearProgress, IconButton } from '@mui/material';
import { ref, set } from 'firebase/database';
import { auth, db,database } from '../firebase';
import { AccessTime, LocationOn } from '@mui/icons-material';
import { toast } from 'react-toastify';  // To use toast notifications
import 'react-toastify/dist/ReactToastify.css'; 
function RecordReel() { 
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [location, setLocation] = useState(null);
  const [recordingTime, setRecordingTime] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (recording) {
        setRecordingTime(new Date().toLocaleString());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [recording]);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  const checkPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error('Permission denied for camera or microphone', error);
      return false;
    }
  };

  const fetchGeolocation = async () => {
    const GEO_API_KEY = 'c34389190a3341cfbb3e2981fdb89b7c';
    if (!GEO_API_KEY) {
      console.error('GEO_API key is not defined in the .env file.');
      return;
    }

    try {
      const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_API_KEY}`);
      if (!response.ok) {
        throw new Error(`IPGeolocation API error: ${response.statusText}`);
      }

      const data = await response.json();
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        country: data.country_name,
      });
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  const startRecording = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      setPermissionDenied(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;

      if (typeof MediaRecorder === 'undefined') {
        console.error('MediaRecorder not supported in this browser.');
        return;
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => chunks.current.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/mp4' });
        setVideoURL(URL.createObjectURL(blob));
        chunks.current = [];
      };
      mediaRecorderRef.current.start();
      setRecording(true);

      fetchGeolocation();
    } catch (error) {
      console.error('Error accessing camera or microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setMediaStream(null);
    }
  };

  // Convert video blob to base64 and upload it to Realtime Database
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const uploadVideo = async () => {
    if (!videoURL) {
      console.error('No video or user not authenticated');
      return;
    }
  
    try {
      // Get the URL string instead of the entire object
      const plainVideoURL = videoURL;  // Assuming videoURL is already a string
  
      // Prepare the video metadata
      const videoData = {
        userId: auth.currentUser.uid,
        videoURL: plainVideoURL,  // Store only the URL string, not the whole object
        timestamp: new Date().toISOString(),
      };
  
      // Create a reference to the database path where the video metadata will be saved
      const videoDatabaseRef = ref(database, `reels/${auth.currentUser.uid}/${Date.now()}`);
  
      // Save the video metadata to Realtime Database
      await set(videoDatabaseRef, videoData);
      alert('Video metadata saved successfully!');
    } catch (error) {
      toast.error('Error uploading video metadata:', error);
    }
  };
  

  const resetRecording = () => {
    setVideoURL(null); 
    setRecording(false);
    setMediaStream(null);
    setLocation(null);
    setRecordingTime(null);
    chunks.current = [];
    setUploadProgress(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%', maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(135deg, #f5f5f5, #e1e1e1)', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', padding: { xs: '10px', sm: '20px' } }}>
      <Typography variant="h4" sx={{ marginBottom: 2, color: '#333', fontWeight: 'bold' }}>
        Record Your Reel
      </Typography>

      {videoURL ? (
        <video src={videoURL} controls style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
      ) : (
        <video ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
      )}

      {/* Overlay with Location, Time, and Date */}
      <Box sx={{ position: 'absolute', top: '80px', left: '20px', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '5px' }}>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ marginRight: '8px' }} />
          {location ? `${location.city}, ${location.country}` : 'Fetching Location...'}
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ marginRight: '8px' }} />
          {recordingTime || 'Recording Time'}
        </Typography>
      </Box>

      <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px', flexDirection: 'row', width: '100%' }}>
        {!recording ? (
          <Button variant="contained" color="primary" sx={{ flex: 1 }} onClick={startRecording}>Start Recording</Button>
        ) : (
          <Button variant="contained" color="secondary" sx={{ flex: 1 }} onClick={stopRecording}>Stop Recording</Button>
        )}

        {videoURL && (
          <Button variant="contained" color="success" sx={{ flex: 1 }} onClick={uploadVideo}>Upload Video</Button>
        )}
      </Box>
    </Box>
  );
}

export default RecordReel;
