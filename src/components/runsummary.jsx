import React from 'react'
import { useAgent } from '../context/AgentContext'

function StatItem({ label, value, accent }) {
  return (
    <div className={`stat-item ${accent ? 'accent' : ''}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  )
}

export default function RunSummary() {
  const { summary } = useAgent()
  if (!summary) return null

  const passed = summary.status === 'PASSED'

  return (
    <section className="card run-summary fade-in">
      <div className="card-header">
        <span className="section-tag">EXECUTION REPORT</span>
        <span className={`status-badge ${passed ? 'badge-pass' : 'badge-fail'}`}>
          {passed ? '✓ PASSED' : '✗ FAILED'}
        </span>
      </div>

      <h2 className="section-title">Run Summary</h2>

      <div className="summary-repo">
        <span className="repo-label">REPOSITORY</span>
        <a href={summary.repo} target="_blank" rel="noreferrer" className="repo-link">
          {summary.repo}
        </a>
      </div>

      <div className="stats-grid">
        <StatItem label="Team" value={summary.team} />
        <StatItem label="Leader" value={summary.leader} />
        <StatItem label="Branch" value={summary.branch} accent />
        <StatItem label="Execution Time" value={summary.time} />
        <StatItem label="Failures Detected" value={summary.failures} />
        <StatItem label="Fixes Applied" value={summary.fixes} accent />
      </div>
    </section>
  )
}
