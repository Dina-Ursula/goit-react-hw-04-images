import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './Modal.styled';

function Modal({ image, closeModal }) {
  useEffect(() => {
    const onClose = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onClose);
    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [closeModal]);

  return (
    <Overlay onClick={closeModal}>
      <ModalStyled>
        <img src={image} alt="big mode" />
      </ModalStyled>
    </Overlay>
  );
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
