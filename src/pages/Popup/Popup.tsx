import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquare,
  faCircle,
  faCopy,
  faCheck,
  faChevronLeft,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

import Logo from '../Common/Logo';
import LogoFleury from '../Common/LogoFleury';
import LayoutWrapper from './components/LayoutWrapper';
import CodeGen from '../Content/CodeGen';
import ActionList from '../Content/ActionList';
import { endRecording } from '../Common/endRecording';
import { genCypressCode } from '../builders';
import {
  setStartRecordingStorage,
  getCurrentTab,
  executeScript,
  executeCleanUp,
  isCypressBrowser,
  getCypressAutFrame,
} from '../Common/utils';
import { usePreferredLibrary, useRecordingState } from '../Common/hooks';
import ScriptTypeSelect from '../Common/ScriptTypeSelect';
import { RecordingHistory } from './components/RecordingHistory';
import { RecordingDetail } from './components/RecordingDetail';
import { RecordingEntry } from '../types/recording';
import { recordingStore } from '../storage/recording-store';

import type { Action } from '../types';
import { ActionsMode, ScriptType } from '../types';

// CSS será importado via index.jsx

import { onPageView, onNewRecording } from './analytics';
onPageView('/popup');

function LastStepPanel({
  actions,
  onBack,
}: {
  actions: Action[];
  onBack: () => void;
}) {
  const [preferredLibrary, setPreferredLibrary] = usePreferredLibrary();

  const [showActionsMode, setShowActionsMode] = useState<ActionsMode>(
    ActionsMode.Code
  );
  const [copyCodeConfirm, setCopyCodeConfirm] = useState<boolean>(false);

  const displayedScriptType = preferredLibrary ?? ScriptType.Cypress;

  return (
    <div>
      <div>
        <span className="text-button text-sm" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} /> Voltar
        </span>
      </div>
      <div className="d-flex justify-between mt-4 items-end text-sm">
        <div className="font-bold text-xl">
          Último Teste{' '}
          {showActionsMode === ActionsMode.Actions ? 'Ações' : 'Código Gerado'}
        </div>
        <div>
          <span
            className="link-button"
            onClick={() => {
              setShowActionsMode(
                showActionsMode === ActionsMode.Actions
                  ? ActionsMode.Code
                  : ActionsMode.Actions
              );
            }}
          >
            Mostrar{' '}
            {showActionsMode === ActionsMode.Actions
              ? 'Código Gerado'
              : 'Ações'}
          </span>
        </div>
      </div>
      {showActionsMode === ActionsMode.Code && (
        <div className="mt-4">
          <div className="d-flex justify-between items-end mb-4">
            <ScriptTypeSelect
              onChange={(val) => setPreferredLibrary(val)}
              value={displayedScriptType}
            />
            <CopyToClipboard
              text={genCypressCode(actions, true)}
              onCopy={() => {
                setCopyCodeConfirm(true);
                setTimeout(() => {
                  setCopyCodeConfirm(false);
                }, 2000);
              }}
            >
              <span
                className={`text-sm link-button ${
                  copyCodeConfirm ? 'text-green' : ''
                }`}
              >
                <FontAwesomeIcon
                  icon={copyCodeConfirm ? faCheck : faCopy}
                  size="sm"
                />{' '}
                Copiar Código
              </span>
            </CopyToClipboard>
          </div>
          <CodeGen
            actions={actions}
            library={displayedScriptType}
            styles={{ height: 400 }}
          />
        </div>
      )}
      {showActionsMode === ActionsMode.Actions && (
        <div className="mt-4">
          <ActionList actions={actions} />
        </div>
      )}
    </div>
  );
}

