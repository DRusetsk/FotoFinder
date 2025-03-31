import React, { useState } from 'react';

interface submissionProps {
    selectedFilter: Filter;
    setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;

    filterCallback: (filter: Filter) => void;
}

type Filter = 'All' | 'Urban' | 'Wildlife' | 'Sports' | 'Nature';

const FilterDropdown: React.FC<submissionProps> = ({ selectedFilter, setSelectedFilter, filterCallback }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(event.target.value as Filter);
        filterCallback(event.target.value as Filter);
    };

    return (
        <div className="text-white font-light bg-[rgb(27,27,27)] rounded-lg flex justify-center w-50">
            <label htmlFor="filter">Select Filter:</label>
            <select
                id="filter"
                value={selectedFilter}
                onChange={handleSelectChange}
                className="dropdown bg-[rgb(27,27,27)] font-light"
            >
                <option value="All">All</option>
                <option value="Urban">Urban</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Nature">Nature</option>
                <option value="Sports">Sports</option>
            </select>
        </div>
    );
};

export default FilterDropdown;