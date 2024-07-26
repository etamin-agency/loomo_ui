import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Validation Schema using yup
const validationSchema = yup.object({
  price: yup
    .number()
    .positive('Price must be a positive number')
    .max(10000, 'Price cannot exceed 10,000')
    .typeError('Price must be a number')
    .test('max-decimal-places', 'Price cannot have more than two decimal places', (value) => {
      return value === undefined || !/(\.\d{3,})/.test(value);
    })
    .required('Price is required')
});

const ClassPrice = () => {
  const formik = useFormik({
    initialValues: {
      price: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Price submitted:', values.price);
    },
  });

  return (
    <Box sx={{ mt: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Price"
          variant="outlined"
          size="small"
          fullWidth
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          placeholder="200"
          
        />
        
      </form>
    </Box>
  );
};

export default ClassPrice;
