import React from 'react'

import Lineitem from './lineitem'
import { CodecInfo } from '../../lib/types'

type VideoCodecs = CodecInfo[]


export default function Filescroll(props: { file_data: VideoCodecs }) {
  const { file_data } = props

  console.log(file_data)

  return (
    <fieldset className='scroll-container'>
      <legend><h2>Files:</h2></legend>
      {file_data.map(d => <Lineitem key={d['path']} data={d} />)}
    </fieldset>
  )
}