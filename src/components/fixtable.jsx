import React, { useState } from 'react'
import { useAgent } from '../context/AgentContext'

const TYPE_COLORS = {
  LINTING: '#6c8ebf',
  SYNTAX: '#d4a855',
  LOGIC: '#bf6c8e',
  TYPE_ERROR: '#8ebf6c',
  IMPORT: '#6cbfbf',
  INDENTATION: '#a06cbf',
}

export default function FixTable() {
  const { fixes } = useAgent()
  const [filter, setFilter] = useState('ALL')

  if (!fixes) return null

  const types = ['ALL', ...Array.from(new Set(fixes.map((f) => f.type)))]
  const filtered = filter === 'ALL' ? fixes : fixes.filter((f) => f.type === filter)

  return (
    <section className="card fix-table-section fade-in">
      <div className="card-header">
        <span className="section-tag">DIAGNOSTICS</span>
        <span className="fixes-count">{fixes.filter(f => f.status === 'Fixed').length}/{fixes.length} resolved</span>
      </div>
      <h2 className="section-title">Fixes Applied</h2>

      <div className="filter-chips">
        {types.map((t) => (
          <button
            key={t}
            className={`chip ${filter === t ? 'chip-active' : ''}`}
            onClick={() => setFilter(t)}
            style={filter === t && t !== 'ALL' ? { borderColor: TYPE_COLORS[t], color: TYPE_COLORS[t] } : {}}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="table-scroll">
        <table className="fix-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Bug Type</th>
              <th>Line</th>
              <th>Commit Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((fix, i) => (
              <tr key={i} className="fix-row">
                <td>
                  <span className="file-name">{fix.file}</span>
                </td>
                <td>
                  <span
                    className="type-badge"
                    style={{
                      color: TYPE_COLORS[fix.type] || '#aaa',
                      borderColor: TYPE_COLORS[fix.type] || '#aaa',
                    }}
                  >
                    {fix.type}
                  </span>
                </td>
                <td>
                  <span className="line-num">:{fix.line}</span>
                </td>
                <td>
                  <span className="commit-msg">{fix.message}</span>
                </td>
                <td>
                  <span className={`status-pill ${fix.status === 'Fixed' ? 'pill-pass' : 'pill-fail'}`}>
                    {fix.status === 'Fixed' ? '✓ Fixed' : '✗ Failed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
