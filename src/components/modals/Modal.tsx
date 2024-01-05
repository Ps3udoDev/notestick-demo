import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onChange: (OPEN: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onChange, title, description, children }) => {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0' />
        <Dialog.Content
          className='fixed drop-shadow-md border border-[#6f62e8] top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-auto md:max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-[#1c1d1f] p-[25px] focus:outline-none'
        >
          <Dialog.Title className='text-xl text-center font-bold mb-4 text-white'>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mb-5 text-sm leading-normal text-center text-white'>
            {description}
          </Dialog.Description>
          <div >
            {children}
          </div>
          <Dialog.Close asChild>
            <button className='text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none'>
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal;