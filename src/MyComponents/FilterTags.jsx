import React from 'react';

function FilterTags({ tasks, selectedTags, onTagSelect }) {
    // Extract all unique tags from tasks
    const allTags = [...new Set(tasks.flatMap(task => task.tags || []))];

    if (allTags.length === 0) {
        return null;
    }

    return (
        <div className="filter-tags">
            <div className="filter-tags-header">
                <span className="filter-tags-label">Filter by tags:</span>
                {selectedTags.length > 0 && (
                    <button 
                        className="clear-tags-btn"
                        onClick={() => onTagSelect([])}
                    >
                        Clear all
                    </button>
                )}
            </div>
            <div className="filter-tags-list">
                {allTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            className={`filter-tag ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                                if (isSelected) {
                                    onTagSelect(selectedTags.filter(t => t !== tag));
                                } else {
                                    onTagSelect([...selectedTags, tag]);
                                }
                            }}
                        >
                            {tag}
                            {isSelected && (
                                <span className="filter-tag-remove">×</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default FilterTags;
