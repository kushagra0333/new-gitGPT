import React from 'react'
import { useAgent } from '../context/AgentContext'

export default function Timeline() {
  const { timeline } = useAgent()
  if (!timeline) return null

  return (
    <section className="card timeline-section fade-in">
      <div className="card-header">
        <span className="section-tag">CI/CD PIPELINE</span>
        <span className="fixes-count">
          {timeline.filter((t) => t.status === 'PASSED').length} passed · {timeline.filter((t) => t.status === 'FAILED').length} failed
        </span>
      </div>
      <h2 className="section-title">CI/CD Timeline</h2>

      <div className="timeline">
        {timeline.map((run, i) => {
          const passed = run.status === 'PASSED'
          const isLast = i === timeline.length - 1
          return (
            <div key={i} className={`timeline-item ${isLast ? 'last' : ''}`}>
              <div className="timeline-connector">
                <div className={`timeline-dot ${passed ? 'dot-pass' : 'dot-fail'}`}>
                  {passed ? '✓' : '✗'}
                </div>
                {!isLast && <div className="timeline-line" />}
              </div>
              <div className={`timeline-card ${passed ? 'tcard-pass' : 'tcard-fail'}`}>
                <div className="tcard-top">
                  <span className={`status-badge ${passed ? 'badge-pass' : 'badge-fail'}`}>
                    {run.status}
                  </span>
                  <span className="tcard-iteration">Iteration {run.iteration}</span>
                </div>
                <span className="tcard-time">{run.timestamp}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}