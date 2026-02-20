import React, { useEffect, useState } from 'react'
import { useAgent } from '../context/AgentContext'

export default function ScorePanel() {
  const { score } = useAgent()
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    if (!score) return
    setAnimated(0)
    const target = Math.min(score.total, 120)
    const duration = 1200
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimated(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [score])

  if (!score) return null

  const base = 100
  const pct = Math.min((score.total / 120) * 100, 100)
  const scoreColor = score.total >= 100 ? 'var(--green)' : score.total >= 80 ? 'var(--amber)' : 'var(--red)'

  return (
    <section className="card score-panel fade-in">
      <div className="card-header">
        <span className="section-tag">PERFORMANCE</span>
      </div>
      <h2 className="section-title">Score Breakdown</h2>

      <div className="score-hero">
        <span className="score-number" style={{ color: scoreColor }}>{animated}</span>
        <span className="score-label">FINAL SCORE</span>
      </div>

      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${pct}%`, background: scoreColor }}
        />
      </div>

      <div className="score-breakdown">
        <div className="score-row">
          <span className="score-row-label">Base Score</span>
          <span className="score-row-value neutral">{base}</span>
        </div>
        <div className="score-row">
          <span className="score-row-label">Speed Bonus</span>
          <span className="score-row-value positive">+{score.speedBonus}</span>
        </div>
        <div className="score-row">
          <span className="score-row-label">Efficiency Penalty</span>
          <span className="score-row-value negative">−{score.penalty}</span>
        </div>
        <div className="score-row total-row">
          <span className="score-row-label">Total</span>
          <span className="score-row-value" style={{ color: scoreColor }}>{score.total}</span>
        </div>
      </div>
    </section>
  )
}
