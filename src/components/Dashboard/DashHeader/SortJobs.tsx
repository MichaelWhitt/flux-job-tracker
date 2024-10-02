import { IconSortAscending, IconSortDescending } from '@tabler/icons-react'
import { Menu } from '@mantine/core'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../../auth/AppContext'

interface SortJobsProps {

}

const SortJobs = (props: SortJobsProps) => {
    const globalContext = useContext(AppContext)
    const [opened, setOpened] = useState(false)
    const sortMethod = globalContext?.sortOptions.sortMethod
    const sortType = globalContext?.sortOptions.sortType
    console.log({old: globalContext?.publicJobs})

    const renderSortMethod = () => {
        if (sortType === 'asc') {
            return (
                <p className='flex gap-1'>
                    <IconSortAscending /><span>{sortMethod}</span>
                </p>
            )
        } else {
            return (
                <p className='flex gap-1'>
                    <IconSortDescending /><span>{sortMethod}</span>
                </p>
            )
        }
    }

    const sortByFn = (m: string, t: string) => {
        let newJs = []
        const sortJs = (njs: JobEntry[]) => {
            njs.sort((a, b) => {
                if (t === 'asc') {
                    switch (m) {
                        case 'Created Date':
                            if (a.createdDate && b.createdDate) {
                                return a.createdDate.seconds - b.createdDate.seconds
                            }
                            break
                        case 'Last Comms':
                            if (a.lastCommunication  && b.lastCommunication ) {
                                return a.lastCommunication.seconds - b.lastCommunication.seconds
                            }
                            break
                        case 'Last Updated':
                            if (a.lastUpdatedDate  && b.lastUpdatedDate ) {
                                return a.lastUpdatedDate.seconds - b.lastUpdatedDate.seconds
                            }
                            break
                        case 'Application Date':
                            if (a.applicationDate  && b.applicationDate ) {
                                return a.applicationDate.seconds - b.applicationDate.seconds
                            }
                            break
                        case 'Offer Date':
                            if (a.offerDate  && b.offerDate ) {
                                return a.offerDate.seconds - b.offerDate.seconds
                            }
                            break
                    }
                } else if (t === 'dsc') {
                    switch (m) {
                        case 'Created Date':
                            if (a.createdDate  && b.createdDate ) {
                                return b.createdDate.seconds - a.createdDate.seconds
                            }
                            break
                        case 'Last Comms':
                            if (a.lastCommunication  && b.lastCommunication ) {
                                return b.lastCommunication.seconds - a.lastCommunication.seconds
                            }
                            break
                        case 'Last Updated':
                            if (a.lastUpdatedDate  && b.lastUpdatedDate ) {
                                return b.lastUpdatedDate.seconds - a.lastUpdatedDate.seconds
                            }
                            break
                        case 'Application Date':
                            if (a.applicationDate  && b.applicationDate ) {
                                return b.applicationDate.seconds - a.applicationDate.seconds
                            }
                            break
                        case 'Offer Date':
                            if (a.offerDate  && b.offerDate ) {
                                return b.offerDate.seconds - a.offerDate.seconds
                            }
                            break
                    }
                }
                return 0 // Return 0 if no conditions matched (to keep original order)
            })
        }
    
        if (globalContext?.isLoggedIn && globalContext?.user?.jobs) {
            const newJs = structuredClone(globalContext.user.jobs)
            sortJs(newJs)
    
            // Update global context
            globalContext.setUser({ ...globalContext.user, jobs: newJs})
            globalContext?.setSortOptions({...globalContext.sortOptions, sortType: t, sortMethod: m})
        } else if (globalContext?.publicJobs && !globalContext?.isLoggedIn) {
            const newPublicJobs = structuredClone(globalContext?.publicJobs || [])
            sortJs(newPublicJobs)
            globalContext?.setPublicJobs(newPublicJobs)
            globalContext?.setSortOptions({...globalContext.sortOptions, sortType: t, sortMethod: m})
        }
    }
    

    return (
        <div className='flex gap-3 w-fit items-center'>
            
            <Menu 
                opened={opened} 
                onChange={setOpened} 
                shadow='md' 
                classNames={{
                    dropdown: 'sort-jobs-dropdown',
                    item: 'sort-jobs-item',
                    label: 'sort-jobs-label'
                }}
            >
                <Menu.Target>
                    <span 
                        className='flex gap-1 bg-btn1 py-2 px-1 rounded-md cursor-pointer hover:bg-btn2 duration-500 min-w-[150px]' 
                        onClick={() => setOpened(true)}
                    >
                        {renderSortMethod()}
                    </span>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>
                        Sort By
                    </Menu.Label>
                    <Menu.Item leftSection={<IconSortAscending />} onClick={() => sortByFn('Created Date', 'asc')}>
                        Created Date
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortDescending />} onClick={() => sortByFn('Created Date', 'dsc')}>
                        Created Date
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortAscending />} onClick={() => sortByFn('Last Comms', 'asc')}>
                        Last Communication
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortDescending />} onClick={() => sortByFn('Last Comms', 'dsc')}>
                        Last Communication
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortAscending />} onClick={() => sortByFn('Last Updated', 'asc')}>
                         Last Updated
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortDescending />} onClick={() => sortByFn('Last Updated', 'dsc')}>
                         Last Updated
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortAscending />} onClick={() => sortByFn('Application Date', 'asc')}>
                         Application Date
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortDescending />} onClick={() => sortByFn('Application Date', 'dsc')}>
                         Application Date
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortAscending />} onClick={() => sortByFn('Offer Date', 'asc')}>
                        Offer Date
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSortDescending />} onClick={() => sortByFn('Offer Date', 'dsc')}>
                        Offer Date
                    </Menu.Item>
                    
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}
export default SortJobs