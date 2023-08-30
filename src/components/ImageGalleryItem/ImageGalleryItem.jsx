import React from 'react';
import PropTypes from 'prop-types';
import Style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => { 
  const { webformatURL, tags, largeImageURL } = image;
  return (
    <li className={Style.ImageGalleryItem}>
    <img className={Style.ImageGalleryItemImage} src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL)} />
  </li>
)};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  onClick: PropTypes.func.isRequired,
};