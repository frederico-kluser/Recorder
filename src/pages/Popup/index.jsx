import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';

// Importar CSS usando webpack imports que retornam strings
import GlobalStyle from './global.css';
import FaStyle from '@fortawesome/fontawesome-svg-core/styles.css';
import CommonStyle from '../Common/styles.css';
import DarkCoreStyle from './themes/dark-core.css';
import IndexStyle from './index.css';
import PopupStyle from './Popup.css';
import ComponentStyles from './components/styles.css';
import DarkThemeStyle from './components/dark-theme.css';
import DetailDarkStyle from './components/detail-dark.css';
import HistoryDarkStyle from './components/history-dark.css';
import LayoutWrapperStyle from './components/LayoutWrapper.css';
import RecordingHistoryStyle from './components/recording-history.css';
import RecordingDetailStyle from './components/recording-detail.css';
import ExecutionDetailStyle from './components/execution-detail.css';
import ExecutionHistoryStyle from './components/execution-history.css';
import ExecutionThumbnailStyle from './components/execution-thumbnail.css';
import ExecutionTableStyle from './components/execution-table.css';
import ExecutionHistoryNavigatorStyle from './components/execution-history-navigator.css';

render(
  <>
    <style>
      {GlobalStyle}
      {FaStyle}
      {CommonStyle}
      {DarkCoreStyle}
      {IndexStyle}
      {PopupStyle}
      {ComponentStyles}
      {DarkThemeStyle}
      {DetailDarkStyle}
      {HistoryDarkStyle}
      {LayoutWrapperStyle}
      {RecordingHistoryStyle}
      {RecordingDetailStyle}
      {ExecutionDetailStyle}
      {ExecutionHistoryStyle}
      {ExecutionThumbnailStyle}
      {ExecutionTableStyle}
      {ExecutionHistoryNavigatorStyle}
    </style>
    <Popup />
  </>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
