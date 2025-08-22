import React, { useState, useEffect, useRef } from 'react';
import EnhancedTaskCard from './EnhancedTaskCard';
import '../Style/EnhancedTaskCard.css';

function PriorityAwareTaskGrid({ tasks, onToggleComplete, onEditTask, onDeleteTask, onReorderTasks, onViewTask, onTogglePin }) {
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    
    // UseRef for the task grid items to calculate their heights for masonry effect
    const pinnedGridRef = useRef(null);
    const othersGridRef = useRef(null);

    // UseEffect must be called unconditionally at the top level
    useEffect(() => {
        const handleResize = () => {
            // Handle pinned grid
            if (pinnedGridRef.current) {
                const pinnedGridItems = pinnedGridRef.current.querySelectorAll('.task-grid-item');
                pinnedGridItems.forEach(item => {
                    const gridItemHeight = item.querySelector('.task-card').offsetHeight;
                    if (gridItemHeight) {
                        item.style.gridRowEnd = `span ${Math.ceil(gridItemHeight / 16)}`;
                    }
                });
            }

            // Handle others grid
            if (othersGridRef.current) {
                const othersGridItems = othersGridRef.current.querySelectorAll('.task-grid-item');
                othersGridItems.forEach(item => {
                    const gridItemHeight = item.querySelector('.task-card').offsetHeight;
                    if (gridItemHeight) {
                        item.style.gridRowEnd = `span ${Math.ceil(gridItemHeight / 16)}`;
                    }
                });
            }
        };

        // Delay the initial call to ensure DOM is fully rendered
        setTimeout(handleResize, 100);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [tasks]);

    // Group tasks by priority while maintaining original order within each priority
    // Completed tasks are excluded from priority grouping and placed at the end
    const groupTasksByPriority = (tasks) => {
        const priorities = ['high', 'medium', 'low'];
        const groups = {
            pinned: [],
            high: [],
            medium: [],
            low: []
        };
        const completedTasks = [];

        // Separate completed tasks and group incomplete tasks by priority
        // Completed tasks go to Others section even if they were pinned
        tasks.forEach((task, originalIndex) => {
            if (task.completed) {
                completedTasks.push({ ...task, originalIndex });
            } else if (task.isPinned) {
                groups.pinned.push({ ...task, originalIndex });
            } else {
                const priority = task.priority || 'low';
                groups[priority].push({ ...task, originalIndex });
            }
        });

        // Flatten back to array: pinned tasks first, then by priority, then all completed tasks
        return [
            ...groups.pinned,
            ...priorities.flatMap(priority => groups[priority]),
            ...completedTasks
        ];
    };


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
        
        if (draggedTask) {
            const draggedPriority = draggedTask.task.priority || 'low';
            const groupedTasks = groupTasksByPriority(tasks);
            const dropTask = groupedTasks[dropIndex];
            const dropPriority = dropTask ? (dropTask.priority || 'low') : draggedPriority;

            // Don't do anything if dropping on the same task
            if (draggedTask.task.id === dropTask?.id) {
                setDraggedTask(null);
                setDragOverIndex(null);
                return;
            }

            // Create new tasks array
            const newTasks = [...tasks];
            const draggedTaskIndex = newTasks.findIndex(task => task.id === draggedTask.task.id);

            // Remove the dragged task
            const [draggedItem] = newTasks.splice(draggedTaskIndex, 1);
            
            // Update priority if changing priority groups
            if (draggedPriority !== dropPriority) {
                draggedItem.priority = dropPriority;
            }
            
            // Find insertion position
            let insertIndex;
            if (dropTask) {
                // Find where to insert in the new array (after removing dragged item)
                insertIndex = newTasks.findIndex(task => task.id === dropTask.id);
                
                // If we're dragging within the same priority and moving down,
                // we want to insert after the drop target
                if (draggedPriority === dropPriority) {
                    const originalDraggedIndex = tasks.findIndex(task => task.id === draggedTask.task.id);
                    const originalDropIndex = tasks.findIndex(task => task.id === dropTask.id);
                    
                    if (originalDraggedIndex < originalDropIndex) {
                        // Moving down in the list - insert after target
                        insertIndex = insertIndex + 1;
                    }
                    // Moving up in the list - insert at target position (before)
                }
            } else {
                insertIndex = newTasks.length;
            }
            
            // Insert the dragged item at the correct position
            newTasks.splice(insertIndex, 0, draggedItem);
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

    // Group tasks for display but maintain original indices for drag operations
    const groupedTasks = groupTasksByPriority(tasks);

    const pinnedTasks = groupedTasks.filter(task => task.isPinned);
    const otherTasks = groupedTasks.filter(task => !task.isPinned);

    return (
        <div className="task-sections-container">
            {pinnedTasks.length > 0 && (
                <div className="task-section">
                    <h3 className="section-header">Pinned</h3>
                    <div className="task-grid" ref={pinnedGridRef}>
                        {pinnedTasks.map((task, index) => (
                            <div
                                key={task.id}
                                className={`task-grid-item ${dragOverIndex === index ? 'drag-over' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, task, task.originalIndex)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                            >
                                <EnhancedTaskCard
                                    task={task}
                                    onToggleComplete={onToggleComplete}
                                    onEdit={onEditTask}
                                    onDelete={onDeleteTask}
                                    onView={onViewTask}
                                    onTogglePin={onTogglePin}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {otherTasks.length > 0 && (
                <div className="task-section">
                    <h3 className="section-header">{pinnedTasks.length > 0 ? 'Others' : ''}</h3>
                    <div className="task-grid" ref={othersGridRef}>
                        {otherTasks.map((task, index) => (
                            <div
                                key={task.id}
                                className={`task-grid-item ${dragOverIndex === index ? 'drag-over' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, task, task.originalIndex)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                            >
                                <EnhancedTaskCard
                                    task={task}
                                    onToggleComplete={onToggleComplete}
                                    onEdit={onEditTask}
                                    onDelete={onDeleteTask}
                                    onView={onViewTask}
                                    onTogglePin={onTogglePin}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PriorityAwareTaskGrid;
