import { create } from "zustand";

interface InputModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const useInputModal = create<InputModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useInputModal
