import React from 'react';
import StatusToggle from './StatusToggle';

function EnhancedTaskCard({ task, onToggleComplete, onEdit, onDelete, onView, onTogglePin }) {
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString();
        }
    };

    const getDueDateColor = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        // Reset time to compare only dates
        const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        if (taskDate < todayDate) {
            return '#c20000'; // Dark red for overdue
        } else if (date.toDateString() === today.toDateString()) {
            return '#ff0000'; // Red for today
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return '#ffd93d'; // Yellow for tomorrow
        } else {
            return ''; // Default color for future dates
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff6b6b';
            case 'medium': return '#ffa500';
            case 'low': return '#4ecdc4';
            default: return '#4ecdc4';
        }
    };

