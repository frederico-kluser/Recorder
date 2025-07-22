<claude_code_execution> <mode>autonomous_implementation</mode>
<priority>execute_immediately</priority>

  <task>
    Implementar o plano fornecido no projeto Ondokai usando Claude Code.
  </task>

<execution_instructions> 1. Analisar o implementation_plan 2. Identificar
arquivos a criar/modificar 3. Executar implementação completa
</execution_instructions>

<implementation_plan> Comando original: Quero que, durante a execução de cada
etapa do modo replay, seja salvo um print screen da tela em base64 dentro de um
objeto que ficará junto com o objeto da ação. Esse objeto deve conter o
timestamp e também a ação que foi realizada. Assim, nosso replay será o log
dessas execuções, que ficará salvo no database interno do nosso Chrome V3. Será
um array desses objetos, que a pessoa poderá visualizar. Esse array, no formato
JSON, ficará em um novo campo que você vai criar na nossa extensão.

Por enquanto, quero apenas isso, mas quero que seja feito com qualidade. Depois
— não agora, depois — vamos usar isso para comparar execuções passadas,
analisando as imagens dos prints. Mas, por enquanto, é só isso.

Também quero uma aba de histórico de execução, onde essas informações possam ser
visualizadas.

Último plano: O plano detalha como injetar captura de tela em todos os
executores, persistir o array ExecutionLogs no RecordingStore, adaptar tipos,
criar serviço de persistência, atualizar UI e testes. Mantém compatibilidade,
usa APIs Chrome V3 e garante performance e segurança.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo
especificamente? Resposta: Precisamos registrar o estado visual da página
durante o replay. Criaremos interface ExecutionLog {ts:number, action:Action,
screenshot:string}. Cada executor chamará ScreenshotService.capture() gerando
base64 via chrome.tabs.captureVisibleTab. O resultado será anexado ao Action em
tempo de execução e pushado em replaySession.executionLogs. Ao final a API de
replay enviará logs para RecordingStore.updateExecutionLogs(sessionId, logs).

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de
persistência? Resposta: Adicionar em src/pages/types/session.ts interface
ReplaySession {executionLogs:ExecutionLog[]} e em src/pages/types/recording.ts
campo executionLogs?:ExecutionLog[]. Persistência: RecordingStore estende schema
com chave executionLogs, migrando registros antigos via
setDefault({executionLogs:[]}). Salvamos incrementalmente usando debounce 250 ms
no método saveExecutionLogs para não exceder quota do storage.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como? Resposta:
Modificar executores em src/replay/core/executors/\*.ts inserindo
this.captureAfter(action). Implementar método protegido na classe base que chama
ScreenshotService e pusha no array local. Atualizar ActionExecutorFactory para
injetar dependency ScreenshotService singleton
(src/replay/core/services/screenshot-service.ts) exportando função
init(factory). RecordingStore expõe updateExecutionLogs via api public
src/replay/api/index.ts.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar? Resposta: Tratar
falha em chrome.tabs.captureVisibleTab (aba não focada, permissão negada) com
try/catch: se erro, logamos {ts, action, screenshot:"ERROR:"+err.message}.
Limitar base64 ≤5 MB; se maior, reduzir quality via
canvas.toDataURL('image/jpeg',0.6). Se quota de storage exceder, aplicar
pruneStrategy(descartar logs mais antigos) e notificar UI via ReplayErrorEvent.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível? Resposta:
Criar src/replay/config/screenshot.config.ts exportando ScreenshotConfig
{enabled:boolean, quality:number, format:'png'|'jpeg'}. Valores default
{enabled:true, quality:0.8, format:'jpeg'}. Expor setScreenshotConfig(cfg) na
API pública. Outros times poderão plugar comparadores de imagem implementando
interface IImageComparator e registrando‐se em ScreenshotService.onCaptured
hook.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Design Pattern: Decorator nos executores (captureAfter).
ScreenshotService Singleton usa Observer para emitir onCaptured(log).
RecordingStore atua como Repository. Nova UI ExecutionHistoryTab é um React
Container em src/pages/Popup/components/ExecutionHistory.tsx consumindo hook
useExecutionLogs(recordingId) que acessa RecordingStore e renderiza lista
virtualizada + lightbox. Diagrama: Executor → ScreenshotService → RecordingStore
↔ UI.

Pergunta 7: Q7 - Como garantir performance e escalabilidade? Resposta: Captura
usa throttling: no Executor base aplicamos await delay(100) entre captura e
próximo step para não bloquear UI. Complexidade O(n) para n ações; consumo
memória controlado pelo quality. Benchmarks: 50 ações ≈ 3 MB extras,
persistência <200 ms. Monitoramento via Chrome Performance API: marcamos
"screenshot-capture-start"/"end" para profiling. Logs salvos em chunks de 10
entradas para reduzir I/O.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar? Resposta:
Validar que screenshot string começa com 'data:image/'. Sanitizar action antes
de serializar removendo campos sensíveis. Gerenciar permissões: assegurar "tabs"
e "activeTab" no manifest v3. Evitar vazamento: UI mostra miniatura
(max-width:120px) com lazy loading. Base64 nunca enviado externamente. Secrets
do usuário não incluídos, pois capturamos apenas tela ativa sem sobreposição de
nossa extensão (shadow DOM isolado).

Pergunta 9: Q9 - Como testar completamente a implementação? Resposta: Unit: mock
chrome.tabs.captureVisibleTab com jest.mock, validar que ExecutionLog é criado e
salvo. Integration: usar Playwright para rodar replay de sample recording,
asserting logs.length===actions.length. Snapshot test da UI ExecutionHistoryTab
garantindo renderização. Coverage meta 90%. Edge cases: falha de permissão,
storage quota, imagens >5 MB. Utilize fixtures em
tests/fixtures/largeScreenshot.json.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) executores geram log por ação 2) executionLogs salvo no
storage 3) UI lista logs ordenados 4) thumbnails abrem modal completo 5) quota
handling test passa 6) lint e testes 100% verdes 7) coverage ≥90% 8) bundle size
↑ <150 KB 9) manifest contém permissões corretas 10) manual QA: gravar,
reproduzir, verificar logs visuais. Documentar em CHANGELOG.md.
</implementation_plan>

