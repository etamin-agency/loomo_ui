import React from 'react';
import{Accordion,AccordionActions,AccordionSummary,AccordionDetails} from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './filter.scss';

const FilterComponent = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value) => {
    const updatedValues = filters[category].includes(value)
      ? filters[category].filter(v => v !== value)
      : [...filters[category], value];
    onFilterChange(category, updatedValues);
  };

  const languages = [
    'English',
    'Arabic',
    'Hindi',
    'Spanish',
  ];

  const Durations = [
    '0-1 Hours',
    '1-3 Hours',
    '3-6 Hours',
    '6-17 Hours',
    '17+ Hours',
  ];

  return (
    <div className="filter-component">
      
        <Accordion>
        <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        Language
        </AccordionSummary>
        <AccordionDetails >
        <div className='language-filter-items'>

        {languages.map(lang => (
          <label key={lang} className="filter-option">
            <input
              type="checkbox"
              checked={filters.language.includes(lang)}
              onChange={() => handleCheckboxChange('language', lang)}
            />
            <span className="filter-label">{lang}</span>
          </label>
        ))}
        </div>
        </AccordionDetails>
        </Accordion>
        <Accordion  defaultExpanded>
        <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        Ratings
        </AccordionSummary>
        <AccordionDetails >
        <Stack spacing={1}  >
        <div className='language-filter-items'>
        
          <label className="filter-option">
            <input
              type="checkbox"
              
            />
           <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
           </label>
           <label className="filter-option">
            <input
              type="checkbox"
              
            />
            <Rating name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly />
           </label>
           <label className="filter-option">
            <input
              type="checkbox"
              
            />
            <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
           </label>
           <label className="filter-option">
            <input
              type="checkbox"
              
            />
              <Rating name="half-rating-read" defaultValue={3.0} precision={0.5} readOnly />           
            </label>
          
       
        </div>
        </Stack>
        </AccordionDetails>
        </Accordion>
        <Accordion  defaultExpanded>
        <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        Duration
        </AccordionSummary>
        <AccordionDetails >
        <div className='language-filter-items'>

        {Durations.map(dur => (
          <label key={dur} className="filter-option">
            <input
              type="checkbox"
              checked={filters.duration.includes(dur)}
              onChange={() => handleCheckboxChange('language', dur)}
            />
            <span className="filter-label">{dur}</span>
          </label>
        ))}
        </div>
        </AccordionDetails>
        </Accordion>
      
    </div>
  );
};

export default FilterComponent;
