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
        globalContext?.setSortOptions({...globalContext.sortOptions, sortType: t, sortMethod: m})
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