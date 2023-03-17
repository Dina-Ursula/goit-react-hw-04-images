import React, { useState, useEffect } from 'react';

import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { Container } from './App.styled';

const API_KEY = '32923977-2b8c4baca426f7e2e03c5661d';
function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);
  const [modal, setModal] = useState('');

  // state = {
  //   search: '',
  //   images: [],
  //   page: 1,
  //   pending: false,
  //   modal: '',
  // };

  const searchNewImage = async inputText => {
    setSearch(inputText);
    setPage(1);
    setPending(true);
    setImages([]);
  };

  const loadMoreButton = async () => {
    setPage(prevPage => prevPage + 1);
    setPending(true);
  };

  useEffect(() => {
    async function searchImage() {
      const resp = await fetch(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (!resp.ok) {
        throw new Error(`fetch failed`);
      }
      const body = await resp.json();
      const images = body.hits.map(el => {
        return {
          id: el.id,
          webformatURL: el.webformatURL,
          largeImageURL: el.largeImageURL,
        };
      });
      setImages(prevImages => [...prevImages, ...images]);
      setPending(false);
    }
    searchImage();
  }, [search, page]);

  // searchImage = async () => {
  //   const resp = await fetch(
  //     `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //   );
  //   if (!resp.ok) {
  //     throw new Error(`fetch failed`);
  //   }
  //   const body = await resp.json();
  //   return body.hits.map(el => {
  //     return {
  //       id: el.id,
  //       webformatURL: el.webformatURL,
  //       largeImageURL: el.largeImageURL,
  //     };
  //   });
  // };

  const showModal = imageId => {
    setModal(imageId);
  };

  const closeModal = () => {
    setModal('');
  };

  return (
    <Container>
      <Searchbar onSubmit={searchNewImage} />
      <ImageGallery images={images} showModal={showModal} />
      {images.length > 0 && <Button loadMore={loadMoreButton} />}
      {pending && <Loader />}
      {modal && <Modal image={modal} closeModal={closeModal} />}
    </Container>
  );
}

export default App;
