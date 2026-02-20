import React from 'react'
import { AgentProvider, useAgent } from './context/AgentContext'
import { ThemeProvider } from './context/ThemeContext'
import ThemeToggle from './components/themetoggle'
import InputSection from './components/InputSection'
import RunSummary from './components/runsummary'
import ScorePanel from './components/scorepannel'
import FixTable from './components/fixtable'
import Timeline from './components/timeline'
import LoadingSpinner from './components/loadingspinner'

function Dashboard() {
  const { loading, summary } = useAgent()

  return (
    <div className="app">
      {loading && <LoadingSpinner />}

      <header className="app-header">
        <div className="header-inner">

          {/* LEFT — Logo */}
          <div className="logo">
            <span className="logo-icon">⬡</span>
            <div className="logo-text">
              <span className="logo-main">GITGPT</span>
              <span className="logo-sub">Autonomous CI/CD Intelligence</span>
            </div>
          </div>

          {/* RIGHT — Toggle + Status */}
          <div className="header-right">
            <ThemeToggle />
            <div className="header-status">
              <span
                className={`system-dot ${
                  loading ? 'dot-loading' : summary ? 'dot-active' : 'dot-idle'
                }`}
              />
              <span className="system-status">
                {loading ? 'RUNNING' : summary ? 'COMPLETE' : 'STANDBY'}
              </span>
            </div>
          </div>

        </div>
      </header>

      <main className="main-content">
        <InputSection />

        {summary && (
          <>
            <div className="results-grid">
              <RunSummary />
              <ScorePanel />
            </div>
            <FixTable />
            <Timeline />
          </>
        )}

        {!summary && !loading && (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <p className="empty-title">No agent run yet</p>
            <p className="empty-sub">
              Enter your repository details above and click{' '}
              <strong>Run Agent</strong> to begin autonomous analysis.
            </p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <span>GITGPT DASHBOARD</span>
        <span>Powered by Autonomous AI</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AgentProvider>
        <Dashboard />
      </AgentProvider>
    </ThemeProvider>
  )
}