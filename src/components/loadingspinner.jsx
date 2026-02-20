import React, { useEffect, useState } from 'react'

const STEPS = [
  'Cloning repository…',
  'Analysing codebase…',
  'Detecting failures…',
  'Applying AI fixes…',
  'Running CI/CD pipeline…',
  'Generating report…',
]

export default function LoadingSpinner() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s))
    }, 350)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="spinner-ring">
          <div className="spinner-inner" />
        </div>
        <p className="loading-label">AUTONOMOUS AGENT RUNNING</p>
        <div className="loading-steps">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`loading-step ${i < step ? 'done' : i === step ? 'active' : 'pending'}`}
            >
              <span className="step-dot" />
              <span className="step-text">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}