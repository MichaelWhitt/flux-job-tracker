import React, {useState, useContext, KeyboardEventHandler} from 'react'
import { AppContext } from '../../auth/AppContext'
import { useAuth } from '../../auth/AppContext'
import { Button } from '../Buttons/Button'
import TextInput from '../Inputs/TextInput'
import { Link } from 'wouter'

interface LoginProps {

}

const Login = (props: LoginProps) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const appContext = useContext(AppContext)
  const {login} = useAuth() // Use the useAuth hook to access login function

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (appContext) {
      if (email && password) {
        if (e.type === 'keyup'&& (e as React.KeyboardEvent<HTMLButtonElement>)?.key === 'Enter') {
            login(email, password)
        } else if (e.type === 'click') {
            login(email, password)
        }
      }
    }
  }



  return (
    <div className='flex h-full flex-col items-center gap-5'>
      <h1 className='flex flex-col gap-1 text-center mb-0'>
        <span className='text-3xl'>Have an Account?</span>
        <span className='text-2xl'>Log In!</span>
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
            keyUpFire={(e: any) => handleLogin(e)}
        />
        <Button 
          onClick={(e) => handleLogin(e)}
        >
            Log in
        </Button>
        <Link to='/signup'>
            <div 
                className='flex gap-2 text-sm justify-center text-blue-600 cursor-pointer hover:bg-gray-800 p-2 rounded-md'
                onClick={props.setIsActive}
            >
            <span>Don't have an account?</span>
            <span className='underline'>It's free, get one here!</span>
            </div>
        </Link>
      </div>
    </div>
  )
}

export default Login
