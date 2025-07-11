import React from 'react';
import logoSvg from '../logo.svg';
import './LayoutWrapper.css';

interface LayoutWrapperProps {
  children: React.ReactNode;
  view?: 'home' | 'history' | 'detail';
  title?: string;
  onBack?: () => void;
}

/**
 * Wrapper component para unificar o layout em todas as views do popup
 * Garante consistência visual com header, logo e container padronizados
 */
const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  view = 'home',
  title,
  onBack,
}) => {
  return (
    <div className={`layout-wrapper layout-${view}`}>
      <header className="layout-header">
        <div className="header-content">
          <img
            src={logoSvg}
            alt="Logo"
            height={28}
            className="logo-fleury"
            style={{ userSelect: 'none', width: 'auto' }}
          />
          {title && <h1 className="header-title">{title}</h1>}
        </div>
        {onBack && (
          <button className="back-button" onClick={onBack}>
            <i className="fa fa-arrow-left" /> Voltar
          </button>
        )}
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default LayoutWrapper;