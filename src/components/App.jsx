import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import  Modal from './Modal/';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import  * as ImageApi  from '../services/api-search-images';
import 'react-toastify/dist/ReactToastify.css';

export function App() {

  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const per_page = 12;
 
  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setIsLoading(true);

    ImageApi.ImageApiService(searchValue, page)
        .then(({ hits, totalHits }) => {
            if (totalHits === 0) {
               return toast('Sorry, there are no images matching your search query. Please try again.');
            }
            if (page === 1) {
              toast(`Hooray! We found ${totalHits} images.`);    
            }
              setImages(prevImages => [...prevImages, ...hits]);
              setIsLoadMore(page < Math.ceil(totalHits / per_page));
            })
            .finally(() => {
              setIsLoading(false );
      });
  }, [searchValue, page]);

   
  const toggleModal = largeImage => {
    //maybe need change
    setLargeImage(largeImage);
    setShowModal(prevShowModal => !prevShowModal);
    
   }
  
  const onSubmitForm = value => {
    setImages([]);
    setPage(1);
    setIsLoading(true);
    setSearchValue(value);
  };
  
  const onLoadMore = () => { 
    setPage(prevPage => prevPage + 1);
    }

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}>
        <Searchbar onSubmit={onSubmitForm} />
        {showModal && <Modal onClose={toggleModal} largeImageURL={largeImage} />}
        {images && <ImageGallery images={images} onClick={toggleModal} />}
        {isLoadMore &&  <Button onClick={onLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer onClose={3000} />
      </div>
    );
  }