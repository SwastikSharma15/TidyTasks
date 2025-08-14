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

