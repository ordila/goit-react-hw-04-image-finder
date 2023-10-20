import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGalery.module.css';

const ImageGallery = ({ onModalOpen, posts }) => {
  console.log('posts :>> ', posts);
  if (!Array.isArray(posts)) {
    return null;
  }
  return (
    <ul className={css.gallery}>
      {posts.map((post, id) => (
        <ImageGalleryItem onModalOpen={onModalOpen} post={post} key={id} />
      ))}
    </ul>
  );
};

export default ImageGallery;
