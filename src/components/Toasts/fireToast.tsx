import React from 'react'
import {toast} from 'react-toastify'

interface ToastProps {
  content: string | React.ReactNode
  type?: 'error' | 'success' | 'warning' | 'info'
  style?: object
}

export const fireToast = ({type = 'success', content, style}: ToastProps) => {
  let formattedContent = content
  if (typeof formattedContent === 'string') {
    formattedContent = formattedContent.charAt(0)?.toUpperCase() + formattedContent.slice(1)
  }

  toast[type](formattedContent || type.charAt(0)?.toUpperCase() + type.slice(1), {
    style: {background: '#131313', ...style}
  })
}