import JobListing from './JobListing.js'
import JobFilters from './JobFilters.js'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../auth/AppContext.js'

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

    // useEffect(() => {
    //     if (!originalJobs.length && props.jobs?.length) {
    //         setoriginalJobs(props.jobs)
    //     }
    // }, [props.jobs])

    const filteredData = originalJobs.filter(job => {   
        
        // need to build AND OR clause, because region filters work together but you can have rejected (11 jobs) and North America (65 jobs)
        // as part of the same result
        
        return (
            (jobFilters.status.includes(job.status)) ||
            (jobFilters.jobRegion.includes(job.jobRegion)) ||
            (jobFilters.applicationSite.includes(job?.applicationSite)) ||
            (jobFilters.jobLevel.includes(job?.jobLevel)) ||
            (jobFilters.qualificationMatch.includes(job?.qualificationMatch)) ||
            (jobFilters.officeLocation.includes(job.officeLocation))
          )
    })

    console.log({filteredData, originalJobs})

    let dataToUse = originalJobs
    const hasFilters = Object.keys(jobFilters).map(filter => jobFilters[filter].length).reduce((a,b) => a + b, 0)
    if (hasFilters) {
        dataToUse = filteredData
    }


    return (
        <div className='p-2'>
                <>
                    <h1 className='text-white font-bold text-3xl flex justify-center sm:mb-[100px] pt-5 sm:pt-0'>
                        {globalContext?.isLoggedIn ? 'Dashboard' : 'Public Dashboard'}
                    </h1>
                    <div className='flex sm:min-w-3/4 w-4/5 m-auto sm:flex-row flex-col'>
                        <div className='flex-shrink-0'> {/* Prevents JobFilters from shrinking */}
                            <JobFilters originalJobs={dataToUse} setOriginalJobs={setoriginalJobs} setJobFilters={setJobFilters} jobFilters={jobFilters} />
                        </div>
                        <div className='flex-grow'> {/* Allows JobListing to take the remaining space */}
                            <JobListing originalJobs={dataToUse} />
                        </div>
                    </div>
                </>
        </div>
    )
}

export default Landing
