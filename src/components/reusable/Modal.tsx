import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { cn } from '@/utils/shadcn-ui';

interface IModalProps {
  isOpen: boolean;
  onClose: (reloadData?: boolean) => void;
  size: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  description?: string;
  children: ReactNode;
  onOpenChange?: () => void;
  outsideDialogCloseable?: boolean;
}

const modalSizeClassNames = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-6xl',
};

const ModalFooter = ({
  children,
  showCloseButton = true,
  disableCloseButton = false,
}: PropsWithChildren & {
  showCloseButton?: boolean;
  disableCloseButton?: boolean;
}) => (
  <DialogFooter className="justify-end">
    {showCloseButton && (
      <DialogClose asChild>
        <Button disabled={disableCloseButton} type="button" variant="secondary">
          Cancel
        </Button>
      </DialogClose>
    )}
    {children}
  </DialogFooter>
);

const Modal = ({
  isOpen,
  onClose,
  size = 'sm',
  title,
  description,
  children,
  outsideDialogCloseable = true,
}: IModalProps) => (
  <Dialog
    open={isOpen}
    onOpenChange={() => {
      onClose();
    }}
  >
    <DialogContent
      className={cn(modalSizeClassNames[size], 'overflow-y-auto')}
      onInteractOutside={(e) => {
        !outsideDialogCloseable && e.preventDefault();
      }}
    >
      <DialogHeader>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

Modal.Footer = ModalFooter;

export { Modal };
