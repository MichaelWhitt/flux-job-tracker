import JobListing from './JobListing.js'
import JobFilters from './JobFilters.js'
import { useState, useContext } from 'react'
import { AppContext } from '../../auth/AppContext.js'
import GenericModal from '../Modals/GenericModal.js'
import { isOnMobile } from '../../utils/utils.js'
import { IconFilter } from '@tabler/icons-react'
import SortJobs from './DashHeader/SortJobs.js'

interface DashboardProps {
  jobs: Array<JobEntry>
}

const Landing = (props: DashboardProps) => {
  const [originalJobs, setoriginalJobs] = useState<Array<JobEntry>>(props.jobs || [])
  const [jobFilters, setJobFilters] = useState<{
    [key: string]: Array<string>
  }>({
    applicationSite: [],
    interestLevel: [], 
    jobLevel: [],
    jobRegion: [],
    officeLocation: [],
    qualificationMatch: [], 
    status: [], 
  })

  const globalContext = useContext(AppContext)

  const hasAnyFilters = Object.values(jobFilters).some((filter) => filter.length > 0)
  const filterCount = Object.values(jobFilters).map((filter) => filter.length).reduce((a, b) => a + b, 0)

  // Filter jobs based on applied filters
  const filteredData = originalJobs.filter((job) => {
    const conditions : Array<boolean>= []

    // Check for status filter
    if (jobFilters.status.length > 0) {
      conditions.push(jobFilters.status.includes(job.status))
    }

    // Check for other filters with OR logic for each filter's entries
    for (const [filterType, filterValues] of Object.entries(jobFilters)) {
      if (filterValues.length > 0 && filterType !== 'status') {
        conditions.push(filterValues.some((filterValue) => job[filterType] === filterValue))
      }
    }

    // Return true if all conditions are met (AND logic for combined filters)
    return conditions.every((condition) => condition)
  })

  let dataToUse = originalJobs
  if (hasAnyFilters) {
    dataToUse = filteredData
  }

  const clearFilters = () => {
    setJobFilters({
        applicationSite: [],
        interestLevel: [], 
        jobLevel: [],
        jobRegion: [],
        officeLocation: [],
        qualificationMatch: [], 
        status: [], 
    })
  }

  return (
    <div className='p-2'>
      <>
        <h1 className='text-white font-bold text-3xl flex justify-center sm:mb-[100px] pt-5 sm:pt-0'>
          {globalContext?.isLoggedIn ? 'Dashboard' : 'Public Dashboard'}
        </h1>
        <div className='flex sm:min-w-3/4 w-4/5 m-auto sm:flex-row flex-col'>
            <div className='flex sm:flex-col'>
                {isOnMobile ? (
                    <GenericModal
                        title='Filters'
                        trigger={<IconFilter />}
                        showConfirm
                        confirmText='Apply Filters'
                    >
                        <JobFilters
                            filterCount={filterCount}
                            clearFilters={clearFilters}
                            originalJobs={dataToUse}
                            setOriginalJobs={setoriginalJobs}
                            setJobFilters={setJobFilters}
                            jobFilters={jobFilters}
                        />
                    </GenericModal>
                ) : (
                <div className='flex-shrink-0'>
                    <JobFilters
                        filterCount={filterCount}
                        clearFilters={clearFilters}
                        originalJobs={dataToUse}
                        setOriginalJobs={setoriginalJobs}
                        setJobFilters={setJobFilters}
                        jobFilters={jobFilters}
                    />
                </div>
            )}
            </div>
            
          
            <div className='flex-grow'>
                <JobListing originalJobs={dataToUse} />
            </div>
        </div>
      </>
    </div>
  )
}

export default Landing