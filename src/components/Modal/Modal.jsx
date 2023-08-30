import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() { 
        window.addEventListener('keydown', this.handleKeyDown);
    };
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackDropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
     }
    render() { 
        const { largeImageURL } = this.props;

        return createPortal(
            <div className={Style.Overlay} onClick={this.handleBackDropClick}>
                <div className={Style.Modal}>
                <img src={largeImageURL} alt="" />
            </div>
            </div>,
            modalRoot,
        );
    }
}
    
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}