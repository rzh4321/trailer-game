import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: { top: number; left: number } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, position }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    let timeoutId: number;

    if (isOpen) {
        setIsVisible(true); // Set visibility to true for animation
        timeoutId = window.setTimeout(() => {
          window.addEventListener('click', handleOutsideClick);
        }, 0);
      } else {
        window.removeEventListener('click', handleOutsideClick);
        setIsVisible(false); // Set visibility to false to hide the modal

      }
  
      return () => {
        window.removeEventListener('click', handleOutsideClick);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed w-[375px] border flex items-center flex-col gap-8 z-[101] bg-white p-3 rounded-lg shadow-xl transition-transform duration-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-10'}`}
      style={{
        top: position.top + 15,
        left: position.left,
      }}
    >
        <div className='flex w-full justify-center relative items-center'>
            <span className='font-bold'>SORT</span>
            <Button
                className="bg-transparent hover:bg-transparent hover:text-gray-700 py-0 absolute right-0 text-gray-900 border-none"
                onClick={onClose}
            >
                X
            </Button>
        </div>
      {children}
    </div>
  );
};

export default Modal;