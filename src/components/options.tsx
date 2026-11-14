import React, { useState } from 'react'
import { ConfigData } from '../../lib/types'


export default function Options(props: { convOptions: ConfigData }) {
  const { FTYPES,
    NVENC,
    CRF_VALS,
    DUR_MISMCH_PERCENT,
    DUR_MISMCH_SECONDS,
    IGNORE_DTS,
    SKIP_SIZE,
    FORCE_HEVC,
    AUD_LANGS,
    SUB_LANGS,
    STREAMS,
    RECURSE,
    OVERWRITE,
    KEEP_FAIL,
    OVERWRITE_FAIL,
    KEEP_ERROR,
    DO_SCALE,
    DO_CROP,
    RENAME,
    RENAME_REGEX,
    RENAME_TO,
    THREADS,
    CONV_THREADS,
    ADD_PARAMS } = props.convOptions

  const [showAdvanced, setShowAdvanced] = useState(false)

  const submit = () => {
    console.log(submit)
  }

  return (
    <fieldset className='options-container'>
      <legend><h2>Options:</h2></legend>
      <form onSubmit={submit}>
        <div className="horizontal-container">
          <label htmlFor="outputFormat">Output format</label>
          <select name="outputFormat">
            <option value="test">test</option>
          </select>
        </div>
        <div className="horizontal-container">
          <label htmlFor="audStream">Audio stream</label>
          <select name="audStream">
            <option value="test">test</option>
          </select>
        </div>
        <div className="horizontal-container">
          <label htmlFor="subStream">Subtitle stream</label>
          <select name="subStream">
            <option value="test">test</option>
          </select>
        </div>
        <div className="horizontal-container">
          <label htmlFor="recurse">Recurse folders</label>
          <input type="checkbox" id='recurse' />
        </div>
        <div className="horizontal-container">
          <label htmlFor="overwrite">Overwrite originals</label>
          <input type="checkbox" id='overwrite' />
        </div>
        <div className="horizontal-container">
          <label htmlFor="keepFail">Keep compression failures</label>
          <input type="checkbox" id='keepFail' />
        </div>
        <div className="horizontal-container">
          <label htmlFor="overwriteWithFails">&emsp;Overwrite originals with failures</label>
          <input type="checkbox" id='overwriteWithFails' />
        </div>
        <div className="horizontal-container">
          <label htmlFor="keepError">Keep errored files</label>
          <input type="checkbox" id='keepError' />
        </div>
        <div className="horizontal-container">
          <label htmlFor="scale">Scale to 720p</label>
          <input type="checkbox" id='scale' />
        </div>
        <div className="horizontal-container">
          <label htmlFor="rename">Rename output (regex)</label>
          <input type="checkbox" id='rename' />
          <input type="text" />
          to
          <input type="text" />
        </div>
        <fieldset>
          <legend onClick={() => setShowAdvanced(prev => !prev)}>
            <h4>Advanced Options <b>{showAdvanced ? "∨" : ">"}</b></h4>
          </legend>
          <div className='vertical-container' style={{ display: showAdvanced ? 'flex' : 'none' }}>
            <div className="horizontal-container">
              <label htmlFor="convVideo">Convert video</label>
              <input type="checkbox" id='convVideo' />
            </div>
            <div className="horizontal-container">
              <label htmlFor="forceConvVideo">&emsp;Convert video again if it's already converted</label>
              <input type="checkbox" id='forceConvVideo' />
            </div>
            <div className="horizontal-container">
              <label htmlFor="convAudio">Convert video</label>
              <input type="checkbox" id='convAudio' />
            </div>
            <div className="horizontal-container">
              <label htmlFor="convSubtitles">Convert video</label>
              <input type="checkbox" id='convSubtitles' />
            </div>
            <div className="horizontal-container">
              <label htmlFor="threadCt">Thread count (1-10)</label>
              <input type="number" id='threadCt' min={1} max={10} />
            </div>
            <div className="horizontal-container">
              <label htmlFor="addArgs">Additional ffmpeg arguments</label>
              <input type="text" id='addArgs' />
            </div>
          </div>
        </fieldset>
      </form>
    </fieldset>

  )
}