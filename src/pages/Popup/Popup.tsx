import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquare,
  faCircle,
  faCopy,
  faCheck,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import Logo from '../Common/Logo';
import CodeGen from '../Content/CodeGen';
import ActionList from '../Content/ActionList';
import { endRecording } from '../Common/endRecording';
import { genCode } from '../builders';
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

import type { Action } from '../types';
import { ActionsMode, ScriptType } from '../types';

import PopupStyle from './Popup.css';

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
          {showActionsMode === ActionsMode.Actions
            ? 'Ações'
            : 'Código Gerado'}
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
              text={genCode(actions, true, displayedScriptType)}
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


  useEffect(() => {
    getCurrentTab().then((tab) => {
      const { id } = tab;
      setCurrentTabId(id ?? null);
    });
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
      : isShowingLastTest
      ? 'lastTest'
      : 'home';

  const isRecordingCurrentTab = currentTabId === recordingTabId;

  return (
    <>
      <style>{PopupStyle}</style>
      <div className="Popup" style={{ background: '#080A0B' }}>
        {activePage === 'recording' && (
          <>
            <Logo />
            <div className="text-center" style={{ marginTop: '2em' }}>
              <div className="text-xl text-red">
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
          </>
        )}
        {activePage === 'home' && (
          <>
            <div className="d-flex justify-between items-center">
              <Logo />
            </div>
            <div className="text-center mt-12">
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
                className="text-grey mt-6"
              >
                Gere scripts Cypress, Playwright e Puppeteer a partir de suas
                ações no navegador (ex. clicar, digitar, rolar).
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
                    setIsShowingLastTest(true);
                  }}
                  data-testid="view-last-test"
                >
                  Ver Última Gravação
                </span>
              </div>
            </div>
          </>
        )}
        {activePage === 'lastTest' && (
          <LastStepPanel
            actions={actions}
            onBack={() => {
              setIsShowingLastTest(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Popup;
