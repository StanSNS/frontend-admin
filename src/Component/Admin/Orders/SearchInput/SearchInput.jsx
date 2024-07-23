import React from 'react';
import { FaTimesCircle } from "react-icons/fa";
import "./SearchInput.css";

const SearchInput = ({ searchQuery, handleSearchChange, clearSearch, placeHolder, myWidth, customClass, buttonCustomClass }) => {
    const inputClass = `searchInput ${customClass || ''}`;

    return (
        <div className="searchInputContainer">
            <input
                maxLength={20}
                type="text"
                style={{ width: myWidth }}
                className={inputClass}
                placeholder={placeHolder}
                value={searchQuery}
                onChange={handleSearchChange}
            />

            {searchQuery && (
                <button className="inputClearButton" onClick={clearSearch}>
                    <FaTimesCircle className={`deleteSearchIcon ${buttonCustomClass || ''}`} />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
