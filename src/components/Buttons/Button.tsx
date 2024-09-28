import React from 'react'
import { mergeTWClasses } from '../../utils/utils'
import { Tooltip } from '@mantine/core'

interface ButtonProps {
  children: React.ReactNode[] | React.ReactNode | string
  onClick?: () => void
  className?: string
  type?: 'filled' | 'outline' | 'success' | 'danger'
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  tooltipText?: React.ReactNode[] | React.ReactNode | string
  disabled?: boolean
  disabledText?: string
  fit?: boolean
  onKeyDown?: (e: React.KeyboardEvent) => void
  style?: string
}

export function Button (props: ButtonProps) {

  const baseClass = ` text-lg text-white duration-500 rounded-sm w-fit px-2 py-1 all-center font-nunito font-bold`

  const getBgColor = () => {
    switch (props.type) {
      case 'filled':
        return 'bg-btn1 hover:bg-btn2' + ' ' + props.className
      case 'success':
        return 'bg-green-600 hover:bg-green-700' + ' ' + props.className
      case 'danger':
        return 'bg-red-600 hover:bg-red-700' + ' ' + props.className
      default:
        return 'outline outline-btn1 hover:outline-btnflip hover:bg-bg5' + ' ' + props.className
    }
  }

  const getClass = () => {
    if (props.disabled) {
      return mergeTWClasses(baseClass, 'bg-slate-900 cursor-not-allowed hover:outline-red-500')
    } else {
      return mergeTWClasses(baseClass, getBgColor())
    }
  }

    return (
      <Tooltip
        label={props.disabled && props.disabledText ? props.disabledText : props.tooltipText || ''}
        className={`${(props.disabled && !props.disabledText) || !props.tooltipText ? 'hidden' : ''}`}
        styles={{tooltip: {background: '#6a0dad', fontWeight: 600}}}
        position={props.tooltipPosition || 'top'}
      >
          <button
            className={getClass()}
            onClick={props.onClick}
            disabled={props.disabled}
            onKeyDown={props.onKeyDown}
          >
            {props.children || 'Click'}
          </button>

      </Tooltip>
    )
}