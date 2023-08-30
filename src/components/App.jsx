import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import  * as ImageApi  from '../services/api-search-images';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    showModal: false,
    searchValue: '',
    largeImg: '',
    page: 1,
    isLoadMore: false,
    isLoading: false,
  }
  
  componentDidUpdate(_, prevState) { 
        const { page, searchValue } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) { 
          this.setState({isLoading: true});
          this.fetchArticles(searchValue, page);
        }
    }  

  toggleModal = largeImage => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg: largeImage,
    }))
   }
  
  onSubmitForm = value => {
    this.setState({ images: [], page: 1, isLoading: true,  searchValue: value });
  };
  
  fetchArticles = () => {
    const { searchValue, page } = this.state;
    const per_page = 12;
  
    ImageApi.ImageApiService(searchValue, page)
        .then(({ hits, totalHits }) => {
            if (totalHits === 0) {
               return toast('Sorry, there are no images matching your search query. Please try again.');
            }
            if (page === 1) {
              toast(`Hooray! We found ${totalHits} images.`);    
            }
            this.setState(prevState => ({
              images: [...prevState.images, ...hits],
              isLoadMore: page < Math.ceil(totalHits / per_page),
            }))
            }).finally(() => {
              this.setState({ isLoading: false });
      });
     }
  
  onLoadMore = () => { 
    this.setState(prevState => ({
      page: prevState.page +1,
    }))
  }
     
  render() {
    const { showModal, largeImg, images, isLoadMore, isLoading } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}>
        <Searchbar onSubmit={this.onSubmitForm} />
        {showModal && <Modal onClose={this.toggleModal} largeImageURL={largeImg} />}
        {images && <ImageGallery images={this.state.images} onClick={this.toggleModal} />}
        {isLoadMore &&  <Button onClick={this.onLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer onClose={3000} />
      </div>
    );
  }
}