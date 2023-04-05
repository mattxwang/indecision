import { useEffect, useRef } from 'react'

import { Network } from 'vis-network'
import type { Data, Edge } from 'vis-network'

import type { SddNode, SddWrapper } from '../util/sdd'
import { DEFAULT_TREE_OPTIONS as options } from '../util/vis'

interface Props {
  sdd: SddWrapper
}

function genSddNodesAndEdges (sdd: SddWrapper): Data {
  const { nodes } = sdd

  const ors = nodes.map((_, i) => ({ id: `or-${i}`, label: 'v' }))

  const ands = nodes.flatMap((ands, i) => {
    return ands.map((node, j) => {
      const { prime, sub } = node

      const getLabelForNode = (node: SddNode): string => {
        if (node === 'True') return 'T'
        if (node === 'False') return 'F'
        if ('Ptr' in node) return '*'

        const { label, polarity } = node.Literal
        return `${polarity ? '' : '!'}${label}`
      }

      return { id: `and-${i}-${j}`, label: `${getLabelForNode(prime)} | ${getLabelForNode(sub)}` }
    })
  })

  const orEdges = nodes.flatMap((ands, i) => {
    return ands.map((_, j) => {
      return {
        id: `edge-or-${i}-${j}`,
        from: `or-${i}`,
        to: `and-${i}-${j}`
      }
    })
  })

  const andEdges = nodes.flatMap((ands, i) => {
    return ands.flatMap((node, j) => {
      const { prime, sub } = node
      const addEdgeIfExists = (node: SddNode, isSub: boolean): Edge[] => {
        if (node === 'True' || node === 'False') return []
        if ('Literal' in node) return []

        const { compl, index } = node.Ptr
        return [{
          id: `edge-and-${i}-${j}`,
          from: `and-${i}-${j}`,
          to: `or-${index}`,
          dashes: isSub ? [5, 5] : false,
          color: compl ? 'red' : 'inherit'
        }]
      }

      return addEdgeIfExists(prime, false)
        .concat(addEdgeIfExists(sub, true))
    })
  })

  return {
    nodes: ors.concat(ands),
    edges: andEdges.concat(orEdges)
  }
}

export default function SddGraph ({ sdd }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageDownloadRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (containerRef.current === null) return

    const data: Data = genSddNodesAndEdges(sdd)

    const network = new Network(containerRef.current, data, options)
    network.on('afterDrawing', ctx => {
      if (imageDownloadRef.current === null) return
      imageDownloadRef.current.href = ctx.canvas.toDataURL()
    })

    return () => {
      network.destroy()
    }
  }, [containerRef, imageDownloadRef, sdd])
  return (
    <>
      <a className="btn btn-blue" href="#" ref={imageDownloadRef} download>save image</a>
      <div style={{ height: '700px', maxHeight: '100vh' }}>
        <div className="bg-white h-full mt-2" ref={containerRef}/>
      </div>
    </>
  )
}
