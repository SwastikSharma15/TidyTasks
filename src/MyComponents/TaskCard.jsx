import React from 'react';
import StatusToggle from './StatusToggle';

function TaskCard({ task, onToggleComplete, onEdit, onDelete, onView, onTogglePin }) {
    
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

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ff6b6b';
            case 'medium': return '#ffa500';
            case 'low': return '#4ecdc4';
            default: return '#4ecdc4';
        }
    };



export default TaskCard;
