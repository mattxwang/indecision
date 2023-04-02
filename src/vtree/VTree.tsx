import VTreeGraph from './VTreeGraph'
import vtree from '../data/vtree.json'

export default function VTree (): JSX.Element {
  return <>
    <section>
      <h1 className="text-4xl text-bold">VTree!</h1>
    </section>
    <section>
      <div style={{ height: 700 }}>
        <VTreeGraph vtree={vtree.root} />
      </div>
    </section>
  </>
}
