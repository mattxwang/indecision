
export type VTreeLeaf = {
  Leaf: number
}

export type VTreeNode = {
  Node: {
    left: VTree
    right: VTree
  }
}

export type VTree = VTreeLeaf | VTreeNode

export type VTreeWrapper = {
  root: VTree
}

export type ConvertedVTree = {
  nodes: Array<{
    label: string
    value?: number
  }>
  edges: Array<{
    source: string
    target: string
  }>
}

export function genVTreeNodesAndEdges (node: VTree, path: string): ConvertedVTree {
  if ('Leaf' in node) {
    return ({
      nodes: [{ value: node.Leaf, label: `leaf-${node.Leaf}` }],
      edges: []
    })
  }
  const l = genVTreeNodesAndEdges(node.Node.left, `${path}l`)
  const r = genVTreeNodesAndEdges(node.Node.right, `${path}r`)

  return ({
    nodes: [{ label: path }].concat(l.nodes).concat(r.nodes),
    edges: [
      {
        source: path,
        target: l.nodes[0].label
      },
      {
        source: path,
        target: r.nodes[0].label
      }
    ].concat(l.edges).concat(r.edges)
  })
}
