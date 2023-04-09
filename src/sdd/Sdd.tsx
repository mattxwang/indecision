import SddGraph from './SddGraph'
import { useState } from 'react'
import * as wasm from 'rsdd'

import type { SddWrapper } from '../util/sdd'
import VTreeSelect from '../vtree/VTreeSelect'
import type { VTreeType } from '../util/vtree'

const DEFAULT_CNF = `p cnf 3 1
1 2 3 4 0
-2 -3 4 5 0
-4 -5 6 6 0`

export default function SDD (): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [vtreeType, setVTreeType] = useState<VTreeType>('RightLinear')
  const [cnf, setCnf] = useState('')

  const sdd = cnf === '' ? null : wasm.sdd(cnf, vtreeType) as SddWrapper

  return <>
    <section>
      <p>
        plop in any DIMACS-formatted CNF, and get the corresponding compressed SDD!
      </p>
      <textarea
          rows={4}
          className="w-full border p-2 rounded mt-2"
          value={textarea}
          onChange={(e) => { setTextarea(e.target.value) }}
        />
      <button className='btn btn-blue mr-2' onClick={() => { setCnf(textarea) }}>render</button>
      <VTreeSelect setVTreeType={(vtree) => { if (vtree !== vtreeType) setVTreeType(vtree) }} />
      {sdd !== null && <SddGraph sdd={sdd} /> }
    </section>
  </>
}
