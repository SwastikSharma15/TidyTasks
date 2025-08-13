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
 
