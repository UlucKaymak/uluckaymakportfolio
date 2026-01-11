import { useEffect, useState } from 'react';
import Lightbox from './Lightbox.jsx';

function ProjectModal({ project, onClose }) {
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';

      // Extract only image files for lightbox
      const images = project.media?.filter(path => {
        const ext = path.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
      }) || [];

      setLightboxImages(images);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('_');
    if (parts.length >= 2) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = parseInt(parts[1]) - 1;
      return parts[2] ? `${monthNames[monthIndex]} ${parts[2]}, ${parts[0]}` : `${monthNames[monthIndex]} ${parts[0]}`;
    }
    return dateString;
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const navigateLightbox = (direction) => {
    let newIndex = lightboxIndex + direction;
    if (newIndex >= lightboxImages.length) newIndex = 0;
    if (newIndex < 0) newIndex = lightboxImages.length - 1;
    setLightboxIndex(newIndex);
  };

  const parseDescription = (desc) => {
    if (!desc) return '';
    return desc.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  };

  const renderMedia = () => {
    const items = [];
    let imageIndex = 0;

    project.media?.forEach((mediaPath, idx) => {
      const ext = mediaPath.split('.').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
        const currentImageIndex = imageIndex;
        items.push(
          <div key={idx} className="grid-item grid-item-image expandable-image-container">
            <img
              src={mediaPath}
              alt={project.title}
              onClick={() => openLightbox(currentImageIndex)}
            />
          </div>
        );
        imageIndex++;
      } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
        items.push(
          <div key={idx} className="grid-item grid-item-video">
            <video controls controlsList="nodownload">
              <source src={mediaPath} type={`video/${ext}`} />
            </video>
          </div>
        );
      } else if (['mp3', 'wav', 'ogg'].includes(ext)) {
        const audioTitle = mediaPath.split('/').pop().split('.')[0].replace(/[-_]/g, ' ');
        items.push(
          <div key={idx} className="grid-item grid-item-audio">
            <div className="audio-wrapper">
              <div className="audio-title">{audioTitle}</div>
              <audio controls controlsList="nodownload">
                <source src={mediaPath} type={`audio/${ext}`} />
              </audio>
            </div>
          </div>
        );
      }
    });

    return items;
  };

  const renderDescription = () => {
    if (!project.description) return null;

    const paragraphs = project.description.split(/\n\n+/).filter(p => p.trim());
    return paragraphs.map((p, idx) => (
      <div key={idx} className="grid-item grid-item-text">
        <p dangerouslySetInnerHTML={{ __html: parseDescription(p).replace(/\n/g, '<br>') }} />
      </div>
    ));
  };

  return (
    <>
      <div className="modal" style={{ display: 'flex' }} onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="modal-close" onClick={onClose}>&times;</span>
          <div className="modal-body">
            <div className="modal-header">
              <h2>{project.title}</h2>
              <div className="modal-meta">
                <span className="project-type-badge">{project.type}</span>
                <span className="project-date">{formatDate(project.date)}</span>
              </div>
            </div>
            {project.role && <p className="project-role"><strong>Role:</strong> {project.role}</p>}

            <div className="modal-content-grid">
              {renderMedia()}
              {renderDescription()}
            </div>

            <div className="project-tags">
              {project.tags?.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
}

export default ProjectModal;
