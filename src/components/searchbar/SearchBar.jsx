import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import search_icon from '../../assets/search.png'

import './SearchBar.scss'


const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/classes/search?query=${searchText}`)
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
           handleSearch()
        }
    };

    return (
        <div className="SearchBar">
        <img className="search-icon" src={search_icon} alt="search-icon" onClick={handleSearch}/>     
            <input
                className="search-bar"
                type="text"
                placeholder="Search Course"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                
            />
            
        </div>
    );
};

export default SearchBar;
