import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow'

import type { Edge, Node } from 'reactflow'

import 'reactflow/dist/style.css'
import { BddSink, genBddNodesAndEdges } from '../util/bdd'
import type { BddWrapper, ConvertedBddEdge } from '../util/bdd'

const VERT_SPACE = 100
const HORZ_SPACE = 50

interface Props {
  bdd: BddWrapper
}

function generateGraphNode (node: {
  index: number
  label: number
}): Node<{ label: string }> {
  const { index, label } = node
  return ({
    id: stringifyTarget(index),
    position: {
      x: index * 5, // TODO: much better heuristic for this
      y: label * VERT_SPACE
    },
    data: { label: `Var(${label})` }
  })
}

function stringifyTarget (target: number | BddSink): string {
  if (target === BddSink.False) return 'false'
  if (target === BddSink.True) return 'true'
  return `node-${target}`
}

function generateGraphEdge (edge: ConvertedBddEdge): Edge {
  const { source, target } = edge
  return ({
    id: `${source}-${target}`,
    source: stringifyTarget(source),
    target: stringifyTarget(target),
    label: edge.type,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 10,
      width: 10
    },
    style: {
      strokeWidth: 2,
      stroke: edge.compl ? 'red' : 'black'
    }
  })
}

function generateGraphData (bdd: BddWrapper): { defaultNodes: Node[], defaultEdges: Edge[] } {
  const { nodes, edges } = genBddNodesAndEdges(bdd)

  const depth = Math.max(...nodes.map(node => node.label))

  return {
    defaultNodes: [
      { id: 'false', position: { x: -HORZ_SPACE, y: (depth + 1) * VERT_SPACE }, data: { label: 'false' } },
      { id: 'true', position: { x: HORZ_SPACE, y: (depth + 1) * VERT_SPACE }, data: { label: 'true' } }
    ].concat(nodes.map(generateGraphNode)),
    defaultEdges: edges.map(generateGraphEdge)
  }
}

export default function BddGraph ({ bdd }: Props): JSX.Element {
  const { defaultNodes, defaultEdges } = generateGraphData(bdd)

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
