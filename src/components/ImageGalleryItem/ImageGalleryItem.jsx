import React from 'react';
import PropTypes from 'prop-types';

import {
  ImageGalleryItemStyled,
  GalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, showModal }) => {
  function clickEvent(evt) {
    evt.preventDefault();

    showModal(evt.currentTarget.dataset.url);
  }

  return (
    <ImageGalleryItemStyled
      key={image.id}
      data-url={image.largeImageURL}
      onClick={clickEvent}
    >
      <GalleryItemImage src={image.webformatURL} alt="" />
    </ImageGalleryItemStyled>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};
