import { AiOutlineClose } from 'react-icons/ai';

type ModalProps = {
  children: any;
  width?: string;
  onClose: any;
};

const Modal = ({ children, width, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#7f7f7f57] outline-none focus:outline-none">
      <div className="relative my-6 mx-auto w-auto max-w-3xl">
        <div
          className={`relative flex w-[500px] flex-col rounded-md border-0 bg-white shadow-lg outline-none focus:outline-none`}
        >
          <div className="flex items-start justify-between rounded-t p-5">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
              <AiOutlineClose size={24} />
            </div>
          </div>
          <div className="relative flex-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
