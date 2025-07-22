import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const SyntaxHighlighterFixed = SyntaxHighlighter as any;
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { genCode } from '../builders';

import type { Action } from '../types';
import { ScriptType } from '../types';

export default function CodeGen({
  actions,
  library,
  styles,
}: {
  actions: Action[];
  library: ScriptType;
  styles?: React.CSSProperties;
}) {
  return (
    <SyntaxHighlighterFixed
      language="javascript"
      style={vscDarkPlus}
      customStyle={{
        background: 'none',
        padding: 0,
        overflow: 'auto',
        paddingRight: '1em',
        paddingBottom: '1em',
        ...(styles || {}),
      }}
      data-testid="code-block"
    >
      {genCode(actions, true, library)}
    </SyntaxHighlighterFixed>
  );
}
