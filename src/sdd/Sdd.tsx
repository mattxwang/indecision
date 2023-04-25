import SddGraph from './SddGraph'
import { useState } from 'react'
import * as wasm from 'rsdd'

import type { SddWrapper } from '../util/sdd'
import VTreeSelect from '../vtree/VTreeSelect'
import type { VTreeType } from '../util/vtree'
import { TINY_CNF_2 as DEFAULT_CNF } from '../util/cnf'
import WrappedRsddOutput from '../WrappedRsddOutput'

export default function SDD(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [vtreeType, setVTreeType] = useState<VTreeType>('RightLinear')
  const [cnf, setCnf] = useState('')

  const sddGenerator = (): JSX.Element => (
    <SddGraph sdd={wasm.sdd(cnf, vtreeType) as SddWrapper} />
  )

  return (
    <>
      <section>
        <p>
          plop in any DIMACS-formatted CNF, and get the corresponding compressed
          SDD!
        </p>
        <textarea
          rows={4}
          className="w-full border p-2 rounded mt-2"
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
        {cnf.trim() !== '' && <WrappedRsddOutput generator={sddGenerator} />}
      </section>
    </>
  )
}
