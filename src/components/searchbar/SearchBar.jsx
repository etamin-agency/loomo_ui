
import React, { useState } from 'react';

import './SearchBar.scss'
const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchText);
        }
    };

    return (
        <div>
            <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default SearchBar;
