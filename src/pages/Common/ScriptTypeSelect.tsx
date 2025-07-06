import React from 'react';
import { ScriptType } from '../types';

/**
 * Componente que exibe o tipo de script (sempre Cypress)
 * Mantém a interface anterior para compatibilidade, mas agora é apenas visual
 */
export default function ScriptTypeSelect({
  value,
  onChange,
  color,
  fontSize,
  shortDescription,
}: {
  value: ScriptType;
  onChange: (val: ScriptType) => void;
  color?: string;
  fontSize?: number;
  shortDescription?: boolean;
}) {
  // Sempre retorna Cypress como valor fixo
  React.useEffect(() => {
    if (value !== ScriptType.Cypress) {
      onChange(ScriptType.Cypress);
    }
  }, [value, onChange]);

  return (
    <div
      className="link-button mr-4"
      style={{
        backgroundColor: '#080a0b',
        color: color ?? 'white',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize,
        display: 'inline-block',
      }}
      data-testid="script-type-display"
    >
      Cypress{!shortDescription ? ' Library' : ''}
    </div>
  );
}