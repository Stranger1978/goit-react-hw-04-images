import React from 'react';
import Style from './Button.module.css';
import PropTypes from 'prop-types';


export const Button = ({ onClick }) => (
    <button type='button' className={Style.Button} onClick={() => onClick()}>Load more</button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}