import React from 'react';

function StatusToggle({ completed, onToggle }) {
    return (
        <button 
            className={`status-toggle ${completed ? 'completed' : ''}`}
            onClick={onToggle}
            title={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
            {completed ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            )}
        </button>
    );
}

export default StatusToggle;
