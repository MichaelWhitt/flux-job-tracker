import { IconCoin } from '@tabler/icons-react'
import { Link } from 'wouter'
import { Button } from '../Buttons/Button'

interface NavLinkProps {

}

export function NavLink ({icon: Icon, label, active, linkURL, onClick, className, style, disabled}: NavLinkProps) {

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
          <Link to={'/subscribe'}>
            <Button onClick={onClick} className={`link ` + className} data-active={active || undefined} style={style}>
              <Icon style={{ width: 50, height: 50 }} stroke={2} />
            </Button>
          </Link>
      )
    } else {
      return (
        
          <Link to={linkURL || ''}>
            <Button onClick={onClick} className={`link ` + className} data-active={active || undefined} style={style}>
            <Icon style={{ width: 50, height: 50 }} stroke={2} />
            </Button>
          </Link>
      )
    }
  }