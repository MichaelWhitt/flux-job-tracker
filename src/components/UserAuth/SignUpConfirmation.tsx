import { Link } from 'wouter'
import { AppContext } from '../../auth/AppContext'
import { useContext} from 'react'
import { Button } from '../Buttons/Button'
import CopyClipboard from '../Buttons/ClipboardCopy'

const SignUpConfirmation = () => {
    const appContext = useContext(AppContext)
    const email = appContext?.user?.email

    // bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-200% animate-gradient-rotate h-screen w-full
    return (
        <div className='min-h-screen all-center flex flex-col p-2 bg-swirl'>
            <div className='bg-gray-900 opacity-85 rounded-lg shadow-lg p-8 max-w-lg text-center'>
                <h1 className='text-4xl font-extrabold text-white mb-6'>Welcome to jTracker!</h1>
                <h2 className='text-2xl font-semibold text-gray-300 mb-4'>Getting Started</h2>

                <div className='space-y-4'>
                    <div className='bg-gray-800 p-4 rounded-lg shadow'>
                        <h3 className='text-xl font-bold text-white mb-2'>Verify your email</h3>
                        <p className='text-gray-300 mb-1'>Verify your email to ensure access to all of our primary features.</p>
                        <p className='text-gray-400'>Your Email:</p>
                        <CopyClipboard text={email} />
                        <p className='text-gray-400'>Our verification emails come from:</p>
                        <CopyClipboard text='noreply@myapp.com' />
                    </div>

                    <div className='bg-gray-800 p-4 rounded-lg shadow'>
                        <h3 className='text-xl font-bold text-white mb-2'>Browse our content</h3>
                        <p className='text-gray-400'>Check out our awesome content!</p>
                    </div>
                    <div className='bg-gray-800 p-4 rounded-lg shadow'>
                        <h3 className='text-xl font-bold text-white mb-2'>Premium membership</h3>
                        <p className='text-gray-400 text-xl'>Gain Access To:</p>
                        <ul className='text-left list-disc ml-5'>
                            <li className='text-cyan-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                            <li className='text-cyan-400 text-sm'>Lorem ipsum dolor sit amet.</li>
                            <li className='text-cyan-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, culpa.</li>
                            <li className='text-cyan- text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, quidem? Repellendus aperiam eum eius impedit!</li>
                        </ul>
                        
                        <Link to='/subscribe' className='mt-2 flex justify-center'>
                            <Button className='bg-swirl-btn outline' onClick={() => ''}>Details</Button>
                        </Link>
                        
                    </div>
                </div>

                <Link 
                    href='/landing'
                    className='mt-8 inline-block bg-swirl-btn outline ease text-white font-bold py-2 px-6 rounded-full'
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default SignUpConfirmation;
