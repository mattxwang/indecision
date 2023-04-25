import { useState } from 'react'

type Props = {
  varOrder: bigint[] | null
  setVarOrder: (varOrder: bigint[] | null) => void
}

type VarOrderTypes = 'default' | 'user'

export default function VarOrderSelect({
  varOrder,
  setVarOrder,
}: Props): JSX.Element {
  const [selectedOrder, setSelectedOrder] = useState<VarOrderTypes>('default')
  const [specifiedOrder, setSpecifiedOrder] = useState(
    varOrder === null ? '' : varOrder.join(', ')
  )

  const varOrderOptions: Array<{ label: string; value: string }> = [
    { label: 'default (linear)', value: 'default' },
    { label: 'specified', value: 'user' },
  ]

  const updateSpecifiedOrder = (raw: string): void => {
    if (raw.trim() === '') return
    const split = raw.split(',').map((s) => BigInt(Number(s) - 1))
    if (split.length === 0) return
    setVarOrder(split)
  }

  return (
    <>
      <div className="inline-block mr-2">
        <select
          value={selectedOrder}
          onChange={(e) => {
            const n = e.target.value as VarOrderTypes
            setSelectedOrder(n)
            setVarOrder(selectedOrder === 'user' ? [] : null)
          }}
          className="btn btn-blue w-full h-full"
        >
          {varOrderOptions.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {selectedOrder === 'user' && (
        <>
          <input
            value={specifiedOrder}
            onChange={(e) => {
              setSpecifiedOrder(e.target.value)
            }}
            placeholder="1, 3, 5, 2, 4"
            className="input mx-2"
          />
          <button
            className="btn btn-blue mx-2"
            onClick={() => {
              updateSpecifiedOrder(specifiedOrder)
            }}
          >
            set order
          </button>
        </>
      )}
    </>
  )
}
