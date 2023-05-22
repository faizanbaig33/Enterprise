import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

type modalContext = {
  selectedModalId: string;
  setSelectedModalId: Dispatch<SetStateAction<string>>;
  prevFocusedElementRef: MutableRefObject<HTMLButtonElement | null> | null;
};

const ModalIDContext = createContext<modalContext>({
  selectedModalId: '',
  setSelectedModalId: () => '',
  prevFocusedElementRef: null,
});

export const useModalIdContext = () => useContext(ModalIDContext);

export const ModalIdContextProvider = ({ children }: { children: ReactNode }) => {
  const prevFocusedElementRef = useRef(null);
  const [selectedModalId, setSelectedModalId] = useState<string>('');

  return (
    <ModalIDContext.Provider
      value={{
        selectedModalId,
        setSelectedModalId,
        prevFocusedElementRef,
      }}
    >
      {children}
    </ModalIDContext.Provider>
  );
};
