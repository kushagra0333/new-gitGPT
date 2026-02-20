import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Read saved preference or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gitgpt-theme') || 'dark'
  })

  useEffect(() => {
    // Apply theme class to root element
    document.documentElement.setAttribute('data-theme', theme)
    // Save preference
    localStorage.setItem('gitgpt-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}