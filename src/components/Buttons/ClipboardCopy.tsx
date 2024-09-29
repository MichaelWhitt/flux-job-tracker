import { useState, useEffect} from 'react'
import { IconCopy, IconCopyCheck } from '@tabler/icons-react'
import { useClipboard } from '@mantine/hooks'

interface CopyClipboardProps {
    text?: string
    textClass?: string
}

const CopyClipboard = ({text = '', textClass} : CopyClipboardProps) => {

    const textClip = useClipboard({timeout: 1500})

    const copyEmail = (type: string) => {
        if (text) {
            textClip.copy(text)
        }
    }
    if (text) {
        return (
            <div className='flex all-center cursor-pointer' onClick={() => copyEmail('')}>
                <p className={textClass ? textClass : 'w-fit mr-2 p-1 mb-2 bg-bg3 text-white text-black font-semibold'}>
                    {text}
                </p>
                {!textClip.copied ? <IconCopy className='' /> : <IconCopyCheck className='text-green-400' />} 
            </div>
        )
    }
}

export default CopyClipboard