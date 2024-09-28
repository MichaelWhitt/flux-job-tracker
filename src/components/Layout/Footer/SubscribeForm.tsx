import { useEffect, useRef, useState, useContext } from 'react'
import { sendEmail } from '../../../utils/api'
import { Button } from '../../Buttons/Button'
import Reaptcha from 'reaptcha'
import { fireToast } from '../../Toasts/fireToast'
import { AppContext } from '../../../auth/AppContext'

const SubscribeForm = (props) => {
  const form = useRef()
  const captchaRef = useRef()
  const [subbed, setSubbed] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const [email, setEmail] = useState('')
  const [hiddenCap, setHiddenCap] = useState(true)
  const appContext = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHiddenCap(false)
    console.log(captchaRef, captchaToken, email, form.current)
    if (captchaToken && email.includes('.')) {
      const res = await sendEmail(form.current, e)
      if (res && res.status === 200) {
        setSubbed(true)
        fireToast({content: 'Subscribed Successfully. Check your email', type: 'success'})
        setCaptchaToken('')
      } else {
        setSubbed(true)
        fireToast({content:'Failed to subscribe. Please email us at mwhittdev@gmail.com', type: 'error'})
      }
    } else if (!captchaToken){
        fireToast({content:'Please complete reCAPTCHA', type: 'error'})
    } else if (!email || !email.includes('.')) {
        fireToast({content:'Please enter a valid email address', type: 'error'})
    }
  }

  useEffect(() => {
    if (captchaToken) {
      setTimeout(() => {
        setCaptchaToken('')
      }, 55000)
    }
  }, [captchaToken])

  useEffect(() => {
    if (subbed) {
      setTimeout(() => {
        setSubbed(false)
        setEmail('')
      }, 5000)
    }
  }, [subbed])

  const verify = () => {
    if (captchaRef.current) {
      captchaRef.current?.getResponse().then(res => {
        setCaptchaToken(res)
      })
    }
  }

  return (
    <form ref={form} onSubmit={handleSubmit} className=''>
      {!hiddenCap && <div className='w-full justify-center flex'>
        <Reaptcha sitekey={'6LcGajYqAAAAAKbOA3z6gvY3-mwEsi_S9KkJ23nz'} ref={captchaRef} onVerify={verify} />
      </div>}
      {!subbed &&
        <div className={`flex ${props.class} gap-2 text-black justify-center items-center`}>
            <input type='email' className='rounded-md h-[35px] p-2 min-w-[20px]' placeholder='Your Email' name='to_email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button className='h-[35px]' onClick={() => ''}>
                Subscribe
            </Button>
        </div>
      }
      
    </form>
  )
}

export default SubscribeForm