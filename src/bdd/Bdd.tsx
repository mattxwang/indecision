import BddGraph from './BddGraph'
import bdd from '../data/bdd.json'
import type { BddWrapper } from '../util/bdd'

export default function BDD (): JSX.Element {
  return <>
    <section>
      <h1 className="text-4xl text-bold">BDD!</h1>
    </section>
    <section>
      <div style={{ height: 700 }}>
        <BddGraph bdd={bdd as BddWrapper} />
      </div>
    </section>
  </>
}
