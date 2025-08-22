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

    const handleDragEnd = () => {
        setDraggedTask(null);
        setDragOverIndex(null);
    };

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-3l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/>
                    </svg>
                </div>
                <h3>No tasks yet</h3>
                <p>Create your first task to get started!</p>
            </div>
        );
    }

    return (
        <div className="task-grid">
            {tasks.map((task, index) => (
                <div
                    key={task.id}
                    className={`task-grid-item ${dragOverIndex === index ? 'drag-over' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                >
                    <TaskCard
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onView={onViewTask}
                    />
                </div>
            ))}
        </div>
    );
}

export default TaskGrid;
