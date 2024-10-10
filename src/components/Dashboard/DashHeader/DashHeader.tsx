import { IconPlus } from '@tabler/icons-react'
import SortJobs from './SortJobs'
import { isOnMobile } from '../../../utils/utils'

interface DashHeaderProps {
    sidebarOpen: boolean
    setSidebarOpen: (isOpen: boolean) => void
    filteredJobs: Array<JobEntry>
    originalJobs: Array<JobEntry>
}

const DashHeader = ({sidebarOpen, setSidebarOpen, filteredJobs, originalJobs}: DashHeaderProps) => {

    return (
        <div className='flex gap-3 w-full items-center mt-[20px] sm:mt-[-10px] flex-col'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-1 items-end sm:items-center w-full'>
                {!isOnMobile && (
                    <div className='col-span-2 sm:col-span-1'>
                        <SortJobs />
                    </div>
                )}
                
                <span className='flex text-gray-400 font-bold mr-auto'>
                    <span>
                        Total: {filteredJobs?.length || originalJobs.length} Job(s)
                    </span>
                </span>
                <button 
                    className='bg-cyan-400 text-gray-800 text-lg h-[40px] hover:bg-cyan-600 duration-500 rounded-md p-2 justify-center items-center flex ml-auto'
                    onClick={() => setSidebarOpen(true)}
                >
                    <IconPlus size={20} /> Add Job
                </button>
            </div>
            
        </div>
    )
}
export default DashHeader