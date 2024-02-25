
import React, { useState } from 'react';

import search_icon from '../../assets/search.png'

import './SearchBar.scss'
import searchService from "../../services/searchService";

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        searchService.searchPosts(searchText).then(data=>{
            console.log(data)
        })
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
           handleSearch()
        }
    };

    return (
        <div className="SearchBar">
            <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <img className="search-icon" src={search_icon} alt="search-icon" onClick={handleSearch}/>
        </div>
    );
};

export default SearchBar;
