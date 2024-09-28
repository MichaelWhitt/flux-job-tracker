import {useState, useContext} from 'react'
import { AppContext } from '../../auth/AppContext'
import { Button } from '../Buttons/Button'
import TextInput from '../Inputs/TextInput'
import { createAccountWithEmail } from '../../firebase-config'
import { Link, useLocation} from 'wouter'
import { isOnMobile } from '../../utils/utils'

interface SignUp {

}

const SignUp = (props: SignUp) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [_, navigate] = useLocation()
  const appContext = useContext(AppContext)

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (appContext) {
      if (e.type === 'keyup'&& (e as React.KeyboardEvent<HTMLButtonElement>).key === 'Enter') {
        await createAccountWithEmail(email, password)
      } else if (e.type === 'click') {
          await createAccountWithEmail(email, password)
      }
    }
  }



  return (
    <div className='flex h-full flex-col items-center gap-5'>
      <h1 className='flex flex-col gap-1 text-center mb-0'>
        <h2 className={`text-3xl font-semibold ${isOnMobile ? 'my-[20px]' : 'my-[50px]' }`}>Create a FREE account</h2>
        <div className='bg-gray-800 w-[350px] min-h-[200px] rounded-lg p-2 flex flex-col gap-2 justify-center'>
        <span className='before:content-["•"]'> Create, modify, and share job applications</span>
        <span className='before:content-["•"]'> Analyze job seeking habits</span>
        <span>...and much more!</span>
      </div>
      </h1>
      <div className='min-w-[320px] flex flex-col gap-3'>
        <TextInput 
            label='Email'
            value={email}
            onChange={(val) => {
                setEmail(val)
            }}
            focusOnLoad
        />
        <TextInput 
            label='Password'
            onChange={(val) => {
                setPassword(val)
            }}
            value={password} 
            type='password'
            keyUpFire={(e: any) => handleSignUp(e)}
        />
        <Button 
          onClick={(e) => handleSignUp(e)}
        >
            Sign Up
        </Button>
        <Link to='/login'>
            <div 
                className='flex gap-2 text-sm justify-center text-blue-600 cursor-pointer hover:bg-gray-800 p-2 rounded-md'
            >
            <span>Already have an account?</span>
            <span className='underline'>Click here to Login!</span>
            </div>
        </Link>
        
      </div>
    </div>
  )
}

export default SignUp
