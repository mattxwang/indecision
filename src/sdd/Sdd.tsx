import SddGraph from './SddGraph'
import { useState } from 'react'
import * as wasm from 'rsdd'

import type { SddWrapper } from '../util/sdd'

const DEFAULT_CNF = `p cnf 3 1
1 2 3 4 0
-2 -3 4 5 0
-4 -5 6 6 0`

export default function SDD (): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [cnf, setCnf] = useState('')

  const sdd = cnf === '' ? null : JSON.parse(wasm.get_sdd(cnf)) as SddWrapper

  return <>
    <section>
      <p>
        plop in any DIMACS-formatted CNF, and get the corresponding compressed SDD (with a right-linear vtree)!
      </p>
      <textarea
          rows={4}
          className="w-full border p-2 rounded mt-2"
          value={textarea}
          onChange={(e) => { setTextarea(e.target.value) }}
        />
      <button className='btn btn-blue mr-2' onClick={() => { setCnf(textarea) }}>render</button>
      {sdd !== null && <SddGraph sdd={sdd} /> }
    </section>
  </>
}