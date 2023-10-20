import { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import css from './styles.module.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import 'basiclightbox/dist/basicLightbox.min.css';
import { requestPosts } from 'services/api';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState({ modalOpen: false, modalData: null });

  useEffect(() => {
    if (page === 1 && inputValue === '') {
      return;
    }
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const response = await requestPosts(inputValue, page);
        setPosts(prevPosts => {
          return page > 1
            ? [...prevPosts, ...response.hits]
            : [...response.hits];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [inputValue, page]);

  const onFormSubmit = inputValue => {
    setInputValue(inputValue);
  };

  const onModalOpen = imageUrl => {
    setModal({ modalOpen: true, modalData: imageUrl });
  };

  const onButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onModalClose = () => {
    setModal({ modalOpen: false });
  };

  return (
    <div className={css.App}>
      <Searchbar onFormSubmit={onFormSubmit} />
      {inputValue && <ImageGallery onModalOpen={onModalOpen} posts={posts} />}

      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
          />
        </div>
      )}

      {posts.length > 1 && <Button onButtonClick={onButtonClick} />}
      {modal.modalOpen && (
        <Modal onModalClose={onModalClose} modalData={modal.modalData} />
      )}
    </div>
  );
}

export default App;
