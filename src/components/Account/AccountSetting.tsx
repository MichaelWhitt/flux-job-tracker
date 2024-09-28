import {useState, useContext, useEffect} from 'react'
import {Button} from '../Buttons/Button'
import {TextInput, Select, MultiSelect} from '@mantine/core'
import { compressImageToBase64 } from '../../utils/utils'
import { AppContext } from '../../auth/AppContext'

interface SettingProps {
  field: string
  userObj: UserObject | null
  setFieldsToUpdate: ({ }: UserObject) => void
  fieldsToUpdate: UserObject
  label?: string
  className?: string
  disabled?: boolean
  handleSubmission?: () => void
}

const AccountSetting = (props: SettingProps) => {
  const {field, userObj, setFieldsToUpdate, fieldsToUpdate, label, className, disabled, handleSubmission} = props
  const [isEditingProfilePic, setisEditingProfilePic] = useState(false)
  const [profilePic, setProfilePic] = useState('')
  const appContext = useContext(AppContext)

  const handleOnChange = (e: string | {target: {value: string}}) => {
    if (typeof e === 'string') {
      let val : string | boolean = e
      if (e === 'true') {
        val = true
      } else if (e === 'false') {
        val = false
      }
      setFieldsToUpdate({...fieldsToUpdate, [field]: val})
    } else if (Array.isArray(e)) {
      setFieldsToUpdate({...fieldsToUpdate, [field]: e})
    } else {
      setFieldsToUpdate({...fieldsToUpdate, [field]: e.target.value})
    }
  }

  const handleEditProfilePic = async (e) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      const compressedBase64Image : string = await compressImageToBase64(selectedFile) as string
      if (compressedBase64Image !== appContext?.user?.profilePic) {
        setisEditingProfilePic(true)
        setFieldsToUpdate({...fieldsToUpdate, [field]: compressedBase64Image})
        setProfilePic(compressedBase64Image)
      } else {
        setisEditingProfilePic(false)
      }
    }
  }

  const renderSettingInfo = () => {
    let v = fieldsToUpdate[field] ?? ''
    if (v && Array.isArray(v)) {
      v = v
    } else if (String(v)) {
      v = String(v)
      v = v.toLowerCase()
    }
    if (userObj !== null) {
      if (field === 'profilePic' && (userObj?.profilePic || userObj?.profilePic === '')) {
        const picsAreSame = appContext?.user?.profilePic === profilePic
        return (
          <div className='relative ml-5'>
            <img
              src={profilePic || userObj.profilePic}
              className={`w-[120px] h-[120px] rounded-full outline outline-white` + className}
            />
            <label
              htmlFor={`fileInput`}
              aria-hidden
            >
              <input
                id={`fileInput`}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                multiple={false}
                onChange={handleEditProfilePic}
                />
            </label>
            {!isEditingProfilePic && <Button
              className='absolute bottom-0 left-[80px] text-black'
              type='filled'
              onClick={() => {
                if (document && document?.getElementById('fileInput')) {
                  document.getElementById('fileInput')?.click()
                }
              }}
            >
              Edit
            </Button>}
            {profilePic && !picsAreSame && isEditingProfilePic && (
              <Button
                className='absolute bottom-0 left-[-30px] bottom-[40px] text-black'
                type='success'
                onClick={() => {
                  if (handleSubmission) {
                    handleSubmission()  
                    setisEditingProfilePic(false)
                  }
              }}
            >
              Save
            </Button>
            )}
            {profilePic && !picsAreSame && isEditingProfilePic && (
              <Button
                className='absolute bottom-0 left-[80px] bottom-[40px] text-black'
                type='danger'
                onClick={() => {
                    if (userObj.profilePic) {
                        setProfilePic(userObj.profilePic)
                        setFieldsToUpdate({...fieldsToUpdate, [field]: userObj.profilePic})
                    }
                    const fileInput = document.getElementById('fileInput') as HTMLInputElement
                    fileInput.value = ''
                    setProfilePic(userObj.profilePic || '')
                    setisEditingProfilePic(false)
              }}
            >
              Cancel
            </Button>
            )}
          </div>
        )
      } else if (field === 'favTierLists') {
        const tierListOpts = [
          'Actors',
          'Anime',
          'Gaming',
          'Music',
          'Politics'
        ]
        return (
            <MultiSelect
              label={label}
              placeholder='Pick values'
              className={`col-span-2 w-full`}
              data={tierListOpts}
              hidePickedOptions
              maxValues={5}
              value={Array.isArray(v) ? v : []}
              onChange={handleOnChange}
              styles={{
                label: {minWidth: 185},
                input: {minWidth: 185}
              }}
            />
          
        )
      } else if (field === 'language') {
        const languageOpts = [
          'Arabic',
          'Cantonese',
          'Dutch',
          'English',
          'French',
          'German',
          'Hindi',
          'Italian',
          'Mandarin',
          'Portuguese',
          'Russian',
          'Spanish'
        ]
        return (
          <Select
            onChange={handleOnChange}
            value={v}
            label={label || field.charAt(0).toUpperCase() + field.slice(1)}
            className={`` + className}
            data={languageOpts.map(l => ({label: l, value: l.toLowerCase()}))}
            placeholder='Pick a value'
            disabled={disabled}
            styles={{
              label: {minWidth: 185},
              input: {width: 185},
              section: {width: 0}
            }}
          />
        )
      } else {
        return (
          <div className=''>
            {String(v) !== 'false' && String(v) !== 'true' ? (
              <TextInput
                onChange={handleOnChange}
                value={field === 'username' ? v || fieldsToUpdate['email'] : v}
                label={label || field.charAt(0).toUpperCase() + field.slice(1)}
                className={` ` + className}
                disabled={disabled}
                styles={{
                  label: {minWidth: 185},
                  input: {width: 185},
                  section: {width: 0}
                }}
              />
            ) : (
                <Select
                  onChange={handleOnChange}
                  value={v}
                  label={label || field.charAt(0).toUpperCase() + field.slice(1)}
                  className={`` + className}
                  data={[{label: 'True', value: 'true'}, {label: 'False', value: 'false'}]}
                  disabled={disabled}
                  placeholder='Pick a value'
                  styles={{
                    label: {minWidth: 185},
                    input: {width: 185},
                    section: {width: 0}
                  }}
                />
            )}
          </div>
        )
      }
    }
    
    return ('')
  }

  return (
    <>
      {renderSettingInfo()}
    </>
  )
}

export default AccountSetting