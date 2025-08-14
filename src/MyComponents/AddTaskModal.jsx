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

