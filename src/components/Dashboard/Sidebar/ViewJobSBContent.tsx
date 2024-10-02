import JobSidebar from './JobSidebar'
import {useState, useContext} from 'react'
import { formatDate, renderLocation } from '../../../utils/utils'
import { deletePublicJobEntry, deleteUserJobEntry } from '../../../utils/api'
import { AppContext } from '../../../auth/AppContext'
import { collection } from 'firebase/firestore'
import { db } from '../../../firebase-config'
import ConfirmationModal from '../../Modals/ConfirmationModal'
import CopyClipboard from '../../Buttons/ClipboardCopy'
import Loader from '../Loader'

interface ViewJobSBContentProps {
    job: JobEntry
}

const ViewJobSBContent = ({job}: ViewJobSBContentProps) => {
  const [sideBarOpen, setSidebarOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const globalContext = useContext(AppContext)
  const publicJobsCollection = collection(db, 'jobs')

  const deleteJob = async (id: string) => {
    if (globalContext?.user && globalContext?.isLoggedIn) {
      setIsDeleting(true)
      try {
        await deleteUserJobEntry(globalContext.user?.id, id)
        setSidebarOpen(false)
        setIsDeleting(false)
        globalContext?.getUserDataObj(globalContext.user?.id)
      } catch (e) {
        setIsDeleting(false)
      }
    } else {
      try {
        await deletePublicJobEntry(id)
        setSidebarOpen(false)
        setIsDeleting(false)
        globalContext?.getPublicJobs(publicJobsCollection)
      } catch (e) {
        setIsDeleting(false)
      }
    }
  }

  if (isDeleting) {
    return (
      <div className='bg-gray-900 p-6 text-gray-100 h-full'>
        <Loader />
      </div>
    )
  } else return (
      <div className='bg-gray-900 p-6 text-gray-100'>
        <ConfirmationModal 
          isOpen={isConfirmationModalOpen} 
          setIsOpen={setIsConfirmationModalOpen} 
          title='Are you sure?' 
          description='Removing this job will permanently delete it.'
          onConfirm={() => {
            if (job.meta_unid) {
              deleteJob(job.meta_unid)
            }
          }}
        />
        <JobSidebar job={job} type='edit' sidebarOpen={sideBarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='flex gap-2 w-fit ml-auto mb-4'>
          <button 
            className='flex bg-green-600 hover:bg-green-800 duration-500 p-2 w-[80px] items-center justify-center rounded-md'
            onClick={() => setSidebarOpen(true)}
          >
            Edit
          </button>
          <button 
            className='flex bg-red-600 hover:bg-red-800 duration-500 p-2 w-[80px] items-center justify-center rounded-md'
            onClick={() => setIsConfirmationModalOpen(true)}
          >
            Delete
          </button>
        </div>
        
        <h2 className='text-3xl font-bold mb-6 text-blue-400'>
          <div className='text-lg text-gray-400'>Company</div>
          <div className='bg-gray-800 p-2 rounded'>{job.company}</div>
          <div className='text-lg text-gray-400 mt-4'>Title</div>
          <div className='bg-gray-800 p-2 rounded'>{job.title}</div>
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4 text-blue-300'>Job Details</h3>
            <LabeledField label='Location' value={renderLocation(job.jobCountry, job.jobState, job.jobCity, job.jobRegion)} />
            <LabeledField label='Office Location' value={job.officeLocation} />
            <LabeledField label='Salary' value={job.salary ? `$${job.salary}` : null} />
            <LabeledField label='Job Level' value={job.jobLevel} />
            <LabeledField label='Employment Type' value={job.employmentType} />
          </div>
          
          <div className='bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4 text-blue-300'>Personal Assessment</h3>
            <LabeledField label='Interest Level' value={job.interestLevel} />
            <LabeledField label='Qualification Match' value={job.qualificationMatch} />
          </div>
          
          <div className='bg-gray-800 p-4 rounded-lg md:col-span-2'>
            <h3 className='text-lg font-semibold mb-4 text-blue-300'>Application Status</h3>
            <LabeledField label='Created Date' value={formatDate(job.createdDate || job.applicationDate, false, false)} />
            <LabeledField label='Last Updated Date' value={formatDate(job.lastUpdatedDate, false, false)} />
            <LabeledField label='Application Date' value={formatDate(job.applicationDate, false, false)} />
            <LabeledField label='Last Communication Date' value={formatDate(job.lastCommunication, false, false)} />
            <LabeledField label='Status' value={job.status} />
            <LabeledField label='Have Referral' value={job.haveReferral ? 'Yes' : 'No'} />
            <LabeledField label='Interview Round' value={job.interviewRound} />
          </div>
        </div>
        
        <div className='bg-gray-800 p-4 rounded-lg mb-6'>
          <h3 className='text-lg font-semibold mb-4 text-blue-300'>Contact Information</h3>
          <LabeledField label='Hiring Manager' value={job.hiringManager} />
          <div className='mb-2'>
            <div className='text-sm text-gray-400'>Hiring Manager Contact Info</div>
            <div className='flex items-center mt-1'>
                <div className='bg-gray-700 p-2 rounded flex-grow flex mr-auto'>
                  {job.hmContactInfo ? <CopyClipboard text={job.hmContactInfo} textClass='bg-none ml-2 flex mr-2'/> : '-'}
                </div>
            </div>
          </div>
        </div>
        
        <div className='bg-gray-800 p-4 rounded-lg mb-6'>
          <h3 className='text-lg font-semibold mb-4 text-blue-300'>Links</h3>
          <LabeledField 
            label='Job Link' 
            value={
              <a href={job.jobLink} target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>
                Job Link
              </a>
            } 
          />
          <LabeledField label='Application Site' value={job.applicationSite} />
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-lg font-semibold mb-4 text-blue-300'>Additional Information</h3>
          <LabeledField label='Offer Date' value={job.offerDate ? formatDate(job.offerDate, false, false) : null} />
          <LabeledField label='Skills' value={job.skills?.join(', ')} />
          <div className='mb-2'>
            <div className='text-sm text-gray-400 mb-1'>Notes</div>
            <pre className='bg-gray-700 p-2 rounded whitespace-pre-wrap break-words max-w-full'>{job.notes || '-'}</pre>
          </div>
          <div className='mb-2'>
            <div className='text-sm text-gray-400 mb-1'>Description</div>
            <pre className='bg-gray-700 p-2 rounded whitespace-pre-wrap break-words max-w-full'>{job.description || '-'}</pre>
          </div>
        </div>
    </div>
    )
}

const LabeledField = ({ label, value }: {label: string, value: string}) => (
  <div className='mb-2'>
    <div className='text-sm text-gray-400'>{label}</div>
    <div className='bg-gray-700 p-2 rounded mt-1'>{value || '-'}</div>
  </div>
);

export default ViewJobSBContent