import { useEffect } from 'react';

function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, onClose]);

  if (images.length === 0) return null;

  return (
    <div
      className="lightbox-overlay"
      style={{ display: 'flex' }}
      onClick={(e) => e.target.className === 'lightbox-overlay' && onClose()}
    >
      <span className="lightbox-close" onClick={onClose}>&times;</span>
      <img
        src={images[currentIndex]}
        alt="Expanded view"
        className="lightbox-content"
      />

      {images.length > 1 && (
        <>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
          >
            &#8249;
          </button>
          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
}

export default Lightbox;
