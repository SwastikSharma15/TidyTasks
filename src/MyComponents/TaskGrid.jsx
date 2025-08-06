import React, { useState } from 'react';
import TaskCard from './TaskCard';

function TaskGrid({ tasks, onToggleComplete, onEditTask, onDeleteTask, onReorderTasks, onViewTask }) {
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleDragStart = (e, task, index) => {
        setDraggedTask({ task, index });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (draggedTask && draggedTask.index !== dropIndex) {
            const newTasks = [...tasks];
            const [draggedItem] = newTasks.splice(draggedTask.index, 1);
            newTasks.splice(dropIndex, 0, draggedItem);
            onReorderTasks(newTasks);
        }
        
        setDraggedTask(null);
        setDragOverIndex(null);
    };



export default TaskGrid;