<context*reference> <onboarding_summary> <context> <system_architecture>
<project_metadata> <name>React Application Setup, build, processo de construção
do projeto, Fleury Cypress Recorder, Extensão para geração automática de scripts
de teste, Projeto TypeScript com Jest para testes automatizados,
deploysentinel-recorder - Extensão para geração automática de scripts Cypress a
partir de interações no navegador, Extensão para gravação de interações e
geração de scripts de teste, Fleury Cypress Recorder - Extensão para gravação
automática de scripts de teste, DeploySentinel - Sistema de gravação e replay de
interações web, DeploySentinel Test Recorder, Automação de testes Playwright,
React Icon Component, Componente de ícone SVG para interface web,
DeploySentinel, Interface para monitoramento e deploy de aplicações, Projeto de
automação de testes com Cypress, Web Recording Automation Tool, Ferramenta para
gravação e automação de interações web, Automação de Testes UI com Cypress,
DeploySentinel - Extensão para gravação e automação de testes em navegadores,
Automated UI Testing Script Visualizer, CodeGen Component, Renderização de
código JavaScript estilizado, UI Test Recorder, Ferramenta para gravação e
geração automática de scripts de teste de interface, Highlighter Component,
Visualização e destaque de seletores CSS em UI React, Interface de controle para
monitoramento e testes, User Interaction Recorder, Captura e gravação detalhada
de eventos de usuário para análise comportamental e automação, DeploySentinel
Cypress Test Recorder, Ferramenta para gravação de testes automatizados com
Cypress, Cypress Test Recorder, Extensão para gravação e geração automática de
scripts de teste, Analytics Event Tracker, Monitoramento de eventos para análise
de uso, Popup UI Renderer, Interface para exibição de popups com temas
dinâmicos, @medv/finder, CSS Selector Generator, Gerador de scripts de teste
automatizado, UI Test Selector Generator, Automação de Seletores para Testes de
Interface, Projeto Front-end com suporte a importação de assets estáticos,
Browser Extension Compatibility Layer, Automated UI Testing Framework, Framework
para automação de testes end-to-end focado em interações de interface, Projeto
React com TypeScript para front-end moderno, Webpack Production Build Script,
Configuração de ambiente para aplicação Node.js, Chrome Extension Boilerplate,
Development Environment Setup, Configuração de build para extensão Chrome,
Projeto Node.js com controle de versionamento otimizado, Timestamp Migration and
Validation Utility, Cypress Script Automation, Automação de scripts de teste
end-to-end com Cypress, Extensão para gravação de testes Cypress, UI Component
Library, Button and Layout Styling, Replay Test Automation, Interface para
visualização e controle de gravações de testes automatizados, Recording History
Manager, Interface para gerenciamento de histórico de gravações de sessões, Web
UI Base Styling, Recording Management Service - Gerenciamento de gravações de
ações para testes automatizados, Gerenciamento eficiente do histórico de
gravações para extensões Chrome, Sistema de Histórico de Gravações para
Automação de Testes, Dark Theme UI Styling, Unified dark mode theme for web
application, Fleury Brand Identity Component, Layout Dark Mode Unificado,
Interface Web Responsiva, Popup UI Consistency Wrapper, Popup Recording History
UI, Interface para visualização e interação com histórico de gravações,
RecordingDetail Dark Theme, Interface para visualização detalhada de gravações,
RecordingHistory UI Theme, Interface para histórico de gravações, Recording
History UI, Interface para gerenciamento e visualização de gravações, Cypress
Test Exporter, Ferramenta para exportação automatizada de testes Cypress, Text
Utilities Module, Manipulação e truncamento de textos para UI, RecordingDetail
Component - Visualização detalhada de gravações, RecordingHistory Component,
Interface para gerenciamento de histórico de gravações, Extensão com popup
estilizado para interface dark mode, Tema Dark Unificado Fleury, Sistema de
Gerenciamento de Dados Empresariais, Recording Migration Service, Garantia de
integridade de dados de gravações, Replay Runner, Executor de ações para
automação em páginas web via extensão Chrome, TemplateRenderer - geração de
templates de testes automatizados para Cypress, Replay Session Manager -
Controle e monitoramento de sessões de replay de interação, Replay Controller
API, Controle de sessões de replay para extensões Chrome, Replay System, Sistema
de repetição automatizada de ações para testes e monitoramento, Replay
Configuration Manager, Gerenciamento de configurações para sistema de replay,
Executor de Ações Automatizadas para Interação Web, Executor de Ações de Clique
para Automação UI, Executor Factory para gerenciamento de ações automatizadas,
Executor de Input para Automação de UI, LoadExecutor, Executor para ações de
carregamento de páginas web, Executor de Navegação, Módulo para controle de
navegação via URL em aplicações web, Window Resize Executor, Executor para ações
de redimensionamento de janelas em extensão Chrome, Screenshot Capture Executor,
Executor especializado para captura de screenshots em ambiente Chrome Extension,
Scroll Automation Executor, Executor especializado para ações de scroll suave em
aplicações web, WheelExecutor, Executor para ações de scroll programático em UI
web, Sistema de replay para captura e reprodução de sessões, Sistema para
controle e reprodução de sessões gravadas, Replay Session Manager, Gerenciamento
de sessões de replay para automação e testes, ReplayEngine EventBus, Módulo de
comunicação interna para eventos</name> <domain>Web Development, Frontend,
React, desenvolvimento de software, automação de build, Automação de testes, QA,
Test Automation, Browser Testing, Desenvolvimento de software, Testes
automatizados, TypeScript, Browser Extension, Cypress, Browser Interaction
Recording, Playwright, Puppeteer, Automação de testes web, gravação de sessões
de navegação, replay de interações, integração com Cypress e Playwright,
Frontend Development, UI Components, DevOps, Branding, Quality Assurance, Test
Scripts, Web applications, Recording actions, UI Testing, Automação de testes,
extensões de navegador, gravação de sessões, Cypress integration, UI
Interaction, Web Application Testing, Code Visualization, Developer Tools,
Automação de Testes, Web UI Testing, Test Script Generation, UI Debugging, CSS
Selector Highlighting, Browser Extensions, Shadow DOM, Web Analytics, User
Behavior Tracking, Terminologia técnica: DOM events, selectors, debounce, SPA
navigation, Digital Product Monitoring, Google Analytics, Frontend Web
Application, UI/UX Components, Theming and Styling, DOM Manipulation, CSS
Selectors, Testes end-to-end, Web testing, Testes End-to-End, Seletores CSS,
Desenvolvimento front-end, Assets estáticos, CSS Modules, SVG inline, browser
extensions, cross-browser compatibility, End-to-End Testing, Desenvolvimento
Frontend, Build Automation, JavaScript, Configuração de software, Node.js
environment management, Chrome Extensions, Frontend Tooling, Desenvolvimento de
extensões para navegadores, JavaScript/TypeScript, Webpack, Node.js, Controle de
versão, Software Development, Event Processing, Action Logging, Frontend
Styling, UI/UX, Automação de testes de software, Replay Testing, Web
Application, User Session Recording, Frontend React, Recording Management,
Automação de testes, gravação de ações de usuário, geração de código Cypress,
armazenamento e manipulação de dados de gravação, Extensões de navegador,
Gerenciamento de histórico de gravações, chrome.storage.local API, Automação de
testes, gravação de sessões, Cypress, QA, UI/UX Design, Healthcare, Web
Application UI, Dark Theme Design, Frontend UI, Popup Interface, Software de
gravação, UX/UI para análise de gravações, Dark theme styling, Software de
monitoramento, Recording analysis, UI/UX design, User Interface, Media
Management, User Interaction, Recording Analytics, Text Processing, Interface de
usuário para análise de gravações em sistemas de monitoramento e replay,
terminologia técnica em inglês para precisão (ex: replay, toolbar, tabs),
Recording History, Dark mode theming, Front-end Development, Theming, Dark Mode,
Enterprise Data Management, Data Integrity, Business Rules, Web Extensions, Data
Migration, Storage Management, Automação de Navegador, Extensões Chrome, Replay
de ações, Automação UI, RecordingExportContext, User Experience Analytics,
Session Replay, Frontend Monitoring, User Session Replay, Chrome API,
Monitoramento de sessões, Cache management, Configuração persistente, Chrome
Storage API, Automação Web, Interação com DOM, Web Interaction, Automação de
testes e interação com UI, Termos técnicos em inglês como Action, Executor,
Click, Scroll, UI Automation, Web Testing, Web Automation, Frontend Control,
Browser Navigation, Front-end Navigation, User Experience, Browser Automation,
Captura de tela, Background scripts, Frontend Interaction, Interação UI,
JavaScript DOM Events, User Experience Analytics, Replay Sessions, Software de
monitoramento e análise de sessões, Terminologia técnica: replay, session,
recording, progress, event, Sistemas web, ReplayEngine, Event-driven
architecture, Comunicação interna</domain> <current_phase>Development, produção,
deploy, Produção, Manutenção ativa, Manutenção, Estável, Produção com
funcionalidades em desenvolvimento incremental, Estabilização, Produção com
suporte a múltiplas versões de manifest (v2 e v3), Production, Estável para uso
em ambiente real, Estável com monitoramento ativo e suporte a múltiplos eventos,
Estável com funcionalidades completas de gravação e histórico, Estável com
suporte a hot reload para desenvolvimento, MVP, Estável e em uso para testes
automatizados em pipelines CI/CD, Desenvolvimento ativo, Desenvolvimento
inicial, Local Testing, Desenvolvimento, Testes unitários implementados, Testes
automatizados integrados, Estável com funcionalidades completas de replay e
geração de código, Estável com funcionalidades completas de CRUD e
import/export, Produção com suporte a importação/exportação e compatibilidade
retroativa, Estável com funcionalidades de migração e manutenção, Stable UI
Theme, Estabilização de UI, Estabilização visual e usabilidade, Estabilização do
tema visual, Estabilização visual, Estabilização UI, Stable Utility Functions,
Estabilização visual e responsiva, Manutenção evolutiva, Estável com versão
1.0.0, Estável para uso em ambiente de extensão Chrome, Estável para uso em
automação, Estável e em uso com monitoramento ativo</current_phase>
<critical_business_rules>Preserve fast refresh functionality, Ensure JSX
transpilation compatibility, build deve gerar artefatos consistentes, não
quebrar pipeline de deploy, Captura precisa e completa dos eventos do usuário,
Geração correta e legível dos scripts, Compatibilidade com múltiplos frameworks
de teste, Execução consistente dos testes, Suporte a TypeScript via ts-jest,
Ambiente Node.js para testes, Garantir que os scripts Cypress gerados reflitam
fielmente as interações do usuário, Manter compatibilidade com múltiplas versões
de browsers (Chrome Manifest V3 e Firefox Manifest V2), Preservar integridade e
segurança dos dados capturados durante a gravação, Gravação precisa das
interações do usuário, Geração correta de scripts compatíveis com Cypress,
Playwright e Puppeteer, Segurança no acesso às permissões do navegador, Garantir
gravação fiel das interações do usuário, Manter segurança e privacidade dos
dados capturados, Permitir integração segura com domínios autorizados, Garantir
integridade e sincronização do estado de gravação entre abas e frames, Não
permitir gravação em abas ou frames não autorizados, Manter consistência dos
dados de replay para evitar falhas na reprodução, Gerenciar corretamente o ciclo
de vida das sessões de gravação e replay, Validação rigorosa da origem das
mensagens, Comunicação segura entre webapp e extensão, Consistência visual do
ícone, Compatibilidade com React 18+, Renderização correta do SVG, Consistência
visual da marca, Performance mínima no carregamento do logo, Tipo de script deve
ser sempre Cypress, Interface deve manter compatibilidade visual, Gravação deve
sempre usar a primeira URL capturada para garantir consistência, Gravações sem
ações não devem ser salvas, Falhas no salvamento devem ser logadas sem
interromper o fluxo, Envio do código gerado só ocorre se returnTabId estiver
definido, Uso obrigatório da biblioteca Cypress para scripts, Persistência
consistente das preferências do usuário, Sincronização em tempo real do estado
de gravação, Persistência correta do estado de gravação para evitar perda de
dados, Compatibilidade entre manifest v2 e v3 para execução de scripts,
Identificação precisa de abas de teste Cypress para integração adequada, Only
supported action types should be rendered, Sensitive input values must be
masked, Renderizar código corretamente formatado, Manter compatibilidade com
múltiplos tipos de script, Garantir performance e responsividade na
renderização, Gravação deve capturar todas as ações relevantes do usuário sem
perda, Código gerado deve ser válido e compatível com frameworks suportados,
Interface deve impedir interação com elementos da própria sobreposição para
evitar interferência, Estado de gravação deve ser sincronizado corretamente
entre abas e componentes, Precisão no posicionamento do destaque, Renderização
consistente do rótulo, Não interferir na interação do usuário, Garantir única
instância ativa do script, Permitir limpeza completa do componente para evitar
vazamentos, Não registrar eventos duplicados para o mesmo tipo em sequência
imediata, Ignorar eventos originados da interface de overlay para evitar ruído,
Persistir gravação no armazenamento local para recuperação e continuidade,
Capturar a primeira URL visitada apenas uma vez para contexto da sessão,
Garantir que apenas uma gravação esteja ativa por vez, Não montar múltiplos
botões no DOM, Comunicação correta com a extensão Chrome, Garantir que apenas
uma aba esteja gravando por vez, Persistência e migração correta do último teste
gravado, Sincronização correta entre estado da aba e estado da gravação,
Validação da existência do frame AUT para gravação em ambiente Cypress, Garantir
anonimato do usuário, Enviar dados de eventos sem impactar UX, Manter
integridade dos dados enviados, Renderizar Popup no container correto, Aplicar
estilos globais e temáticos sem conflito, Gerar seletores únicos e válidos,
Manter performance aceitável, Evitar seletores ambíguos, Gerar scripts válidos
para Cypress, Respeitar timing entre ações, Manter integridade das ações
stateful, Seletores devem ser únicos e estáveis, IDs inválidos não devem ser
usados, Priorizar atributos de acessibilidade e testes, Importação correta e
tipada de arquivos estáticos para evitar erros de build, Garantir que chamadas à
API do navegador sejam compatíveis entre Chrome e Firefox, Garantir que todas as
ações sejam registradas com timestamp para rastreabilidade, Validar tipos de
ações para evitar execução de comandos inválidos, Manter integridade dos
seletores para garantir precisão na interação com elementos DOM, Garantir
tipagem estrita para evitar erros em runtime, Manter compatibilidade com ES5
para browsers legados, Build deve ser executado em modo produção, Erros de build
devem ser reportados e impedir deploy, NODE_ENV deve sempre estar definido, PORT
deve ser um número válido, Hot Module Replacement must be enabled for dev mode,
Dev server must serve assets with CORS headers, Garantir que o manifest.json
seja gerado corretamente com a versão atual, Manter integridade dos assets
copiados para build, Não permitir hot-reload em content scripts para evitar
conflitos, Não versionar arquivos de dependências, Não expor arquivos de
configuração sensíveis, Manter repositório limpo e organizado, All actions must
have valid, non-negative, and sequential timestamps, Scripts gerados devem
refletir fielmente ações do usuário, Comandos Cypress devem ser válidos e
executáveis, Gravação precisa das ações do usuário, Geração correta do código
Cypress, Isolamento do contexto do navegador, Consistent visual feedback on
interactive elements, Accessibility compliance, Responsive layout support,
Garantir que o código Cypress gerado reflita fielmente as ações gravadas, Manter
integridade do estado durante o replay para evitar execuções inconsistentes, Não
permitir reprodução de gravações sem ações válidas, Controle rigoroso do estado
de reprodução para evitar conflitos entre comandos, Não permitir exclusão sem
confirmação do usuário, Garantir integridade dos dados durante importação e
exportação, Manter sincronização entre estado local e armazenamento persistente,
Exibir dados atualizados após operações de modificação, Consistent UI layout,
Accessible typography, Responsive scrolling behavior, Não permitir gravações
vazias, Gerar IDs únicos para evitar colisões, Manter integridade dos dados
durante importação/exportação, Preservar URL original como campo principal,
Garantir geração correta de código Cypress para testes, Limitar o número máximo
de gravações armazenadas conforme configuração, Garantir integridade e
consistência dos dados durante salvamentos concorrentes, Manter compatibilidade
e migrar dados antigos para novo formato sem perda, Manter integridade temporal
das gravações (startedAt &lt; endedAt), Garantir unicidade do ID no formato
{hostname}:{yyyy-MM-dd_HH-mm}, Preservar ações gravadas e código gerado para
reprodutibilidade, Respeitar limite máximo de entradas e aplicar pruneStrategy
corretamente, Consistent dark mode application, Accessibility compliance for
color contrast, Manter identidade visual consistente, Garantir acessibilidade e
responsividade, Consistência visual do tema dark, Responsividade do layout,
Acessibilidade mínima via contraste, Consistência visual entre views, Navegação
clara com botão de voltar, Consistência visual do tema Dark, Feedback visual
claro para interações, Acessibilidade mínima para leitura e navegação,
Consistência visual entre temas, Legibilidade e acessibilidade, Feedback visual
claro para ações do usuário, Consistência visual do tema, Acessibilidade básica
para navegação, Manter integridade visual e responsividade, Garantir
acessibilidade e usabilidade, Preservar estados de seleção e ações do usuário,
Nomes de arquivos devem ser válidos para sistemas de arquivos, Downloads devem
ser disparados sem falhas, Conteúdo exportado deve refletir o código gerado, Não
truncar textos menores que o limite, Preservar domínio completo em URLs
truncadas, Manter alta legibilidade e usabilidade em tema dark, Garantir
responsividade e acessibilidade em múltiplos dispositivos, Exibir estados de
erro e carregamento de forma clara e distinta, Preservar consistência visual e
interatividade dos botões e abas, Manter integridade visual e responsiva,
Garantir feedback visual claro para ações do usuário, Preservar usabilidade em
dispositivos móveis, Manter consistência visual do tema dark, Garantir
legibilidade e acessibilidade, Manter alto contraste para acessibilidade,
Consistência visual em todos os componentes, Compatibilidade com resolução
800x600, Validação rigorosa de dados, Consistência transacional, Controle de
acesso baseado em roles, Todas as gravações devem possuir urlOriginal para
garantir rastreabilidade e compatibilidade, Migrações não devem ser executadas
múltiplas vezes para evitar inconsistências, Responder imediatamente a mensagens
PING para sinalizar prontidão, Executar apenas ações suportadas pela fábrica de
executores, Garantir resposta assíncrona para execução de ações, Manter
integridade e segurança na execução das ações, Viewport width deve estar dentro
de limites válidos para evitar erros, URLs devem ser sanitizadas para prevenir
XSS, Comandos para exportação não podem estar vazios, Nomes de testes devem
escapar caracteres especiais para evitar falhas de parsing, Garantir atualização
correta e sincronizada do estado do replay conforme mensagens do background,
Manter integridade do sessionId para evitar conflitos entre sessões, Tratar
erros de forma robusta para não travar a interface, Respeitar controle de cache
configurável para otimização de performance, Garantir comunicação confiável
entre popup e background, Manter integridade do estado das sessões de replay,
Tratar erros de forma robusta para evitar estados inconsistentes, Garantir retry
automático até o máximo configurado, Persistência consistente do progresso,
Timeouts para evitar bloqueios indefinidos, Persistência confiável das
configurações do usuário, Manter configuração padrão em caso de erro,
Atualizações parciais devem preservar dados existentes, Execução confiável das
ações com retries controlados, Seleção precisa do melhor seletor disponível para
evitar falhas, Espera ativa por elementos antes da interação para evitar erros,
Rolagem automática para garantir visibilidade do elemento, Garantir que o clique
seja disparado apenas em elementos visíveis e disponíveis, Tentar múltiplos
seletores em ordem de prioridade antes de falhar, Respeitar número máximo de
retries configurável para estabilidade, Cada ActionType deve ter um executor
registrado, Retornar null apenas quando não houver executor disponível,
Executores devem ser singleton para evitar múltiplas instâncias desnecessárias,
Garantir que o valor seja inserido corretamente no campo alvo, Manter a
simulação de digitação humana para evitar bloqueios, Executar retries em caso de
falhas temporárias, Não expor valores sensíveis em logs quando isPassword for
true, Não recarregar página se já estiver na URL correta, Garantir navegação
síncrona e controle de estado, Garantir navegação correta para URLs válidas,
Tratar erros de navegação para evitar falhas silenciosas, Garantir que a janela
seja redimensionada apenas com dimensões válidas, Tratar erros de comunicação
com background script para evitar falhas silenciosas, Garantir captura de
screenshot no timestamp correto, Tratar erros de comunicação com background
script, Não bloquear a thread principal durante execução, Scroll deve ser suave
para evitar quebras na UX, Aguardar término do scroll antes de prosseguir,
Capturar e tratar erros de execução, Garantir disparo correto do evento wheel
com valores delta precisos, Manter integridade do DOM e evitar erros
silenciosos, Aguardar delay para efeito visual antes de continuar, Garantir
integridade e sincronização dos eventos de replay, Manter estado consistente
durante pausa e retomada, Configurações devem ser aplicadas corretamente sem
perda de dados, Garantir integridade e sincronização das mensagens de replay,
Não permitir comandos inválidos ou estados inconsistentes, Manter
rastreabilidade completa dos eventos e erros, Garantir integridade do estado da
sessão durante o replay, Não perder ações executadas nem status atual, Manter
consistência entre status e timestamps, Tratar erros sem interromper o sistema,
Garantir entrega de eventos para todos os listeners registrados, Não permitir
vazamento de exceções em handlers, Manter integridade do mapa de
listeners</critical_business_rules> </project_metadata> <technical_stack>
<primary_language>JavaScript ES6+, JSX, JavaScript, Node.js, TypeScript 5.0,
TypeScript 5.x, JavaScript ES2020, TypeScript 4.1.5, Manifest Version 2,
JavaScript ES2021, JSON, TypeScript 4.x, React 18, JavaScript ES2022, JavaScript
(Node.js 16+), JavaScript (Node.js 18+), JavaScript ES2020+, CSS3, JavaScript
(React integration), CSS Variables, CSS Custom Properties (CSS Variables),
Node.js 18</primary_language> <frameworks>React (via react-app preset), Webpack,
Babel, Webpack 5, Yarn, Cypress, Playwright, Puppeteer, Jest 29.x, ts-jest,
React 17.0.1, Webpack 5.23.0, Babel 7.12.17, Chrome Extensions Manifest V3,
Chrome Extensions API, Playwright (integração para replay), Cypress (integração
para gravação), Nenhum framework frontend explícito, React 18.2, React 18,
Cypress (para geração de código de teste), React 18.x, WebExtensions API
(compatibilidade com Firefox), react-syntax-highlighter 15.x, Lodash 4.17
(throttle), FontAwesome 6 (icons), ReactDOM, Nenhum framework front-end
explícito (vanilla JS/TS), Uso de biblioteca lodash.debounce para otimização de
eventos, FontAwesome SVG Core, FontAwesome 6 (free solid icons), Nenhum
framework específico detectado, Nenhum (biblioteca standalone), Cypress 12.x,
React 18.2 (implícito), Node.js 20, Cypress (para testes e automação), Webpack
5.x, WebpackDevServer 4, Jest 29, Playwright 1.x, None (Vanilla CSS), React
Syntax Highlighter (Prism) v1.x, FontAwesome Free Solid Icons, FontAwesome 6.x,
Node.js runtime, Possível uso de Cypress para testes (geração de código), Nenhum
framework frontend/backend explícito, API chrome.storage.local para
persistência, Node.js 20.x, Nenhum framework CSS explícito, Possível integração
com React ou similar, Possível integração com React ou similar para componentes,
React (suposição pelo padrão de classes e estrutura), Possível integração com
React ou Vue para JS, Nenhum framework CSS explícito, uso de variáveis CSS
customizadas, Cypress (para testes e geração de código), Possível integração com
React 18.x (baseado em classes e nomenclatura CSS modular), React (presumido),
CSS Modules or Styled Components (possível integração), Nenhum framework
específico declarado, Express 4.18.2, Mongoose 6.7.0, Cypress (para testes
end-to-end), Jest (para testes unitários), Nenhum framework específico, Nenhum
framework explícito, código base para automação customizada, Browser DOM API,
Possível uso em frontend React (não explícito no código), Playwright (implícito
para waitForElement), Nenhum framework explícito no código fornecido, Custom
Automation Framework, Possível integração com React 18, React 18.2 (para hooks),
Possível uso em ambiente Node.js ou frontend moderno, React 18.2 (frontend),
Node.js 20 (backend)</frameworks> <databases>chrome.storage.local (armazenamento
local do browser), Não aplicável, IndexedDB (implícito via RecordingService),
chrome.storage.local (armazenamento local do navegador), Nenhum banco de dados
local - armazenamento via chrome.storage API, Armazenamento local do navegador
(chrome.storage.local), LocalStorage (browser), Nenhum banco de dados
diretamente utilizado neste módulo, Não aplicável (armazenamento local ou
backend externo via RecordingService), Armazenamento customizado via
recordingStore (provavelmente armazenamento local ou em memória), Nenhum banco
de dados relacional explícito (persistência via backend customizado), MongoDB
6.0, chrome.storage.local, Chrome Storage Sync API, Não aplicável diretamente
neste módulo, Redis 7.0</databases> <external_services>Chrome Web Store, Firefox
Add-ons Marketplace, GitHub Actions, Browser APIs (chrome.\*), Test Automation
Frameworks (Cypress, Playwright, Puppeteer), DeploySentinel (para comunicação
externa via matches), Chrome Runtime Messaging, Chrome Tabs API, Chrome
WebNavigation API, Chrome Extension API, DeploySentinel Webapp, Chrome Runtime
Messaging API, chrome.storage API, APIs do navegador Chrome e Firefox para tabs,
scripting e webNavigation, Chrome Storage API para sincronização de estado,
Clipboard API via react-copy-to-clipboard, API chrome.runtime para comunicação
com background scripts, Chrome Extension Messaging API, Chrome Extension APIs
(tabs, storage, scripting), Analytics custom (onPageView, onNewRecording),
Google Analytics Measurement Protocol API, @fortawesome/fontawesome-svg-core,
TemplateRenderer (módulo interno para geração de templates), Firefox
WebExtension API, Cypress Test Runner, Possível integração com CI/CD (GitHub
Actions, Jenkins), Node.js environment variables, npm package scripts, Chrome
Extensions API, Chromium Browser, Replay API via useReplay hook, Clipboard API
(CopyToClipboard), File download utilities, RecordingService (API para listagem,
remoção, importação e exportação de gravações), Google Fonts (Roboto), Nenhum
serviço externo explícito, mas integração com Cypress para geração de código,
API chrome.storage.local do Chrome, Serviços de armazenamento backend
customizados (ex: filesystem, cloud storage), Font icon libraries (ex:
FontAwesome), Browser Web APIs (Blob, URL, DOM), File system APIs para
import/export JSON (via browser), REST APIs externas para autenticação e
notificações, Chrome Extensions API (chrome.runtime), Chrome Extensions API
(chrome.runtime.onMessage), Replay backend services via startReplay,
pauseReplay, resumeReplay, stopReplay, chrome.storage.sync,
chrome.runtime.sendMessage API, Nenhum serviço externo diretamente referenciado,
APIs internas para coleta de ações, Serviços de logging e
monitoramento</external_services> <package_manager>npm, yarn, Yarn, yarn
1.22.22, npm ou yarn (comum em projetos front-end React), npm 9.6.7, npm
9.x</package_manager> </technical_stack> <architecture_patterns>
<design_pattern>Modular Build Configuration, Pipeline, Modular Build Scripts,
Observer Pattern, Event-driven Architecture, Modular Architecture, Configuration
Object Pattern, Component-Based Architecture, MVC (implícito via React),
Extension Architecture (Background Script, Content Script, Browser Action),
Event-driven architecture, Modular architecture com service workers, Singleton
(ReplayEngine), Modularização por responsabilidades, Message Passing,
Presentational Component, Modularização por serviços, Event-driven communication
via messaging, Hooks Pattern, Modularização funcional com separação clara entre
manipulação de estado e execução de scripts, Presentational and Container
Components, Observer Pattern (event listeners para mouse e storage), State
Management via React Hooks, Functional Components, Singleton, Component-based
UI, Shadow DOM encapsulation, Observer pattern para escuta e reação a eventos
DOM, Singleton-like pattern para instância única do Recorder, Event-driven
architecture para captura e processamento de ações, Hook Pattern, Flux/Hook
State Management, Modular Separation (UI, Storage, Utils), Modularização
funcional, Separation of Concerns, Hot Module Replacement, Modular Functional,
Generator Pattern, Bottom-up Search, Builder Pattern (ScriptBuilder abstrato e
implementações concretas), Factory Method (createTemplateRenderer),
Modularização Funcional, Defensive Programming, Modularização via declaração de
módulos TypeScript, Alias Pattern, Object-Oriented Programming, Enum-based Type
Safety, Domain-Driven Design (DDD) para modelagem de ações, Modular,
Component-based, Build Pipeline Script, Configuration Module Pattern, Modular
Configuration, Middleware Pattern, Modular Webpack Configuration, Plugin-based
Build Pipeline, .gitignore pattern segmentation, Functional Programming, Modular
Design, Builder Pattern, Fluent Interface, Test Automation Pattern, Page Object
Pattern (implicit), Atomic Design (Component-based CSS), Hooks for state and
side effects, Separation of concerns via modular imports, Service Layer
Abstraction, Modular CSS, Theming with CSS Variables, Facade Service Pattern
para abstração do armazenamento e operações de gravação, Debounce para
otimização de escrita, Padrão Repository para abstração de armazenamento,
Interface Segregation, Repository Pattern (via IHistoryBackend), Component-based
UI Styling, Theming via CSS Variables, Component-Based UI, Container/Presenter,
Component Composition, Component-based styling, BEM-like naming, Component-based
UI styling, Component-Based UI Styling, Responsive Design, Interface para
tipagem clara, Utility Module, CSS Modular / BEM-like naming conventions, BEM
CSS Naming, Global Style Reset, MVC, Repository Pattern, Modularização
Assíncrona, Singleton para recordingStore, Factory Pattern, Observer Pattern
(event listener), Factory (createTemplateRenderer), Modularização por
responsabilidade, Hook Pattern (React Hooks), Observer Pattern (event listener
para mensagens do background), Promise-based Asynchronous API, Config Object
Pattern, Typed Interface for configuration, Encapsulamento, Gerenciamento de
estado, Template Method (classe abstrata com métodos auxiliares), Strategy
(possível extensão para diferentes executores), Command Pattern, Template Method
(via herança ActionExecutor), Polimorfismo via classes executoras, Retry
Pattern, Executor Pattern, Asynchronous Messaging, Asynchronous Programming,
Facade Pattern (exposição de API simplificada), Observer Pattern (EventBus para
eventos internos), Union Types para modelagem discriminada de mensagens, Clean
Architecture, Event-driven</design_pattern> <folder_structure>Config files in
root or config folder, Source code in src/, src/, build/, dist/, src/ - código
fonte, assets/ - imagens e ícones, tests/ - testes E2E, dist/ - builds para
Chrome e Firefox, Configurações centralizadas em pasta de configuração (ex:
/config ou raiz), src/: código fonte React e lógica da extensão, utils/: scripts
utilitários para build e deploy, build/: saída dos builds para diferentes
browsers, node_modules/: dependências externas, tests/: testes unitários e de
cobertura, background/ - scripts de background, content_scripts/ - scripts
injetados nas páginas, popup/ - interface do usuário da extensão, assets/ -
ícones e recursos estáticos, background/ - service worker scripts, popup/ - UI
popup da extensão, content_scripts/ - scripts injetados em páginas, assets/ -
ícones e imagens, Common/utils - funções utilitárias compartilhadas, storage -
gerenciamento de estado e migrações, replay/core - lógica central de replay,
replay/types - definições de tipos e eventos, src/: código fonte, background/:
scripts da extensão, content-scripts/: scripts injetados, src/components/Icon -
componente isolado para reutilização visual, pages: componentes de tela, Popup:
componentes modais ou popups, assets: arquivos estáticos como imagens e SVGs,
src/components - componentes React reutilizáveis, src/types - definições de
tipos TypeScript, utils/: funções utilitárias para manipulação de storage,
builders/: geração de código Cypress, storage/: serviços de persistência de
gravações, types/: definições de tipos e interfaces, src/hooks - custom React
hooks, src/utils - funções utilitárias para armazenamento, src/types -
definições de tipos e constantes, src/ - código fonte principal, src/storage/ -
funções de manipulação de armazenamento local, src/scripts/ - scripts executados
nas abas, src/utils/ - utilitários e helpers, types/ - definição de tipos e
enums, builders/ - funções auxiliares para construção de seletores,
components/ - componentes React reutilizáveis, styles/ - arquivos CSS,
src/components: componentes React reutilizáveis, src/builders: funções
auxiliares para geração de código, src/types: definições de tipos TypeScript,
src/components - componentes React reutilizáveis (ControlBar, Highlighter,
ActionList, CodeGen), src/builders - lógica para geração de seletores e código,
src/Common - hooks e utilitários compartilhados, src/components/Highlighter -
componente visual e estilização associada, ./ControlBar - componente React
principal, ../Common - estilos compartilhados, root - script de bootstrap e
injeção, builders/selector - geração de seletores CSS para elementos,
Common/utils - funções utilitárias como acesso ao localStorage, types -
definições de tipos e enums para ações e eventos, main recorder module - captura
e gerenciamento dos eventos, Common: componentes e hooks reutilizáveis, types:
definições de tipos TypeScript, styles: CSS modularizados, Common: componentes e
utilitários compartilhados, Content: lógica de geração de código e listas de
ações, Popup: componente principal e subcomponentes da UI da extensão, Storage:
gerenciamento de estado persistente, Common/utils para funções utilitárias,
Módulo de analytics separado para eventos, src/: código fonte principal,
src/components/: componentes React reutilizáveis, src/themes/: estilos
temáticos, src/global.css: estilos globais, test/ - testes unitários, dist/ -
build final, types/ - definições de tipos e enums, generators/template/ -
renderização de templates, core/ - lógica principal de geração de scripts,
src/types - Tipos e enums, src/utils - Funções utilitárias como finder,
src/selectors - Geração e seleção de seletores, src/assets para arquivos
estáticos, src/types para declarações de tipos, types/: definições de tipos,
dist/: build final, src/actions - Contém definições de classes e enums para
ações, src/utils - Funções utilitárias como validação de tipos, tests/ - Testes
unitários e de integração, src (código fonte), build (artefatos compilados),
node_modules (dependências externas), config/ - configurações do Webpack,
scripts/ - scripts de build e automação, config/ - arquivos de configuração
centralizados, config/ - configurações do Webpack e ambiente, build/ - saída dos
arquivos compilados, src/ - código fonte da aplicação, src/pages: código fonte
separado por páginas da extensão (Popup, Background, Content, Bridge,
CypressTrigger), src/assets/img: imagens e assets estáticos, build: saída do
build, src/content: scripts específicos para conteúdo, /node_modules para
dependências, /coverage para relatórios de teste, /build para artefatos de
produção, .prompts, .logs, .audios para dados auxiliares, src/types - definição
de tipos, src/utils - funções utilitárias para manipulação de dados,
src/pages/builders - Contém construtores de scripts Cypress, tests/ - Contém
testes unitários, /tests - testes automatizados, /build - extensão compilada,
/tmp - dados temporários para contexto do navegador, styles/components -
componentes reutilizáveis, styles/utilities - classes utilitárias para layout e
espaçamento, types/ - definições de tipos TypeScript, api/hooks/ - hooks para
integração com API externa, builders/ - funções para geração de código,
Common/utils/ - utilitários compartilhados, Content/ - componentes específicos
de conteúdo, src/storage - serviços de persistência e manipulação de dados,
src/Common/utils - funções utilitárias, styles/ - arquivos CSS base e
componentes, assets/ - fontes e imagens, src/types - definições de tipos,
src/services - lógica de negócio e serviços, src/builders - geração de código,
src/store - abstração de armazenamento, src/types - definições de tipos e
interfaces, src/store - implementação do RecordingStore, src/actions - definição
de ações para gravações, src/types/ - definições de tipos e interfaces,
src/backend/ - implementações do IHistoryBackend, src/actions/ - definição e
manipulação de ações gravadas, styles/: arquivos CSS globais e temáticos,
components/: componentes React com estilos associados, src/components -
componentes reutilizáveis de UI, themes/ - arquivos de tema, layout/ -
componentes de layout, src/assets - arquivos estáticos como imagens e SVGs,
src/styles - arquivos CSS globais e modulares, Estilos organizados por
componente (ex: recording-history-table, action-buttons, tabs),
styles/components/recordingDetail - CSS modular para componentes específicos,
Estilos organizados por componente UI, Separação clara entre header, toolbar,
content e tabela, Estilos organizados por contexto: history, detail, modern
variants, src/utils - funções utilitárias para download e manipulação de
arquivos, src/interfaces - definições de tipos e interfaces, src/utils - funções
utilitárias para manipulação de dados e strings,
src/components/RecordingDetail - componente e estilos relacionados, src/assets -
variáveis CSS e temas, src/utils - helpers para animações e responsividade,
/components/recordingHistory - Componentes visuais e lógicos, /styles - Estilos
globais e variáveis CSS, Estilos globais em pasta /styles, Componentes UI em
/components, Não aplicável - arquivo CSS único para tema, controllers para
lógica de entrada, models para definição de dados, services para regras de
negócio, routes para endpoints, recording-store: módulo responsável pelo
armazenamento e migração das gravações, scripts: scripts utilitários e de
migração, pages/types - Definição de tipos e interfaces, replay/core/executors -
Implementação dos executores de ações, background - Comunicação e controle
central da extensão, src/TemplateRenderer - componente principal de geração de
templates, src/types - definições de tipos e enums, tests/ - testes unitários
organizados por componente, src/hooks - Contém hooks reutilizáveis como
useReplay, src/types - Definições de tipos TypeScript para sessões e eventos,
src/api - Funções para comunicação com backend de replay, types/: definições de
tipos TypeScript, api/: funções públicas para comunicação com background,
background/: lógica central do background script, src/config - configurações
padrão e constantes, src/config - Gerenciamento de configurações, src/default -
Configurações padrão e tipos, pages/types - definição de tipos e interfaces,
executors - implementação das classes executoras de ações, executors/base -
classe base para executores de ações, executors/click - implementação específica
para ações de clique, src/pages/types para tipos e enums, src/executors para
classes executoras específicas, src/factory para fábrica de executores,
executors/input - executor específico para ações de input, src/pages/types -
definição de tipos de ações, src/executors - implementação dos executores de
ações, src/pages/types - Definição de tipos e interfaces, src/executors -
Implementação dos executores de ações, src/utils - Funções utilitárias,
src/pages/types - Tipos e interfaces, src/executors/base - Classe base para
executores, executors/base - Classe base para executores de ações,
executors/screenshot - Executor específico para screenshots, src/pages/types -
definição de tipos e interfaces, src/executors - Classes executoras de ações,
api: funções públicas e hooks, config: gerenciamento de configurações, types:
definições de tipos e interfaces, src/session - tipos e interfaces de sessão e
replay, src/events - definição de eventos e mensagens, Separação clara entre
comandos, status e eventos, src/pages/ - componentes e tipos de UI,
src/replay/ - lógica de replay e interfaces, tests/ - testes unitários e
integrados, src/eventbus - Contém a implementação do EventBus para comunicação
interna, src/modules - Módulos consumidores dos eventos</folder_structure>
<naming_conventions>camelCase for variables and functions, PascalCase for React
components, camelCase para funções, kebab-case para arquivos, CamelCase para
classes e funções, prefixos claros para eventos e handlers, camelCase para
variáveis e propriedades, PascalCase para tipos e interfaces, CamelCase para
classes e componentes React, camelCase para funções e variáveis, kebab-case para
arquivos e scripts, camelCase para variáveis e funções, PascalCase para classes,
nomes descritivos para scripts e arquivos, CamelCase para nomes de arquivos JS,
lowercase com underscores para assets, manifest.json para configuração
principal, CamelCase para funções e variáveis, Constantes em UPPER_SNAKE_CASE,
IDs de contexto com prefixos descritivos, PascalCase para componentes React,
camelCase para props e variáveis, snake-case para arquivos estáticos, PascalCase
para componentes, camelCase para props e funções, CamelCase para funções e
classes, snake_case para arquivos utilitários, PascalCase para tipos e
componentes, prefixo use para hooks, Funções em camelCase, Constantes em
camelCase, Arquivos em kebab-case, UPPER_SNAKE_CASE para enums, Arquivos com
extensão .tsx para componentes React, PascalCase para componentes React e
classes, camelCase para funções, variáveis e hooks, UPPER_SNAKE_CASE para enums
e constantes, kebab-case para IDs CSS, CamelCase para componentes e funções,
snake_case para variáveis globais no window, snake_case para variáveis locais e
parâmetros, Prefixo * para propriedades privadas, Enums e tipos com PascalCase,
CamelCase para funções e componentes, kebab-case para classes CSS, CamelCase
para componentes React e funções, snake_case para arquivos e pastas, Prefixo
&apos;use&apos; para hooks customizados, Enums em PascalCase, Constantes em
maiúsculas com underscore, CamelCase para componentes React, kebab-case para
arquivos CSS, PascalCase para tipos e enums, CamelCase para classes,
UPPER_SNAKE_CASE para constantes, prefixo gen para funções geradoras, Extensões
de arquivos mantidas (.css, .svg), Declarações em arquivos .d.ts, PascalCase
para classes e interfaces, PascalCase para classes e enums, camelCase para
propriedades e métodos, Variáveis em UPPER_SNAKE_CASE para env vars, Módulos em
camelCase ou kebab-case, PascalCase para classes e plugins, kebab-case para
arquivos e pastas, Arquivos de entrada nomeados conforme funcionalidade (ex:
index.jsx, index.ts), Aliases para módulos específicos (ex: react-dom para
@hot-loader/react-dom), Arquivos .env para configurações locais, secrets._.js
para arquivos sensíveis, PascalCase para tipos e classes, testes nomeados com
descrições claras, BEM-like for components (.btn-primary), Utility-first for
helpers (.p-1, .d-flex), Uppercase para enums (CacheMode), Prefixo
&apos;handle&apos; para funções de eventos, PascalCase para componentes React e
interfaces, BEM (Block Element Modifier) recomendado para classes adicionais,
Classes em PascalCase (RecordingService), Métodos em camelCase (createRecording,
listRecordings), Variáveis em camelCase, IDs formatados como
hostname:data_hora_sufixo, CamelCase para classes e interfaces, Interfaces
prefixadas com I (ex: IHistoryBackend), CamelCase para tipos e interfaces,
camelCase para propriedades e variáveis, BEM-like CSS classes, camelCase para
variáveis JS, BEM-like para classes CSS, prefixo layout- para containers
principais, BEM-like class names, Uso de prefixos para componentes (ex:
recording-detail, action-list), BEM-like: .modern-recording-detail,
.modern-detail-header, .modern-tab, Classes com prefixo &apos;modern-&apos; para
escopo, Uso de nomes descritivos e BEM-like, BEM-like classes, Prefixos para
contexto (.recording-, .modern-), PascalCase para interfaces, snake_case para
nomes sanitizados de arquivos, Prefixo &apos;recording-detail&apos; para classes
CSS, Uso de kebab-case para classes, Variáveis CSS customizadas com prefixo
&apos;--&apos;, BEM para classes CSS, camelCase para variáveis JS/TS, IDs para
containers principais (#app-container), Variáveis CSS com prefixo --, BEM-like
classes (.btn-primary, .ds-dark), CSS variables com prefixo -- para organização,
snake_case para arquivos, PascalCase para classes e tipos, prefixo async para
funções assíncronas não utilizado explicitamente, Prefixo &apos;I&apos; para
interfaces (ex: ExecuteActionMessage), CamelCase para classes e tipos
(TemplateRenderer, RecordingExportContext), camelCase para variáveis e funções
(createTemplateRenderer, render), PascalCase para enums (ActionType), PascalCase
para interfaces e tipos, Prefixo &apos;Replay&apos; para tipos relacionados a
replay, CamelCase para interfaces e tipos, CamelCase para classes e métodos,
Funções e variáveis em camelCase, Classes em PascalCase (ActionExecutor),
Métodos em camelCase (execute, getBestSelector), Interfaces prefixadas com I ou
sufixadas com Options (ExecutorOptions), Classes em PascalCase (ClickExecutor),
Métodos em camelCase (execute, waitForElement), Variáveis em camelCase
(selectors, retries), Classes em PascalCase (ActionExecutorFactory,
ClickExecutor), Enums em PascalCase (ActionType), Métodos em camelCase, Classes
em PascalCase (InputExecutor), Constantes em camelCase (isPassword, maxRetries),
Classes em PascalCase, Classes PascalCase, Métodos camelCase, Arquivos
kebab-case.ts, Classes em PascalCase (ScreenshotExecutor), Métodos em camelCase
(sendMessageToBackground), camelCase para métodos e variáveis, PascalCase para
enums, Enums em PascalCase com prefixo Replay, Interfaces com sufixo Message,
Constantes e tipos em UPPER_SNAKE_CASE, Interfaces iniciadas com I ou nome
descritivo (ReplaySession), Variáveis camelCase, Arquivos kebab-case, Eventos em
string literals kebab-case</naming_conventions> <module_boundaries>Separation
between config and source code, Plugins isolated from presets, separação clara
entre código fonte e artefatos gerados, Separação clara entre captura de
eventos, geração de scripts e UI da extensão, Módulos independentes para Chrome
e Firefox, Configuração isolada e exportada para uso pelo Jest, Separação clara
entre código de UI (React) e scripts utilitários, Dependências gerenciadas via
package.json e isoladas por ambiente (dev/prod), Separação clara entre
background scripts, content scripts e UI (popup), Comunicação via mensagens
entre scripts, Separação clara entre background scripts, content scripts e UI
popup, Comunicação via mensagens e permissões explícitas, Separação clara entre
utilitários, armazenamento, replay e integração com APIs do Chrome, Comunicação
via mensagens assíncronas e eventos, Separação clara entre código da extensão e
código do webapp, Comunicação via mensagens, Componentes isolados sem
dependências externas além do React, Separação clara entre componentes visuais e
assets estáticos, Importação relativa para recursos locais, Separação clara
entre tipos e componentes, Componentes isolados sem estado global, Separa lógica
de persistência (RecordingService) da geração de código (genCypressCode),
Comunicação entre módulos via mensagens do Chrome Runtime, Separação clara entre
hooks, utilitários e tipos, Dependência unidirecional dos hooks para utils e
types, Módulos separados por responsabilidade: armazenamento, execução de
scripts, manipulação de abas, Separação clara entre tipos, builders e
componentes, Dependência unidirecional de tipos para componentes, Separação
clara entre UI (components) e lógica de geração (builders), Tipos centralizados
em pasta types para consistência, Separação clara entre UI (components) e lógica
de negócio (builders, recorder), Comunicação via props e callbacks, Uso de hooks
para estado e efeitos colaterais, Isolamento do componente Highlighter com
importação explícita de estilos, Separação clara entre UI (ControlBar) e
bootstrap script, Isolamento via shadow DOM para evitar poluição global,
Recorder encapsula toda lógica de captura e armazenamento, Utils e builders são
módulos auxiliares desacoplados, Comunicação com background via chrome.runtime é
isolada, Separação clara entre UI (TriggerButton) e lógica de gravação (hooks,
endRecording), Separação clara entre UI (Popup) e lógica de negócio (builders,
storage), Hooks para encapsular estado e lógica reutilizável, Componentes
isolados para cada funcionalidade (LastStepPanel, RecordingHistory), Módulo
analytics isolado, dependente apenas de utils externos, Separação clara entre
componentes e estilos, Importação explícita de estilos por componente, Separação
clara entre funções utilitárias, lógica de busca e otimização, Separação clara
entre tipos, geração de scripts e renderização de templates, Dependência
unidirecional do builder para o renderer, Separação clara entre tipos,
utilitários e lógica de seleção, Dependência unidirecional para evitar
acoplamento, Separação clara entre código TypeScript e assets estáticos via
módulos declarados, Separação clara entre módulos de compatibilidade e lógica de
negócio, Módulo de ações isolado para fácil extensão, Utilitários separados para
validação e helpers, Dependência unidirecional das ações para utils, Separação
clara entre código fonte e build, Resolução de módulos via Node.js, Separação
clara entre configuração (webpack.config.js) e execução (build script), Módulo
isolado para configuração, sem dependências externas, Separação clara entre
configuração (config) e execução (server), Dependência unidirecional do servidor
para configuração, Separação clara entre scripts de background, popup e content
scripts, Uso de aliases para segregar módulos secretos e hot reload, Separação
clara entre código fonte e artefatos gerados, Separação clara entre tipos e
funções utilitárias, Dependência unidirecional de tipos para funções, Separação
clara entre lógica de construção de scripts e testes, Mocks usados para isolar
dependências, Separação clara entre testes e código da extensão, Uso de imports
explícitos para Playwright e Jest, Separação clara entre componentes visuais e
utilitários CSS, Componentes isolados com props bem definidas, Hooks encapsulam
lógica de estado e efeitos colaterais, Utilitários desacoplados para manipulação
de dados e downloads, Componentes isolados com props para comunicação, Serviços
externos encapsulados em módulos específicos, Utilitários desacoplados para
reutilização, Separação clara entre estilos globais e componentes específicos,
Separação clara entre tipos, serviços, armazenamento e geração de código,
RecordingService depende de recordingStore e builders para persistência e
geração, Separação clara entre tipos, store e ações, Dependência unidirecional
do store para tipos e ações, Separação clara entre tipos, backend e lógica de
gravação, Dependência unidirecional do backend para tipos, Separação clara entre
lógica React e estilos CSS, Importação de temas via index.jsx, Componentes
isolados sem dependências internas complexas, Separação clara entre tema e
layout, Estilos específicos para views distintas, Componentes isolados com props
explícitas, Separação clara entre lógica e apresentação, Estilos isolados por
componente para evitar vazamento de CSS, Separação clara entre containers,
cabeçalhos, conteúdo e ações, Estilos isolados para RecordingHistory,
Dependência de variáveis CSS globais, Separação clara entre estilos de histórico
e detalhes, Modularidade visual para componentes reutilizáveis, Separação clara
entre preparação de dados (createTestFilename, prepareTestDownload) e execução
do download (downloadTestFile), Módulo isolado sem dependências externas,
exporta funções puras, Estilos isolados para o componente RecordingDetail,
Separação clara entre header, content, toolbar e views, Separação clara entre
estilos e lógica funcional, Isolamento do componente RecordingHistory, Separação
clara entre estilos globais e específicos do popup, Isolamento do tema via
classe raiz .ds-dark, Separação clara entre camada de dados, lógica de negócio e
interface, recordingStore encapsula lógica de armazenamento e migração, script
de migração orquestra chamadas ao recordingStore e manipula estado de migração,
Separação clara entre tipos, executores e listener de mensagens, Dependência
unidirecional da factory para executores, Comunicação via mensagens entre
background e content script, TemplateRenderer isolado para geração de código,
Tipos e enums importados de módulos específicos, Testes separados do código de
produção, Separação clara entre tipos, hooks e API de replay, Comunicação via
mensagens assíncronas entre frontend e background, api/ comunica com background/
via mensagens, types/ contém definições compartilhadas, background/ gerencia
estado e lógica de replay, Separação clara entre tipos, configurações e lógica
de negócio, ConfigManager encapsula lógica de configuração, Exporta funções
públicas para acesso externo, Separação clara entre tipos (Action) e executores,
Executor abstrato serve como base para implementações específicas, Executors
isolam lógica de execução de ações, Tipos importados de módulos específicos para
tipagem forte, Dependência unidirecional do executor para base e tipos,
Separação clara entre tipos, executores e fábrica, Fábrica depende de executores
e tipos, mas executores são independentes, Executors isolam lógica de interação
com UI, Base executor define contratos e funcionalidades comuns, Separação clara
entre tipos (types) e executores (executors), Dependência unidirecional do
executor para tipos, Executors isolados por tipo de ação, Tipos centralizados em
pasta específica, Dependências unidirecionais para evitar acoplamento, Executors
isolam lógica de ações específicas, Comunicação com background script
encapsulada em métodos privados, Comunicação via mensagens com background
script, Tipos compartilhados em pasta types, Tipos compartilhados em módulo
comum, Tipos centralizados em pasta types, Separação clara entre API,
configuração e tipos, API depende de config e types, Config e types
independentes entre si, Módulo de replay isolado com tipos e eventos próprios,
Dependência explícita apenas de tipos importados de session, Replay module
isolado para lógica de replay, Separação clara entre tipos, enums e lógica,
EventBus isolado como módulo independente, Módulos consumidores dependem apenas
da interface do EventBus</module_boundaries> </architecture_patterns>
<code_standards> <style_guide>Airbnb JavaScript Style Guide, Airbnb JavaScript
Style Guide adaptado para TypeScript, Airbnb TypeScript Style Guide, Airbnb
JavaScript/TypeScript Style Guide, Airbnb JavaScript Style Guide (implícito),
CSS standard conventions, CSS Standard Style Guide, Guia de estilo TypeScript
padrão, possivelmente Airbnb ou similar, Airbnb JavaScript Style Guide para
React, CSS Standard, Uso consistente de variáveis CSS, CSS padrão com variáveis
CSS para temas, CSS3 com uso de variáveis CSS, CSS padrão, uso consistente de
variáveis CSS, CSS moderno com variáveis e flexbox/grid, Uso consistente de
nomenclatura e organização, Guia de estilo CSS moderno com variáveis e flexbox,
Uso consistente de espaçamentos e cores via variáveis, CSS Standard Practices,
BEM Methodology, CSS3 standard, CSS moderno com variáveis, comentários claros,
TypeScript Standard Style, Uso consistente de interfaces e enums</style_guide>
<linting_rules>ESLint with React plugin, extends react-app, globals chrome
readonly, .eslintrc.json, ESLint com regras para TypeScript, Regras para evitar
any e garantir tipagem forte, ESLint com plugins para React, import, jsx-a11y e
hooks, .eslintrc.json com regras para ES6, browser, node, ESLint com regras para
ES2021 e ambiente browser/extension, ESLint com regras para TypeScript e
ambiente browser, .eslintrc.json com regras para TypeScript e JS, ESLint com
regras padrão React, .eslintrc.js com regras para React e JSX, ESLint com regras
padrão Airbnb, ESLint com regras para TypeScript, incluindo checagem de tipos e
uso de async/await, ESLint com regras para React e TypeScript, ESLint com regras
para evitar uso de any, garantir async/await correto e evitar callbacks
aninhados, .eslintrc.json com regras para React, TypeScript e JSX, ESLint com
regras para React, TypeScript e hooks, Proibição de uso de any exceto em casos
controlados, ESLint com regras para evitar duplicidade e garantir tipagem,
Proibição de any exceto em casos controlados, ESLint com regras padrão para
TypeScript, Proibição de any explícito, Proibição de any implícito, Uso de
strict null checks, Proibição de catch vazio sem tratamento, ESLint com regras
para importação de módulos estáticos, .eslintrc.json com regras para TypeScript
e compatibilidade ES6, Regras para evitar código morto e imports não usados,
skipLibCheck:true para ignorar checagem de libs externas, strict:true para
checagem rigorosa, .eslintrc.json com regras para ES6+, .eslintrc.json com
regras para ES6+, node environment, eslint com regras padrão Airbnb e suporte a
TypeScript, Sem uso de any exceto em mocks, Possível uso de stylelint com regras
para propriedades e ordem, Proibição de any explícito exceto em casos
justificados, ESLint com regras para React e TypeScript, incluindo hooks e
acessibilidade, stylelint com regras padrão para CSS3, Regras típicas para
TypeScript, incluindo verificação de tipos e uso de async/await, Regras para
evitar any implícito e garantir tipagem forte, ESLint com regras para TypeScript
estrito, stylelint para CSS, eslint para JS/React, .eslintrc.json com regras
para React e TypeScript, Possível uso de stylelint com regras para variáveis e
propriedades, Não especificado no código, Regras para evitar side effects em
funções puras, stylelint com regras para evitar !important e garantir
consistência, stylelint com regras para CSS moderno e variáveis, Não
especificado, .eslintrc.json com regras para evitar any, uso de const, e
indentação de 2 espaços, ESLint com regras para async/await, uso de promises e
tratamento de erros, ESLint com regras para TypeScript, incluindo regras para
evitar any e garantir tipagem forte, ESLint com regras para TypeScript e Chrome
Extensions, ESLint com regras para TypeScript, incluindo verificação de tipos e
estilo, ESLint com regras para async/await, no-console warnings, ESLint com
regras para async/await, no-explicit-any, e preferências de tipagem, ESLint com
regras para async/await, uso de console.log restrito, Uso obrigatório de
async/await para operações assíncronas, ESLint com regras para async/await,
promises e uso de console.log restrito, .eslintrc.json com regras para
TypeScript e React, ESLint com regras para async/await, no-unused-vars,
consistent-return, Regras para imports ordenados, Provável uso de ESLint com
regras para TypeScript, Sem regras explícitas no código fornecido, ESLint com
regras para TypeScript, sem uso de any, Proibição de console.log em produção,
ESLint com regras para evitar any implícito e garantir tipagem
forte</linting_rules> <formatting>Prettier, singleQuote: true, trailingComma:
es5, printWidth: 80, proseWrap: always, arrowParens: always, Prettier com
configuração padrão para TypeScript, Prettier com configuração padrão, Prettier
com configuração padrão para JavaScript/TypeScript, Prettier com configuração
padrão para JS, Prettier com configuração padrão para React, Prettier com
configuração padrão para 2 espaços e aspas simples, Prettier com configuração
padrão para React e TypeScript, Prettier com configuração padrão para
espaçamento e aspas simples, Prettier para formatação automática com padrão de 2
espaços, Prettier com configuração padrão para projetos React, Prettier com
configuração padrão para TypeScript e React, Prettier com configuração padrão
para JS/TS, Consistent indentation and spacing, Prettier para CSS, Prettier
configurado para espaçamento e indentação padrão, Prettier com configuração
padrão para CSS e JS, Indentação de 2 espaços, Quebra de linha após blocos,
Indentação consistente, Uso de comentários para seções, Uso de espaços para
alinhamento, Uso de espaços para separação, Prettier configurado para CSS com
indentação de 2 espaços, Indentação consistente, uso de comentários para seções,
Prettier com configuração padrão, max-len 100, Prettier com configuração padrão
para 2 espaços, Prettier para formatação automática, Prettier com configuração
padrão, 2 espaços, aspas simples</formatting> <documentation_style>JSDoc, JSDoc
para funções e classes principais, JSDoc para funções e tipos, JSDoc para
funções e componentes principais, JSDoc para funções e módulos, JSDoc para
funções e módulos principais, Comentários inline simples, sem JSDoc explícito,
JSDoc para funções e componentes, JSDoc para comentários de funções e
componentes, JSDoc para funções e métodos públicos, JSDoc para funções e hooks,
JSDoc para funções públicas e complexas, JSDoc para funções e componentes
públicos, JSDoc para funções e interfaces, JSDoc para documentação inline de
funções e classes, Comentários inline e JSDoc para funções principais,
Comentários inline explicativos em português, JSDoc para funções públicas e
componentes, JSDoc para documentação de funções e componentes, JSDoc para
funções públicas, JSDoc para funções públicas e classes, JSDoc para declarações
de tipos, JSDoc para classes e métodos públicos, JSDoc para documentação inline,
Inline comments para propriedades específicas, JSDoc para funções e componentes
React, Comentários CSS padrão, JSDoc para documentação de métodos e classes,
JSDoc para documentação de interfaces e funções, Comentários CSS inline, JSDoc
para componentes React, JSDoc para comentários de componentes, Comentários em
português explicativos, Comentários CSS simples para seções, Comentários simples
para seções, Comentários mínimos, apenas cabeçalho do arquivo, Comentários em
português explicando blocos principais, Comentários CSS explicativos para seções
e blocos, Comentários em português para contexto, JSDoc para funções e classes,
JSDoc para funções públicas e comentários explicativos, JSDoc para documentação
de funções e interfaces, JSDoc para comentários de funções e interfaces, JSDoc
para comentários de métodos e classes, JSDoc para métodos públicos e classes,
JSDoc para documentação de classes e métodos, JSDoc para documentação de classes
e métodos públicos, JSDoc para funções e tipos exportados, Comentários sucintos
e técnicos, JSDoc para interfaces e enums</documentation_style>
<type_checking>TypeScript optional, not explicit here, TypeScript strict mode,
Strict TypeScript, TypeScript strict mode habilitado, Nenhum type checking
explícito (JavaScript puro), Nenhum type checking estrito (JavaScript puro),
Strict TypeScript com tipagem explícita e interfaces, JavaScript sem tipagem
estática, Possível uso futuro de TypeScript, PropTypes ou TypeScript (não
aplicável neste arquivo), Strict TypeScript com checagem completa de tipos,
Strict TypeScript com tipagem explícita para funções assíncronas e objetos,
Strict TypeScript typings, Strict TypeScript com checagem completa, Strict
TypeScript com tipagem explícita para props e estados, Strict TypeScript com
tipagem explícita para eventos e ações, Strict TypeScript enabled, PropTypes
para validação de props React, Sem TypeScript, Strict TypeScript (noImplicitAny,
strictNullChecks), Uso extensivo de tipos e interfaces, Strict TypeScript
(strict mode habilitado), strict TypeScript com exceção para
strictPropertyInitialization:false, Nenhum (JavaScript puro), Strict TypeScript
com ts-loader, Strict TypeScript com checagem rigorosa de tipos, Strict
TypeScript com checagem completa de tipos e interfaces, Strict TypeScript com
tipos explícitos para entradas e saídas, Strict TypeScript com interfaces e
tipos explícitos, TypeScript strict mode para React, Strict TypeScript (strict
mode ativado), Não aplicável para CSS, TypeScript strict mode desativado, uso
parcial de tipagem, Strict TypeScript com checagem completa de tipos e
promessas, Strict TypeScript com checagem rigorosa, Strict TypeScript com
tipagem explícita para estados e ações, Strict TypeScript com configuração no
tsconfig.json para noImplicitAny e strictNullChecks, Sem uso de any implícito,
Tipos explícitos para parâmetros e retornos, Strict TypeScript com configuração
no tsconfig.json, Strict TypeScript com tipos discriminados, Uso de union types
para segurança de tipos, Strict TypeScript mode ativado, Sem uso de any
explícito, NoImplicitAny enabled</type_checking> </code_standards>
<testing_strategy> <test_framework>Jest, Playwright Test Runner, Jest 29.x, Jest
27.3.1, Jest 29, Jest 29 para testes unitários e integração, React Testing
Library, Não detectado no código fornecido, Cypress (para testes end-to-end),
Jest 29 (implícito para front-end), Possível uso de Jest para testes unitários
(não explícito no código), Jest 29 para testes unitários de componentes React
associados, Jest (para lógica JS/TS associada)</test_framework>
<test_structure>**tests** folders or _.test.js files, tests/ unitários e
integração, tests/e2e/ para testes end-to-end, tests/unit/ para testes
unitários, Testes localizados em pasta **tests** ou arquivos _.test.ts, tests/
com testes unitários e cobertura configurada via jest.config.js, tests/unit para
testes unitários, tests/integration para testes de integração, Testes
localizados em pastas **tests** próximas aos módulos, tests/unit/,
tests/integration/, Testes localizados em **tests** ou pasta
components/**tests**, Testes localizados em **tests** ou pasta **specs** ao lado
do componente, tests/components para testes de componentes React, Testes
localizados em **tests** próximos aos módulos correspondentes, tests/hooks -
testes unitários para hooks, **tests** folders próximos aos componentes, Testes
unitários para renderização e lógica condicional, Testes localizados em
**tests** dentro de cada pasta de componente, Testes unitários localizados em
**tests** próximos aos componentes, Testes de integração para fluxo de gravação
e geração de código, **tests** folder ao lado do componente, Testes localizados
em **tests** próximos aos componentes, Testes unitários localizados em **tests**
próximos aos módulos, Testes de integração para simulação de eventos DOM, Testes
localizados em pasta **tests** ao lado dos componentes, Testes unitários para
hooks e componentes, Testes de integração para fluxo de gravação, tests/
unitários e de integração próximos aos componentes, test/unit para testes
unitários, test/integration para testes de integração, Testes organizados em
arquivos separados por feature, Uso de describe/it para estruturação, Testes
unitários em pasta **tests** ao lado dos módulos, Testes localizados em
**tests** ou pasta tests, Testes localizados em /tests/actions, Testes unitários
para validação de enums e classes, tests/ localizados paralelamente ao código
fonte, Testes localizados em pastas **tests** próximas ao código fonte,
/coverage para relatórios de teste, tests/utils - testes unitários para funções
utilitárias, Testes organizados por describe e test, Mocks e spies para
isolamento, Testes organizados em blocos beforeAll, afterAll e test, Uso de
async/await para controle assíncrono, Testes de integração para hooks e
interações UI, Testes unitários e de integração, Testes localizados em pasta
separada, cobrindo serviços e integração com store, Testes localizados em
**tests** dentro do diretório src/store, Testes unitários para métodos do
RecordingStore, Testes unitários em **tests**/ para cada módulo, Mocks para
backend e ações, Testes localizados em **tests** dentro da pasta components,
Testes unitários para funções utilitárias em src/utils/**tests**, Testes
localizados em src/components/RecordingDetail/**tests**, /tests/unit para testes
de componentes e estilos, Testes localizados em **tests** próximos aos módulos,
Testes unitários para recordingStore e scripts de migração, Testes organizados
em describe e it, localizados próximos ao código fonte, Testes localizados em
**tests** próximos aos hooks e APIs, tests/api/ para testes das funções de API,
Testes localizados em **tests** dentro do diretório src/config, Testes
localizados em **tests** próximos aos executores, Testes localizados em
**tests** próximos aos executors, Testes localizados em **tests** próximos aos
executores e fábrica, Testes unitários localizados em **tests** próximos aos
executors, Testes localizados em **tests** ao lado dos executores, Testes
unitários para cada executor, Testes localizados em **tests** dentro da pasta
executors, Testes unitários para métodos execute e sendMessageToBackground,
Testes localizados em **tests** dentro do diretório executors, Testes
localizados em **tests** dentro de cada módulo, Cobertura para mensagens e
eventos, tests/unit/replay/, tests/integration/replay/,
tests/unit/eventbus.test.ts, Testes focados em registro, emissão e remoção de
eventos</test_structure> <coverage_requirements>Minimum 80% coverage, &gt;= 80%,
Cobertura mínima de 80%, Cobertura mínima de 80% para módulos críticos, &gt;=
80% cobertura, Cobertura mínima de 80% para componentes visuais, Cobertura
mínima de 80% para funções críticas de armazenamento e execução, Cobertura
mínima de 80% para componentes críticos, Cobertura mínima de 85% para lógica
crítica, Cobertura mínima de 80% para componentes UI e hooks, Cobertura mínima
de 90%, Cobertura focada em fluxos críticos de UI, Cobertura mínima de 90% para
módulos críticos, &gt;= 90% cobertura para funções críticas, Cobertura focada em
funcionalidades críticas da extensão, Cobertura alta para métodos críticos como
createRecording e importMany, Cobertura mínima de 80% para store e migrações,
Cobertura mínima de 85%, &gt;= 80% coverage, Cobertura mínima de 90% para
funções críticas, Cobertura mínima de 90% para funções utilitárias, Cobertura
mínima de 80% para componentes visuais e interações, Cobertura mínima não
explicitada, mas testes cobrem casos críticos de comportamento, Cobertura mínima
de 80% para hooks e lógica crítica, Cobertura mínima de 80% para funções
críticas, Cobertura mínima de 80% para executores, Cobertura mínima de 90% para
executores, Cobertura mínima de 85% para módulos de replay, Cobertura mínima de
90% para o módulo EventBus</coverage_requirements> <test_patterns>AAA
(Arrange-Act-Assert), AAA, Given-When-Then, AAA (Arrange, Act, Assert),
Given-When-Then para testes comportamentais, Arrange-Act-Assert (AAA), Snapshot
testing para componentes visuais, Snapshot Testing, Renderização e
acessibilidade, Mocks para eventos DOM e APIs externas, Given-When-Then para
clareza em cenários de eventos, Mocking de hooks e APIs do Chrome,
Given-When-Then para testes de fluxo, Uso de comentários para descrever ações,
Behavior Driven Development (BDD) style, Mocking de serviços externos, AAA
(Arrange-Act-Assert) para clareza e manutenção, Snapshot Testing para
componentes visuais, Behavior Driven Testing, Given-When-Then para cenários de
migração e inicialização, Testes unitários focados em comportamento e validação
de erros, Mocking de chamadas assíncronas e listeners, Mocks para simular DOM e
ações, Mock de dependências externas</test_patterns> <mocking_approach>jest.mock
for modules, jest.mock, fixtures, Mocks para APIs de navegador, Fixtures para
dados de entrada, Mocks com Jest e ts-jest, Mocks via Jest para dependências
externas e APIs do browser, Mocks para APIs externas e mensagens entre scripts,
Mocks para APIs do Chrome e dependências externas, Mocks para chrome.runtime e
window.postMessage, Mocks para dependências externas se houver, Mock de assets
estáticos para testes, Mocks para props e funções callback, Mocks para serviços
externos e APIs do Chrome Runtime, Mock de localStorage e chrome.storage APIs,
Mock de APIs chrome.storage e chrome.tabs usando jest-mock, Mock de funções
auxiliares e tipos externos, Mocks para funções auxiliares e dependências
externas, Mock de chrome.storage e Clipboard API, Mock de timers para
confirmações visuais, Mocks para props e estilos, Mocks para APIs do navegador e
funções globais, Mocks para chrome.storage e eventos DOM, Fixtures para simular
diferentes tipos de eventos, Mocks para chrome.runtime.sendMessage e
document.querySelector, Mocks para APIs do Chrome, Fixtures para dados de
gravação, Mocks para dependências externas e estilos, Mocks para DOM APIs e
querySelectorAll, Mocks para APIs externas não presentes no código analisado,
Mocks para finder e elementos DOM, Mocking de módulos estáticos via Jest mocks,
Mocks para APIs do navegador, Mocks para simular interações DOM e
temporizadores, Mocks para Webpack e WebpackDevServer APIs, Mocks com Jest e
fixtures para simular APIs e módulos, Mocks para Date.now() para controle de
tempo em testes, Jest spies para interceptar chamadas de métodos, Uso mínimo de
mocks, testes end-to-end reais com navegador, Mocks para hooks externos
(useReplay), Fixtures para dados de gravação simulados, Mock de RecordingService
para simular respostas e erros, Mock do recordingStore para isolar testes de
serviço, Mock da API chrome.storage.local, Fixtures para entradas de gravação e
ações, Mocking de IHistoryBackend para simular persistência, Mocks para APIs e
serviços externos, Mocks para callbacks e props, Mock de APIs Web (Blob, URL)
para testes isolados, Não aplicável - funções puras sem dependências externas,
Mocks para APIs de dados e eventos de usuário, Fixtures para estados de gravação
e erro, Mocks para APIs de arquivos e eventos DOM, Uso de jest.mock para
dependências externas, Mocks para chrome.storage.local e recordingStore, Mocks
para chrome.runtime e executores de ação, Mocks mínimos, foco em dados reais
para contexto de renderização, Mock de chrome.runtime.onMessage e funções de
replay, Mock de chrome.runtime.sendMessage para simular respostas, Mocks para
dependências externas e timers, Mock de chrome.storage com jest-mock, Uso de
jest.mock para simular document.querySelector e timers, Mocks para
waitForElement e dispatchEvent, Mocks para dependências externas e ações, Mocks
para waitForElement e delay para simular comportamento assíncrono, Mock de
window.location e timers para simular navegação e delays, Mock de
window.location para testes de navegação, Mock de chrome.runtime.sendMessage
para simular respostas e erros, Mocks para window.scrollTo e timers com
jest.useFakeTimers, Mocks para DOM e eventos, Fixtures para ações simuladas,
Mocks para APIs e hooks, Fixtures para estados de replay, Mocks para
ReplayOptions, ReplayProgress, ReplayResult, Fixtures para simular sessões e
eventos, Mocks para Action e APIs externas, Fixtures para estados de sessão,
Mocks para handlers de eventos usando Jest mocks</mocking_approach>
</testing_strategy> <development_workflow> <branch_strategy>GitHub Flow, Git
Flow com branches feature, develop e main, GitHub Flow com branches feature,
main e hotfix, GitHub Flow com branches feature, main protegida, Git Flow,
GitFlow</branch_strategy> <commit_conventions>Conventional Commits, Conventional
Commits para mensagens padronizadas, Conventional Commits para padronização e
automação</commit_conventions> <pr_requirements>Code review mandatory, CI
checks, code review obrigatório, checks automáticos, Revisão obrigatória, Checks
de CI passando, Code review obrigatório, Checks de CI, Revisão obrigatória,
testes passados e linting aprovado, Revisão obrigatória por pelo menos um
revisor, Checks automáticos de lint e testes, Revisão obrigatória com pelo menos
2 aprovadores, Checks de lint e testes, Revisão obrigatória por pelo menos um
membro do time, Revisão obrigatória e testes passando antes do merge, Revisão
obrigatória por pelo menos um membro, Checks automáticos de lint, build e
testes, Revisão obrigatória e testes automatizados, Revisão obrigatória por pelo
menos um peer, Revisão obrigatória e testes automatizados aprovados, Revisão
obrigatória e testes aprovados, Testes passando, Checks automáticos, Revisão
obrigatória por pelo menos 2 desenvolvedores, Build deve passar sem erros,
Testes automatizados passando, Revisão obrigatória e testes automatizados
passando, Checks de lint e testes automatizados, Code review obrigatório e
testes aprovados, Revisão obrigatória por pelo menos 2 membros, Revisão
obrigatória, testes automatizados passando, Revisão obrigatória e testes
aprovados antes do merge, Revisão obrigatória, testes aprovados, linting sem
erros, Revisão obrigatória por pelo menos 2 desenvolvedores, testes aprovados,
Revisão obrigatória por pelo menos um desenvolvedor</pr_requirements>
<ci_cd_pipeline>Linting, Testing, Build, build, test, deploy, Testes unitários e
E2E, Lint, Deploy para Chrome e Firefox, Execução de testes automatizados,
Build, Test, Lint e Deploy automatizados via GitHub Actions, Build, lint, test e
deploy automatizados via GitHub Actions, Build, Test, Lint, Deploy, Build, lint,
test e deploy automatizados, Build, Test, Lint, Deploy stages, Pipeline CI
executando lint, testes e build, Deploy manual para produção após aprovação,
Pipeline com etapas de build, lint, test e deploy automatizado, Build, Test,
Lint, Deploy automáticos, Testes, Deploy automático, Build automatizado via CI,
Deploy condicionado a build sem erros, Build, Test, Lint, Deploy Staging, Build
automático, lint, testes e deploy para staging e produção, Test, Deploy
automático em staging, Build da extensão, Deploy automatizado, Build, lint, test
e deploy automatizados via GitHub Actions ou similar, Deploy automático para
staging, Testes unitários, Build, Test, Lint, Deploy automatizados via GitHub
Actions, Build, lint, test stages automatizados, Build, Test, Lint, Deploy
automático para staging e produção, Build, Test, Lint, Deploy automatizados,
Build e testes automáticos no push, Deploy automático em branch main, Build,
lint, test, deploy automático para staging e produção</ci_cd_pipeline>
</development_workflow> <commands> <setup>npm install, yarn, yarn install, npm
install ou yarn install, git clone &lt;repo-url&gt; &amp;&amp; cd
&lt;repo-folder&gt; &amp;&amp; npm install, npm install &amp;&amp; npm run
setup, npm install &amp;&amp; npm run setup-db, npm install &amp;&amp; npm run
build</setup> <install>npm install, yarn install, npm ci</install> <dev>npm
start, npm run dev, yarn run start-chrome, yarn run start-ff, yarn start-chrome,
yarn start-ff, yarn start, npm run watch, npm run start, node scripts/start.js,
npm run start:dev</dev> <test>npm test, yarn test, npm run test, npx cypress
open</test> <build>npm run build, yarn run build-chrome, yarn run build-ff, yarn
build-chrome, yarn build-ff, yarn build, node scripts/build.js</build> <lint>npm
run lint, eslint src/ --ext .ts,.tsx, eslint . --ext .js,.jsx,.ts,.tsx, yarn
lint</lint> <format>npm run format, prettier --write src/, prettier --write .,
yarn format</format> </commands> <security_constraints>
<authentication_method>Nenhum método de autenticação implementado na extensão,
OAuth2 para comunicação externa com DeploySentinel, Autenticação via tokens
gerenciados externamente (não visível no código), OAuth2 via DeploySentinel
Webapp, OAuth2 (externo, presumido para acesso ao sistema), Nenhum método de
autenticação implementado diretamente neste módulo, Nenhum método de
autenticação implementado neste componente, Não aplicável diretamente (foco em
captura local de eventos), OAuth2 via Chrome Extension permissions, Nenhum
método de autenticação implementado no código analisado, Nenhum método de
autenticação implementado, Não aplicável (biblioteca client-side), Não aplicável
diretamente neste módulo, Nenhum método de autenticação implementado neste
arquivo, Nenhum método de autenticação implementado no build, Nenhum método de
autenticação implementado no código de teste, Token-based Authentication (JWT)
via API externa, Não aplicável diretamente no componente (depende do backend),
Não aplicável diretamente no serviço de gravação, Não aplicável (extensão
local), Autenticação via token JWT para acesso ao backend, N/A (funcionalidade
client-side sem autenticação), JWT com expiração curta, Não aplicável (script
local de migração), OAuth2 via Chrome Identity API (externo ao script),
Token-based Authentication (JWT) para backend de replay, Chrome Identity API
(implícito), Não aplicável (configuração local), Não aplicável diretamente
(execução local em browser), Não aplicável diretamente no executor, OAuth2
(externamente para APIs que requerem autenticação), OAuth2 (externo ao
executor), Não especificado no módulo, presumivelmente JWT ou OAuth2 no sistema
maior, JWT, Não aplicável - módulo interno sem
autenticação</authentication_method> <authorization_rules>Controle de permissões
via manifest.json para acesso a APIs do browser, Permissões explícitas no
manifest para acesso a abas, scripting e armazenamento, Gravação restrita à aba
e frame autorizados, Validação de permissões antes de executar comandos,
Validação de origem das mensagens, Permissões restritas na extensão, Controle de
acesso baseado em roles para gravação e visualização, Controle de acesso baseado
em permissões do navegador para execução de scripts, Controle de acesso não
aplicável diretamente, Acesso restrito ao armazenamento local do navegador,
Eventos filtrados para evitar captura de dados sensíveis de overlays, Permissões
restritas para comunicação entre extensão e UI, Controle de acesso baseado em
contexto da aba ativa e permissões do navegador, Não aplicável, Não aplicável
diretamente neste módulo, Nenhuma regra de autorização aplicada, Controle de
acesso via permissões declaradas no manifest.json, Controle de acesso via
contexto do navegador isolado, Controle de acesso baseado em roles para iniciar
e parar replays, Confirmação explícita para exclusão de gravações, Controle de
acesso via backend, Controle de acesso deve ser aplicado externamente ao
serviço, Controle local, sem múltiplos níveis de acesso, Controle de acesso
baseado em roles para operações de gravação e leitura, N/A, Controle baseado em
roles e permissões granulares, Controle de acesso via permissões do Chrome
Extension, Execução restrita a ações definidas e validadas pela factory,
Controle de acesso baseado em sessão para manipulação de replays, Controle de
acesso via permissões da extensão, Controle de acesso via permissões da extensão
Chrome, Não aplicável diretamente no executor, Permissões restritas para
execução de ações de redimensionamento, Permissões para extensão Chrome
definidas no manifesto, Controle de acesso para comandos de replay baseado em
sessão, Controle de acesso baseado em roles para iniciar e visualizar sessões,
Não aplicável - controle interno de eventos</authorization_rules>
<sensitive_data>Dados de interação do usuário capturados localmente, não
transmitidos externamente, Dados de navegação do usuário tratados localmente,
sem envio externo não autorizado, URLs e dados de navegação armazenados
localmente sem exposição externa, URLs de teste, Códigos de gravação, URLs e
timestamps são tratados como dados sensíveis e armazenados localmente, URLs
capturadas durante gravação são armazenadas localmente sem criptografia,
Password inputs are masked with asterisks, Senhas mascaradas na exibição de
ações de input, Dados sensíveis não armazenados persistentemente, Campos
password detectados e marcados para tratamento especial, Nenhum dado sensível
manipulado diretamente, URLs e dados de gravação armazenados localmente sem
criptografia explícita, Client ID anonimamente gerado, sem dados pessoais, Não
manipula dados sensíveis, Campos isPassword indicam tratamento especial para
dados sensíveis, Segredos carregados via arquivo secrets.{env}.js, não
versionados, Arquivos .env locais, secrets._.js, Dados do usuário armazenados
temporariamente em /tmp, Tokens de autenticação armazenados em memória segura,
Dados pessoais não manipulados diretamente neste componente, Dados de gravação
de sessões, URLs e ações do usuário, tratados com cuidado na
exportação/importação, URLs e ações de usuário são dados sensíveis e devem ser
protegidos, URLs e ações de gravação devem ser armazenadas localmente e não
expostas, URLs e tokens devem ser armazenados criptografados, Dados pessoais
criptografados em repouso e em trânsito, URLs originais das gravações devem ser
protegidas contra exposição indevida, Nenhum dado sensível manipulado
diretamente pelo script, Sanitização de URLs para evitar XSS, Session IDs e
tokens devem ser tratados com confidencialidade, Session IDs e recording IDs
tratados com cuidado, Nenhum dado sensível armazenado, Não manipula dados
sensíveis diretamente, Campos password não expostos em logs, Nenhum dado
sensível manipulado, Timestamp da ação não sensível, nenhuma informação pessoal
manipulada, IDs de sessão e gravação tratados como dados sensíveis, Tokens JWT,
logs de erro com dados pessoais anonimizados</sensitive_data>
<security_headers>Headers padrão do browser para extensões, Content Security
Policy configurada no manifest, Content Security Policy configurada via
manifest, Gerenciados pelo browser, não configurados diretamente no código,
Content-Security-Policy para mensagens, CSP configurado para extensões Chrome,
Gerenciados pelo navegador, não aplicados diretamente no código, Gerenciados
pelo ambiente host (browser extension), Não aplicável no contexto do código
cliente, Cabeçalhos padrão do Chrome Extension, Não aplicável diretamente no
código da extensão, Não aplicável, Não aplicável diretamente neste módulo,
Access-Control-Allow-Origin: _, Cabeçalhos gerenciados pelo navegador, não
configurados no build, Não aplicável diretamente no código de teste, CORS
configurado na API, Content Security Policy aplicado externamente, Gerenciados
pelo servidor, não aplicável no frontend, Não aplicável diretamente no código
analisado, Não aplicável (extensão local), CORS configurado para domínios
autorizados, Headers CSP para proteção contra XSS, N/A (funcionalidade
client-side), Content-Security-Policy, X-Frame-Options,
Strict-Transport-Security, Não aplicável para script local, Cabeçalhos
gerenciados pelo navegador e extensão, CORS, CSP e headers padrão para proteção
contra ataques comuns, Não aplicável diretamente no executor,
Content-Security-Policy configurado no manifesto da extensão, Cabeçalhos
aplicados pelo navegador, não gerenciados diretamente, Não aplicável diretamente
neste código</security_headers> <encryption_requirements>Nenhuma criptografia
específica implementada, dados sensíveis não armazenados, Criptografia padrão do
navegador para armazenamento local, Dados armazenados no chrome.storage.local
sem criptografia explícita, TLS para comunicação web, Dados armazenados
localmente não são criptografados, mas comunicação via messaging é segura,
Nenhuma criptografia aplicada no armazenamento local, Nenhuma criptografia
implementada neste módulo, Persistência local sem criptografia explícita,
depende do ambiente do navegador, Comunicação segura via mensagens internas do
Chrome, Nenhuma criptografia implementada para dados locais, Não aplicável, Não
aplicável diretamente neste módulo, Nenhuma criptografia aplicada, Nenhuma
criptografia aplicada no processo de build, Comunicação via HTTPS obrigatória,
Dados sensíveis devem ser transmitidos via HTTPS, Dados em trânsito e em repouso
devem ser criptografados conforme política da empresa, Criptografia AES-256 para
dados sensíveis em repouso, N/A, TLS 1.3 para comunicação, AES-256 para dados
armazenados, Dados armazenados no chrome.storage.local não são criptografados
por padrão, Comunicação segura via HTTPS e protocolo da extensão Chrome,
Comunicação via HTTPS e criptografia de dados sensíveis em trânsito, Não
aplicável diretamente no executor, Comunicação segura via HTTPS para APIs
externas, Comunicação interna via chrome.runtime sem criptografia adicional,
Dados de gravação e comunicação devem ser criptografados em trânsito e repouso,
Criptografia TLS para comunicação, Criptografia AES para dados sensíveis em
repouso</encryption_requirements> </security_constraints>
<performance_requirements> <response_time_limits>Scripts gerados devem ser
produzidos em tempo real com latência mínima perceptível, Gravação e geração de
scripts em tempo real com latência mínima, Respostas assíncronas rápidas para
mensagens e eventos do browser, Mensagens processadas em &lt; 100ms,
Renderização instantânea do componente, Renderização instantânea do logo,
Persistência da gravação deve ocorrer em menos de 500ms para boa UX, Operações
de armazenamento e execução de scripts devem ser rápidas para não impactar UX,
Renderização instantânea para blocos de código pequenos a médios, Atualização da
UI com throttle de 100ms para eventos de mouse, Eventos processados em tempo
real com debounce para resize (300ms), Interação do botão deve ser instantânea
(&lt;100ms), Interação UI responsiva com atualizações de estado em tempo real,
Renderização inicial rápida (&lt; 200ms), Resposta em milissegundos para
seletores simples, Limite configurável para tentativas, Ações devem ser
processadas em tempo real para simulação precisa, Baixa latência para hot reload
e rebuild incremental, Build otimizado para minimizar tamanho e tempo de
carregamento, Timeouts configurados para espera de service workers (15s no Jest,
5s na espera explícita), Renderização da interface em menos de 200ms, Geração de
código Cypress em menos de 500ms, Carregamento e filtragem devem ser
responsivos, idealmente &lt; 200ms para datasets moderados, Operações de
listagem e busca devem responder em milissegundos para boa experiência,
Operações de leitura e escrita devem ser rápidas para não impactar UX, Listagem
de gravações em menos de 200ms, Salvamento de gravação em menos de 300ms,
Download deve ser disparado imediatamente após chamada, Funções síncronas com
tempo de execução constante e baixo, Renderização rápida para manter fluidez na
navegação e troca de abas, API responses &lt; 300ms em média, Migração deve ser
rápida para não impactar UX, idealmente &lt; 1s, Resposta imediata para
mensagens PING, Execução assíncrona eficiente para ações, Atualização do estado
do replay em menos de 200ms após evento, Respostas assíncronas rápidas para UX
fluido, Timeouts configurados em 30 segundos para carregamento e ações,
Operações assíncronas rápidas (&lt;100ms em média), Timeout padrão de 5000ms
para espera de elementos, Retries configuráveis para balancear latência e
robustez, Retries com delay de 1s para falhas temporárias, Delay fixo de 1000ms
para garantir início do carregamento, Navegação deve iniciar em até 1 segundo
após comando, Redimensionamento deve ocorrer em até 1 segundo para boa UX,
Resposta da captura de screenshot esperada em até 500ms, Scroll deve completar
em até 1 segundo para UX fluida, Ação de wheel deve completar em até 500ms para
manter fluidez, Operações de controle de replay devem responder em menos de
100ms, Baixa latência para comandos de controle replay (start, pause, stop,
resume), Replay status update em até 200ms, Carga inicial da sessão em até
500ms, Emissão de eventos deve ser síncrona e rápida, idealmente &lt; 1ms por
handler</response_time_limits> <optimization_priorities>Developer experience,
Fast refresh, build speed, bundle size, Baixa latência na captura de eventos,
Uso eficiente de memória durante gravação, Prioridade em velocidade de captura e
geração de scripts, uso moderado de memória, Prioridade para velocidade de
captura e geração de scripts, Baixa latência na gravação e replay, uso eficiente
de armazenamento local, Baixa latência na comunicação, Baixa complexidade, foco
em renderização rápida, Minimizar bundle size, Carregamento rápido, Prioridade
em velocidade de resposta e baixa latência na comunicação entre abas,
Consistência e sincronização em tempo real priorizadas, Baixa latência na
manipulação de estado e execução assíncrona eficiente, Rendering performance to
handle large action lists, Velocidade de renderização e responsividade UI,
Responsividade da interface e baixo impacto no uso de CPU, Renderização rápida,
Baixa complexidade computacional, Minimizar impacto no DOM principal, Isolamento
via shadow DOM para performance UI, Minimizar overhead no thread principal do
navegador, Evitar gravação excessiva e duplicada de eventos, Baixa latência e
mínimo impacto na UI, Prioridade para fluidez da interface e baixa latência na
gravação, Baixa latência na coleta de eventos, mínimo impacto no UX, Velocidade
de renderização e carregamento CSS, Balancear velocidade e seletor
curto/legível, Equilíbrio entre legibilidade do código e performance na geração,
Precisão e estabilidade dos seletores, Minimizar overhead na geração, Build time
efficiency, Minimal runtime overhead, Prioridade para baixa latência e baixo
overhead de memória, Build rápido e eficiente, Compatibilidade com browsers
legados, Build otimizado para produção com minificação e tree shaking,
Velocidade de feedback em desenvolvimento, Minimização do bundle em produção,
source maps em dev, Minimizar latência na validação e migração de timestamps,
Estabilidade e confiabilidade dos testes priorizadas sobre velocidade, Fast
rendering, Minimal repaint on hover, Responsividade UI priorizada sobre uso de
memória, Prioridade em responsividade e experiência do usuário, Font loading
performance, Rendering smoothness, Prioridade em velocidade de acesso e
integridade dos dados, Minimizar número de escritas no storage via debounce,
Balancear uso de memória e persistência, Priorizar velocidade de acesso e baixa
latência, UI responsiveness, Low memory footprint, Renderização rápida e leve,
Baixo consumo de memória, Smooth scrolling, Renderização rápida e leve para UI,
Performance visual e responsividade, Transições suaves para melhor UX,
Responsividade visual, Transições suaves, Responsividade, Suavidade nas
animações, Baixo impacto visual, Baixa latência na criação e disparo do
download, Velocidade e simplicidade, Prioridade em velocidade e responsividade
sobre uso de memória, Responsividade e fluidez visual, Minimizar repaints e
reflows, Visual consistency, Responsividade em resolução 800x600, Prioridade em
velocidade de resposta sobre uso de memória, Prioridade para confiabilidade e
integridade dos dados sobre velocidade, Baixa latência na execução de ações,
Minimização de overhead no listener, Validação rápida e geração eficiente de
templates, Baixa latência e responsividade em UI, uso moderado de memória, Baixa
latência na comunicação entre popup e background, Equilíbrio entre velocidade de
replay e uso de memória via chunkSize e cache, Consistência e confiabilidade
sobre velocidade extrema, Equilíbrio entre robustez e responsividade, evitando
polling excessivo, Robustez e confiabilidade priorizadas sobre latência mínima,
Baixa latência na recuperação do executor, Minimizar instâncias para economia de
memória, Confiabilidade e simulação realista priorizadas sobre velocidade
máxima, Minimizar navegações desnecessárias para melhorar performance,
Velocidade de resposta priorizada sobre uso de memória, Baixa latência na
comunicação assíncrona, Minimizar bloqueios na UI thread, Baixa latência e não
bloqueio da UI thread, Prioridade em suavidade e responsividade, Baixa latência
e mínimo impacto na UI thread, Baixa latência e uso moderado de memória,
Velocidade e confiabilidade na entrega de eventos e mensagens, Velocidade de
execução priorizada sobre uso de memória, Baixa latência na emissão de eventos,
Baixo overhead de memória para listeners</optimization_priorities>
<caching_strategy>cache intermediário de build, Cache local para assets da
extensão, sem cache para dados de interação, Cache local para scripts gerados e
configurações, Uso de armazenamento local para persistência temporária de
gravações, Não aplicável, Cache do navegador para assets estáticos, Uso de
localStorage para cache temporário das gravações, Uso de localStorage e
chrome.storage para persistência local, Uso do chrome.storage.local como cache
persistente local, Nenhuma estratégia explícita de cache, Uso de
chrome.storage.local para persistência e sincronização, Nenhuma estratégia de
cache implementada, Uso de armazenamento local para persistência de gravações,
Cache de CSS via webpack e browser, Nenhum cache persistente implementado, Não
aplicável diretamente neste módulo, Uso de cache via Webpack para builds
incrementais, Webpack caching padrão para builds incrementais, Cache control via
nomeação de arquivos e limpeza do build, Uso de userDataDir para persistência
temporária do contexto do navegador, Cache local para replay com opção de limpar
ou manter, Cache local via estado React, recarregamento sob demanda, Nenhuma
estratégia explícita de cache implementada, Cache local em memória para
pendências de salvamento, Cache em memória para listagem recente com TTL de 5
minutos, URLs temporárias revogadas após uso para liberar memória, Cache em
memória com TTL de 5 minutos para dados estáticos, Uso do chrome.storage.local
como cache persistente, Não aplicável diretamente, Cache configurável via
parâmetro cleanCache para otimização, CacheMode.KEEP_CACHE como padrão para
otimização de performance, Cache local em memória durante a sessão, Uso de Map
para cache interno dos executores, Não aplicável para redimensionamento, Nenhum
cache aplicado para screenshots, Cache local para configurações de replay, Cache
configurável entre CLEAN_CACHE e KEEP_CACHE para otimizar
replays</caching_strategy> <scalability_considerations>paralelização de tarefas,
Suporte a gravações longas sem degradação perceptível, Suporte a múltiplas abas
e sessões simultâneas, modularidade para futuras integrações, Escalabilidade
limitada ao ambiente do navegador, Suporte a múltiplas abas e frames com
controle isolado de gravação, Componente leve e reutilizável para múltiplas
instâncias, Arquitetura modular permite escalabilidade horizontal via serviços
independentes, Escalabilidade limitada ao contexto de extensão de navegador,
foco em eficiência local, Component designed to handle dynamic and potentially
large arrays of actions, Componente reutilizável para múltiplos contextos e
volumes de código, Suporte a gravação de múltiplas ações com gerenciamento
eficiente de estado, Evitar múltiplas instâncias para reduzir uso de memória,
Suporte a múltiplos eventos simultâneos e navegação SPA, Escalabilidade limitada
ao contexto da extensão e UI do Cypress, Escalabilidade limitada ao contexto de
extensão de navegador e volume de gravações locais, Suporte a múltiplos temas e
componentes dinâmicos, Pode degradar em documentos muito grandes devido à
combinatória, Suporte a grandes volumes de ações sequenciais, Arquitetura
modular permite extensão para múltiplas sessões simultâneas, Escalabilidade
limitada ao ambiente local de desenvolvimento, Arquitetura modular para
facilitar adição de novas páginas e scripts, Operações em arrays grandes devem
ser eficientes e imutáveis, Testes isolados para permitir execução paralela,
Componentização para facilitar escalabilidade e manutenção, Componentização
facilita escalabilidade, mas grandes volumes podem exigir paginação ou
virtualização, Escalabilidade depende do backend de armazenamento
(recordingStore), Limitação configurável do número máximo de gravações para
evitar crescimento descontrolado, Backend escalável horizontalmente para
suportar múltiplas gravações simultâneas, Suporte a tabelas com overflow e
scroll vertical, Layouts adaptativos para múltiplos dispositivos, Scrolls
otimizados para listas grandes, Escalabilidade não aplicável, operação local no
browser, Funções puras facilmente escaláveis e reutilizáveis, Suporte a
múltiplas gravações e estados sem perda de performance, Suporte a tabelas com
grande volume via scroll e overflow, Arquitetura preparada para escalabilidade
horizontal via containers, Escalabilidade limitada ao contexto do armazenamento
local do navegador, Arquitetura modular permite extensão para novos tipos de
ações, Suporte a múltiplas sessões simultâneas com isolamento de estado,
Configurações ajustáveis para suportar diferentes volumes de ações e sessões,
Escalabilidade limitada ao contexto do usuário e extensão, Design modular para
extensão e reutilização em múltiplos contextos, Facilidade para adicionar novos
executores sem impacto no sistema, Executor simples, escalabilidade depende do
sistema maior, Escalabilidade não crítica para executor local, Executor
projetado para uso em ambiente single-user (extensão), Executor deve suportar
múltiplas execuções concorrentes sem bloqueio, Suporte a múltiplas sessões
simultâneas de replay, Suporta múltiplos listeners por evento, mas não
distribuído</scalability_considerations> </performance_requirements>
<error_handling> <error_format>logs padronizados, Erros padronizados via objetos
JavaScript com message e code, Formato JSON padronizado para erros internos,
Objetos JSON com campos error e success para respostas, Não especificado no
código atual, Logs de erro via console.error com mensagens claras e stack
traces, Erros retornados via Promise reject com objetos Error padrão, Mensagens
de erro não explicitamente tratadas na UI, Não há formato explícito, erros são
tratados silenciosamente para não interromper captura, Erros lançados via throw
new Error com mensagens claras, Erros lançados via exceções JavaScript padrão,
Mensagens de erro simples para ausência de abas ou frames, Tratamento
silencioso, sem propagação de erros, Erros lançados via throw com mensagens
claras, Try-catch silencioso para evitar falhas na geração de seletores, Erros
devem ser lançados com mensagens claras e tipos específicos, Logs detalhados no
console com stack trace e detalhes, Nenhum formato de erro customizado
implementado, Erros de build exibidos no console com mensagens detalhadas, Erros
lançados via exceptions padrão do JavaScript, Mensagens de erro exibidas no UI
com ícones e texto claro, Mensagens de erro exibidas via notificações visuais
com tipo success/error, Erros lançados com mensagens claras e capturados para
logs, Erros lançados com mensagens claras e capturados para logging, JSON padrão
com campos code, message e details, Erro lançado com mensagem clara em caso de
falha no download, Retorna string vazia ou texto original, sem lançar exceções,
Estados visuais claros para erros com cores e ícones específicos, JSON padrão
com código, mensagem e detalhes opcionais, Logs de erro no console com mensagens
claras e stack trace, Objeto JSON com campo &apos;error&apos; contendo mensagem
descritiva, Lançamento de exceções com mensagens claras (ex: &apos;Viewport
width inválido&apos;, &apos;Não há ações para exportar&apos;), Mensagens de erro
string simples armazenadas no estado para exibição, Erro retornado via rejeição
de Promise com mensagem clara, Logs no console com mensagens claras, Erros
lançados com mensagens claras (ex: &apos;No valid selector found&apos;,
&apos;Element not found&apos;), Erro lançado com mensagem detalhada incluindo
seletores e falhas, Retorno null para executor não encontrado, sem exceção
lançada, Erro lançado com mensagem detalhada após esgotar retries, Erro lançado
com mensagem detalhada em caso de falha no carregamento, Erro lançado com
mensagem detalhada em caso de falha na navegação, Erros lançados como instâncias
de Error com mensagens claras, Erros lançados com mensagens claras e stack trace
preservada, Erros lançados com mensagens claras e stack trace, Erros
padronizados com código, mensagem e contexto, Mensagens de erro com tipo
REPLAY_ERROR contendo sessionId e descrição textual, Objeto com campos status,
message e optional error details, Logs de erros no console com mensagem e stack
trace</error_format> <logging_strategy>console logs, arquivos de log, Logs
locais para debug durante desenvolvimento, Relatórios de erros via CI, Logs
locais via console para desenvolvimento, sem persistência em produção, Logs
locais via console e armazenamento para debugging, Logs no console para eventos
principais e erros, Não implementado explicitamente, Logging local no console,
sem sistema centralizado de logs, Não implementado explicitamente neste módulo,
Logs limitados a console para desenvolvimento, Sem logging explícito no código
fornecido, Logs mínimos, foco em erros críticos, Não há logging explícito no
código analisado, Não implementa logging interno, Logs estruturados para
rastreamento de ações e falhas, Console.error para erros, console.warn para
avisos, Logs padrão do Webpack e WebpackDevServer, ProgressPlugin para feedback
de build, logs de limpeza detalhados, Uso de console.warn para alertas de
timestamps inválidos, Uso implícito de mensagens de erro via Jest, Logs
detalhados no console para eventos e erros, Logs no console para operações
críticas (carregamento, exclusão, importação/exportação), Logs detalhados para
operações de importação e exportação, incluindo sucessos e falhas, Console.warn
para avisos, console.error para erros críticos, Logs estruturados com níveis
info, warn, error, Logs no console para sucesso e erro, Logs informativos para
início, sucesso e falha das migrações, Console logs para sucesso, erro e estado
do runner, Logs de erro capturados e exibidos no estado, integrados a sistema
externo, Logs no background para erros de runtime, Console.error para erros
críticos, Não implementado diretamente, esperado que subclasses façam logging,
Logs informativos e warnings para tentativas e falhas, Logs informativos para
tentativas e sucesso, warnings para retries, Logs via console.log para estados
importantes, Log no console para rastreamento de navegação, Logs informativos
via console.log para operações bem-sucedidas e erros, Uso de console.log para
eventos principais, erros propagados, Logs console para ações executadas e
erros, Logs informativos no console para ações executadas, Logs de eventos
críticos e erros com níveis INFO, WARN, ERROR, Eventos SESSION_ERROR e
ACTION_ERROR para monitoramento, Console.error para erros em
handlers</logging_strategy> <monitoring_tools>GitHub Actions para monitoramento
de build e testes, Nenhuma ferramenta de monitoramento integrada na extensão,
Ferramentas de monitoramento do navegador e relatórios de erros, Não
especificado no código, presumivelmente ferramentas externas, Possível
integração com ferramentas externas, Não especificado no código, presumido uso
de ferramentas externas, Não especificado, Nenhuma ferramenta de monitoramento
integrada, Dependência de ferramentas externas para monitoramento do ambiente,
Monitoramento via ferramentas da extensão Chrome, Analytics customizados para
eventos de página e gravação, Não aplicável, Integração com Sentry para captura
de exceções, Nenhuma ferramenta de monitoramento integrada no build, Integração
com ferramentas externas via API para monitoramento, Não especificado no código,
presumivelmente integrável com Sentry ou similar, Não especificado,
presumivelmente integrado a sistema externo, Não especificado, presumivelmente
integração com ferramentas externas, Integração com Sentry para captura de
erros, N/A, Sentry para erros, Prometheus para métricas, Não aplicável,
monitoramento via logs locais, Monitoramento via logs do Chrome DevTools,
Integração com ferramentas de monitoramento frontend (ex: Sentry), Integração
com Sentry para captura de erros em produção, Monitoramento externo via
ferramentas de extensão Chrome, Integração com Sentry para monitoramento de
erros, EventBus interno para rastreamento de eventos e erros, Sentry para
captura de erros, Prometheus para métricas, Não especificado no
código</monitoring_tools> <error_recovery>retry automático em falhas de build,
Recuperação de falhas na gravação com possibilidade de reinício, Fallbacks
simples para falhas de captura, reinício da gravação manual pelo usuário, Retry
automático para falhas de comunicação e fallback para gravação local, Tratamento
de erros com respostas assíncronas e mensagens claras, Nenhuma estratégia
explícita, Falhas no salvamento não interrompem o fluxo, apenas logam erro,
Tratamento básico de erros via rejeição de Promises e fallback para criação de
IDs, Reinicialização da gravação e limpeza de estado em caso de falha, Função
cleanUp para desmontar e liberar recursos, Reset de flags de eventos para evitar
bloqueios em caso de falhas, Retry para seleção de elementos DOM com limite de
tentativas, Fallbacks para ausência de aba ou frame, com mensagens de erro e
bloqueio de fluxo, Try/catch para evitar falhas visíveis ao usuário, Fallbacks
em busca de seletores alternativos, Fallback para null em seletores quando falha
a geração, Fallbacks para ações não suportadas e validação prévia, Abortar build
em caso de erro crítico, Hot Module Replacement para recuperação rápida de erros
em desenvolvimento, Rebuild automático em ambiente de desenvolvimento via watch
mode (externo), Correção automática de timestamps inválidos e negativos,
Rejeição de promises em timeout para falha controlada, Fallback para código
antigo caso geração de template falhe, Desabilitação de botões durante
carregamento para evitar estados inconsistentes, Recarregamento da lista após
operações, notificações para feedback do usuário, Importação em lote continua
mesmo com erros parciais, reportando falhas, Tratamento de erros com fallback
para evitar falhas críticas, Migrações tentam preservar dados e logam problemas,
Retry automático para falhas temporárias de persistência, Erro é lançado para
ser tratado externamente, sem retry automático, Retorno seguro para entradas
inválidas ou vazias, Interface permite re-tentativas e feedback visual imediato,
Retries automáticos em falhas temporárias, fallback para operações críticas,
Tratamento de exceções para evitar falha total do processo de migração, Retorno
de erro para remetente e continuação da escuta de mensagens, Validação prévia
para evitar geração de templates inválidos, Tentativas de retry configuradas no
startReplay, tratamento de falhas com mensagens claras, Tratamento de erros para
evitar estados inconsistentes, Retry automático até maxRetries com delay
configurado, Fallback para configuração padrão em falhas, Retries configuráveis
via maxRetries (opcional) em implementações concretas, Retries automáticos e
tentativa sequencial de seletores, Fallback para null e tratamento externo,
Retry automático até 3 tentativas com delay incremental, Erro propagado para
camadas superiores para tratamento, Erro propagado para camada superior para
tratamento, Retry manual via interface do usuário, não automático, Rejeição da
promise para tratamento ascendente, sem retry automático, Captura e relança
erros para tratamento superior, Falhas na execução propagam erro para tratamento
externo, Tentativas automáticas de recuperação em falhas de replay, Permite
recomeço e retomada de sessões via comandos REPLAY_RESUME, Retry automático
configurável com maxRetries e retryDelay, Captura exceções em handlers para
evitar falha da emissão</error_recovery> </error_handling>
<dependencies_context> <critical_dependencies>react-app preset,
react-hot-loader, Webpack, Babel, Node.js, APIs de extensão do Chrome e Firefox,
Frameworks de teste suportados, @jest/types, ts-jest, React 17.0.1, Webpack
5.23.0, Babel 7.12.17, Jest 27.3.1, @fortawesome/fontawesome-svg-core,
lodash.debounce, react-syntax-highlighter, chrome._ APIs, background.bundle.js,
bridge.bundle.js, Chrome Extensions API, DeploySentinel API, ReplayEngine
singleton, storage/recording-store e migration, chrome.runtime API,
window.postMessage, React 18, react, logo.svg, typescript, RecordingService,
genCypressCode, Chrome Runtime Messaging API, React, chrome.storage API,
localStorage utilities, chrome.storage.local, chrome.tabs, chrome.scripting,
chrome.webNavigation, browser API para compatibilidade Firefox, ../types,
../builders/selector, TypeScript, React 18.2, Lodash.throttle, FontAwesome
Icons, Highlighter.css, ReactDOM, FontAwesome, Shadow DOM API, lodash.debounce
para otimização de eventos resize, chrome.storage.local para persistência,
chrome.runtime para comunicação background, Chrome Extension Messaging API,
Chrome Extension APIs, Cypress integration scripts, getRandomInstallId, Google
Analytics API, react-dom, webpack css-loader, DOM API do navegador, Cypress,
TemplateRenderer, Types e enums do projeto, finder, TypeScript compiler, Module
bundler (Webpack, Vite), chrome API, TypeScript 5.0, Node.js 20, webpack,
webpack.config.js, process.env (Node.js), webpack-dev-server, path, env,
clean-webpack-plugin, copy-webpack-plugin, html-webpack-plugin,
terser-webpack-plugin, babel-loader, ts-loader, source-map-loader, fs-extra,
node_modules, secrets._.js, Type definitions from &apos;../types&apos;,
CypressScriptBuilder, truncateText, Jest, playwright, jest, chromium browser,
useReplay hook para controle do replay, genCypressCodeWithTemplate para geração
de código, FontAwesome para ícones, react-syntax-highlighter para exibição de
código, Roboto font, CSS variable --bg-dark, recordingStore para persistência,
builders para geração de código Cypress, chrome.storage.local API, Typescript
types para RecordingEntry, HistoryConfig, Action, Cypress 12.x, CSS variables
defined globally, React index.jsx import, ../themes/dark-core.css, font-awesome,
LayoutWrapper.css, Variáveis CSS para tema, Font icons para elementos visuais,
CSS variables definidas globalmente, SVG icons, Variáveis CSS globais,
JavaScript para manipulação de estado, Variáveis CSS customizadas (ex:
--bg-dark, --bg-darker), Browser Web APIs (Blob, URL, DOM), Variáveis CSS
globais para cores e espaçamentos, React para renderização do componente, CSS
Variables, React (para lógica associada), Nenhuma dependência externa explícita,
Express, Mongoose, Joi, recordingStore, ActionExecutorFactory, chrome.runtime
API para comunicação com background, Funções startReplay, pauseReplay,
resumeReplay, stopReplay, ../types/session para tipos ReplayOptions e CacheMode,
chrome.storage.sync, DEFAULT_REPLAY_CONFIG, Node.js runtime para execução do
build, ActionExecutor base, ClickAction type, Pacotes de executores específicos,
Definição de ActionType, ../../../pages/types/index, ./base, window.location,
Promise, async/await, Base ActionExecutor class, window.scrollTo API, Delay
utilitário interno, Módulo &apos;./session&apos; para tipos ReplayOptions,
ReplayProgress, ReplayResult, ReplayStatus, Action type do módulo pages/types,
ReplayStatus enum, Nenhuma dependência externa</critical_dependencies>
<deprecated_packages>Nenhum pacote deprecado identificado, Nenhum identificado,
Uso de chrome.tabs.executeScript (deprecated no Manifest V3, substituído por
chrome.scripting), Uso gradual de url e firstUrl como legado, migrando para
urlOriginal, Nenhum pacote deprecado atualmente, Nenhum</deprecated_packages>
<version_constraints>Compatibilidade com versões recentes do Chrome e Firefox,
Compatibilidade entre Jest 29.x e ts-jest, React ^17.0.1, TypeScript ^4.1.5,
Webpack ^5.23.0, Jest ^27.3.1, Manifest Version 2 (deprecado em breve), Manifest
V3 obrigatório para compatibilidade com Chrome atual, TypeScript 5.x compatível
com APIs do Chrome, Compatibilidade com Chrome 90+, React &gt;=18.0.0, React
18.x, TypeScript 5.x, TypeScript &gt;=5.0, Chrome Extensions API compatível com
Manifest V3, Compatibilidade com Manifest V2 e V3 do Chrome Extensions,
TypeScript &gt;=5.0.0, react-syntax-highlighter compatible com Prism, React
&gt;=18.0.0 &lt;19.0.0, TypeScript &gt;=4.9, TypeScript 4.x, Compatibilidade com
versões recentes do Chrome e navegadores baseados em Chromium, Webpack
&gt;=5.0.0, Compatível com navegadores modernos suportando querySelectorAll,
Compatibilidade com Cypress 12.x e TypeScript 4.x, TypeScript &gt;=4.0, Node.js
&gt;=20, target ES5, module ESNext, webpack &gt;=5.0.0, Compatibilidade com
Webpack 5 e Node.js 16+, Compatibilidade com Node.js 14+ e Webpack 5.x,
TypeScript &gt;= 4.9, Jest &gt;=29, Cypress &gt;=12, Jest timeout configurado
para 15000ms, TypeScript 5.0 e compatibilidade com Cypress atual, TypeScript 5.0
compatível, API chrome.storage.local estável, Node.js &gt;= 20.x, TypeScript
&gt;= 5.0, React &gt;=18.0, TypeScript &gt;=5.0 para suporte a features usadas,
Dependências travadas em versões específicas para estabilidade, Versão 2.0.0
para controle de migração, Chrome &gt;= 90 para APIs usadas, React &gt;=18.0,
TypeScript &gt;=5.0, Chrome Extensions Manifest V3, Chrome &gt;= 90 para suporte
à API usada, Chrome API compatível com Manifest V3, TypeScript &gt;=5.0 &lt;6.0,
React &gt;=18.0 &lt;19.0, TypeScript 5.0 compatível com sintaxe
usada</version_constraints> <internal_packages>utils/build.js,
utils/webserver.js, bridge.bundle.js para content scripts, background.bundle.js
para service worker, Common/utils, storage, replay/core e replay/types, Módulos
internos da extensão DeploySentinel, ../../pages/Popup/logo.svg, ../types
(ScriptType), ./utils, ../builders, ../storage, ../types, Módulos internos
organizados por funcionalidade (storage, scripts, utils), types, builders,
components, ../builders (genCode), ../types (Action, ScriptType), src/builders -
geração de seletores e código, src/Common - hooks e utilitários, src/types -
tipos compartilhados, Highlighter.css (estilos locais), ./ControlBar,
../Common/styles.css, builders/selector para geração de seletores CSS,
Common/utils para abstração de localStorage, ../Common/Icon, ../Common/hooks,
../Common/endRecording, Common, Content, Popup, Storage módulos internos
organizados, ../Common/utils, ./Popup, ./components, ./themes,
../generators/template/TemplateRenderer, finder, src/utils para funções
auxiliares, config/webpack.config.js, ./env, ../webpack.config, ./utils/env,
secrets.{env}.js, ../src/pages/builders, Extensão localizada em ./build,
Common/utils para utilitários, Content/ para componentes específicos, builders/
para geração de código, ../../storage/recording-service, ../../types/recording,
../../Common/utils/text, src/types, src/builders, src/store, src/types para
tipos compartilhados, src/actions para definição de ações, Módulo actions para
definição de Action, Módulo backend para implementação de IHistoryBackend,
themes/dark-core.css, Pacotes internos para utilitários e middlewares,
recording-store módulo interno para gerenciamento de gravações,
../pages/types/index, ../replay/core/executors/factory, ../TemplateRenderer,
../../../types, src/types para tipagem compartilhada, src/api para funções de
controle de replay, ../types/session, ../types/events, src/types/session,
./default, pages/types para tipos compartilhados, ../../../pages/types/index,
./base, ./click, ./input, ./navigate, ./resize, ./screenshot, ./scroll, ./wheel,
./load, ActionExecutor base class, InputAction type, NavigateAction type,
src/pages/types, src/executors/base, ../../../pages/types, WheelAction type,
./api, ./config, ./types, session - tipos e interfaces para replay,
../../pages/types/index para Action, ReplayEngine core
modules</internal_packages> </dependencies_context> <current_challenges>
<technical_debt>scripts de build pouco modularizados, Suporte limitado para
captura de upload de arquivos, Atualização para Manifest V3 no Firefox ainda
pendente, Atualização para Manifest V3 necessária para compatibilidade futura,
Atualização para suporte a novos browsers além do Chrome, Funcionalidade de
histórico ainda em desenvolvimento, Falta de tratamento de erros robusto,
Tratamento de erros pode ser melhorado com sistema centralizado, Fixação rígida
da biblioteca Cypress pode limitar flexibilidade, Manutenção da compatibilidade
entre Manifest V2 e V3, Refatoração para eliminar uso de APIs deprecated, Uso de
any em CopyToClipboardFixed pode ser melhor tipado, Melhorar tratamento de erros
e feedback ao usuário, Ausência de memoização para evitar re-renderizações
desnecessárias, Melhorar tratamento de erros e fallback para browsers sem
exportFunction, Gerenciamento de eventos duplicados pode ser aprimorado para
casos extremos, Persistência local pode crescer indefinidamente sem limpeza,
Correção de bug de múltipla montagem no Firefox, Uso de &apos;any&apos; em
tipagem CopyToClipboardFixed pode impactar segurança de tipos, Ausência de
logging e feedback de erro, Ausência de tratamento de erros na renderização,
Estilos inline podem dificultar manutenção, Otimização limitada para seletores
muito complexos, Implementação pendente para dragAndDrop, Catch silencioso pode
dificultar debugging, Refatoração pendente para unificar classes
ScreenshotAction e FullScreenshotAction, Configuração hardcoded para localhost e
porta fixa, Documentação incompleta para configuração de aliases e plugins, Uso
incorreto de &apos;number.isFinite&apos; ao invés de
&apos;Number.isFinite&apos;, Uso de setInterval para polling pode ser
substituído por eventos mais eficientes, Uso de any em castings para
CopyToClipboard e SyntaxHighlighter pode ser melhorado, Ausência de paginação
para grandes volumes de gravações, Falta de testes automatizados explícitos no
código fornecido, Uso de dimensões fixas pode limitar responsividade, Manutenção
da compatibilidade com versões antigas do código Cypress, Dependência da API
chrome.storage.local com limitações de tamanho, Necessidade de migração contínua
para formatos novos, Migração completa dos campos url e firstUrl para
urlOriginal, Dependência de variáveis CSS externas pode dificultar manutenção,
Dependência de variáveis CSS externas pode causar inconsistência, Dependência de
variáveis CSS externas não documentadas, Melhorar mensagens de erro para
diagnóstico mais detalhado, Necessidade de migração para CSS-in-JS para melhor
manutenção, Dependência de variáveis CSS globais, Falta de estilos focados em
acessibilidade, Refatoração de módulos com alta complexidade ciclomática,
Dependência do chrome.storage.local limita portabilidade, Necessidade de
cobertura de testes para todos executores, Cobertura de testes pode ser ampliada
para casos extremos, Melhorar tratamento de erros para casos raros de falha na
comunicação, Melhorar tipagem das respostas do background, Implementação
simples, possível melhoria no merge recursivo profundo, Necessidade de
implementação concreta para diferentes tipos de ações, Necessidade de registrar
manualmente novos executores na fábrica, Delay fixo pode ser substituído por
evento de carregamento mais robusto, Necessidade de padronizar tratamento de
erros em todos executores, Melhorar tipagem da função sendMessageToBackground
para evitar uso de any, Delay fixo pode ser substituído por evento de scroll
end, Documentação incompleta para hooks avançados, Nenhum débito técnico
explícito identificado, Melhorar tratamento de erros detalhados, Refatorar enum
CacheMode para maior flexibilidade, Implementação básica sem suporte a eventos
assíncronos ou prioridades</technical_debt> <known_issues>Potential
incompatibility of react-hot-loader with React 18+, Limitações na captura de
eventos hover em alguns contextos, Compatibilidade limitada com versões antigas
de browsers, Limitações na captura de eventos em iframes externos, Dependência
de sincronização precisa entre abas e frames, Limitações na captura de eventos
em ambientes Cypress, Dependência exclusiva do Chrome, Possível loop de
atualização se onChange não for estável, Dependência da existência da URL
inicial pode causar falhas silenciosas, Ausência de tratamento explícito de
erros em chamadas assíncronas, Possível inconsistência na execução de scripts em
frames múltiplos, Limitações do armazenamento local em volume e performance,
Eventos de mouse podem ser afetados por sobreposições complexas, Sincronização
entre abas depende do chrome.storage que pode ter latência, Dependência de
estilos externos pode causar falhas visuais, Possível incompatibilidade com
browsers não suportados, Tipagem TypeScript ignorada em shadowRoot, Possível
perda de eventos em navegação rápida SPA se sincronização falhar, Possível falha
na localização de elementos DOM em ambientes customizados, Dependência da
existência do frame AUT para gravação Cypress pode causar erros se não
encontrado, Modo no-cors limita detecção de falhas na requisição, Dependência
forte do container &apos;#app-container&apos; estar presente, Performance pode
cair em documentos com muitos elementos similares, FIXME expor action
diretamente em ActionContext, DragAndDrop não implementado, Diferenças entre
APIs Chrome e Firefox podem causar incompatibilidades, Duplicidade de classes
para ações de screenshot pode causar confusão, Desabilitação de host check pode
causar riscos de segurança, Hot reload desabilitado para content scripts para
evitar conflitos, Dependência do relógio do sistema pode causar inconsistências,
Timeouts podem causar falhas intermitentes em ambientes lentos, Possível
lentidão na geração de código para gravações muito grandes, Potencial lentidão
com muitos registros, Dependência de confirmação via window.confirm para
exclusão, Fallback visual se variável --bg-dark não estiver definida, Possível
colisão de IDs em importações simultâneas, Possível perda de dados se debounce
for interrompido abruptamente, Limite fixo pode causar erros se estratégia
&apos;error&apos; for usada, Possível inconsistência temporal se timestamps
forem mal formatados, Scrollbar customization limited to WebKit browsers,
Possível baixa acessibilidade se contraste não for suficiente, Sanitização pode
gerar nomes duplicados para títulos iguais no mesmo dia, Possível truncamento
excessivo em URLs com domínios muito longos, Scrollbars customizadas podem
apresentar inconsistências em alguns browsers, Scrollbar customizada pode não
funcionar em todos os browsers, Intermitência em chamadas externas sob alta
carga, Possível falha silenciosa se chrome.storage.local estiver indisponível,
Possível falha silenciosa se executor não suportar ação, Validação de viewport
restrita a largura mínima, sem validação de altura, Possível atraso na
atualização do estado em sessões com alta latência, Possível latência na
comunicação assíncrona, Merge não é recursivo para objetos aninhados,
Dependência de querySelector pode falhar em páginas dinâmicas complexas,
Dependência de elementos estarem disponíveis no DOM no momento da execução,
Possível retorno null sem tratamento explícito pode causar erros downstream,
Possível lentidão em campos com grande volume de caracteres, Dependência de
window.location pode dificultar testes em ambientes não-browser, Delay fixo pode
não ser suficiente em janelas com alto uso de recursos, Dependência da API
chrome.runtime pode falhar silenciosamente em alguns contextos, Scroll pode não
funcionar em iframes ou contextos restritos, Delay fixo pode não ser ideal para
todos os casos de scroll, Sincronização de estado em sessões com alta latência,
Nenhum problema conhecido documentado, Possível perda de estado em pausas
longas, Limitações no retryDelay configurável, Nenhum mecanismo para detectar
listeners duplicados</known_issues> <performance_bottlenecks>build lento em
grandes projetos, Processamento em tempo real pode impactar performance em
máquinas com recursos limitados, Latência na geração de scripts para sessões
longas, Potencial latência em armazenamento local para gravações extensas,
Nenhum identificado, Persistência síncrona pode impactar UX em gravações muito
longas, Latência na execução de scripts em abas com múltiplos frames,
Atualizações frequentes do estado em ações rápidas podem impactar performance,
Eventos de input e wheel podem gerar alta frequência de gravação, Polling para
retrySelector pode impactar performance se maxRetries alto, Nenhum gargalo
crítico identificado, interface leve e reativa, Injeção de múltiplos estilos CSS
pode impactar tempo de carregamento, Geração combinatória de seletores e
múltiplas validações querySelectorAll, Uso de innerText pode impactar
performance em elementos grandes, Nenhum gargalo identificado no código atual,
Nenhum gargalo crítico identificado em ambiente local, Possível aumento do
bundle por múltiplos pontos de entrada, Espera ativa para service workers pode
impactar tempo total dos testes, Re-renderizações desnecessárias podem ocorrer
se dependências do useMemo não forem otimizadas, Filtragem e ordenação em
memória podem degradar com grandes datasets, Carregamento da fonte externa pode
impactar renderização inicial, Listagem e filtragem em memória podem ser lentas
com grande volume de gravações, Operações síncronas no storage podem impactar
performance em grandes volumes, Persistência síncrona pode impactar
escalabilidade, Overflow em listas longas pode impactar performance, Possível
lentidão em tabelas muito grandes devido a overflow e transições, Nenhum
identificado, operação local e rápida, Renderização de tabelas muito grandes
pode impactar performance, Consultas complexas ao banco de dados sem índices
adequados, Operações assíncronas dependem da latência do armazenamento local,
Nenhum identificado no código atual, Listeners ativos podem impactar performance
se não removidos corretamente, Polling ativo pode impactar performance em
páginas muito dinâmicas, Delays e retries podem impactar performance em cenários
de alta latência, Delay fixo pode impactar tempo total de execução, Dependência
da resposta do background script pode causar latência, Delay fixo de 300ms pode
impactar performance em execuções sequenciais, Gerenciamento de múltiplos
eventos simultâneos pode causar lentidão, Potencial latência em alta
concorrência de eventos, Processamento sequencial das ações pode impactar
replays longos, Emissão síncrona pode bloquear se handlers forem
lentos</performance_bottlenecks> <migration_status>Migração para Manifest V3 em
Firefox em planejamento, Migração completa para Manifest V3 finalizada,
Migrações executadas no startup para manter compatibilidade de dados, Nenhuma
migração em andamento, Migração para Manifest V3 do Chrome Extensions em
andamento, Migração parcial para Manifest V3 com fallback para V2, Migração de
dados antigos implementada no armazenamento local, Estável, sem migrações em
andamento, Migração para TypeScript 5 concluída, Migração para Webpack 5
concluída, suporte a TypeScript consolidado, Função migrateActionsTimestamp
implementada e em uso, Nenhuma migração em andamento detectada, Migração para
TypeScript completa, mas com pontos a refinar, Nenhuma migração em andamento
identificada, Migração para novo formato de exportação/importação com metadata
em andamento, Migração de URLs e última gravação implementada e funcional,
Campos url e firstUrl em processo de desuso gradual, Projeto está em produção
estável, sem migrações em andamento, Migração para TypeScript em andamento, 60%
concluída, Migração para versão 2.0.0 implementada e controlada via flag no
storage, Projeto está em produção estável, sem migrações pendentes, Migração
para React 18 concluída, uso de hooks atualizado, Código já migrado para
TypeScript moderno, Migração para TypeScript 5.0 concluída recentemente,
Compatível com Manifest V3, sem migrações pendentes, Refatoração do módulo
replay em andamento</migration_status> </current_challenges> <team_preferences>
<code_review_focus>Preserve hot reload functionality, Code style consistency,
performance, manutenibilidade, Clareza e legibilidade do código, Cobertura de
testes, Manutenção da tipagem forte, Conformidade com padrões de código,
Qualidade do código, cobertura de testes, aderência a padrões de segurança,
Segurança no uso de permissões, Clareza na separação de responsabilidades entre
scripts, Segurança das permissões, Qualidade do código assíncrono, Consistência
de estado, tratamento de erros e cobertura de testes, Segurança na validação de
origem, Clareza na comunicação entre módulos, Consistência visual, Performance
de renderização, Simplicidade do componente, Performance, Acessibilidade,
Consistência de props, Evitar efeitos colaterais desnecessários, Clareza no
tratamento de erros, Consistência no uso de async/await, Modularidade,
Consistência de estado e sincronização, Uso correto dos hooks, Persistência
correta, Verificação de compatibilidade cross-browser e uso correto de APIs
assíncronas, Verificação de tipos, cobertura de testes, clareza na renderização
condicional, Consistência de estilo, Performance e acessibilidade, Consistência
de tipagem e uso correto de hooks, Manutenção da responsividade e usabilidade da
UI, Clareza na tipagem, Ausência de efeitos colaterais, Verificação de uso
correto do cleanUp, Garantia de não múltiplas instâncias, Verificação de
tratamento correto de eventos e prevenção de duplicidade, Garantia de tipagem e
uso correto de APIs do navegador, Consistência de hooks, tratamento de estado e
mensagens Chrome, Consistência de tipagem TypeScript, Clareza na separação de
responsabilidades, Tratamento de erros silencioso, Uso correto de async/await,
Manutenção da anonimidade, Consistência de estilos, Uso correto de hooks e
componentes React, Clareza na lógica de busca, Clareza nos comentários, Uso
correto de tipos, Manutenção da arquitetura builder, Tratamento de erros,
Clareza na priorização de seletores, Consistência de tipagem, Importação correta
de assets, Compatibilidade cross-browser, Clareza e simplicidade do código,
Consistência de tipos e validação de enums, Clareza na modelagem das ações,
Conformidade com padrões TS e React, Verificação de erros de build e warnings,
Conformidade com padrão de código, Verificação de configuração correta do HMR e
variáveis de ambiente, Consistência de configuração, performance do build,
segurança dos secrets, Validação de tipos e imutabilidade, Cobertura de testes
para casos de timestamp, Clareza e legibilidade, Uso correto de mocks, Clareza
nos testes, uso correto de async/await, cobertura de funcionalidades críticas,
Performance CSS, Tratamento adequado de estados assíncronos, Cobertura de testes
e documentação, Clareza na manipulação de estado, Tratamento correto de efeitos
colaterais, Acessibilidade e usabilidade, Uso correto de variáveis CSS,
Performance de fontes, Validação de tratamento de erros, geração correta de IDs
e integridade dos dados, Consistência de tipagem e tratamento de erros, Uso
correto do padrão singleton e debounce, Validação de tipos e integridade
temporal, Conformidade com padrões de nomenclatura e documentação, Aderência a
padrões de código, Testes de snapshot, Uso correto de props, Estados
interativos, Acessibilidade básica, Responsividade, Tratamento adequado de
erros, Clareza e simplicidade das funções, Consistência visual e responsividade,
Clareza nos estados de erro e carregamento, Uso correto de BEM, Legibilidade,
segurança, cobertura de testes, Tratamento correto de promises e erros, Clareza
nos logs e mensagens, Validação de tipos e tratamento assíncrono correto,
Validação de tipos, tratamento de erros, cobertura de testes, Consistência de
estado, tratamento de erros e performance, Tratamento de erros e clareza na API
pública, Conformidade com padrões de configuração e tipagem, Validação de
timeout e retry, Tratamento de erros e consistência de estado, Clareza na
abstração, tratamento de erros, cobertura de testes, Tratamento de erros,
clareza de logs, uso correto de async/await, Consistência na nomenclatura,
Tratamento correto de tipos e null, Verificação de tratamento de erros e
cobertura de retries, Verificação de tratamento de erros e uso correto de
async/await, Verificação de tratamento de erros, Conformidade com padrões de
nomenclatura, Tratamento correto de erros, Uso adequado de async/await,
Tratamento correto de erros assíncronos, Clareza na manipulação assíncrona,
Consistência de nomenclatura, Consistência de tipos, Clareza na documentação,
Consistência de tipos e mensagens, Cobertura de testes para todos os tipos de
mensagens, Consistência na tipagem</code_review_focus>
<documentation_requirements>Document config changes, documentar scripts de
build, Documentação clara para APIs internas e uso da extensão, Documentação
clara para configurações e testes, Documentação clara para APIs internas e
componentes React, Documentação clara para APIs internas da extensão e uso dos
scripts, Documentação clara para APIs internas e fluxos de mensagens,
Documentação clara para APIs internas e mensagens de runtime, Documentação clara
para APIs de mensagem, Documentação mínima para componentes simples,
Documentação clara de props e comportamento, JSDoc para componentes e funções,
Documentação clara para funções públicas e serviços, Documentação clara dos
hooks e efeitos colaterais, Documentação clara para funções assíncronas e
manipulação de estado, Documentar componentes e funções com JSDoc, Documentação
clara em JSDoc para componentes e funções, Documentação clara para componentes
públicos e funções utilitárias, Documentar funções globais e integração com
Firefox, Documentação clara para funções públicas e fluxos de eventos,
Documentação clara para hooks e componentes React, Documentação inline clara e
atualizada para componentes e hooks, Comentários simples e claros, Documentar
componentes e props com JSDoc, Documentação clara para funções públicas e opções
de configuração, JSDoc para métodos públicos, Comentários explicativos para
lógica complexa, Documentar funções públicas com JSDoc, Documentação clara para
tipos e módulos, Documentar alias e limitações de compatibilidade, Documentação
clara para cada classe e método público, Documentação inline com JSDoc,
Documentação mínima para scripts de build, Documentação clara para configuração
do ambiente de desenvolvimento, Documentar novos plugins e regras de build, Uso
consistente de JSDoc para funções públicas, Documentação JSDoc para APIs
públicas, Documentação inline para funções complexas e testes, Comentários
inline para propriedades específicas, Documentação JSDoc para novos componentes
e funções, Documentação via JSDoc para componentes e funções principais,
Comentários claros sobre variáveis e propriedades usadas, Documentação clara via
JSDoc para métodos públicos, Documentação clara via JSDoc para todas as
interfaces públicas, Comentários claros em CSS e JS, Documentação de theming,
Documentação clara via JSDoc, Comentários claros em português, Explicação de
variáveis e blocos, Comentários claros para seções CSS, Comentários explicativos
para variáveis CSS e estados, Comentários claros em português para blocos CSS,
Documentação clara via JSDoc para todas as funções públicas, Documentação JSDoc
para todas as funções públicas, Comentários CSS explicativos e documentação de
componentes, Comentários claros em CSS e documentação de componentes,
Comentários claros em português explicando variáveis e seções, Documentação
clara para APIs e regras de negócio, Documentação clara para funções públicas e
fluxo de migração, Documentação clara via JSDoc para interfaces e funções,
Documentação clara para funções públicas e tipos, Documentação clara em JSDoc
para hooks e APIs, JSDoc para todas as funções públicas, Documentação clara em
JSDoc para interfaces e constantes, Comentários JSDoc para métodos públicos,
Documentação JSDoc para métodos públicos e abstratos, Documentar métodos
públicos e fluxos críticos, Documentação clara para cada executor e fábrica,
Documentar métodos públicos com JSDoc, Documentação clara de métodos assíncronos
e efeitos colaterais, Documentação JSDoc para métodos públicos e classes,
Documentar métodos públicos com JSDoc, especialmente execute(), Documentar todos
os exports públicos com exemplos, Documentação clara para cada tipo de mensagem
e evento, Documentação clara em JSDoc para interfaces e enums, JSDoc para todas
as classes e métodos públicos</documentation_requirements>
<communication_style>Clear and concise comments, comentários claros e objetivos,
Comentários objetivos e explicativos, Uso de PRs para discussão, Comentários
objetivos e informativos, Comentários objetivos e PRs detalhados com contexto e
screenshots quando aplicável, Comentários objetivos e técnicos, uso de inglês
para termos técnicos, Comentários objetivos e técnicos, sem jargões
desnecessários, Comentários objetivos e uso de logs para rastreamento,
Comentários objetivos e técnicos, Comentários objetivos e claros, Comentários
claros e objetivos, Comentários objetivos e em português para contexto, termos
técnicos em inglês, Comentários objetivos em português com termos técnicos em
inglês, Comentários objetivos e claros, uso de inglês técnico para termos
específicos, Comentários objetivos e educados, PRs com descrição clara e
checklist, Comentários objetivos e explicativos para lógica complexa,
Comentários claros e objetivos, uso de português para contexto, Comentários
objetivos e técnicos, evitando redundância, Comentários objetivos e uso de
inglês técnico para termos específicos, Comentários em português com termos
técnicos em inglês para precisão, PRs pequenos e focados, Comentários em
português para contexto, Uso de termos técnicos em inglês, Comentários objetivos
e uso de JSDoc, Comentários claros e objetivos, uso de inglês para termos
técnicos, Comentários claros e objetivos em português, Clara e objetiva, foco em
comportamento visual, Comentários objetivos e uso de emojis para logs e
mensagens, Comentários objetivos e uso de emojis para logs e notificações,
Objetivo e técnico, foco em comportamento e impacto visual, Comentários
objetivos e logs informativos para operações críticas, Comentários objetivos e
técnicos, sem redundância, Comentários objetivos e técnicos, evitando
ambiguidade, Objetivo e direto em comentários e PRs, Objetivo e direto,
Comentários explicativos, Clara e objetiva, comentários explicativos,
Comentários sucintos e objetivos, Objetivo e direto, com foco em usabilidade,
Comentários objetivos e em português para contexto, Comentários objetivos e uso
de termos técnicos em inglês para precisão, Objetivo e direto, foco em
comportamento e usabilidade, Comentários objetivos e educados, PRs pequenos e
focados, Comentários objetivos e formais, Comentários objetivos e explicativos,
PRs detalhados, Comentários objetivos e técnicos em português, Comentários
técnicos em português com termos técnicos em inglês, Clareza e objetividade em
comentários, Comentários objetivos e explicativos em português, Comentários
objetivos e técnicos em português com termos técnicos em inglês, Comentários
objetivos e uso de logs para debug, Comentários objetivos em português para
contexto, termos técnicos em inglês, Comentários objetivos e em português,
Comentários técnicos e objetivos</communication_style> <decision_log>Opted for
react-app preset for simplicity, Enabled react-hot-loader for dev experience,
Escolha por TypeScript para segurança de tipos, Suporte multiplataforma (Chrome
e Firefox), Adoção do ts-jest para testes TypeScript, Decisão de usar React 17 e
Webpack 5 para compatibilidade e performance, Manter Manifest Version 2 até
migração completa para V3, Adoção do Manifest V3 para maior segurança e
performance, Uso do padrão singleton para ReplayEngine, Separação clara entre
gravação e replay, Uso de mensagens para integração entre webapp e extensão, Uso
de SVG para ícones para garantir escalabilidade, Uso de componentes funcionais
para UI, Importação estática de assets, Fixar ScriptType como Cypress para
compatibilidade, Uso da primeira URL capturada como referência única para
gravação, Decisão de fixar Cypress como biblioteca padrão, Decisão de manter
compatibilidade com Manifest V2 e V3 para maior abrangência, Uso de componentes
funcionais React para melhor performance e simplicidade, Uso de
react-syntax-highlighter para renderização de código, Separação clara entre UI e
lógica de geração, Escolha de React Hooks para gerenciamento de estado, Uso de
throttle para otimização de eventos de mouse, Uso de componente funcional para
simplicidade e performance, Uso de shadow DOM para isolamento, Exposição global
para controle externo, Uso de debounce para resize para balancear performance e
precisão, Filtragem de eventos de overlay para evitar ruído, Uso de Shadow DOM
para encapsulamento do botão na UI, Escolha do Cypress como biblioteca padrão
para gravação em ambiente compatível, Uso de hooks customizados para estado
compartilhado, Uso do Google Analytics para coleta de eventos, Identificador
anônimo para client ID, Adoção de HMR para acelerar desenvolvimento, Uso de
CSS-in-JS via injeção para controle de temas, Uso de penalidades para ordenar
seletores, Fallbacks para garantir unicidade, Adoção do Cypress como framework
principal, Uso do padrão Builder para geração de scripts, Evitar uso de IDs
inválidos para seletores, Priorizar atributos de teste e acessibilidade, Uso de
declarações de módulos para assets estáticos, Uso de alias para compatibilidade
entre Chrome e Firefox, Decisão de usar enums para garantir tipos seguros nas
ações, Separação clara entre tipos de ações para facilitar manutenção, Uso de
strict mode para evitar erros em produção, Remoção de chromeExtensionBoilerplate
para evitar conflito em builds de produção, Uso de HotModuleReplacementPlugin
para acelerar desenvolvimento, Uso de CleanWebpackPlugin para limpeza,
CopyWebpackPlugin para assets, Separação entre migração e validação de
timestamps para clareza e manutenção, Adoção do Builder Pattern para geração de
scripts Cypress, Uso de Playwright para testes end-to-end da extensão Chrome,
Uso de utilitários CSS para acelerar desenvolvimento, Separação clara entre
componentes e utilitários, Decisão de usar hooks para controle de replay, Uso de
react-syntax-highlighter para exibição de código, Fallback para código antigo em
caso de erro na geração do template, Uso de hooks para estado e efeitos,
Separação clara entre UI e serviço de dados, Escolha da fonte Roboto para
legibilidade e padrão visual, Decisão de manter compatibilidade com versões
antigas do código Cypress, Uso de IDs baseados em hostname e timestamp para
unicidade, Escolha do padrão singleton para garantir instância única, Uso de
debounce para otimizar escrita no storage, Decisão de usar interface
IHistoryBackend para abstração de persistência, Adotado dark mode unificado via
CSS variables, Scrollbar customizada para WebKit, Uso de SVG inline para
performance e flexibilidade, Adoção de dark mode unificado via CSS Variables,
Layout fixo para 800x600, Uso de componentes funcionais para melhor performance
e simplicidade, Adoção de tema Dark com variáveis CSS para flexibilidade, Adoção
de tema Dark via CSS variables, Uso de BEM-like naming para modularidade, Adoção
de tema Dark para melhor experiência noturna, Separação entre estilos modernos e
legacy, Uso de animações para feedback visual, Uso de nomes sanitizados para
evitar erros em sistemas de arquivos, Download via Blob e URL temporária para
compatibilidade cross-browser, Manter funções puras para facilitar testes e
manutenção, Adoção de tema dark como padrão para melhor conforto visual, Uso de
flexbox para layout flexível e responsivo, Adoção do tema dark para melhor
experiência visual, Uso de CSS variables para facilitar customização, Uso de CSS
variables para facilitar manutenção e customização do tema, Adoção do padrão
MVC, uso de JWT para autenticação, Uso de chrome.storage.local para
persistência, Controle de versão da migração via chave migrationVersion, Uso do
Factory Pattern para extensibilidade dos executores, Uso de factory para criação
do renderer, Sanitização de URLs para segurança, Uso do padrão hook para
gerenciamento de estado e side effects, Uso de Promise para controle assíncrono
e mensagens via chrome.runtime, Uso de CacheMode padrão KEEP_CACHE para
otimização, Timeouts fixos para evitar bloqueios, Uso de singleton para
gerenciar estado global da configuração, Uso de classe abstrata para garantir
padrão de execução e extensibilidade, Uso de múltiplos seletores para robustez,
Retries configuráveis para estabilidade, Adoção do Factory Pattern para
desacoplamento e extensibilidade, Uso do padrão Command para executores, Retry
para robustez, Uso do padrão Executor para modularizar ações de UI, Uso do
padrão Executor para modularização de ações, Uso do padrão Command para
executores de ações, Encapsulamento da comunicação com background script,
Escolha do padrão Command para modularização de ações, Uso de mensagens
assíncronas para integração com background, Uso do padrão Executor para ações de
UI, Separação clara entre API, config e tipos para modularidade, Uso de union
types para garantir segurança e extensibilidade das mensagens, Uso de enums para
estados e cache para garantir legibilidade e manutenção, Escolha do padrão
Observer para desacoplamento e flexibilidade</decision_log> </team_preferences>
<api_specifications> <api_style>Nenhuma API externa REST ou GraphQL exposta pela
extensão, REST para comunicação externa com DeploySentinel, Event-driven
Messaging API via chrome.runtime.onMessage, Message Passing API via postMessage
e chrome.runtime, Chrome Runtime Messaging API (event-driven), APIs do navegador
baseadas em callbacks e Promises, Nenhuma API REST ou GraphQL exposta
diretamente, Comunicação via mensagens chrome.runtime (event-driven), Chrome
Extension Messaging API, APIs do Chrome Extension (callback e promise-based),
HTTP POST via fetch para Google Analytics Measurement Protocol, Função exportada
como default, API funcional simples, WebExtension API, Não aplicável diretamente
neste módulo, Nenhuma API exposta diretamente, Nenhuma API exposta diretamente
pelo build, Chrome Extensions API, REST API para controle de replay, RESTful via
RecordingService abstraído, API interna baseada em métodos assíncronos para
manipulação de gravações, API local baseada em métodos assíncronos para
manipulação do storage, RESTful API para operações de histórico, N/A (módulo
utilitário client-side), RESTful, Não aplicável (API local de chrome.storage),
Mensagens JSON via chrome.runtime messaging API, API interna baseada em funções
assíncronas e mensagens via chrome.runtime, Message Passing API via
chrome.runtime.sendMessage, Funções assíncronas para acesso à configuração, Não
aplicável (biblioteca interna), Não aplicável, Chrome Extensions Messaging API,
Modular exports via ES Modules, Event-driven API via mensagens e eventos, REST
API para controle e consulta de sessões, Internal EventBus API, não exposta
externamente</api_style> <versioning_strategy>Versionamento semântico via npm
(major.minor.patch), Versionamento semântico para APIs externas, Não aplicável
diretamente, controle via tipos e comandos, Sem versionamento explícito, Sem
versionamento explícito, dependente da versão da extensão, Compatibilidade com
versões de Manifest V2 e V3, Controle de versão via versionamento do pacote npm,
Não aplicável diretamente, Sem versionamento explícito para mensagens, Não
aplicável diretamente no código da extensão, Sem versionamento interno,
gerenciado via npm, Não aplicável diretamente neste módulo, Não aplicável,
Versão da extensão controlada via package.json e manifest.json, Versionamento
semântico na API externa, Não especificado no código, Nenhuma versão explícita,
compatibilidade mantida via campos opcionais, Não aplicável (API interna de
extensão), Versionamento via URL (ex: /api/v1/history), N/A, Versionamento via
URL (/v1/, /v2/), Controle interno via migrationVersion no storage, Controle de
versão interno do runner (ex: &apos;1.0.0&apos;), Versionamento semântico para
funções de replay, Sem versionamento explícito para mensagens internas, Sem
versionamento explícito na API de mensagens, Versionamento semântico via tags
git, Versionamento implícito via tipos e enums, Versionamento semântico via URL
(/v1/replay), Sem versionamento explícito, parte do
ReplayEngine</versioning_strategy> <response_formats>JSON para scripts Cypress
gerados, JSON, JSON com campos success, error e dados específicos, Objetos JSON
simples com propriedades source, type, code, actions, Mensagens JSON com tipo e
payload definidos, Objetos JSON simples e Promises para respostas assíncronas,
Nenhuma resposta API gerenciada, Objetos JSON armazenados localmente com
estrutura de ações, Mensagens simples sem payload complexo, Promises e callbacks
padrão do Chrome Extension API, String contendo seletor CSS válido, Não
aplicável diretamente neste módulo, Não aplicável, JSON para dados de gravação e
status, JSON para importação e exportação, JSON formatado para exportação e
comunicação interna, Promises retornando objetos tipados ou null, N/A, Promises
resolvidas com void ou boolean, JSON com campos &apos;success&apos; ou
&apos;error&apos;, Promises resolvidas com sessionId ou erros em string, Objetos
JSON com campos sessionId ou error, Objetos ReplayConfig, Promises para controle
assíncrono, Objetos JSON com campo error para erros, Resposta genérica via
callback, sem payload específico esperado, Mensagens JSON com campos tipados e
discriminadores, JSON com estrutura padronizada para status e
erros</response_formats> <rate_limiting>Não aplicável, Rate limiting aplicado
pelo serviço externo DeploySentinel, Não implementado explicitamente, Não
implementado, Não aplicável para mensagens internas, Não aplicável diretamente,
dependente das limitações do navegador, Controle interno via debounce e flags
para evitar excesso de eventos, Nenhuma limitação explícita implementada, Não
aplicável diretamente neste módulo, Rate limiting aplicado na API para evitar
abusos, Não especificado no código, Não implementado no serviço analisado,
Debounce interno para limitar frequência de escrita, Limite de 100 requisições
por minuto por usuário, N/A, Limite de 100 requisições por minuto por IP, Não
aplicável, mas listener responde a todas mensagens recebidas, Controle interno
para evitar múltiplas chamadas simultâneas conflitantes, Nenhuma limitação
explícita, dependente do runtime do Chrome, Não especificado</rate_limiting>
</api_specifications> <deployment_context> <environments>development,
production, dev, staging, prod, Development, Production, Development
(localhost), Staging (testes internos), Production (Chrome Web Store, Firefox
Add-ons), Localhost (http://localhost/_), DeploySentinel
(https://_.deploysentinel.com/_), Development (localhost), Production (Chrome
Web Store), Desenvolvimento local, staging e produção via Chrome Web Store,
localhost, deploysentinel.com, \*.deploysentinel.com, development (localhost),
staging (test environment), production (Chrome Web Store), Desenvolvimento
local, staging via builds automatizados, produção via Chrome Web Store,
Development - localhost, Production - Chrome Web Store Extension, Ambiente
browser extension para Chrome e navegadores compatíveis, Desenvolvimento local,
Produção via publicação na Chrome Web Store, Ambiente browser, qualquer DOM
compatível, dev, staging, production, URLs dependem do ambiente de CI/CD,
development (localhost:PORT), Local development, Test environment, Development -
http://localhost:3000, Staging - https://staging.example.com, Production -
https://app.example.com, Desenvolvimento, Staging, Produção, Ambientes típicos:
desenvolvimento, staging e produção, dev - http://dev.history.local, staging -
http://staging.history.local, prod - https://history.prod.company.com, dev
(dev.example.com), staging (staging.example.com), prod (example.com), Dev,
Staging e Produção via publicação da extensão Chrome, Development, Staging,
Production, Desenvolvimento local, staging e produção para automação,
development (localhost), staging (testes internos), production (Chrome Web
Store), Dev, Staging, Prod, URLs dependem do sistema maior, dev -
https://dev.example.com, staging - https://staging.example.com, prod -
https://example.com</environments> <deployment_method>Static hosting, CI/CD
pipelines, Docker, Kubernetes, Chrome Web Store, Firefox Add-ons Marketplace,
Publicação via Chrome Web Store e Firefox Add-ons, builds automatizados via
scripts Node.js, Chrome Web Store Extension, Publicação via Chrome Web Store,
Extensão Chrome empacotada e distribuída via Web Store, CI/CD pipeline, Chrome
Web Store deployment, CI/CD via GitHub Actions, Publicação como extensão
Chrome/Firefox, Extensão Chrome empacotada e publicada, Browser extension
injection, Distribuição via Chrome Web Store como extensão, Chrome Extension via
Web Store, CI/CD pipeline via GitHub Actions, Distribuído via npm como
biblioteca JavaScript, WebExtension packaging, Docker para containerização,
GitHub Actions para CI/CD, CI/CD pipeline com deploy automatizado, Local Node.js
server, Build local via npm scripts, deploy manual para Chrome Web Store,
Extensão Chrome carregada localmente via Playwright, Docker containers
orquestrados via Kubernetes, Deploy via pipeline CI/CD, possivelmente Docker ou
Vercel/Netlify, Deploy via containers Docker ou servidores Node.js, Extensão
Chrome empacotada, Deploy via CI/CD pipeline para ambiente web, Docker
containerizado para front-end, Deploy via CI/CD pipeline automatizado, Chrome
Extension Store, Chrome Web Store e sideload via extensão unpacked, Deploy via
CI/CD em servidores cloud com Docker, CI/CD pipeline automatizado, Extensão
Chrome via Chrome Web Store, Deploy via pipelines CI/CD para ambientes Node.js,
Manual sideload, Distribuição via Chrome Web Store, empacotamento com npm
scripts, Docker e Kubernetes presumidos para sistema maior, Docker container
dentro do ReplayEngine</deployment_method>
<environment_variables>MANIFEST_VERSION para controle de versão do manifest (2
ou 3), CHROME_EXTENSION_ID, DEPLOYSENTINEL_API_KEY, Configurações internas via
chrome.storage.local, sem variáveis externas, Nenhuma explícita, API_KEYS
(externos), Nenhum variável sensível exposta neste módulo, Nenhuma variável
sensível exposta neste componente, Nenhuma variável de ambiente explícita no
código, Nenhuma variável sensível exposta no código, Nenhuma variável de
ambiente sensível exposta no código, NODE_ENV, CYPRESS_BASE_URL, BABEL_ENV,
ASSET_PATH, PORT, BABEL_ENV=development, NODE_ENV=development, ASSET_PATH=/,
PORT (definido em ./env), MANIFEST_VERSION, .env.local, .env.development.local,
.env.test.local, .env.production.local, Nenhum variável de ambiente explícita,
REPLAY_API_URL, AUTH_TOKEN, Variáveis para API endpoints e chaves, não expostas
no código, --bg-dark, Variáveis para configuração do storage e endpoints
externos, Nenhuma variável sensível configurada, HISTORY_BACKEND_URL,
JWT_SECRET, --text-primary, --primary, --error, --success-bg, DATABASE_URL,
API_KEYS, Nenhum variável sensível no código client-side, REPLAY_API_URL,
NODE_ENV, CHROME_EXTENSION_ID, Nenhuma variável sensível, Nenhuma variável
sensível diretamente usada, Nenhum variável sensível diretamente usada, Nenhuma
variável sensível no executor específico, Variáveis para configuração de
endpoints e autenticação, Nenhuma variável específica para
EventBus</environment_variables> <infrastructure_constraints>Limitações das APIs
de extensão dos navegadores, Necessidade de builds separados para Chrome e
Firefox, Limitações impostas pelas políticas das lojas de extensões, restrições
de APIs do browser, Limitação a Manifest Version 2, Permissões restritas pelo
navegador, Limitação ao ambiente do navegador Chrome e suas APIs, Limitações do
ambiente de extensão Chrome e APIs disponíveis, Execução limitada ao ambiente do
navegador Chrome, Limitações do ambiente de extensões Chrome, como storage
quotas e permissões, Limitações do ambiente de extensão de navegador, restrições
de API e armazenamento local, Limitações do ambiente de extensão Chrome para
acesso a APIs e armazenamento, Dependência de APIs específicas do navegador,
Limitação a ambientes que suportem shadow DOM, Limitações do armazenamento local
do navegador e políticas de extensão, Limitações do ambiente de extensão Chrome
e compatibilidade com browsers, Limitação ao ambiente de execução do navegador
Chrome, Dependência da API de extensões do Chrome, Necessidade de container DOM
&apos;#app-container&apos; disponível no host, Dependência de ambiente DOM e
suporte a querySelectorAll, Limitações das APIs suportadas por cada navegador,
Limitação de recursos para execução paralela de testes, Necessita Node.js
ambiente local, porta disponível para servidor, Limitação a ambiente Node.js
para build, compatibilidade com Chrome, Necessidade de ambiente com Chromium
instalado, Limitação de memória para containers frontend, Dependência de
latência baixa para API de replay, Frontend leve, dependente de backend para
persistência, Dependência de armazenamento persistente confiável para gravações,
Limitações do chrome.storage.local em tamanho e performance, Limitação de
armazenamento em disco para histórico local, Necessidade de alta disponibilidade
para backend, Dependência de ambiente browser para execução, Limitações de
largura de banda para assets estáticos, Compatibilidade com navegadores modernos
e fallback para antigos, Limitação de memória em pods Kubernetes a 512MB,
Limitações do ambiente de execução do Chrome Extensions API, Limitação de
conexões simultâneas para backend de replay, Limitações da API Chrome Extensions
e Manifest V3, Limitações do armazenamento chrome.storage.sync (quota e
latência), Execução em ambiente com acesso ao DOM (browser ou headless),
Execução em ambiente browser com suporte a ES6+, Limitações da API Chrome
Runtime, Permissões restritas no manifesto, Limitações da API Chrome Extensions,
execução em sandbox do navegador, Limitação de memória para múltiplas sessões
simultâneas, Necessidade de baixa latência e alta disponibilidade, Limite de
memória por container: 512MB, Escalabilidade horizontal via pods Kubernetes,
Execução em ambiente Node.js com memória limitada</infrastructure_constraints>
</deployment_context> </system_architecture>

<project_files> <relevant_files> <directory path="."> <file>
<path>src/pages/Popup/components/RecordingDetail.tsx</path>
<name>RecordingDetail.tsx</name> <summary>O componente RecordingDetail é uma
interface React que exibe detalhes completos de uma gravação de teste
automatizado, incluindo visualização das ações capturadas e do código Cypress
gerado. Ele permite alternar entre a visualização das ações e do código, copiar
o código para a área de transferência, baixar o arquivo de teste, e controlar a
reprodução do teste com funcionalidades de iniciar, pausar, retomar e parar. O
componente gerencia estados internos para modo de visualização, status de cópia,
modo de cache e integra-se com hooks externos para controle do replay,
garantindo uma experiência interativa e responsiva para o usuário final, com
logs detalhados para rastreamento de eventos e erros.</summary> </file> <file>
<path>src/pages/Popup/components/RecordingHistory.tsx</path>
<name>RecordingHistory.tsx</name> <summary>O componente RecordingHistory é uma
interface React que gerencia e exibe um histórico de gravações de sessões,
permitindo busca, ordenação, seleção múltipla, exclusão, exportação e importação
de dados. Ele mantém estados internos para controle de carregamento, seleção e
notificações, aplicando filtros e ordenações eficientes via useMemo, além de
interagir com um serviço externo RecordingService para persistência e
manipulação dos dados. A interface é responsiva e acessível, com feedback visual
e controle de ações críticas, garantindo uma experiência fluida e segura para o
usuário final.</summary> </file> <file>
<path>src/pages/storage/recording-store.ts</path>
<name>recording-store.ts</name> <summary>O código implementa um singleton
chamado RecordingStore para gerenciar o histórico de gravações utilizando a API
chrome.storage.local. Ele oferece funcionalidades para salvar, listar, obter,
remover e limpar gravações, além de realizar migrações de dados antigos para
novos formatos, garantindo a integridade e limite máximo de entradas
configurável. O comportamento inclui debounce para otimizar operações de
escrita, aplicação de estratégias de poda de dados e tratamento robusto de
erros, assegurando persistência eficiente e consistente do histórico de
gravações em ambiente de extensão Chrome.</summary> </file> <file>
<path>src/pages/types/recording.ts</path> <name>recording.ts</name>
<summary>Este arquivo define interfaces TypeScript para um sistema de histórico
de gravações focado em capturar, armazenar e gerenciar sessões de gravação de
ações de usuário em URLs específicas. O componente principal é a interface
RecordingEntry, que estrutura os dados de cada gravação, incluindo
identificadores únicos, URLs originais, timestamps de início e fim, ações
registradas e código gerado para testes automatizados com Cypress. Além disso,
há configurações para controle do histórico, como limite máximo de entradas e
estratégias de poda, e uma interface para backend que abstrai operações
assíncronas de persistência, listagem, recuperação e remoção de gravações. O
design modular e tipado assegura integridade dos dados e facilita a integração
com sistemas de automação de testes e análise comportamental, garantindo
rastreabilidade e manutenção eficiente do histórico de gravações.</summary>
</file> <file> <path>src/replay/api/hooks.ts</path> <name>hooks.ts</name>
<summary>Este arquivo implementa um hook React chamado useReplay, que gerencia o
estado e as ações relacionadas à reprodução de sessões gravadas de interação do
usuário. Ele controla o ciclo de vida do replay, incluindo início, pausa,
retomada e parada, atualizando o estado interno conforme mensagens assíncronas
são recebidas do background. O hook mantém informações detalhadas sobre o
progresso, status, erros e carregamento, garantindo uma interface reativa e
robusta para integração com o sistema de replay, facilitando o monitoramento e
controle das sessões em tempo real, com tratamento de erros e controle de cache
configurável.</summary> </file> <file> <path>src/replay/api/index.ts</path>
<name>index.ts</name> <summary>Este arquivo implementa uma API pública para
controle de sessões de replay em um ambiente de extensão Chrome, permitindo
iniciar, pausar, retomar e parar replays de gravações de sessões. Através do
envio de mensagens assíncronas para o background script, ele gerencia o estado
das sessões de replay, tratando erros de comunicação e respostas inválidas. O
código utiliza promessas para garantir o fluxo assíncrono e valida as respostas
recebidas, assegurando a integridade do processo e a experiência do usuário
durante a manipulação dos replays.</summary> </file> <file>
<path>src/replay/core/executors/base.ts</path> <name>base.ts</name> <summary>O
código define uma classe abstrata ActionExecutor que serve como base para
executores de ações em um contexto de página web, focando na execução confiável
e eficiente de interações automatizadas. Ele implementa métodos auxiliares para
seleção inteligente de elementos DOM, espera ativa por elementos, rolagem
automática e controle de atrasos, garantindo robustez e flexibilidade na
manipulação de elementos da interface. Essa estrutura modular e extensível
permite a criação de executores especializados que podem lidar com diferentes
tipos de ações, maximizando a reutilização e a manutenção do código em projetos
de automação web.</summary> </file> <file>
<path>src/replay/core/executors/factory.ts</path> <name>factory.ts</name>
<summary>O código implementa uma fábrica de executores de ações
(ActionExecutorFactory) que gerencia a criação e o fornecimento de instâncias
específicas de executores para diferentes tipos de ações definidas no sistema,
como Click, Input, Navigate, Resize, Screenshot, Wheel e Load. Seu comportamento
central consiste em registrar esses executores em um mapa associativo e retornar
o executor adequado conforme o tipo da ação requisitada, incluindo uma lógica
condicional para ações do tipo Wheel que verificam propriedades específicas.
Essa abordagem modulariza a execução de comandos, facilitando a extensão e
manutenção do sistema, além de garantir que cada ação seja tratada por um
executor especializado, promovendo coesão e desacoplamento entre
componentes.</summary> </file> <file>
<path>src/replay/core/executors/screenshot.ts</path> <name>screenshot.ts</name>
<summary>O código implementa um executor especializado para ações de captura de
screenshots dentro de um sistema modular de execução de ações. Seu comportamento
central consiste em enviar uma mensagem assíncrona para um background script do
Chrome para solicitar a captura da tela no momento especificado, aguardando a
resposta e aplicando um pequeno delay para garantir a estabilidade do processo.
Essa funcionalidade habilita a integração transparente com o sistema de
background, permitindo a captura de imagens do estado atual da aplicação,
essencial para auditoria, monitoramento ou funcionalidades de suporte
visual.</summary> </file> <file> <path>src/replay/index.ts</path>
<name>index.ts</name> <summary>O código exporta funcionalidades públicas e tipos
relacionados ao sistema de replay, permitindo controle completo do ciclo de vida
de sessões de replay, incluindo início, pausa, retomada e parada. Ele também
disponibiliza hooks para integração reativa, além de funções para configuração e
redefinição de parâmetros do replay. A estrutura modularizada separa claramente
API, configuração e tipos, facilitando a manutenção e extensão do sistema,
garantindo interoperabilidade e consistência no gerenciamento do estado e
eventos do replay.</summary> </file> <file>
<path>src/replay/types/events.ts</path> <name>events.ts</name> <summary>Este
arquivo define um conjunto estruturado de tipos e eventos para o sistema de
replay, que gerencia a reprodução controlada de sessões gravadas. Ele especifica
mensagens de comando (start, pause, stop, resume), mensagens de status
(progress, completed, error) e eventos internos para monitoramento do ciclo de
vida das sessões. O código organiza a comunicação entre componentes do sistema,
garantindo controle preciso do estado das sessões e fornecendo feedback
detalhado sobre o progresso e erros, habilitando uma integração robusta e
escalável para funcionalidades de replay em aplicações complexas.</summary>
</file> <file> <path>src/replay/types/session.ts</path> <name>session.ts</name>
<summary>O código define interfaces e enums para gerenciar sessões de replay de
ações em um sistema, permitindo controlar o estado, progresso e resultados
dessas sessões. Ele suporta múltiplos status de execução, opções configuráveis
para cache e comportamento de repetição, além de capturar erros e timestamps
relevantes. Essa estrutura facilita o monitoramento detalhado e controle robusto
do fluxo de replay, garantindo rastreabilidade e flexibilidade na execução das
ações.</summary> </file> </directory> </relevant_files> </project_files>
</context> </onboarding_summary> </context_reference>

<output_format> Executar diretamente no Claude Code: 1. Criar/modificar arquivos
necessários 2. Implementar código production-ready </output_format>
</claude_code_execution>
