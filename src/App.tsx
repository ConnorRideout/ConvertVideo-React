import { useEffect, useState } from "react"

import Options from './components/options'
import Filescroll from "./components/filescroll"
import { CodecInfo, ConfigData } from "../lib/types"

export default function App() {
  const [ready, setReady] = useState(!!window.pywebview)
  const [topfile, setTopFile] = useState("Loading...")
  const [msg, setMsg] = useState("")
  const [fileData, setFileData] = useState<CodecInfo[]>([])
  const [convOptions, setConvOptions] = useState<ConfigData>()

  const onReady = async () => {
    setReady(true)
    setTopFile(await window.pywebview!.api.getTopPath())
    setFileData(await window.pywebview!.api.getCodecs())
    setConvOptions(await window.pywebview!.api.getConfig())
    // setMsg(data)
  }

  useEffect(() => {
    window.addEventListener("pywebviewready", onReady)
    return () => window.removeEventListener("pywebviewready", onReady)
  }, [])

  // const callPythonMessage = async () => {
  //   setMsg(await window.pywebview!.api.greet("React"));
  // };

  // const callPythonData = async () => {
  //   setMsg(await window.pywebview!.api.getData())
  // }

  // window.addEventListener('py-message', (e) => console.log('hello on js'))

  return (
    <div className="vertical-container app">
      <h1>{topfile}</h1>
      {/* <button disabled={!ready} onClick={callPythonMessage}>Call Python</button> */}
      <p>{msg}</p>
      <div className="horizontal-container main-container">
        {convOptions ? <Options convOptions={convOptions} /> : <div className="options-container">loading...</div>}
        <Filescroll file_data={fileData} />
      </div>
    </div>
  )
}