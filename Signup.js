import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, database, ref, set } from '../firebase';
import background from '../assets/main_back.jpeg';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email || !username || !phone || !password) {
      toast.error('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email });
      console.log('Send OTP response:', response.data); // Debugging log

      if (response.data.success) {
        toast.success('OTP sent to your email!');
        setOtpSent(true);
      } else {
        toast.error(response.data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error); // Debugging log
      toast.error('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndSignup = async () => {
    if (!otp) {
      toast.error('Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otpEntered: otp });
      console.log('Verify OTP response:', response.data); // Debugging log

      if (response.data.success) {
        toast.success('OTP verified successfully! Signing you up...');

        // Firebase signup
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await set(ref(database, `users/${user.uid}`), {
          username,
          email,
          phone,
          password,
        });

        toast.success('Signup successful!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid OTP or OTP expired.');
      }
    } catch (error) {
      console.error('Error during OTP verification or signup:', error); // Debugging log
      toast.error('Error during signup process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Sign Up</h2>
        <div style={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            style={styles.input}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />
          <button
            onClick={sendOtp}
            style={{ ...styles.button, ...(loading ? styles.disabledButton : {}) }}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                style={styles.input}
              />
              <button
                onClick={verifyOtpAndSignup}
                style={styles.button}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP & Sign Up'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    backgroundImage: `url(${background})`,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#e6f2e9',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '360px',
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    color: '#4CAF50',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #d3e8d5',
    borderRadius: '8px',
    backgroundColor: '#f9fdf9',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  disabledButton: {
    backgroundColor: '#c8e6c9',
    cursor: 'not-allowed',
  },
};

export default Signup;
