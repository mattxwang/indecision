import type { Options } from 'vis-network'

export const DEFAULT_TREE_OPTIONS: Options = {
  nodes: {
    chosen: false,
    fixed: true,
    shape: 'circle',
    color: {
      border: 'black',
      background: 'white',
    },
  },
  edges: {
    arrows: 'to',
  },
  layout: {
    // note: the upstream type here is 'any
    hierarchical: {
      enabled: true,
      levelSeparation: 100,
      nodeSpacing: 100,
      shakeTowards: 'roots',
      sortMethod: 'directed',
    },
  },
}
