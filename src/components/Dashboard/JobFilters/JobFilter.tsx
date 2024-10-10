import React, { useState } from 'react'

interface JobFilterProps<T> {
  filterType: string
  handleFilterChange: (type: string, value: string) => void
  filterKeys: T[]
  jobFilters: { [key: string]: Array<string> }
  filterLabel: string
  initialOpen?: boolean
}

const JobFilter = <T extends string>({
  filterType,
  handleFilterChange,
  filterKeys,
  jobFilters,
  filterLabel,
  initialOpen
}: JobFilterProps<T>) => {
  const [isOpen, setIsOpen] = useState(initialOpen || false)

  const toggleAccordion = () => setIsOpen(!isOpen)

  return (
    <div className='flex flex-col gap-2 sm:w-[350px]'>
      <div className='cursor-pointer hover:bg-slate-800 py-2' onClick={toggleAccordion}>
        <span className='text-xl'>{filterLabel}</span>
      </div>
      {isOpen && (
        <div className='flex flex-wrap gap-2'>
          {filterKeys.map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => handleFilterChange(filterType, filterKey)}
              className={`${
                jobFilters[filterType].includes(filterKey) ? 'bg-green-600' : 'bg-gray-700'
              } text-white hover:bg-green-500 h-[30px] w-fit p-2 rounded-md text-sm flex justify-center items-center`}
            >
              {filterKey}
            </button>
          ))}
        </div>
      )}
      <hr className='text-blue-100 h-[5px]' />
    </div>
  )
}

export default JobFilter