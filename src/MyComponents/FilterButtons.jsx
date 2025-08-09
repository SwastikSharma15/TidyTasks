import React from 'react';

function FilterButtons({ activeFilter, onFilterChange }) {
    const filters = ['All', 'Completed', 'Pending'];

    return (
        <div className="filter-buttons">
            {filters.map(filter => (
                <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}

export default FilterButtons;
