import JobSidebar from './JobSidebar'
import {useState} from 'react'
import { formatDate } from '../../../utils/utils'

interface ViewJobSBContentProps {
    job: any
}

const ViewJobSBContent = ({job}: ViewJobSBContentProps) => {
  const [sideBarOpen, setSidebarOpen] = useState(false)
    return (
      <div className='bg-gray-900 p-6 text-gray-100'>
        <JobSidebar job={job} type='edit' sidebarOpen={sideBarOpen} setSidebarOpen={setSidebarOpen} />
        <button 
            className='ml-auto flex bg-green-600 hover:bg-green-800 duration-500 p-1 w-[60px] items-center justify-center rounded-md relative'
            onClick={() => setSidebarOpen(true)}
          >
            Edit
        </button>
        <h2 className='text-3xl font-bold mb-6 text-blue-400'>{job.company} - {job.title}</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-2 text-blue-300'>Company Details</h3>
            <p><span className='font-medium'>Company:</span> {job.company}</p>
            <p><span className='font-medium'>Location:</span> {job.location}</p>
            <p><span className='font-medium'>Salary:</span> ${job.salary}</p>
            <p><span className='font-medium'>Job Level:</span> {job.jobLevel}</p>
            <p><span className='font-medium'>Employment Type:</span> {job.employmentType}</p>
          </div>

                  
          <div className='bg-gray-800 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2 text-blue-300'>Personal Assessment</h3>
              <p><span className='font-medium'>Interest Level:</span> {job.interestLevel}</p>
              <p><span className='font-medium'>Qualification Level:</span> {job.qualificationLevel}</p>
          </div>
          
          <div className='bg-gray-800 p-4 rounded-lg sm:col-span-2'>
            <h3 className='text-lg font-semibold mb-2 text-blue-300'>Application Status</h3>
            <p><span className='font-medium'>Status:</span> {job.status}</p>
            <p><span className='font-medium'>Application Date:</span> {formatDate(job.applicationDate * 1000, false, false)}</p>
            <p><span className='font-medium'>Last Communication:</span> {formatDate(job.lastCommunication * 1000, false, false)}</p>
            <p><span className='font-medium'>Interview Round:</span> {job.interviewRound}</p>
          </div>
        </div>
        
        <div className='bg-gray-800 p-4 rounded-lg mb-6'>
          <h3 className='text-lg font-semibold mb-2 text-blue-300'>Contact Information</h3>
          <p><span className='font-medium'>Hiring Manager:</span> {job.hiringManager}</p>
          <p><span className='font-medium'>Hiring Manager Contact Info:</span> <a href={job.hmContactInfo} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Link</a></p>
        </div>
        

        
        <div className='bg-gray-800 p-4 rounded-lg mb-6'>
          <h3 className='text-lg font-semibold mb-2 text-blue-300'>Links</h3>
          <p><span className='font-medium'>Job Link:</span> <a href={job.jobLink} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Job Link</a></p>
          <p><span className='font-medium'>Application Site:</span> <a href={job.applicationSite} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>Site Link</a></p>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2 text-blue-300'>Additional Information</h3>
          <p><span className='font-medium'>Offer Date:</span> {job.offerDate || 'N/A'}</p>
          <p><span className='font-medium'>Skills:</span> {job.skills?.join(', ')}</p>
          <p><span className='font-medium'>Notes:</span> {job.notes}</p>
          <pre className='text-wrap'><span className='font-medium'>Description:</span> {job.description}</pre>
        </div>
      </div>
    )
}

export default ViewJobSBContent