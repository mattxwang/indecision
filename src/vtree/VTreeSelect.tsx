import { useState } from 'react'
import type { VTreeType } from '../util/vtree'

type VTreeTypeLabels = 'LeftLinear' | 'RightLinear' | 'EvenSplit' | 'FromDTree'

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
    { label: 'From DTree', value: 'FromDTree' },
  ]

  return (
    <>
      <div className="inline-block relative mr-2">
        <select
          value={selectedType}
          onChange={(e) => {
            const n = e.target.value as VTreeTypeLabels
            setSelectedType(n)
            setVTreeType(n === 'EvenSplit' ? { EvenSplit: numSplits } : n)
          }}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {vtreeTypeOptions.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
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
