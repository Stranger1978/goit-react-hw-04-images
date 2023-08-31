import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL }) {

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);
  
    const handleBackDropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };
        return createPortal(
            <div className={Style.Overlay} onClick={handleBackDropClick}>
                <div className={Style.Modal}>
                <img src={largeImageURL} alt="" />
            </div>
            </div>,
            modalRoot
        );
    }
    
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}