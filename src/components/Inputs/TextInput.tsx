import { useState, useRef, useEffect, KeyboardEventHandler } from 'react'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'

interface TextInputProps {
    label: string
    value: string
    className?: string
    disabled?: boolean
    onChange?: (v: string) => void
    type?: string
    keyUpFire?: (e: any) => void
    focusOnLoad?: boolean
}

const TextInput = (props: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      if (props.focusOnLoad && inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    const getClass = () => {
        const baseClasses = 'text-lg focus:outline-none duration-500 rounded-md h-[40px] p-2 all-center font-semibold bg-bg3'
        const additionalClasses = props.disabled 
          ? 'bg-slate-900 cursor-not-allowed hover:bg-slate-900 hover:border-red-500' 
          : `${props.className || ''}`
        return `${baseClasses} ${additionalClasses}`
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(e.target.value) 
        }
    }

    const getType = () => {
        if (props.type === 'password') {
            return !showPassword ? 'password' : 'text'
        }
        return 'text'
    }

    return (
        <div className='flex flex-col relative'>
            <label className='mb-2 font-semibold hidden' htmlFor={props.label}>
                {props.label}
            </label>
            <input 
                id={props.label}
                className={getClass()} 
                placeholder={props.label || ''} 
                value={props.value} 
                onChange={handleChange}
                onKeyUp={props.keyUpFire}
                disabled={props.disabled}
                type={getType()}
                ref={inputRef}
            />
            {props.value && props.type === 'password' && (
                <div className='absolute w-0 h-0 z-50'>
                    {showPassword ? <IconEye 
                        className='hover:cursor-pointer ease-in-out duration-300 text-black text-bg10' 
                        style={{width: 40, height: 40, position: 'absolute', left: 260}}
                        onClick={() => setShowPassword(!showPassword)}
                    /> :
                    <IconEyeClosed 
                        className='hover:cursor-pointer ease-in-out duration-300 text-bg10' 
                        style={{width: 40, height: 40, position: 'absolute', left: 260}}
                        onClick={() => setShowPassword(!showPassword)}
                    />}
                </div>
            )}
        </div>
    )
}

export default TextInput
