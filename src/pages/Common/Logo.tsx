import React from 'react';
import logoSvg from '../../pages/Popup/logo.svg';

export default function Logo() {
  return (
    <img 
      src={logoSvg} 
      alt="DeploySentinel Logo"
      style={{
        height: '32px',
        width: 'auto',
        userSelect: 'none',
      }}
    />
  );
}
