import React from 'react'

import { CodecInfo } from '../../lib/types'


export default function Lineitem(props: { data: CodecInfo }) {
  const { data } = props

  const { path, video, audio, subs } = data
  const path_parts = path.split('\\')
  const path_name = path_parts.pop()
  // const path_stem = path_parts.join('\\')

  return (
    <div className='horizontal-container lineitem'>
      <div className="horizontal-container">
        <h4>File:</h4>
        {path_parts.map(p => <><p>{p}</p><b>\</b></>)}
        <p>{path_name}</p>
      </div>
    </div>
  )
}