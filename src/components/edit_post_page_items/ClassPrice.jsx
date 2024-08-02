import React from 'react';
import { TextField, FormControl, Select, MenuItem, InputLabel, FormHelperText, Button } from '@mui/material';

const PriceInput = (props) => {
  const [currency, setCurrency] = React.useState('USD');
  const [price, setPrice] = React.useState(props?.price);
  const [error, setError] = React.useState('');

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = parseFloat(event.target.value);
    if ( value <= 0) {
      setError('Price must be a positive number');
    } else {
      setError('');
      setPrice(value);
      props.setPrice(value)
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
          helperText={error}
          InputProps={{
            startAdornment: (
              <span>{getCurrencySymbol()}</span>
            ),
            inputProps: { min: 0 }
          }}
          style={{ width: inputWidth }}
        />
        
          <FormControl style={{ marginLeft: 10 }} error={!!error}>
            
            <Select value={currency} onChange={handleCurrencyChange} size='small'>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
            <FormHelperText>{error && 'Please enter a valid price'}</FormHelperText>
          </FormControl>
        
      </div>
     
    </div>
  );
};

export default PriceInput;

