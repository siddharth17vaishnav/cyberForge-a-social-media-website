import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  width?: string
  hideclose?: boolean
}

export default function Modal({
  children,
  isOpen,
  title,
  onClose,
  width = '',
  hideclose = false
}: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogContent onClose={onClose} className={width} hideclose={hideclose}>
        <DialogHeader>
          <DialogTitle className="self-center">{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
