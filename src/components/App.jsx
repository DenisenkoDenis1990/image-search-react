import { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageId, setModalImageId] = useState(0);
  const [loadMoreIsShown, setLoadMoreIsShown] = useState(false);

  const KEY = '29310891-e344a11b8695986423724ef53';
  const BASE_URL = `https://pixabay.com/api/`;

  const searchHandler = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setLoadMoreIsShown(false);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });
  }, []);

  const openModal = id => {
    setShowModal(true);
    setModalImageId(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    console.log(page, query);
    setIsLoading(true);

    axios
      .get(BASE_URL, {
        params: {
          key: KEY,
          page: page,
          q: query,
          orientation: 'horizontal',
          per_page: 12,
          image_type: 'photo',
        },
      })
      .then(response => {
        if (response.status === 200) {
          if (page === 1) {
            setImages([...response.data.hits]);
            setIsLoading(false);
          } else {
            setImages([...images, ...response.data.hits]);
            setIsLoading(false);
          }
          console.log(images.length);
          images.length + 12 < response.data.totalHits
            ? setLoadMoreIsShown(true)
            : setLoadMoreIsShown(false);
        }
        if (response.data.totalHits === 0) {
          toast.error('There is no images for your request');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={searchHandler} />
      <ImageGallery>
        <ImageGalleryItem images={images} openModal={openModal} />
      </ImageGallery>
      {isLoading && <Loader />}
      {loadMoreIsShown && <Button onLoadMore={loadMoreHandler} />}
      {showModal && (
        <Modal images={images} closeModal={closeModal} id={modalImageId} />
      )}
      {error && <div>{error}</div>}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
