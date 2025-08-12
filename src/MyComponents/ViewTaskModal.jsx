import React from 'react';

function ViewTaskModal({ task, onClose, onEdit }) {
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

    const formatDateTime = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Task Details</h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <div className="view-task-content">
                    <div 
                        className="view-task-color-strip" 
                        style={{ background: task.color || '#e7edf4' }}
                    ></div>

                    <div className="view-task-details">
                        <div className="view-task-field">
                            <label>Title</label>
                            <h3 className={`view-task-title ${task.completed ? 'completed' : ''}`}>
                                {task.title}
                            </h3>
                        </div>

                        {task.description && (
                            <div className="view-task-field">
                                <label>Description</label>
                                <p className="view-task-description">{task.description}</p>
                            </div>
                        )}

                        <div className="view-task-field-row">
                            {task.dueDate && (
                                <div className="view-task-field">
                                    <label>Due Date</label>
                                    <p className="view-task-due-date">{formatDate(task.dueDate)}</p>
                                </div>
                            )}

                            <div className="view-task-field">
                                <label>Priority</label>
                                <span 
                                    className="view-task-priority"
                                    style={{ color: getPriorityColor(task.priority) }}
                                >
                                    {task.priority ? 
                                        `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority` : 
                                        'Low Priority'
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="view-task-field-row">
                            <div className="view-task-field">
                                <label>Status</label>
                                <span className={`view-task-status ${task.completed ? 'completed' : 'pending'}`}>
                                    {task.completed ? '✅ Completed' : '⏳ Pending'}
                                </span>
                            </div>

