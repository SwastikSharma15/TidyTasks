import React, { useState, useEffect } from 'react';

function AddTaskModal({ task, onSave, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
        tags: [],
        color: '#e7edf4',
        taskType: 'text',
        isPinned: false
    });

    const predefinedColors = [
        '#e7edf4', // Default gray
        '#ff6b6b', // Red
        '#4ecdc4', // Teal
        '#45b7d1', // Blue
        '#96ceb4', // Green
        '#feca57', // Yellow
        '#ff9ff3', // Pink
        '#a8e6cf', // Light green
        '#ffd93d', // Golden
        '#6c5ce7', // Purple
        '#fd79a8', // Rose
        '#fdcb6e'  // Orange
    ];
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                dueDate: task.dueDate || '',
                priority: task.priority || 'low',
                tags: task.tags || [],
                color: task.color || '#e7edf4',
                taskType: task.taskType || 'text',
                isPinned: task.isPinned || false
            });
        }
    }, [task]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                // Ctrl+Enter or Cmd+Enter to save (alternative to just Enter)
                e.preventDefault();
                handleSubmit(e);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, formData]); // Include formData to ensure handleSubmit has current data

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const taskData = {
            ...formData,
            tags: formData.tags.filter(tag => tag.trim() !== '')
        };

        if (task) {
            onSave({ ...task, ...taskData });
        } else {
            onSave(taskData);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.name !== 'description') {
            e.preventDefault();
            if (e.target.name === 'tagInput') {
                handleAddTag();
            } else {
                handleSubmit(e);
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter task title"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter task description"
                            rows="3"
                            className="resizable-textarea"
                            style={{ resize: 'both', minHeight: '80px', maxHeight: '300px' }}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                                onKeyPress={handleKeyPress}
                            /> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <div className="tag-input-container">
                            <input
                                type="text"
                                id="tagInput"
                                name="tagInput"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Add a tag and press Enter"
                            />
                            <button type="button" onClick={handleAddTag} className="add-tag-btn">
                                Add
                            </button>
                        </div>
                        {formData.tags.length > 0 && (
                            <div className="tags-list">
                                {formData.tags.map((tag, index) => (
                                    <span key={index} className="tag-item">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="remove-tag-btn"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

