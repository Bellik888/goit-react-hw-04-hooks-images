import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }
  const handleClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleClickBackdrop}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
};
