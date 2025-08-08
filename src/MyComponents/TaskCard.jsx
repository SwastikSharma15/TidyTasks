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

    const handleCardClick = (e) => {
        // Prevent opening modal when clicking on buttons or other interactive elements
        if (e.target.closest('.task-actions') || e.target.closest('.status-toggle')) {
            return;
        }
        onView(task);
    };

    return (
        <div 
            className={`task-card ${task.completed ? 'completed' : ''}`}
            onClick={handleCardClick}
        >
            <div className="task-actions">
                <button 
                    className={`pin-btn ${task.isPinned ? 'pinned' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onTogglePin && onTogglePin(task.id);
                    }}
                    title={task.isPinned ? 'Unpin task' : 'Pin task'}
                >
                    📌
                </button>
                <button 
                    className="edit-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task);
                    }}
                    title="Edit task"
                >
                    📝
                </button>
                <button 
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                    title="Delete task"
                >
                    🗑️
                </button>
            </div>

            <div 
                className="task-image"
                style={{ background: task.color || '#e7edf4' }}
            >
                <div className="task-image-overlay">
                    <StatusToggle 
                        completed={task.completed}
                        onToggle={(e) => {
                            e.stopPropagation();
                            onToggleComplete(task.id);
                        }}
                    />
                </div>
            </div>

            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">
                        {task.description.length > 100 
                            ? `${task.description.substring(0, 100)}...` 
                            : task.description
                        }
                    </p>
                )}
                {task.dueDate && (
                    <p className="task-due-date">Due: {formatDate(task.dueDate)}</p>
                )}
                <div className="task-meta">
                    <span 
                        className="task-priority"
                        style={{ color: getPriorityColor(task.priority) }}
                    >
                        {task.priority ? `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority` : 'Low Priority'}
                    </span>
                </div>
                {task.tags && task.tags.length > 0 && (
                    <div className="task-tags">
                        {task.tags.map((tag, index) => (
                            <span key={index} className="task-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskCard;
