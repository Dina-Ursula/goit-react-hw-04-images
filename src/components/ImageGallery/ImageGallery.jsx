import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';

const ImageGallery = ({ images, showModal }) => {
  return (
    <ImageGalleryStyled>
      {images.map((image, index) => (
        <ImageGalleryItem key={index} image={image} showModal={showModal} />
      ))}
    </ImageGalleryStyled>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
