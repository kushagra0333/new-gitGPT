import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {/* Track */}
      <div className={`toggle-track ${isDark ? 'track-dark' : 'track-light'}`}>

        {/* Icons inside track */}
        <span className="track-icon track-icon-sun">☀️</span>
        <span className="track-icon track-icon-moon">🌙</span>

        {/* Sliding thumb */}
        <div className={`toggle-thumb ${isDark ? 'thumb-dark' : 'thumb-light'}`} />
      </div>

      {/* Label */}
      <span className="toggle-label">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}