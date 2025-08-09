import React from 'react';
import TidyLogo from '../assets/Tiddy_tasks.png';


function Header({ isDarkMode, onToggleDarkMode }) {
    return (
        <header className="header-container">
            <div className="header-logo">
                <img
                    src={TidyLogo}
                    alt="TidyTasks Logo"
                    className="logo-image"
                    style={{
                        filter: isDarkMode ? 'invert(1)' : 'none',
                    }}
                />
            </div>
            <div className="header-actions">
                <div className="theme-toggle-wrapper">
                    <button 
                        className={`theme-btn unicode-version ${isDarkMode ? 'night' : ''}`} 
                        onClick={onToggleDarkMode}
                    >
                        <span className="morph-icon"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

