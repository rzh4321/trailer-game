import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: { top: number; left: number } | null;
  title: string;
  stickyTop: number;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  position,
  title,
  stickyTop,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    let timeoutId: number;

    if (isOpen) {
      setAnimate(true); // Set visibility to true for animation
      timeoutId = window.setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
      }, 0);
    } else {
      window.removeEventListener("click", handleOutsideClick);
      setAnimate(false);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen, onClose]);

  // Additional effect to log changes to animate state
  useEffect(() => {}, [animate]);

  if (!isOpen || !position) return null;

  return (
    <div
      ref={modalRef}
      // if stickyTop is not 64 (filter div is not sticky) then position should not be fixed
      className={`${stickyTop === 64 ? "fixed" : "absolute"} w-[375px] border flex items-center flex-col gap-8 z-[101] bg-white p-3 rounded-lg shadow-xl transition-transform duration-300 
      ${animate ? "animate-slideUp" : ""}`}
      style={{
        // top position depends on whether the filter div is currently sticky or not
        top: position.top + (stickyTop === 64 ? 15 : -49), // Start a few pixels below
        left: position.left,
      }}
    >
      <div className="flex w-full justify-center relative items-center">
        <span className="font-bold text-gray-600">{title}</span>
        <X
          onClick={onClose}
          className="hover:stroke-gray-700 cursor-pointer absolute right-1"
        />
      </div>
      {children}
    </div>
  );
};

export default Modal;
