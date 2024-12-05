// src/components/DropdownNotification.js
import React, { useState } from 'react';
import { Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const DropdownNotification = ({ message }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-notification-label">Notifications</InputLabel>
      <Select
        labelId="dropdown-notification-label"
        value={open ? message : ''}
        onChange={() => setOpen(!open)}
        label="Notifications"
      >
        <MenuItem value={message}>
          <Button onClick={() => setOpen(!open)}>{message}</Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownNotification;
