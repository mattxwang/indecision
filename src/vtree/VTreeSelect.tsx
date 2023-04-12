import { useState } from 'react'
import type { PrimitiveVTreeType, VTreeType } from '../util/vtree'

type VTreeTypeLabels = PrimitiveVTreeType | 'EvenSplit'

type Props = {
  setVTreeType: (vtreeType: VTreeType) => void
}

export default function VTreeSelect({ setVTreeType }: Props): JSX.Element {
  const [selectedType, setSelectedType] =
    useState<VTreeTypeLabels>('RightLinear')
  const [numSplits, setNumSplits] = useState(1)

  const vtreeTypeOptions: Array<{ label: string; value: VTreeTypeLabels }> = [
    { label: 'Right Linear', value: 'RightLinear' },
    { label: 'Left Linear', value: 'LeftLinear' },
    { label: 'Even Split', value: 'EvenSplit' },
    { label: 'DTree (Min-Fill)', value: 'FromDTreeMinFill' },
    { label: 'DTree (Linear)', value: 'FromDTreeLinear' },
  ]

  return (
    <>
      <div className="inline-block mr-2">
        <select
          value={selectedType}
          onChange={(e) => {
            const n = e.target.value as VTreeTypeLabels
            setSelectedType(n)
            setVTreeType(n === 'EvenSplit' ? { EvenSplit: numSplits } : n)
          }}
          className="btn btn-blue w-full h-full"
        >
          {vtreeTypeOptions.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {selectedType === 'EvenSplit' && (
        <>
          num splits:{' '}
          <input
            value={numSplits}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (isNaN(val) || val < 0) return
              setNumSplits(val)
              setVTreeType(
                selectedType === 'EvenSplit' ? { EvenSplit: val } : selectedType
              )
            }}
            className="input"
            type="number"
          />
        </>
      )}
    </>
  )
}
