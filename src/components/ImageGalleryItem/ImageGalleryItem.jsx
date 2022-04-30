import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  src,
  alt,
  openModal,
  largeImageURL,
}) {
  return (
    <li className={s.imageGalleryItem} onClick={openModal}>
      <img
        className={s.imageGalleryItem__image}
        src={src}
        alt={alt}
        data-url={largeImageURL}
      />
    </li>
  );
}
