import React, { useState } from 'react'
import { useAgent } from '../context/AgentContext'

export default function InputSection() {
  const { loading, runAgent, summary, reset } = useAgent()
  const [repoUrl, setRepoUrl] = useState('')
  const [teamName, setTeamName] = useState('')
  const [leaderName, setLeaderName] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!repoUrl.trim()) e.repoUrl = 'Repository URL is required'
    else if (!repoUrl.startsWith('http')) e.repoUrl = 'Enter a valid URL'
    if (!teamName.trim()) e.teamName = 'Team name is required'
    if (!leaderName.trim()) e.leaderName = 'Leader name is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    runAgent({ repoUrl, teamName, leaderName })
  }

  const handleReset = () => {
    reset()
    setRepoUrl('')
    setTeamName('')
    setLeaderName('')
    setErrors({})
  }

  return (
    <section className="input-section card">
      <div className="input-header">
        <div className="input-header-left">
          <span className="section-tag">AGENT CONTROL</span>
          <h2 className="section-title">Deploy Autonomous Agent</h2>
        </div>
        {summary && (
          <button className="btn-ghost" onClick={handleReset}>
            ↺ New Run
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className={`form-field full-width ${errors.repoUrl ? 'has-error' : ''}`}>
            <label className="field-label">GitHub Repository URL</label>
            <div className="input-wrapper">
              <span className="input-icon">⌥</span>
              <input
                type="url"
                className="field-input"
                placeholder="https://github.com/org/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.repoUrl && <span className="field-error">{errors.repoUrl}</span>}
          </div>

          <div className={`form-field ${errors.teamName ? 'has-error' : ''}`}>
            <label className="field-label">Team Name</label>
            <div className="input-wrapper">
              <span className="input-icon">◈</span>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. RIFT ORGANISERS"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.teamName && <span className="field-error">{errors.teamName}</span>}
          </div>

          <div className={`form-field ${errors.leaderName ? 'has-error' : ''}`}>
            <label className="field-label">Team Leader</label>
            <div className="input-wrapper">
              <span className="input-icon">◆</span>
              <input
                type="text"
                className="field-input"
                placeholder="e.g. Saiyam Kumar"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                disabled={loading}
              />
            </div>
            {errors.leaderName && <span className="field-error">{errors.leaderName}</span>}
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <span className="btn-pulse" />
              Agent Running…
            </span>
          ) : (
            '▶ Run Agent'
          )}
        </button>
      </form>
    </section>
  )
}
