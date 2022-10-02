import React from 'react';
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
class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: '',
    isLoading: false,
    showModal: false,
    modalImageId: 0,
    loadMoreIsShown: false,
  };

  KEY = '29310891-e344a11b8695986423724ef53';
  BASE_URL = `https://pixabay.com/api/`;

  searchHandler = query => {
    this.setState({ query, images: [], page: 1 });
  };

  loadMoreHandler = () => {
    this.setState(prevState => {
      return {
        page: (prevState.page += 1),
      };
    });
  };

  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  openModal = id => {
    this.setState({ showModal: true, modalImageId: id });
    this.state.images.map(image => {
      if (image.id === id) {
        console.log(image.largeImageURL, id);

        return image;
      }
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      axios
        .get(this.BASE_URL, {
          params: {
            key: this.KEY,
            page: this.state.page,
            q: this.state.query,
            orientation: 'horizontal',
            per_page: 12,
            image_type: 'photo',
          },
        })
        .then(response => {
          if (response.status === 200) {
            if (this.state.page === 1) {
              this.setState({
                images: [...response.data.hits],
                isLoading: false,
              });
            } else {
              this.setState({
                images: [...prevState.images, ...response.data.hits],
                isLoading: false,
              });
            }
            console.log(this.state.images.length);
            this.state.images.length + 12 < response.data.totalHits
              ? this.setState({ loadMoreIsShown: true })
              : this.setState({ loadMoreIsShown: false });
          }
          if (response.data.totalHits === 0) {
            toast.error('There is no images for your request');
          }
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    }
  }

  render() {
    const { images, isLoading, showModal, modalImageId, loadMoreIsShown } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.searchHandler} />
        <ImageGallery>
          <ImageGalleryItem images={images} openModal={this.openModal} />
        </ImageGallery>
        {isLoading && <Loader />}
        {loadMoreIsShown && <Button onLoadMore={this.loadMoreHandler} />}
        {showModal && (
          <Modal
            images={images}
            closeModal={this.closeModal}
            id={modalImageId}
          />
        )}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default App;
