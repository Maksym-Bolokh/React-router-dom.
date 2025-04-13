import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../api/photosApi';
import './Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('galleryPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const data = await fetchPhotos(page, 4);
        setPhotos(data);
        localStorage.setItem('galleryPage', page.toString());
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [page]);

  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="gallery-container">
      <div className="gallery-controls">
        <button 
          onClick={handlePrev} 
          disabled={page === 1}
          className="gallery-button"
        >
          Попередні
        </button>
        <span className="page-counter">Сторінка: {page}</span>
        <button 
          onClick={handleNext}
          className="gallery-button"
        >
          Наступні
        </button>
      </div>

      {loading ? (
        <div className="loader">Завантаження...</div>
      ) : (
        <div className="gallery-grid">
          {photos.map(photo => (
            <div key={photo.id} className="gallery-item">
              <img 
                src={photo.download_url} 
                alt={`Photo by ${photo.author}`}
                className="gallery-image"
              />
              <p className="photo-author">Автор: {photo.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery; 