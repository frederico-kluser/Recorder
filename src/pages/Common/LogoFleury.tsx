import React from 'react';

/**
 * Componente de logo da Fleury
 * SVG otimizado com cores customizáveis via props
 */
const LogoFleury: React.FC<{ height?: number; className?: string }> = ({ 
  height = 32, 
  className = '' 
}) => {
  return (
    <svg
      width="auto"
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ userSelect: 'none' }}
    >
      {/* Logo Fleury simplificado */}
      <path
        d="M20 15h20v30H20V15zm25 0h10v10H45V15zm0 20h10v10H45V35zm15-20h10v30H60V15zm15 0h20v10H75V15zm0 10h15v10H75V25zm20-10h10v30H95V15zm15 0h10v10h-10V15zm0 10h10v10h-10V25zm0 10h10v10h-10V35zm15-20h20v10h-20V15zm5 10h10v20h-10V25z"
        fill="#C1121F"
      />
      <text
        x="10"
        y="55"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="bold"
        fill="#C1121F"
      >
        FLEURY
      </text>
    </svg>
  );
};

export default LogoFleury;