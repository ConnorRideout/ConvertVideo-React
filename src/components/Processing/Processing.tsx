import React from 'react'

export default function Processing({ prevStage }: { prevStage: () => void }) {
  return (
    <div>Processing
      <button onClick={prevStage}>back</button>
    </div>
  )
}