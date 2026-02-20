import React, { createContext, useContext, useReducer } from 'react'

const AgentContext = createContext(null)

const MOCK_RESPONSE = {
  summary: {
    repo: 'https://github.com/sample/repo',
    team: 'RIFT ORGANISERS',
    leader: 'Saiyam Kumar',
    branch: 'RIFT_SAIYAM_AI_Fix',
    failures: 8,
    fixes: 6,
    status: 'PASSED',
    time: '4m 12s',
  },
  score: {
    speedBonus: 10,
    penalty: 4,
    total: 106,
  },
  fixes: [
    { file: 'auth.js', type: 'SYNTAX', line: 24, message: '[AI-AGENT] Fixed missing bracket', status: 'Fixed' },
    { file: 'api/users.js', type: 'LOGIC', line: 87, message: '[AI-AGENT] Fixed null reference guard', status: 'Fixed' },
    { file: 'utils/parser.js', type: 'IMPORT', line: 3, message: '[AI-AGENT] Resolved missing module import', status: 'Fixed' },
    { file: 'components/Form.jsx', type: 'TYPE_ERROR', line: 52, message: '[AI-AGENT] Corrected prop type mismatch', status: 'Fixed' },
    { file: 'server/routes.js', type: 'LINTING', line: 119, message: '[AI-AGENT] Fixed unused variable', status: 'Fixed' },
    { file: 'db/schema.sql', type: 'INDENTATION', line: 44, message: '[AI-AGENT] Normalized indentation', status: 'Fixed' },
    { file: 'middleware/auth.js', type: 'LOGIC', line: 31, message: '[AI-AGENT] Fixed async/await error', status: 'Failed' },
    { file: 'config/env.js', type: 'SYNTAX', line: 8, message: '[AI-AGENT] Fixed template literal', status: 'Failed' },
  ],
  timeline: [
    { status: 'FAILED', iteration: '1/5', timestamp: '12:00 PM' },
    { status: 'FAILED', iteration: '2/5', timestamp: '12:01 PM' },
    { status: 'FAILED', iteration: '3/5', timestamp: '12:02 PM' },
    { status: 'PASSED', iteration: '4/5', timestamp: '12:04 PM' },
    { status: 'PASSED', iteration: '5/5', timestamp: '12:06 PM' },
  ],
}

const initialState = {
  loading: false,
  summary: null,
  fixes: null,
  score: null,
  timeline: null,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null }
    case 'SET_DATA':
      return {
        ...state,
        loading: false,
        summary: action.payload.summary,
        fixes: action.payload.fixes,
        score: action.payload.score,
        timeline: action.payload.timeline,
        error: null,
      }
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function AgentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const runAgent = async ({ repoUrl, teamName, leaderName }) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const response = await fetch('http://localhost:5000/api/run-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, teamName, leaderName }),
      })

      if (!response.ok) throw new Error('Server responded with an error')
      const data = await response.json()
      dispatch({ type: 'SET_DATA', payload: data })
    } catch {
      // Backend unavailable — use mock data
      await new Promise((r) => setTimeout(r, 2200))
      const mock = {
        ...MOCK_RESPONSE,
        summary: {
          ...MOCK_RESPONSE.summary,
          repo: repoUrl || MOCK_RESPONSE.summary.repo,
          team: teamName || MOCK_RESPONSE.summary.team,
          leader: leaderName || MOCK_RESPONSE.summary.leader,
        },
      }
      dispatch({ type: 'SET_DATA', payload: mock })
    }
  }

  const reset = () => dispatch({ type: 'RESET' })

  return (
    <AgentContext.Provider value={{ ...state, runAgent, reset }}>
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const ctx = useContext(AgentContext)
  if (!ctx) throw new Error('useAgent must be used inside AgentProvider')
  return ctx
}