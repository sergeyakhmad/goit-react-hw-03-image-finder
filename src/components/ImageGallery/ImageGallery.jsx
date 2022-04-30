import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import imageApi from '../../services/image-api';
import s from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    largeUrl: '',
    showModal: false,
    status: 'idle',
    // loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;

    if (prevProps.search !== search) {
      this.setState({ status: 'pending' });
      this.updateState();
      this.requestImage(search, page);
    }

    if (prevState.page !== page) {
      this.requestImage(search, page);
    }
  }

  updateState = () => {
    this.setState({ images: [], page: 1 });
  };

  // requestImage = (search, page) => {
  //   imageApi
  //     .fetchImage(search, page)
  //     .then(({ hits }) =>
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         status: 'resolved',
  //       }))
  //     )
  //     .catch(error => this.setState({ error, status: 'rejected' }));
  // };

  requestImage = (search, page) => {
    imageApi
      .fetchImage(search, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.error('Sorry, your search did not match anything');
          this.setState({ status: 'idle' });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onClickImg = e => {
    if (e.target.nodeName !== 'IMG') return;
    this.setState({ largeUrl: e.target.dataset.url });
  };

  render() {
    const { images, error, showModal, status, largeUrl } = this.state;

    if (status === 'idle') {
      return <h2 className={s.title}>Let's find some images</h2>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h2 className={s.title}>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeUrl} alt="" />
            </Modal>
          )}
          <ul className={s.gallery} onClick={this.onClickImg}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                openModal={this.toggleModal}
                largeImageURL={largeImageURL}
              />
            ))}
          </ul>
          {images.length > 0 && <Button onClick={this.loadMore} />}
        </>
      );
    }
  }
}
