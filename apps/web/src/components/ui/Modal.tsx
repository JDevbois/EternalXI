import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  wide?: boolean
}

export function Modal({ open, onClose, title, children, wide = false }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={onClose}
          />
          <motion.div
            className={`relative bg-parchment border-2 border-ink shadow-card-lg flex flex-col ${wide ? 'w-full max-w-3xl' : 'w-full max-w-lg'} max-h-[90vh]`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b-2 border-ink bg-ink">
                <h2 className="font-display text-lg font-bold text-parchment">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-parchment hover:text-sepia text-2xl leading-none font-bold"
                >
                  ×
                </button>
              </div>
            )}
            <div className="overflow-y-auto flex-1 p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
