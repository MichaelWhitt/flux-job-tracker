import React from 'react'
import { Modal, Button } from '@mantine/core'

// TypeScript interface for props
interface ConfirmationModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void // Add setIsOpen as a prop
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) => {
  const handleClose = () => setIsOpen(false) // Function to close the modal

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={title || 'Are you sure?'}
      size='lg'
      centered
      styles={{
        content: {
            background: '#111127'
        },
        header: {
            background: '#111827',
        },
        title: {
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            fontWeight: 700,
            fontSize: 25
        }
      }}
    >
      <div className='text-white p-6 rounded-lg text-center'>
        <p>{description}</p>
        <div className='flex justify-center space-x-4 mt-4'>
          <Button 
            variant='filled' 
            color='red' 
            onClick={() => {
              onConfirm()
              handleClose()
            }}
          >
            {confirmLabel}
          </Button>
          <Button onClick={handleClose}>{cancelLabel}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