const Popup = () => {
  const [preferredLibrary, setPreferredLibrary] = usePreferredLibrary();

  const [recordingTabId, actions] = useRecordingState();

  const [currentTabId, setCurrentTabId] = useState<number | null>(null);

  const [isShowingLastTest, setIsShowingLastTest] = useState<boolean>(false);
  const [isShowingHistory, setIsShowingHistory] = useState<boolean>(false);
  const [selectedRecording, setSelectedRecording] =
    useState<RecordingEntry | null>(null);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const { id } = tab;
      setCurrentTabId(id ?? null);
    });
  }, []);

  // Inicializa o store e migra dados antigos
  useEffect(() => {
    recordingStore.initialize();
    recordingStore.migrateLastRecording();
  }, []);

  // Sets Cypress as default library if we're in the Cypress test browser
  useEffect(() => {
    (async () => {
      const currentTab = await getCurrentTab();
      const tabId = currentTab.id;
      if (tabId == undefined) {
        return;
      }
      const isCypress = await isCypressBrowser(tabId);
      if (isCypress) {
        setPreferredLibrary(ScriptType.Cypress);
      }
    })();
  }, []);

  const onRecordNewTestClick = async () => {
    onNewRecording(preferredLibrary ?? ScriptType.Cypress);

    const currentTab = await getCurrentTab();
    const tabId = currentTab.id;

    if (tabId == null) {
      throw new Error('No tab id found');
    }

    const isCypress = await isCypressBrowser(tabId);
    if (isCypress) {
      const autFrame = await getCypressAutFrame(tabId);
      if (autFrame == null) {
        throw new Error('No AUT frame found');
      }

      const frameId = autFrame.frameId;
      const frameUrl = autFrame.url;

      setStartRecordingStorage(tabId, frameId, frameUrl);
      await executeCleanUp(tabId, frameId);
      await executeScript(tabId, frameId, 'contentScript.bundle.js');
    } else {
      setStartRecordingStorage(tabId, 0, currentTab.url || '');
      await executeCleanUp(tabId, 0);
      await executeScript(tabId, 0, 'contentScript.bundle.js');
    }

    window.close();
  };

  const activePage =
    recordingTabId != null
      ? 'recording'
      : isShowingHistory
      ? 'history'
      : selectedRecording
      ? 'detail'
      : isShowingLastTest
      ? 'lastTest'
      : 'home';

  const isRecordingCurrentTab = currentTabId === recordingTabId;

  // Aplica classes ao body baseado na página ativa
  useEffect(() => {
    document.body.classList.remove('history-view', 'detail-view');

    if (activePage === 'history') {
      document.body.classList.add('history-view');
    } else if (activePage === 'detail') {
      document.body.classList.add('detail-view');
    }

    return () => {
      document.body.classList.remove('history-view', 'detail-view');
    };
  }, [activePage]);

  const handleSelectRecording = (recording: RecordingEntry) => {
    setSelectedRecording(recording);
    setIsShowingHistory(false);
  };

  const handleBackFromDetail = () => {
    setSelectedRecording(null);
    setIsShowingHistory(true);
  };

  const handleBackFromHistory = () => {
    setIsShowingHistory(false);
    setSelectedRecording(null);
  };

  return (
    <>
      <div className="Popup">
        {activePage === 'recording' && (
          <LayoutWrapper view="home" title="Gravando...">
            <div className="text-center" style={{ marginTop: '2em' }}>
              <div
                className="text-xl"
                style={{ color: 'var(--primary-color)' }}
              >
                Gravando
                {isRecordingCurrentTab ? ' Teste...' : ' em Outra Aba'}
              </div>
              {!isRecordingCurrentTab && recordingTabId != null && (
                <div className="mt-4">
                  <span
                    className="link-button"
                    onClick={() => {
                      chrome.tabs.update(recordingTabId, { active: true });
                      window.close();
                    }}
                  >
                    Ir para Aba de Gravação Ativa
                  </span>
                </div>
              )}
              <button
                className="btn-primary-outline m-4"
                style={{ marginTop: '2em' }}
                onClick={() => endRecording()}
                data-testid="end-test-recording"
              >
                <FontAwesomeIcon className="mr-1" icon={faSquare} />
                &nbsp; Finalizar Gravação do Teste
              </button>
            </div>
          </LayoutWrapper>
        )}
        {activePage === 'home' && (
          <LayoutWrapper view="home">
            <div className="text-center" style={{ marginTop: '2em' }}>
              <div className="logo-container">
                <LogoFleury height={80} />
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
                className="text-grey mt-6"
              >
                Gere scripts Cypress a partir de suas ações no navegador (ex.
                clicar, digitar, rolar).
              </div>
              <button
                className="btn-primary mt-8"
                onClick={() => onRecordNewTestClick()}
                data-testid="record-new-test"
              >
                <FontAwesomeIcon
                  className="mr-1"
                  style={{ color: '#EA4240' }}
                  icon={faCircle}
                />
                &nbsp; Iniciar Gravação da Aba Atual
              </button>
              <div className="d-flex text-sm justify-content-center text-grey mt-6">
                <div className="d-flex">
                  <div>Biblioteca Preferida: &nbsp;</div>
                  <ScriptTypeSelect
                    color="#c4c4c4"
                    value={preferredLibrary ?? ScriptType.Cypress}
                    onChange={setPreferredLibrary}
                    shortDescription
                  />
                </div>
              </div>
              <div className="my-8">
                <span
                  className="link-button"
                  onClick={() => {
                    setIsShowingHistory(true);
                  }}
                  data-testid="view-recordings"
                >
                  <FontAwesomeIcon icon={faHistory} /> Ver Gravações
                </span>
              </div>
            </div>
          </LayoutWrapper>
        )}
        {activePage === 'lastTest' && (
          <LastStepPanel
            actions={actions}
            onBack={() => {
              setIsShowingLastTest(false);
            }}
          />
        )}
        {activePage === 'history' && (
          <RecordingHistory
            onSelectRecording={handleSelectRecording}
            onBack={handleBackFromHistory}
          />
        )}
        {activePage === 'detail' && selectedRecording && (
          <RecordingDetail
            recording={selectedRecording}
            onBack={handleBackFromDetail}
          />
        )}
      </div>
    </>
  );
};

export default Popup;
