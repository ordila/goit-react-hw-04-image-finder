import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ onModalClose, modalData }) => {
  useEffect(() => {
    const onEscClose = () => {
      onModalClose();
    };
    document.addEventListener('keydown', onEscClose);

    return () => {
      document.romoveEventListener('keydown', onEscClose);
    };
  }, [onModalClose]);

  const onModalClick = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  return (
    <div className={css.overlay} onClick={onModalClick}>
      <div className={css.modal}>
        <img className={css.photo} src={modalData} alt="" />
      </div>
    </div>
  );
};

export default Modal;
