import VTreeGraph from './VTreeGraph'
import { useState } from 'react'
import * as wasm from 'rsdd'

const DEFAULT_CNF = `p cnf 3 1
1 2 3 4 0
-2 -3 4 5 0
-4 -5 6 6 0`

export default function VTreeApp (): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [cnf, setCnf] = useState('')

  const vtree = cnf === '' ? null : JSON.parse(wasm.get_vtree(cnf)).root

  return <>
    <section>
      <h1 className="text-4xl text-bold">VTree!</h1>
    </section>
    <section>
      <textarea
        rows={4}
        className="w-full border p-2 rounded"
        value={textarea}
        onChange={(e) => { setTextarea(e.target.value) }}
      />
      <button className='btn btn-blue' onClick={() => { setCnf(textarea) }}>render</button>
      {vtree !== null && <div style={{ height: 700 }}>
        <VTreeGraph vtree={vtree} key={cnf} />
      </div>}
    </section>
  </>
}
