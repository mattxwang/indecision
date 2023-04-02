import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow'

import type { Edge, Node } from 'reactflow'

import 'reactflow/dist/style.css'
import { genVTreeNodesAndEdges } from '../utils'
import type { VTree } from '../utils'

interface Props {
  vtree: VTree
}

function getRelPosition (label: string, largestLeaf: number): number {
  let i = 0
  for (const ch of label.split('')) {
    if (ch === 'l') i -= 1
    if (ch === 'r') i += 1
  }
  return i
}

function generateGraphNode (depth: number, largestLeaf: number) {
  return function (node: { value?: number, label: string }): Node<{ label: string }> {
    const { label, value } = node
    if (value !== undefined) {
      return ({
        id: label,
        position: {
          x: (value - largestLeaf / 2) * 50,
          y: depth * 50
        },
        data: { label: `${value}` }
      })
    }

    return ({
      id: label,
      position: {
        x: getRelPosition(label, largestLeaf) * 50,
        y: (label.length - 1) * 50
      },
      data: { label: 'T' }
    })
  }
}

function generateGraphEdge (edge: { source: string, target: string }): Edge {
  const { source, target } = edge
  return ({
    id: `${source}-${target}`,
    source,
    target,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 10,
      width: 10
    },
    style: {
      strokeWidth: 2
    }
  })
}

function generateGraphData (vtree: VTree): { defaultNodes: Node[], defaultEdges: Edge[] } {
  const { nodes, edges } = genVTreeNodesAndEdges(vtree, 's')

  const depth = Math.max(
    ...nodes
      .filter((node) => node.value === undefined)
      .map(node => node.label.length)
  )

  const largestLeaf = Math.max(
    ...nodes
      .map(node => node.value ?? 0)
  )

  return {
    defaultNodes: nodes.map(generateGraphNode(depth, largestLeaf)),
    defaultEdges: edges.map(generateGraphEdge)
  }
}

export default function VTreeGraph ({ vtree }: Props): JSX.Element {
  const { defaultNodes, defaultEdges } = generateGraphData(vtree)

  const [nodes,, onNodesChange] = useNodesState(defaultNodes)
  const [edges,, onEdgesChange] = useEdgesState(defaultEdges)
  return (
  <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      // note: if we ever make money from this, we should remove this;
      // see: https://reactflow.dev/docs/guides/remove-attribution/
      proOptions={{ hideAttribution: true }}
    >
      <Controls />
    <Background />
  </ReactFlow>
  )
}
