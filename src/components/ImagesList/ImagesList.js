import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { PixabayAPI } from '../../service/pixabayAPI';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23189092-912e167e41c5e7d499821c37e';
const newPixabayAPI = new PixabayAPI(BASE_URL, API_KEY);

export const ImagesList = ({ searchValue }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [largeImageId, setLargeImageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setStatus('pending');
    newPixabayAPI.resetPage();
    newPixabayAPI.searchQuery = searchValue;
    newPixabayAPI
      .searchPhotos()
      .then(result => {
        setSearchResults(result);
        setStatus('resolved');
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
  }, [searchValue]);

  const handleClick = () => {
    newPixabayAPI.page = 1;
    newPixabayAPI
      .searchPhotos()
      .then(result => {
        setSearchResults(prev => [...prev, ...result]);
        setStatus('resolved');
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(err => {
        console.log(err);
        setStatus('rejected');
      });
  };

  const findImg = () => {
    const largeImg = searchResults.find(result => {
      return result.id === largeImageId;
    });
    return largeImg;
  };

  const openModal = e => {
    setIsModalOpen(true);
    setLargeImageId(Number(e.currentTarget.id));
  };

  const closeModal = () => setIsModalOpen(false);

  const paramLoadMore = searchResults.length > 0 && searchResults.length >= 12;

  if (status === 'idle') {
    return (
      <div className="container-title">
        <p>You can find any pictures, photos and images here</p>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="loader">
        <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="container-title">
        <p>Uppps, error</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery>
          {searchResults.length > 0 && (
            <ImageGalleryItem
              openModal={openModal}
              searchResults={searchResults}
            />
          )}
        </ImageGallery>
        {paramLoadMore > 0 && <Button onClick={handleClick} />}
        {searchResults.length === 0 && (
          <div className="container-title">
            <p>Sorry, we did not find this</p>
          </div>
        )}
        {isModalOpen && (
          <Modal largeImageId={largeImageId} onClose={closeModal}>
            <img src={findImg().largeImageURL} alt={findImg().tags} />
          </Modal>
        )}
      </>
    );
  }
};

ImagesList.propTypes = {
  searchValue: PropTypes.string,
};
