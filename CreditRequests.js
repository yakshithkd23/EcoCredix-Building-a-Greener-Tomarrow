import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Box, CircularProgress } from '@mui/material';
import { getDatabase, ref, get, update } from 'firebase/database';

const CreditRequests = () => {
  const [creditRequests, setCreditRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditRequests = async () => {
      try {
        const dbRef = ref(getDatabase(), 'rewardRequests');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const pendingRequests = Object.entries(data)
            .flatMap(([userId, requests]) => 
              Object.entries(requests)
                .filter(([key, value]) => value.status === 'Pending')
                .map(([key, value]) => ({ ...value, id: key, userId }))
            );
          setCreditRequests(pendingRequests);
        }
      } catch (error) {
        console.error('Error fetching credit requests: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditRequests();
  }, []);

  const fetchUserName = async (userId) => {
    const dbRef = ref(getDatabase(), `users/${userId}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val().name;
    } else {
      return 'Unknown User';
    }
  };

  const handleApproveRequest = async (requestId, userId) => {
    try {
      const userName = await fetchUserName(userId);

      // Update the existing request status to "Approved"
      const requestRef = ref(getDatabase(), `rewardRequests/${userId}/${requestId}`);
      await update(requestRef, { status: 'Approved' });

      // Update local state to remove the approved request
      const updatedRequests = creditRequests.filter((request) => request.id !== requestId);
      setCreditRequests(updatedRequests);

      alert(`${userName}'s reward request has been approved.`);
    } catch (error) {
      console.error('Error approving request: ', error);
    }
  };

  const handleRejectRequest = async (requestId, userId) => {
    try {
      const userName = await fetchUserName(userId);

      // Update the existing request status to "Rejected"
      const requestRef = ref(getDatabase(), `rewardRequests/${userId}/${requestId}`);
      await update(requestRef, { status: 'Rejected' });

      // Update local state to remove the rejected request
      const updatedRequests = creditRequests.filter((request) => request.id !== requestId);
      setCreditRequests(updatedRequests);

      alert(`${userName}'s reward request has been rejected.`);
    } catch (error) {
      console.error('Error rejecting request: ', error);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  }

  return (
    <Paper sx={{ padding: '30px', borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ color: '#388e3c', fontWeight: '600', marginBottom: '30px' }}>
        Credit Requests Management
      </Typography>

      {creditRequests.length > 0 ? (
        creditRequests.map((request) => (
          <Box
            key={request.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: '500', color: '#388e3c' }}>
                {request.user}
              </Typography>
              <Typography variant="body2" sx={{ color: '#616161' }}>
                <strong>Reward:</strong> {request.reward}
              </Typography>
              <Typography variant="body2" sx={{ color: '#616161' }}>
                <strong>Timestamp:</strong> {request.timestamp}
              </Typography>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleApproveRequest(request.id, request.userId)}
                sx={{ marginRight: '10px' }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRejectRequest(request.id, request.userId)}
              >
                Reject
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ color: '#616161' }}>
          No pending requests available.
        </Typography>
      )}
    </Paper>
  );
};

export default CreditRequests;
