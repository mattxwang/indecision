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

export type PrimitiveVTreeType =
  | 'LeftLinear'
  | 'RightLinear'
  | 'FromDTree'
  | 'FromDTreeMinFill'
  | 'FromDTreeLinear'
export type EvenSplit = { EvenSplit: number }
export type VTreeType = PrimitiveVTreeType | EvenSplit

function genVTreeLeaves(node: VTree): number[] {
  if ('Leaf' in node) return [node.Leaf]

  const l = genVTreeLeaves(node.Node.left)
  const r = genVTreeLeaves(node.Node.right)

  return l.concat(r)
}

function genVTreeInternalNodesAndEdges(
  node: VTree,
  path: string
): ConvertedVTree {
  if ('Leaf' in node) {
    return {
      nodes: [{ value: node.Leaf, label: `leaf-${node.Leaf}` }],
      edges: [],
    }
  }
  const l = genVTreeInternalNodesAndEdges(node.Node.left, `${path}l`)
  const r = genVTreeInternalNodesAndEdges(node.Node.right, `${path}r`)

  return {
    nodes: [{ label: path }]
      .concat(l.nodes.filter((node) => node.value === undefined))
      .concat(r.nodes.filter((node) => node.value === undefined)),
    edges: [
      {
        source: path,
        target: l.nodes[0].label,
      },
      {
        source: path,
        target: r.nodes[0].label,
      },
    ]
      .concat(l.edges)
      .concat(r.edges),
  }
}

export function genVTreeNodesAndEdges(
  node: VTree,
  path: string
): ConvertedVTree {
  const leaves = Array.from(new Set(genVTreeLeaves(node))).map((value) => ({
    value,
    label: `leaf-${value}`,
  }))
  const { nodes, edges } = genVTreeInternalNodesAndEdges(node, path)
  return {
    nodes: nodes.concat(leaves),
    edges,
  }
  // if ('Leaf' in node) {
  //   return {
  //     nodes: [{ value: node.Leaf, label: `leaf-${node.Leaf}` }],
  //     edges: [],
  //   }
  // }
  // const l = genVTreeNodesAndEdges(node.Node.left, `${path}l`)
  // const r = genVTreeNodesAndEdges(node.Node.right, `${path}r`)

  // return {
  //   nodes: [{ label: path }].concat(l.nodes).concat(r.nodes),
  //   edges: [
  //     {
  //       source: path,
  //       target: l.nodes[0].label,
  //     },
  //     {
  //       source: path,
  //       target: r.nodes[0].label,
  //     },
  //   ]
  //     .concat(l.edges)
  //     .concat(r.edges),
  // }
}
