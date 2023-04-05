export type BddNode = {
  topvar: number
  low: BddLeaf | BddPtr
  high: BddLeaf | BddPtr
}

export type BddLeaf = 'True' | 'False'

export type BddPtr = {
  Ptr: {
    index: number
    compl: boolean
  }
}

export type BddWrapper = {
  nodes: BddNode[]
}

export enum BddSink {
  False = 'false',
  True = 'true',
}

export type ConvertedBdd = {
  nodes: Array<{
    index: number
    label: number
  }>
  edges: ConvertedBddEdge[]
}

type BddEdgeType = 'low' | 'high'

export type ConvertedBddEdge = {
  source: number
  target: number | BddSink
  type: BddEdgeType
  compl: boolean
}

function bddEdgeHelper (n: BddLeaf | BddPtr): BddSink | number {
  if (n === 'True') return BddSink.True
  if (n === 'False') return BddSink.False
  return n.Ptr.index
}

function bddComplHelper (n: BddLeaf | BddPtr): boolean {
  if (n === 'True' || n === 'False') return false
  return n.Ptr.compl
}

export function genBddNodesAndEdges (bddWrapper: BddWrapper): ConvertedBdd {
  const nodes = bddWrapper.nodes.map((node, index) => {
    return ({ index, label: node.topvar })
  })
  const edges = bddWrapper.nodes.flatMap((node, index) => {
    return [
      { source: index, target: bddEdgeHelper(node.low), type: 'low' as BddEdgeType, compl: bddComplHelper(node.low) },
      { source: index, target: bddEdgeHelper(node.high), type: 'high' as BddEdgeType, compl: bddComplHelper(node.high) }
    ]
  })
  return {
    nodes,
    edges
  }
}
