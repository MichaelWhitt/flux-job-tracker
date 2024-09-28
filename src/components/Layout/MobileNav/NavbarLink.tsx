import React, { useState, useContext } from 'react'
import {Tooltip, UnstyledButton, Stack, rem, Dialog} from '@mantine/core'
import { IconCoin } from '@tabler/icons-react'
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconUser,
  IconSettings,
  IconLogout,
  IconListSearch,
  IconHistory
  
} from '@tabler/icons-react'
import { Link, useLocation } from 'wouter'
import {Button} from '../../Buttons/Button'
import { AppContext } from '../../../auth/AppContext'

interface NavbarLinkProps {
  icon: typeof IconHome2
  label: string
  linkURL?: string
  active?: boolean
  onClick?(): void
  className?: string
  style?: object
  disabled?: boolean
}

export function NavbarLink ({icon: Icon, label, active, linkURL, onClick, className, style, disabled}: NavbarLinkProps) {

  if (disabled) {
    const unsubLabel = (
      <div className='flex all-center gap-1'>
        <IconCoin color='green' />
        <span className='text-lg'>
          {' '+label + ' is a paid feature. Click to learn more.'}
        </span>
      </div>
    )

    return (
      <Tooltip label={unsubLabel} position='right' transitionProps={{duration: 0}} className='text-lg'>
        <Link to={'/subscribe'}>
          <UnstyledButton onClick={onClick} className={`link ` + className} data-active={active || undefined} style={style}>
            <Icon style={{ width: rem(30), height: rem(30) }} stroke={2}  />
          </UnstyledButton>
        </Link>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip label={label} position='right' transitionProps={{duration: 0}} className='text-lg'>
        <Link to={linkURL || ''}>
          <UnstyledButton onClick={onClick} className={`link ` + className} data-active={active || undefined} style={style}>
            <Icon style={{ width: rem(30), height: rem(30) }} stroke={2}  />
          </UnstyledButton>
        </Link>
      </Tooltip>
    )
  }
}