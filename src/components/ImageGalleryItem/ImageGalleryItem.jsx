import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  src,
  alt,
  openModal,
  largeImageURL,
  onClick,
}) {
  return (
    <li className={s.imageGalleryItem} onClick={openModal}>
      <img
        onClick={() => onClick(largeImageURL)}
        className={s.imageGalleryItem__image}
        src={src}
        alt={alt}
      />
    </li>
  );
}
