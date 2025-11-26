import { useState, useEffect } from 'react'

export function usePythonState(propName: string) {
  const [propValue, setPropValue] = useState<any>()

  useEffect(() => {
    window.addEventListener('pywebviewready', function () {
      if (!window.pywebview.state) {
        window.pywebview.state = {}
      }
      window.pywebview.state[`set_${propName}`] = setPropValue
    })
  }, [])

  return propValue
}

export async function callPythonApi(apiName: string, apiContent?: object | any[] | string): Promise<string | object | any[]> {
  try {
    return apiContent === undefined
      ? await window.pywebview.api[apiName]()
      : await window.pywebview.api[apiName](apiContent)
  } catch (err) {
    console.error(`API call to "${apiName}" failed:`, err)
  }
}
