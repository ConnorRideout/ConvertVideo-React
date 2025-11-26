import React, { useState } from 'react'

import Options from './Options/Options'
import Processing from './Processing/Processing'


export default function App() {
  const [stage, setStage] = useState('setup')

  console.log(stage)

  if (!stage || stage === 'setup') {
    return (
      <Options nextStage={() => setStage('processing')} />
    )
  } else {
    return (
      <Processing prevStage={() => setStage('setup')} />
    )
  }
}
