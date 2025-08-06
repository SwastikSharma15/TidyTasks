import { useState, useEffect } from 'react'
import './App.css'
import Header from './MyComponents/Header'
import SearchBar from './MyComponents/SearchBar'
import FilterButtons from './MyComponents/FilterButtons'
import PriorityAwareTaskGrid from './MyComponents/PriorityAwareTaskGrid'
import AddTaskButton from './MyComponents/AddTaskButton'
import AddTaskModal from './MyComponents/AddTaskModal'
import ViewTaskModal from './MyComponents/ViewTaskModal'

function App() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [viewingTask, setViewingTask] = useState(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tidyTasks')
      if (savedTasks && savedTasks !== 'undefined') {
        const parsedTasks = JSON.parse(savedTasks)
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks)
          setFilteredTasks(parsedTasks)
          return // Exit early if we successfully loaded tasks
        }
      }
      
      // If we get here, either there were no saved tasks or there was an error
      // Add some sample tasks if no saved tasks exist
      const sampleTasks = [
        {
          id: '1',
          title: 'Welcome to TidyTasks',
          description: 'This is your personal modern productivity space. ✨ You can add tasks, set priority, mark them as done, and even filter by tags. Try creating your first task now!',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          priority: 'high',
          tags: ['👋'],
          color: '#ffd93d',
          completed: false,
          isPinned: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Try adding your tasks!',
          description: 'You’ll find more cool features as you explore. Go ahead and give it a shot! 🚀',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          priority: 'medium',
          tags: ['😈'],
          color: '#45b7d1',
          completed: false,
          isPinned: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Things I Need to Do',
          description: '• Get a job • Get 6+ hours of sleep 😴 (seriously!)',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
          priority: 'high',
          tags: ['☺️'],
          color: '#96ceb4',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Edit Videos',
          description: '',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
          priority: 'medium',
          tags: [],
          color: '#ff9ff3',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Gym',
          description: '',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
          priority: 'medium',
          tags: ['fitness'],
          color: '#f67280',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Go for a walk',
          description: '',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
          priority: 'medium',
          tags: ['health'],
          color: '#4ef538',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '7',
          title: 'Complete pending chapters',
          description: '',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days later
          priority: 'low',
          tags: ['📚'],
          color: '#ffcc5c',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '8',
          title: 'Swimming',
          description: '',
          dueDate: new Date().toISOString().split('T')[0], // Today
          priority: 'low',
          tags: ['fun'],
          color: '#6c5b7b',
          completed: true,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '9',
          title: 'Work on the projects',
          description: 'Maintain the streak.',
          dueDate: '', // No due date
          priority: 'high',
          tags: ['Coding'],
          color: '#87ceeb',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '10',
          title: 'Research UI Ideas',
          description: 'Explore new UI inspirations',
          dueDate: '', // No due date
          priority: 'low',
          tags: ['design', 'inspiration'],
          color: '#d291bc', // soft lavender-pink
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '11',
          title: 'Play Elden Ring Nightreign',
          description: '',
          dueDate: '',
          priority: 'low',
          tags: ['Games'],
          color: '#b2ebf2', // light cyan blue
          completed: true,
          isPinned: false,
          createdAt: new Date().toISOString()
        }
      ]
      setTasks(sampleTasks)
      setFilteredTasks(sampleTasks)
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error)
      // Fallback to sample tasks
      const sampleTasks = [
        {
          id: '1',
          title: 'Welcome to TidyTasks',
          description: 'This is your personal modern productivity space. ✨ You can add tasks, set priority, mark them as done, and even filter by tags. Try creating your first task now!',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          priority: 'high',
          tags: ['👋'],
          color: '#ffd93d',
          completed: false,
          isPinned: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Try adding your tasks!',
          description: 'You’ll find more cool features as you explore. Go ahead and give it a shot! 🚀',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
          priority: 'medium',
          tags: ['😈'],
          color: '#45b7d1',
          completed: false,
          isPinned: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Things I Need to Do',
          description: '• Get a job • Get 6+ hours of sleep 😴 (seriously!)',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
          priority: 'high',
          tags: ['☺️'],
          color: '#96ceb4',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Edit Videos',
          description: '',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
          priority: 'medium',
          tags: [],
          color: '#ff9ff3',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Gym',
          description: '',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
          priority: 'medium',
          tags: ['fitness'],
          color: '#f67280',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Go for a walk',
          description: '',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
          priority: 'medium',
          tags: ['health'],
          color: '#4ef538',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '7',
          title: 'Complete pending chapters',
          description: '',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days later
          priority: 'low',
          tags: ['📚'],
          color: '#ffcc5c',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '8',
          title: 'Swimming',
          description: '',
          dueDate: new Date().toISOString().split('T')[0], // Today
          priority: 'low',
          tags: ['fun'],
          color: '#6c5b7b',
          completed: true,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '9',
          title: 'Work on the projects',
          description: 'Maintain the streak.',
          dueDate: '', // No due date
          priority: 'high',
          tags: ['Coding'],
          color: '#87ceeb',
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '10',
          title: 'Research UI Ideas',
          description: 'Explore new UI inspirations',
          dueDate: '', // No due date
          priority: 'low',
          tags: ['design', 'inspiration'],
          color: '#d291bc', // soft lavender-pink
          completed: false,
          isPinned: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '11',
          title: 'Play Elden Ring Nightreign',
          description: '',
          dueDate: '',
          priority: 'low',
          tags: ['Games'],
          color: '#b2ebf2', // light cyan blue
          completed: true,
          isPinned: false,
          createdAt: new Date().toISOString()
        }
      ]
      setTasks(sampleTasks)
      setFilteredTasks(sampleTasks)
    }
    
    // Load filter preference
    try {
      const savedFilter = localStorage.getItem('tidyTasksFilter')
      if (savedFilter && savedFilter !== 'undefined') {
        setActiveFilter(savedFilter)
      }
    } catch (error) {
      console.error('Error loading filter preference:', error)
    }
    
    // Load search query
    try {
      const savedSearch = localStorage.getItem('tidyTasksSearch')
      if (savedSearch && savedSearch !== 'undefined') {
        setSearchQuery(savedSearch)
      }
    } catch (error) {
      console.error('Error loading search query:', error)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      if (tasks && tasks.length > 0) {
        localStorage.setItem('tidyTasks', JSON.stringify(tasks))
      }
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error)
    }
  }, [tasks])
  
  // Save filter preference
  useEffect(() => {
    localStorage.setItem('tidyTasksFilter', activeFilter)
  }, [activeFilter])
  
  // Save search query
  useEffect(() => {
    localStorage.setItem('tidyTasksSearch', searchQuery)
  }, [searchQuery])

  // Filter and sort tasks based on search query, active filter, and priority
  useEffect(() => {
    let filtered = tasks

    // Filter by status
    if (activeFilter === 'Completed') {
      filtered = filtered.filter(task => task.completed)
    } else if (activeFilter === 'Pending') {
      filtered = filtered.filter(task => !task.completed)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort tasks: completed tasks always at the end, then by priority only
    // (no longer sorting by creation date within priority groups)
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
    
    filtered = filtered.sort((a, b) => {
      // FIRST: Always put completed tasks at the end, regardless of priority
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      
      // SECOND: If both have same completion status, sort by priority
      const priorityA = priorityOrder[a.priority] || 1
      const priorityB = priorityOrder[b.priority] || 1
      
      // Higher priority comes first for non-completed tasks
      if (priorityA !== priorityB) {
        return priorityB - priorityA
      }
      
      // THIRD: No longer sorting by creation date - maintain current order
      // This allows users to freely arrange tasks within priority groups
      return 0
    })

    setFilteredTasks(filtered)
  }, [tasks, searchQuery, activeFilter])

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('tidyTasksDarkMode')
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('tidyTasksDarkMode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.remove('dark-mode')
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleAddTask = (newTask) => {
    const task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [...prev, task])
    setShowAddModal(false)
  }

  const handleEditTask = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? { ...updatedTask, completed: false } : task
    ))
    setEditingTask(null)
    setShowAddModal(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const handleToggleComplete = (taskId) => {
    setTasks(prev => {
      // First, update the completion status of the task
      const updatedTasks = prev.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          // If the task is being completed and it's pinned, unpin it
          if (updatedTask.completed && task.isPinned) {
            updatedTask.isPinned = false;
          }
          return updatedTask;
        }
        return task;
      });
      
      // Find the task that was just toggled
      const toggledTask = updatedTasks.find(task => task.id === taskId);
      
      // If the task was just completed, move it to the end of the list
      if (toggledTask && toggledTask.completed) {
        // Remove the task from its current position
        const tasksWithoutToggled = updatedTasks.filter(task => task.id !== taskId);
        
        // Add it to the end
        return [...tasksWithoutToggled, toggledTask];
      }
      
      // If the task was uncompleted, just return the updated tasks
      // The sorting in useEffect will handle putting it back in the right priority group
      return updatedTasks;
    });
  };

  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed))
  }

  const handleReorderTasks = (reorderedTasks) => {
    setTasks(reorderedTasks)
    // No need for additional localStorage save as the tasks useEffect will handle it
  }

  const handleTogglePin = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, isPinned: !task.isPinned } : task
    ))
  }


