import BddGraph from './BddGraph'
import type { BddWrapper } from '../util/bdd'
import { useState } from 'react'
import * as wasm from 'rsdd'
import { TINY_CNF_2 as DEFAULT_CNF } from '../util/cnf'
import VarOrderSelect from './VarOrderSelect'
import WrappedRsddOutput from '../WrappedRsddOutput'

export default function BDD(): JSX.Element {
  const [textarea, setTextarea] = useState(DEFAULT_CNF)
  const [cnf, setCnf] = useState('')
  const [varOrder, setVarOrder] = useState<bigint[] | null>(null)

  const bddGenerator = (): JSX.Element => {
    const raw =
      varOrder === null
        ? wasm.bdd(cnf)
        : wasm.bdd_with_var_order(cnf, new BigUint64Array(varOrder))
    const bdd = JSON.parse(raw) as BddWrapper
    return <BddGraph bdd={bdd} />
  }

  return (
    <>
      <section>
        <p>
          plop in any DIMACS-formatted CNF, and get the corresponding canonical
          (O)BDD (with an ordering of your choice!)
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
        var order:{' '}
        <VarOrderSelect varOrder={varOrder} setVarOrder={setVarOrder} />
        {cnf.trim() !== '' && <WrappedRsddOutput generator={bddGenerator} />}
      </section>
    </>
  )
}
