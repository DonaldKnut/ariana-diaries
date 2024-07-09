import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, modalOpen, setModalOpen }) => {
  return (
    <div>
      {modalOpen && (
        <div className="bg-black/50 fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className="max-h-[90%] md:max-w-lg overflow-auto flex flex-col items-end bg-[#5d5307] p-5">
              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl mb-3"
              >
                &times;
              </button>

              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
