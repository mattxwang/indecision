import { useEffect, useRef } from 'react'

import { DataSet } from 'vis-data'
import { Network } from 'vis-network'
import type { Data } from 'vis-network'

import { BddSink, genBddNodesAndEdges } from '../util/bdd'
import type { BddWrapper } from '../util/bdd'
import { DEFAULT_TREE_OPTIONS as options } from '../util/vis'

interface Props {
  bdd: BddWrapper
}

function stringifyTarget (target: number | BddSink): string {
  if (target === BddSink.False) return 'false'
  if (target === BddSink.True) return 'true'
  return `node-${target}`
}

export default function BddGraph ({ bdd }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageDownloadRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (containerRef.current === null) return

    const { nodes, edges } = genBddNodesAndEdges(bdd)

    const data: Data = {
      nodes: new DataSet(nodes.map(node => {
        return ({
          id: stringifyTarget(node.index),
          label: `v${node.label}`
        })
      }).concat([
        { id: 'false', label: 'false' },
        { id: 'true', label: 'true' }
      ])),
      edges: new DataSet(edges.map(edge => {
        const { compl, source, target, type } = edge
        return {
          id: `${source}-${target}`,
          from: stringifyTarget(source),
          to: stringifyTarget(target),
          // label: type,
          dashes: type === 'low' ? [5, 5] : false,
          color: compl ? 'red' : 'inherit'
        }
      }))
    }

    const network = new Network(containerRef.current, data, options)
    network.on('afterDrawing', ctx => {
      if (imageDownloadRef.current === null) return
      imageDownloadRef.current.href = ctx.canvas.toDataURL()
    })

    return () => {
      network.destroy()
    }
  }, [containerRef, imageDownloadRef, bdd])
  return (
    <>
      <a className="btn btn-blue" href="#" ref={imageDownloadRef} download>save image</a>
      <div style={{ height: '700px', maxHeight: '100vh' }}>
        <div className="bg-white h-full mt-2" ref={containerRef}/>
      </div>
    </>
  )
}
