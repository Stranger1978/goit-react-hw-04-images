import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import Style from './ImageGallery.module.css';
import PropTypes from 'prop-types';
export const ImageGallery = ({images, onClick}) => { 
        return (
            <ul className={Style.ImageGallery}>
            {images.map(image => (
                <ImageGalleryItem key={image.id}
                                  image={image}
                                  onClick={onClick}
                />
            ))}
            </ul>
        )
    }

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
