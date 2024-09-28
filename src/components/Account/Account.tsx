import React, {useState, useContext, useEffect} from 'react'
import { AppContext } from '../../auth/AppContext'
import Setting from './AccountSetting'
import {SimpleGrid, Stack} from '@mantine/core'
import {Button} from '../Buttons/Button'
import {updateUserFields} from '../../utils/api'
import { fireToast } from '../Toasts/fireToast'

const Settings: React.FC = () => {
  const globalContext = useContext(AppContext)
  const userObj = globalContext?.user || {email: '', id: ''}
  const [fieldsToUpdate, setFieldsToUpdate] = useState<UserObject>({
    email: '',
    id: ''
  })

  useEffect(() => {
    if (userObj !== null && userObj !== undefined && 'id' in userObj) {
      setFieldsToUpdate(userObj)
    }
  }, [userObj])

  const handleSubmission = () => {
    if (fieldsToUpdate) {
      updateUserFields(userObj.id, fieldsToUpdate).then(x => {
        if (x) {
          globalContext?.getUserDataObj(userObj.id) // refresh global user context data
          fireToast({content: 'Profile successfully updated'})
        }
      }).catch(e => {
        if (e) {
          fireToast({type: 'error', content: 'Failed to update profile'})
        }
      })
    }
  }

  const settingsObjsAreSame = () => {
    const dbObj = userObj
    const stateObj = fieldsToUpdate
    let favJobsMatch = false
    if (Object.keys(dbObj)?.length === Object.keys(stateObj)?.length) {
      // check favGenre entries
      // stringify everything but favJobs
      if (dbObj.favJobs?.length && stateObj.favJobs?.length && dbObj.favJobs?.length === stateObj.favJobs?.length) {
        if (stateObj !== null && stateObj !== undefined) {
          favJobsMatch = dbObj.favJobs.every((el: string) => stateObj.favJobs?.includes(el)) && stateObj.favJobs.every((el: string) => dbObj.favJobs?.includes(el))
        }
        // arrays contain same options in any order
      }
      if (favJobsMatch) {
        const dbObjClone = structuredClone(dbObj)
        const stateObjClone = structuredClone(stateObj)
        delete dbObjClone.favJobs
        delete stateObjClone.favJobs
        delete dbObjClone.profilePic
        delete stateObjClone.profilePic
        return JSON.stringify(dbObjClone) === JSON.stringify(stateObjClone)
      }
      return false
    }
  }

  const renderFields = () => {
    return (
      <Stack className=''>
        <SimpleGrid
          className=' mt-[40px] grid-cols-1 sm:grid-cols-2'
        >
            <h3 className='mb-0 p-0 ml-[-15px] text-2xl'>
              General Settings
            </h3>
          <SimpleGrid
            cols={{base: 1, sm: 2, md: 3}} 
            spacing={'sm'} 
            className=' ml-5 bg-bg3 p-5 rounded-md'
          >
            <Setting field={'profilePic'} label='Profile Pic' userObj={userObj} fieldsToUpdate={fieldsToUpdate} setFieldsToUpdate={setFieldsToUpdate} handleSubmission={handleSubmission} />
            <Setting field={'email'} userObj={userObj} fieldsToUpdate={fieldsToUpdate} setFieldsToUpdate={setFieldsToUpdate} label={'Email'} disabled />
            <Setting field={'username'} userObj={userObj} fieldsToUpdate={fieldsToUpdate} setFieldsToUpdate={setFieldsToUpdate} label={'Username'} disabled />
            <Setting field={'darkMode'} userObj={userObj} fieldsToUpdate={fieldsToUpdate} setFieldsToUpdate={setFieldsToUpdate} label={'Dark Mode'} disabled />
            <Setting field={'notifications'} userObj={userObj} fieldsToUpdate={fieldsToUpdate} setFieldsToUpdate={setFieldsToUpdate} label={'Allow Notifications'} />
            <Setting field={'language'} userObj={userObj} fieldsToUpdate={fieldsToUpdate} setFieldsToUpdate={setFieldsToUpdate} label={'Language Preference'} />
            
          </SimpleGrid>
          <h3 className='mb-0 p-0 ml-[-15px] text-2xl'>
            App Settings
          </h3>
          <SimpleGrid
            cols={{base: 1, sm: 2, md: 3}} 
            spacing={'sm'} 
            className=' ml-5 bg-bg3 p-5 rounded-md'   
          >
            Coming Soon!
          </SimpleGrid>
        </SimpleGrid>
      </Stack>
    )
  }

  if (userObj !== null && userObj !== undefined) {
    return (
      <main className='p-[40px]'>
        <h1 className='h-[40px] all-center text-4xl font-nunito font-bold'>
          Settings
        </h1>
        {renderFields()}
        <SimpleGrid className='mt-5'>
          <Button
            className='w-[150px] text-black ml-5'
            onClick={handleSubmission}
            disabled={settingsObjsAreSame()}
          >
            Save Profile
          </Button>
        </SimpleGrid>
      </main>
    )
  }
  
}

export default Settings
