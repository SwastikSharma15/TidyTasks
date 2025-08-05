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