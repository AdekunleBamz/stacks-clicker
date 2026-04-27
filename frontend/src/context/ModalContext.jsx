import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext(null);

/**
 * Modal Provider to manage global modal states and data.
 */
export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openModal = useCallback((type, data = null) => {
    setActiveModal(type);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  const value = useMemo(() => ({
    activeModal,
    modalData,
    openModal,
    closeModal,
    isOpen: (type) => activeModal === type,
  }), [activeModal, modalData, openModal, closeModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook to interact with the global modal system.
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
