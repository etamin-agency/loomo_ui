import React from 'react';
import { TextField, FormControl, Select, MenuItem } from '@mui/material';

const PriceInput = (props) => {
  const [currency, setCurrency] = React.useState('USD');
  const [price, setPrice] = React.useState(props?.price || '');
  const [error, setError] = React.useState('');

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
    validatePrice(value);
  };

  const validatePrice = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Price must be a positive number');
    } else {
      setError('');
      props.setPrice(numValue);
    }
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '';
    }
  };

  const inputWidth = 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={price}
          onChange={handlePriceChange}
          type="number"
          size='small'
          placeholder='200'
          error={!!error}
          InputProps={{
            startAdornment: (
              <span>{getCurrencySymbol()}</span>
            ),
            inputProps: { min: 0 }
          }}
          style={{ width: inputWidth }}
        />
        
        <FormControl style={{ marginLeft: 10 }}>
          <Select value={currency} onChange={handleCurrencyChange} size='small'>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default PriceInput;