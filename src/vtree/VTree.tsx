import VTreeGraph from './VTreeGraph'
import { useState } from 'react'
import * as wasm from 'rsdd'
import type { VTree as VTreeTSType, VTreeType } from '../util/vtree'
import VTreeSelect from './VTreeSelect'

const DEFAULT_CNF = `p cnf 3 1
1 2 3 4 0
-2 -3 4 5 0
-4 -5 6 6 0`

export default function VTree(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [vtreeType, setVTreeType] = useState<VTreeType>('RightLinear')
  const [cnf, setCnf] = useState('')

  const vtree =
    cnf === '' ? null : (wasm.vtree(cnf, vtreeType).root as VTreeTSType)

  return (
    <>
      <section>
        <textarea
          rows={4}
          className="w-full border p-2 rounded"
          value={textarea}
          onChange={(e) => {
            setTextarea(e.target.value)
          }}
        />
        <button
          className="btn btn-blue mr-2"
          onClick={() => {
            setCnf(textarea)
          }}
        >
          load cnf
        </button>
        <VTreeSelect
          setVTreeType={(vtree) => {
            if (vtree !== vtreeType) setVTreeType(vtree)
          }}
        />
        {vtree !== null && (
          <div style={{ height: 700 }}>
            <VTreeGraph vtree={vtree} key={cnf} />
          </div>
        )}
      </section>
    </>
  )
}
