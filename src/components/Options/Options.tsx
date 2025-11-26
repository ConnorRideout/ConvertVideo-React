import React, { useEffect, useState } from 'react'

import { callPythonApi } from '../../hooks/pythonBridge'

import GlobalOptions from './GlobalOptions'
import IndividualOptions from './IndividualOptions'


export default function Options({ nextStage }: { nextStage: () => void }) {
  const [filedata, setFiledata] = useState<{ filepath: string }[]>([])

  useEffect(() => {
    // (async () => setFiledata(await callPythonApi('get_filedata') as typeof filedata))()
    setFiledata([{ filepath: "testing" }, { filepath: "test" }])
  }, [])



  return (
    <>
      <GlobalOptions />
      {filedata.map(data => (
        <IndividualOptions data={data} />
      ))}
      <div>
        <button
          onClick={nextStage}
        >OK</button>
        <button
          onClick={() => callPythonApi('close')}
        >Cancel</button>
      </div>
    </>
  )
}