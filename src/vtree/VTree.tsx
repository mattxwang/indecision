import VTreeGraph from './VTreeGraph'
import { useState } from 'react'
import * as wasm from 'rsdd'
import type { VTree as VTreeTSType, VTreeType } from '../util/vtree'
import VTreeSelect from './VTreeSelect'
import { TINY_CNF_2 as DEFAULT_CNF } from '../util/cnf'
import WrappedRsddOutput from '../WrappedRsddOutput'

export default function VTree(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [vtreeType, setVTreeType] = useState<VTreeType>('RightLinear')
  const [cnf, setCnf] = useState('')

  const vtreeGenerator = (): JSX.Element => (
    <VTreeGraph
      vtree={wasm.vtree(cnf, vtreeType).root as VTreeTSType}
      key={cnf}
    />
  )

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
        {cnf.trim() !== '' && (
          <div style={{ height: 700 }}>
            <WrappedRsddOutput generator={vtreeGenerator} />
          </div>
        )}
      </section>
    </>
  )
}
