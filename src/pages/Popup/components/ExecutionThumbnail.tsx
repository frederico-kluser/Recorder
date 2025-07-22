import React, { useState } from 'react';
import './execution-thumbnail.css';

interface ExecutionThumbnailProps {
  src?: string;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

const ExecutionThumbnail: React.FC<ExecutionThumbnailProps> = ({
  src,
  alt = 'Screenshot',
  onClick,
  className = '',
}) => {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [decodedSrc, setDecodedSrc] = useState<string | null>(null);

  React.useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    // Validar formato base64
    if (!src.startsWith('data:image/') || !src.includes('base64,')) {
      setStatus('error');
      return;
    }

    // Criar nova imagem para decodificar
    const img = new Image();

    img.onload = async () => {
      try {
        // Decodificar imagem de forma assíncrona
        if ('decode' in img) {
          await img.decode();
        }
        setDecodedSrc(src);
        setStatus('ok');
      } catch (error) {
        console.error('Erro ao decodificar imagem:', error);
        setStatus('error');
      }
    };

    img.onerror = () => {
      setStatus('error');
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const handleClick = () => {
    if (onClick && status === 'ok') {
      onClick();
    }
  };

  return (
    <figure className={`execution-thumbnail ${status} ${className}`}>
      {status === 'loading' && (
        <div className="thumb-loading">
          <div className="thumb-spinner"></div>
        </div>
      )}

      {status === 'error' && (
        <div className="thumb-error">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5ZM5 19V5H19V19H5Z"
              fill="currentColor"
            />
            <path d="M10 12L8 10L5 14H19L14 7L10 12Z" fill="currentColor" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <line
              x1="3"
              y1="3"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="thumb-error-text">Imagem indisponível</span>
        </div>
      )}

      {status === 'ok' && decodedSrc && (
        <img
          src={decodedSrc}
          alt={alt}
          onClick={handleClick}
          className={onClick ? 'clickable' : ''}
        />
      )}
    </figure>
  );
};

export default ExecutionThumbnail;
