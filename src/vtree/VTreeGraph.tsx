import { useEffect, useRef } from 'react'

import { DataSet } from 'vis-data'
import { Network } from 'vis-network'
import type { Data } from 'vis-network'

import { genVTreeNodesAndEdges } from '../util/vtree'
import type { VTree } from '../util/vtree'

import { DEFAULT_TREE_OPTIONS as options } from '../util/vis'

interface Props {
  vtree: VTree
}

export default function VTreeGraph({ vtree }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current === null) return

    const { nodes, edges } = genVTreeNodesAndEdges(vtree, 's')

    const data: Data = {
      nodes: new DataSet(
        nodes.map((node) => {
          return {
            id: node.label,
            label: node.value !== undefined ? `v${node.value + 1}` : '',
          }
        })
      ),
      edges: new DataSet(
        edges.map((edge) => {
          return {
            id: `${edge.source} - ${edge.target}`,
            from: edge.source,
            to: edge.target,
          }
        })
      ),
    }

    // eslint-disable-next-line no-new
    new Network(containerRef.current, data, options)
  }, [containerRef, vtree])

  return <div className="bg-white h-full mt-2" ref={containerRef} />
}
