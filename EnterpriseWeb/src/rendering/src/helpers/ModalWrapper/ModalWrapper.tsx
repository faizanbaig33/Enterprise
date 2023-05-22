import React, { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { SvgIcon } from '../SvgIcon';
import classNames from 'classnames';

export type ModalSize = 'extra-large' | 'large' | 'medium' | 'fluid';

interface ModalWrapperProps {
  size: ModalSize;
  modalLabel?: string;
  children: ReactNode;
  customWrapperClass?: string;
  handleClose: () => void;
}

const ModalWrapper = ({
  size = 'large',
  children,
  handleClose,
  modalLabel,
  customWrapperClass,
}: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add overflow-hidden class to the body when the modal is opened
    document.body.classList.add('overflow-hidden');
    // Remove overflow-hidden class from the body when the modal is closed
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
      modalRef.current?.addEventListener('keydown', handleKeyDown);
      return () => {
        modalRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
    return;
  }, [modalRef]);

  let modalSize: string;
  switch (size) {
    case 'extra-large':
      modalSize = 'w-screen h-screen';
      break;
    case 'large':
      modalSize = 'w-full md:w-[50vw] h-auto max-h-[540px] md:max-h-[680px]';
      break;
    case 'medium':
      modalSize = 'w-full md:w-[33vw] h-auto max-h-[540px] md:max-h-[540px]';
      break;
    case 'fluid':
      modalSize = 'w-auto h-auto max-w-[1200px]';
      break;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      id={modalLabel ?? ''}
      className={classNames(
        'fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black bg-opacity-75',
        customWrapperClass
      )}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label={modalLabel ?? ''}
      tabIndex={-1}
      ref={modalRef}
    >
      <div
        tabIndex={0}
        className={`bg-white ${modalSize} relative overflow-y-auto md:mx-auto ${
          size != 'extra-large' ? 'mx-4' : ''
        }`}
      >
        <div className="flex h-[40px] w-full justify-end">
          <button className="mt-m mr-m" onClick={handleClose}>
            <SvgIcon icon="close" size="lg" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
