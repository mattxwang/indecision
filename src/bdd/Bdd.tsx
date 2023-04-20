import BddGraph from './BddGraph'
import type { BddWrapper } from '../util/bdd'
import { useState } from 'react'
import * as wasm from 'rsdd'
import { TINY_CNF_2 as DEFAULT_CNF } from '../util/cnf'

export default function BDD(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [cnf, setCnf] = useState('')

  const bdd = cnf === '' ? null : (JSON.parse(wasm.bdd(cnf)) as BddWrapper)

  return (
    <>
      <section>
        <p>
          plop in any DIMACS-formatted CNF, and get the corresponding compressed
          BDD (with a right-linear vtree)!
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
        {bdd !== null && <BddGraph bdd={bdd} />}
      </section>
    </>
  )
}
