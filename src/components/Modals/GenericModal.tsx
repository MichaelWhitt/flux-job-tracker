import { useState, useCallback } from 'react'
import { Modal, ModalOverlay, ModalBody, ModalCloseButton } from '@mantine/core'

interface GenericModalProps<T> {
  title: string
  children: React.ReactNode
  trigger?: React.ReactNode
  initialIsOpen?: boolean
  onClose?: () => void
  showConfirm?: boolean
  confirmText?: string
}

const GenericModal = <T extends React.ReactNode>({
  title,
  children,
  trigger,
  initialIsOpen = false,
  onClose,
  showConfirm,
  confirmText
}: GenericModalProps<T>) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <div>
      {trigger ? (
        <button onClick={handleOpen}>{trigger}</button>
      ) : (
        <button onClick={handleOpen}>Open Modal</button>
      )}
      <Modal 
        opened={isOpen}
        onClose={handleClose}
        styles={{
            content: {
                background: '#111127',
                color: 'white'
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
          title={title}
        >
        <ModalBody>
          {children}
          {showConfirm && (
            <button 
              className='p-2 bg-green-600 hover:bg-red-400 rounded-md mt-2 ml-auto flex'
              onClick={handleClose}
          >
            {confirmText || 'Confirm'}
        </button>
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default GenericModal