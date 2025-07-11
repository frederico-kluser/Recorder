<critical_role>
Você é um desenvolvedor de software expert responsável por implementar código de PRODUÇÃO baseado em um plano detalhado. Seu código será integrado diretamente ao sistema Ondokai.

ATENÇÃO: Código mal implementado pode quebrar funcionalidades existentes. Precisão e aderência aos padrões são CRÍTICAS.

# Instrução de Processamento Híbrido
Todo código deve usar termos técnicos em inglês (variáveis, functions, classes, methods). Comentários devem ser em português para melhor compreensão local. JSDoc deve ter descrições em português mas parâmetros em inglês.
</critical_role>

<thinking>
Processo de implementação estruturado:
1. Analisar profundamente o plano de implementação
2. Identificar padrões e convenções no código existente
3. Mapear dependências e pontos de integração
4. Planejar estrutura de código antes de implementar
5. Considerar performance, segurança e manutenibilidade
6. Implementar com testes mentais durante o processo
</thinking>

<context>
<system_architecture priority="high">
<context>
<system_architecture>
  <project_metadata>
    <name>React Application Setup, build, processo de construção do projeto, Fleury Cypress Recorder, Extensão para geração automática de scripts de teste, Projeto TypeScript com Jest para testes automatizados, deploysentinel-recorder, Extensão para geração automática de scripts Cypress, Extensão para gravação de interações e geração de scripts de teste, DeploySentinel, Extensão para gravação e replay de testes automatizados, DeploySentinel Test Recorder, Automação de testes Playwright, React Icon Component, Componente de ícone SVG para interface web, Interface para monitoramento e deploy de aplicações, Projeto de automação de testes com Cypress, Chrome Extension Recording Automation, Automação de Testes UI com Cypress, Browser Recording Extension, Extensão para gravação e controle de sessões em navegador, Automated UI Testing Script Visualizer, Code Generation UI, Visualização e geração dinâmica de código, Recorder ControlBar - Interface para gravação e geração de scripts de automação de testes, Highlighter Component, Visualização e destaque de seletores CSS em UI React, Interface de controle para monitoramento e testes, User Interaction Recorder, Gravação de ações para automação e análise, DeploySentinel Cypress Test Recorder, Ferramenta para gravação de testes automatizados com Cypress, Cypress Test Recorder Extension, Analytics Event Tracker, Monitoramento de eventos para análise de uso, Popup UI Renderer, Interface para exibição de popups com temas dinâmicos, @medv/finder, CSS Selector Generator, Gerador de scripts automatizados para testes Cypress, UI Test Selector Generator, Automação de Seletores para Testes de Interface, Projeto Front-end com suporte a importação de assets estáticos, Browser Extension Compatibility Layer, Projeto React com TypeScript para front-end moderno, Webpack Production Build Script, Configuração de ambiente para aplicação Node.js, Chrome Extension Boilerplate, Development Environment Setup, Projeto Node.js com controle de versionamento otimizado, Timestamp Migration and Validation Utility, Cypress Script Automation, Automação de scripts de teste end-to-end com Cypress, Extensão para gravação de testes Cypress, UI Component Library, Button and Layout Styling, Replay Test Automation Platform, Recording History Manager, Interface para gerenciamento de gravações de sessões, Web UI Base Styling, RecordingService, Gerenciamento de gravações para automação de testes, Gerenciamento de histórico de gravações para extensões Chrome, Sistema de Histórico de Gravações para Automação de Testes, Dark Theme UI Styling, Unified dark mode theme for web application, Fleury Brand Identity Component, Layout Dark Mode Unificado, Interface Web Responsiva, Popup UI Consistency Wrapper, Popup Recording History UI, Interface para visualização e interação com histórico de gravações, RecordingDetail Dark Theme, Interface para visualização detalhada de gravações, RecordingHistory UI Theme, Interface para histórico de gravações, Recording History UI, Interface para gerenciamento e visualização de gravações, Automação de geração e download de testes Cypress, Text Utilities Module, Manipulação e truncamento de textos para UI, RecordingDetail Component, Visualização detalhada de gravações, RecordingHistory Component, Interface para gerenciamento de histórico de gravações, Extensão com popup estilizado para interface dark mode, Tema Dark Unificado Fleury, Sistema de Gerenciamento de Dados Empresariais, Replay Manager Extension, Gerenciamento de replays de gravações em extensão Chrome, Replay Module, Centralização de funcionalidades de replay de gravações, ReplayHandler, Gerenciamento de execução de replays em extensão Chrome, ReplayRunner, Automação de reprodução de interações em páginas web, Replay System, Sistema para reprodução automatizada de gravações de ações</name>
    <domain>Web Development, Frontend, React, desenvolvimento de software, automação de build, Automação de testes, QA, Test Automation, Browser Testing, Desenvolvimento de software, Testes automatizados, TypeScript, Browser Extensions, Browser Interaction Recording, End-to-End Testing, Web Testing, Browser Extension, Playwright, Frontend Development, UI Components, DevOps, Branding, Quality Assurance, Test Scripts, Automation, Testing, Cypress, UI Testing, Automated Testing, Cypress Integration, UI Interaction, Web Application Testing, Automação de geração de código, Developer Tools, UI Debugging, CSS Selector Highlighting, Web UI Testing, Shadow DOM, Web UI, User Behavior Analytics, Web Analytics, Digital Product Monitoring, Google Analytics, Frontend Web Application, UI/UX Components, Theming and Styling, DOM Manipulation, CSS Selectors, Testes end-to-end, Web testing, Automação de Testes, Testes End-to-End, Seletores CSS, Desenvolvimento front-end, Assets estáticos, CSS Modules, SVG inline, browser extensions, cross-browser compatibility, Interação com UI web, Web applications, Desenvolvimento Frontend, Build Automation, JavaScript, Configuração de software, Node.js environment management, Chrome Extensions, Frontend Tooling, Node.js, Controle de versão, Software Development, Event Processing, Action Logging, Frontend Styling, UI/UX, Test Recording, Replay Testing, Web Application, Session Recording, User Interaction Tracking, Recording Management, User Action Recording, chrome.storage API, Web Recording, UI/UX Design, Healthcare, Web Application UI, Dark Theme Design, Frontend UI, Popup Interface, Software de gravação, UX/UI para análise de gravações, Dark theme styling, Software de monitoramento, Recording analysis, UI/UX design, User Interface, Media Management, User Interaction, Recording Analytics, Cypress Testing Framework, Text Processing, Software de gravação e replay, UI/UX para análise de sessões, Terminologia técnica em inglês, Recording History, Extensões de navegador, Dark mode theming, Front-end Development, Theming, Dark Mode, Enterprise Data Management, Data Integrity, Business Rules, Playback Automation, Chrome API, Replay de gravações, Monitoramento, Análise de sessões, Extensão Chrome, Replay de ações de usuário, Web Automation, Replay de sessões, Web interactions</domain>
    <current_phase>Development, produção, deploy, Produção, Manutenção ativa, Manutenção, Versão 0.7.1 estável, Estável, Estabilização, Production, Estável com suporte a SPA, Estável com suporte a hot reload para desenvolvimento, MVP, Desenvolvimento ativo, Desenvolvimento inicial, Local Testing, Production Ready, Desenvolvimento, Testes unitários implementados, Testes automatizados integrados, Estável com funcionalidades completas de histórico, Stable UI Theme, Estabilização de UI, Estabilização visual e usabilidade, Estabilização do tema visual, Estabilização visual, Estabilização UI, Stable Utility Functions, Estabilização visual e responsiva, Estável para uso em ambiente de extensão Chrome</current_phase>
    <critical_business_rules>Preserve fast refresh functionality, Ensure JSX transpilation compatibility, build deve gerar artefatos consistentes, não quebrar pipeline de deploy, Captura precisa e completa dos eventos do usuário, Geração correta e legível dos scripts, Compatibilidade com múltiplos frameworks de teste, Execução consistente dos testes, Suporte a TypeScript via ts-jest, Ambiente Node.js para testes, Compatibilidade com manifest v2 e v3, Geração precisa e confiável de scripts Cypress, Manutenção da integridade dos scripts gerados, Gravação precisa das interações do usuário, Geração correta de scripts compatíveis com Cypress, Playwright e Puppeteer, Segurança no acesso às permissões do navegador, Segurança e privacidade dos dados capturados, Gravação só ativa em aba e frame corretos, Estado de gravação deve ser consistente, Scripts injetados devem ser executados apenas em contexto autorizado, Validação rigorosa da origem das mensagens, Comunicação segura entre webapp e extensão, Consistência visual do ícone, Compatibilidade com React 18+, Renderização correta do SVG, Consistência visual da marca, Performance mínima no carregamento do logo, Tipo de script deve ser sempre Cypress, Interface deve manter compatibilidade visual, Persistência correta das gravações, Envio confiável das gravações para webapp, Limpeza segura do estado local, Uso obrigatório da biblioteca Cypress para scripts, Persistência consistente das preferências do usuário, Sincronização em tempo real do estado de gravação, Scripts devem ser executados apenas em frames autorizados, Identificador de instalação deve ser único e persistente, Only supported action types should be rendered, Sensitive input values must be masked, Geração correta e precisa do código, Manter integridade do código gerado, Renderização fiel do código para análise, Integridade das ações gravadas, Sincronização do estado de gravação, Precisão na geração de seletores e código, Precisão no posicionamento do destaque, Renderização consistente do rótulo, Não interferir na interação do usuário, Garantir única instância ativa do script, Permitir limpeza completa do componente para evitar vazamentos, Não registrar eventos de campos password, Evitar duplicação de eventos, Persistência consistente no armazenamento local, Garantir que apenas uma gravação esteja ativa por vez, Não montar múltiplos botões no DOM, Comunicação correta com a extensão Chrome, Preservar integridade das gravações, Garantir sincronização correta entre abas e gravações, Não permitir gravação sem aba ativa, Garantir anonimato do usuário, Enviar dados de eventos sem impactar UX, Manter integridade dos dados enviados, Renderizar Popup no container correto, Aplicar estilos globais e temáticos sem conflito, Gerar seletores únicos e válidos, Manter performance aceitável, Evitar seletores ambíguos, Gerar scripts válidos para Cypress, Preservar ordem e estado das ações, Incluir waits configuráveis para sincronização, Seletores devem ser únicos e estáveis, IDs inválidos não devem ser usados, Priorizar atributos de acessibilidade e testes, Importação correta e tipada de arquivos estáticos para evitar erros de build, Garantir que chamadas à API do navegador sejam compatíveis entre Chrome e Firefox, Integridade dos dados de ações, Validação de tipos de ações suportadas, Captura precisa de eventos temporais, Garantir tipagem estrita para evitar erros em runtime, Manter compatibilidade com ES5 para browsers legados, Build deve ser executado em modo produção, Erros de build devem ser reportados e impedir deploy, NODE_ENV deve sempre estar definido, PORT deve ser um número válido, Hot Module Replacement must be enabled for dev mode, Dev server must serve assets with CORS headers, Manifest version consistency, Environment variable integrity, Asset path correctness, Não versionar arquivos de dependências, Não expor arquivos de configuração sensíveis, Manter repositório limpo e organizado, All actions must have valid, non-negative, and sequential timestamps, Scripts gerados devem refletir fielmente ações do usuário, Comandos Cypress devem ser válidos e executáveis, Gravação precisa das ações do usuário, Geração correta do código Cypress, Isolamento do contexto do navegador, Consistent visual feedback on interactive elements, Accessibility compliance, Responsive layout support, Integridade dos dados da gravação, Execução correta do replay, Geração fiel do código Cypress, Não perder dados de gravações ao excluir, Exportação e importação devem preservar integridade dos dados, Consistent UI layout, Accessible typography, Responsive scrolling behavior, Gravações vazias não podem ser salvas, IDs de gravação devem ser únicos, Importação deve validar formato e evitar duplicatas, Limite máximo de entradas no histórico não pode ser ultrapassado sem poda, Integridade dos dados de gravação deve ser mantida, Migração de dados antigos deve preservar ações, Limite máximo de entradas no histórico, Integridade dos IDs únicos, Persistência confiável das gravações, Consistent dark mode application, Accessibility compliance for color contrast, Manter identidade visual consistente, Garantir acessibilidade e responsividade, Consistência visual do tema dark, Responsividade do layout, Acessibilidade mínima via contraste, Consistência visual entre views, Navegação clara com botão de voltar, Consistência visual do tema Dark, Feedback visual claro para interações, Acessibilidade mínima para leitura e navegação, Consistência visual entre temas, Legibilidade e acessibilidade, Feedback visual claro para ações do usuário, Consistência visual do tema, Acessibilidade básica para navegação, Manter integridade visual e responsividade, Garantir acessibilidade e usabilidade, Preservar estados de seleção e ações do usuário, Nomes de arquivos devem ser válidos para sistemas de arquivos, Downloads devem ser disparados sem falhas, Conteúdo do teste deve conter metadados para rastreabilidade, Não truncar textos menores que o limite, Preservar domínio completo em URLs truncadas, Manter integridade visual do replay, Garantir responsividade e acessibilidade, Preservar estados de erro e loading, Manter integridade visual e responsiva, Garantir feedback visual claro para ações do usuário, Preservar usabilidade em dispositivos móveis, Manter consistência visual do tema dark, Garantir legibilidade e acessibilidade, Manter alto contraste para acessibilidade, Consistência visual em todos os componentes, Compatibilidade com resolução 800x600, Validação rigorosa de dados, Consistência transacional, Controle de acesso baseado em roles, Replay deve iniciar somente após resposta positiva do background, Estado do replay deve ser sincronizado com aba ativa, Erro deve ser reportado e estado atualizado imediatamente, Replay deve ser consistente e sincronizado, Tipos devem garantir integridade dos dados, Garantir execução sequencial e correta das ações gravadas, Manter sincronização do estado do replay entre popup e runner, Limpar estado ao fechar abas para evitar inconsistências, Execução fiel e sequencial das ações, Retry em falhas temporárias, Comunicação confiável com background script, Integridade do estado do replay, Execução sequencial das ações, Comunicação confiável entre componentes</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>JavaScript ES6+, JSX, JavaScript, Node.js, TypeScript 5.0, TypeScript 5.x, TypeScript 4.1.5, Manifest Version 2, JavaScript ES2021, Manifest V3 JSON, TypeScript 4.x, React 18, JavaScript ES2020, JavaScript (Node.js 16+), JavaScript (Node.js 18+), JavaScript ES2020+, CSS3, JavaScript (React integration), CSS Variables, Custom Properties (CSS Variables), CSS Custom Properties (CSS Variables), JavaScript ES2022, Node.js 18, JavaScript ES Modules, TypeScript (tipos)</primary_language>
    <frameworks>React (via react-app preset), Webpack, Babel, Webpack 5, Yarn, Cypress, Playwright, Puppeteer, Jest 29.x, ts-jest, React 17.0.1, Jest 27.3.1, Webpack 5.23.0, Babel 7.12.17, Chrome Extensions API, Nenhum framework frontend explícito, React 18.2, React 18, React 18.x, WebExtensions API, Lodash 4.x, FontAwesome 6.x, ReactDOM, Nenhum framework front-end explícito (vanilla JS/TS), FontAwesome SVG Core, Nenhum framework específico detectado, Nenhum (biblioteca standalone), Cypress (para testes E2E), React 18.2 (implícito), Cypress (para automação de testes), Webpack 5.x, WebpackDevServer 4, Cypress 12.x, Jest 29, Playwright 1.x, None (Vanilla CSS), Nenhum framework frontend/backend explícito, Nenhum framework CSS explícito, Possível integração com React ou similar, Possível integração com React ou similar para componentes, React (suposição pelo padrão de classes e estrutura), Possível integração com React ou Vue para JS, Nenhum framework CSS explícito, uso de variáveis CSS customizadas, Cypress (testes end-to-end), React (implícito pelo padrão de classes), CSS Modules ou Styled Components (possível integração), React (presumido), CSS Modules or Styled Components (possível integração), Nenhum framework específico declarado, Express 4.18.2, Mongoose 6.7.0</frameworks>
    <databases>chrome.storage.local, Não aplicável, chrome.storage.local (armazenamento local do navegador), LocalStorage (via recordingStore), Não aplicável (armazenamento local via RecordingService), recordingStore (abstração de storage, tipo não especificado), MongoDB 6.0, Local storage abstraído via recordingStore</databases>
    <external_services>Chrome Web Store, Firefox Add-ons Marketplace, GitHub Actions, Browser APIs (chrome.*), Test Automation Frameworks (Cypress, Playwright, Puppeteer), https://*.deploysentinel.com, Chrome WebExtensions API, Chrome Extension API, DeploySentinel Webapp, Chrome Extensions API, chrome.storage API, Chrome Browser API, Mozilla Browser API (compatibilidade), Chrome Storage API, Chrome Extension Messaging API, Chrome Extension APIs (tabs, scripting), FontAwesome Icons, Google Analytics Measurement Protocol API, @fortawesome/fontawesome-svg-core, Firefox WebExtension API, Cypress Test Runner, Node.js environment, Chrome APIs, Chromium Browser, Clipboard API, File download utilities, RecordingService API (local storage abstraction), Google Fonts (Roboto), Font icon libraries (ex: FontAwesome), Browser APIs (Blob, URL, DOM), File system APIs para import/export JSON (via browser), REST APIs externas para autenticação e notificações, Chrome Runtime API, Chrome Tabs API, replay-runner (script injetado externamente), Chrome Runtime Messaging, Chrome Tabs and Scripting APIs, chrome.runtime messaging</external_services>
    <package_manager>npm, yarn, Yarn, yarn 1.22.22, npm 9.6.7</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Modular Build Configuration, Pipeline, Modular Build Scripts, Observer Pattern, Event-driven Architecture, Modular Architecture, Configuration Object Pattern, Modular, Component-based UI, Build Pipeline Orchestration via npm scripts, Extension Architecture (Background Script, Content Script, Browser Action), Modular Extension Design, Service Worker Background Processing, Modularization, Message Passing, Component-Based Architecture, Presentational Component, Service Layer, Hooks Pattern, Adapter Pattern, Modular Functional Design, Presentational and Container Components, Separation of Concerns, Observer Pattern (event listeners), State Management via React Hooks, Functional Components, Singleton, Shadow DOM encapsulation, Observer, Debounce, Hook Pattern, Hooks for State Management, Container/Presenter Pattern, Modularização funcional, Hot Module Replacement, Modular Functional, Generator Pattern, Bottom-up Search, Builder Pattern, Factory Method (implícito via classes abstratas), Encapsulamento orientado a objetos, Modularização Funcional, Defensive Programming, Modularização via declaração de módulos TypeScript, Alias Pattern, Inheritance, Discriminated Union Types, Component-based, Build Pipeline Script, Configuration Module Pattern, Modular Configuration, Middleware Pattern, Plugin Pattern, .gitignore pattern segmentation, Functional Programming, Modular Design, Fluent Interface, Test Automation Pattern, Page Object Pattern (implicit), Atomic Design (Component-based CSS), Component-based Architecture, Container/Presentational Pattern, Modular CSS, Theming with CSS Variables, Service Facade, Strategy (para pruneStrategy), Repository Pattern, Interface Segregation, Component-based UI Styling, Theming via CSS Variables, Component-Based UI, Container/Presenter, Component Composition, Component-based styling, BEM-like naming, Component-based UI styling, Component-Based UI Styling, Responsive Design, Factory Function, Utility Module, Separation of Concerns via CSS classes, BEM CSS Naming, Global Style Reset, MVC, Hook Customizado React, Modularização, Barrel Module, Dependency Injection, Command Pattern, Retry Pattern, Message-driven Architecture, State Machine</design_pattern>
    <folder_structure>Config files in root or config folder, Source code in src/, src/, build/, dist/, src/ - código fonte, assets/ - imagens e ícones, tests/ - testes E2E, dist/ - builds para Chrome e Firefox, Configurações centralizadas em pasta de configuração (ex: /config ou raiz), build - arquivos empacotados, utils - scripts utilitários para build e servidor, node_modules - dependências, src - código fonte React e lógica, background/ - scripts de background, content_scripts/ - scripts injetados nas páginas, popup/ - interface do usuário da extensão, assets/ - ícones e recursos estáticos, background/ - service worker scripts, popup/ - UI da extensão, assets/ - ícones e imagens, Common/utils - utilitários compartilhados, storage - gerenciamento de estado, modules/replay - lógica de replay, background - script principal da extensão, src/: código fonte, background/: scripts da extensão, content-scripts/: scripts injetados, src/components/Icon - componente isolado para reutilização visual, pages: componentes de tela, Popup: componentes modais ou popups, assets: arquivos estáticos como imagens e SVGs, src/components - componentes React reutilizáveis, src/types - definições de tipos TypeScript, utils - funções utilitárias, builders - geração de código, storage - persistência de dados, types - definições de tipos, src/hooks - custom React hooks, src/utils - funções utilitárias para armazenamento, src/types - definições de tipos e constantes, src/utils - funções utilitárias para armazenamento e execução de scripts, src/background - controle do estado da extensão e comunicação com abas, types/ - definição de tipos e enums, builders/ - funções auxiliares para construção de seletores, components/ - componentes React reutilizáveis, styles/ - arquivos CSS, src/components - UI components, src/builders - lógica de geração de código, src/types - definições de tipos, /components - UI components, /builders - lógica de geração de seletores e código, /Common - hooks e utilitários compartilhados, /types - definições de tipos, src/components/Highlighter - componente visual e estilização associada, ./ControlBar - componente React principal, ../Common - estilos compartilhados, root - script de bootstrap e injeção, builders/selector: geração de seletores, Common/utils: utilitários gerais, types: definições de tipos e enums, Common: componentes e hooks reutilizáveis, types: definições de tipos TypeScript, styles: CSS modularizados, Common (shared components/utilities), Content (content scripts and UI parts), storage (state persistence), builders (code generation), types (TypeScript types), Common/utils para funções utilitárias, Módulo de analytics separado para eventos, src/: código fonte principal, src/components/: componentes React reutilizáveis, src/themes/: estilos temáticos, src/global.css: estilos globais, src/ - código fonte principal, test/ - testes unitários, dist/ - build final, src/types - definições de tipos e enums, src/generators - classes para geração de scripts, src/utils - funções utilitárias, src/types - Tipos e enums, src/utils - Funções utilitárias como finder, src/selectors - Geração e seleção de seletores, src/assets para arquivos estáticos, src/types para declarações de tipos, types/: definições de tipos, dist/: build final, src/actions - definição das ações e tipos, src/utils - funções utilitárias (planejado), src (código fonte), build (artefatos compilados), node_modules (dependências externas), config/ - configurações do Webpack, scripts/ - scripts de build e automação, config/ - arquivos de configuração centralizados, config/ - configurações do Webpack e ambiente, build/ - saída dos arquivos compilados, src/ - código fonte da aplicação, src/pages - Contém scripts específicos da extensão (Popup, Background, Content, Bridge, CypressTrigger), src/assets - Recursos estáticos como imagens, build - Diretório de saída para arquivos compilados, /node_modules para dependências, /coverage para relatórios de teste, /build para artefatos de produção, .prompts, .logs, .audios para dados auxiliares, src/types - definição de tipos, src/utils - funções utilitárias para manipulação de dados, src/pages/builders - Contém construtores de scripts Cypress, tests/ - Contém testes unitários, /tests - testes automatizados, /build - extensão compilada, /tmp - dados temporários para contexto do navegador, styles/components - componentes reutilizáveis, styles/utilities - classes utilitárias para layout e espaçamento, src/hooks - Custom React hooks, src/types - TypeScript type definitions, src/utils - Utility functions, src/themes - CSS themes, src/storage - serviços de persistência, src/Common/utils - utilitários gerais, styles/ - arquivos CSS base e componentes, assets/ - fontes e imagens, types/ - definições de tipos, builders/ - geração de código, services/ - lógica de negócio e abstração de storage, src/store - gerenciamento de estado e persistência, src/actions - definição de ações do usuário, src/types - definições de tipos e interfaces, src/backend - implementação do IHistoryBackend, styles/: arquivos CSS globais e temáticos, components/: componentes React com estilos associados, src/components - componentes reutilizáveis de UI, themes/ - arquivos de tema, layout/ - componentes de layout, src/assets - arquivos estáticos como imagens e SVGs, src/styles - arquivos CSS globais e modulares, Estilos organizados por componente (ex: recording-history-table, action-buttons, tabs), styles/components/recordingDetail - CSS modular para componentes específicos, Estilos organizados por componente UI, Separação clara entre header, toolbar, content e tabela, Estilos organizados por contexto: history, detail, modern variants, src/utils - funções utilitárias para manipulação de arquivos e downloads, src/utils - funções utilitárias para manipulação de dados e strings, Stylesheets organizados por componente, Separação clara entre UI e lógica, /components/recordingHistory - Componentes visuais e lógicos, /styles - Estilos globais e variáveis CSS, Estilos globais em pasta /styles, Componentes UI em /components, Não aplicável - arquivo CSS único para tema, controllers para lógica de entrada, models para definição de dados, services para regras de negócio, routes para endpoints, src/hooks - hooks customizados, src/background - scripts de background, src/popup - UI do popup, Módulos organizados por funcionalidade, Separação entre handlers e tipos, src/modules/replay - lógica de replay, src/pages - UI e armazenamento, pages/types - Tipos e interfaces para ações e replay, types/replay - Tipos específicos para replay, modules/replayRunner - Execução das ações na página, pages/types - definição de tipos compartilhados, replay - módulo de replay e execução de ações</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for React components, camelCase para funções, kebab-case para arquivos, CamelCase para classes e funções, prefixos claros para eventos e handlers, camelCase para variáveis e propriedades, PascalCase para tipos e interfaces, camelCase para variáveis e funções, PascalCase para componentes React, snake-case para scripts e arquivos zip, PascalCase para classes, nomes descritivos para scripts e arquivos, PascalCase para componentes UI, snake_case para arquivos de configuração, camelCase para funções e variáveis, PascalCase para classes e stores, constantes em UPPER_SNAKE_CASE, camelCase para props e variáveis, snake-case para arquivos estáticos, PascalCase para componentes, camelCase para props e funções, PascalCase para classes e tipos, PascalCase para tipos e componentes, prefixo use para hooks, prefixo set para funções que alteram estado, UPPER_SNAKE_CASE para enums, Arquivos com extensão .tsx para componentes, CamelCase para componentes e funções, PascalCase para tipos e enums, kebab-case para arquivos CSS, kebab-case para IDs CSS, snake_case para variáveis globais no window, snake_case para arquivos não TSX, Enums em PascalCase, CamelCase para funções e componentes, kebab-case para classes CSS, PascalCase for Components, camelCase for functions and variables, Uppercase enums (ActionsMode, ScriptType), Constantes em maiúsculas com underscore, CamelCase para componentes React, CamelCase para classes, Constantes em UPPER_SNAKE_CASE, prefixo gen para funções geradoras, Extensões de arquivos mantidas (.css, .svg), Declarações em arquivos .d.ts, PascalCase para classes e interfaces, PascalCase para classes e enums, camelCase para propriedades e funções, PascalCase para componentes React e classes, Variáveis em UPPER_SNAKE_CASE para env vars, Módulos em camelCase ou kebab-case, PascalCase para classes e plugins, kebab-case para arquivos e pastas, CamelCase para arquivos e pastas, Extensões indicam linguagem (.jsx, .tsx, .ts), Arquivos .env para configurações locais, secrets.*.js para arquivos sensíveis, Arquivos em kebab-case, PascalCase para tipos e classes, testes nomeados com descrições claras, BEM-like for components (.btn-primary), Utility-first for helpers (.p-1, .d-flex), snake-case para arquivos CSS, PascalCase para interfaces e tipos, BEM (Block Element Modifier) recomendado para classes adicionais, camelCase para métodos e variáveis, IDs formatados como hostname:data_timestamp, CamelCase para classes e interfaces, Interfaces prefixadas com I, CamelCase para tipos e interfaces, snake_case para timestamps, BEM-like CSS classes, camelCase para variáveis JS, BEM-like para classes CSS, prefixo layout- para containers principais, BEM-like class names, Uso de prefixos para componentes (ex: recording-detail, action-list), BEM-like: .modern-recording-detail, .modern-detail-header, .modern-tab, Classes com prefixo &apos;modern-&apos; para escopo, Uso de nomes descritivos e BEM-like, BEM-like classes, Prefixos para contexto (.recording-, .modern-), PascalCase para interfaces, snake_case para nomes sanitizados de arquivos, BEM-like CSS class naming, Uso de prefixo &apos;recording-detail&apos; para escopo, BEM para classes CSS, camelCase para variáveis JS/TS, IDs para containers principais (#app-container), Variáveis CSS com prefixo --, BEM-like classes (.btn-primary, .ds-dark), CSS variables com prefixo -- para organização, snake_case para arquivos, CamelCase para funções e variáveis, Prefixo use para hooks, snake_case não utilizado, UPPER_SNAKE_CASE para tipos de mensagens</naming_conventions>
    <module_boundaries>Separation between config and source code, Plugins isolated from presets, separação clara entre código fonte e artefatos gerados, Separação clara entre captura de eventos, geração de scripts e UI da extensão, Módulos independentes para Chrome e Firefox, Configuração isolada e exportada para uso pelo Jest, Separação clara entre código fonte e scripts de build, Dependências isoladas entre devDependencies e dependencies, Separação clara entre background scripts, content scripts e UI (popup), Comunicação via mensagens entre scripts, Separação clara entre background, content scripts e UI popup, Comunicação via mensagens e eventos, Separa utilitários, armazenamento e replay em módulos distintos, Comunicação via import/export e mensagens assíncronas, Separação clara entre código da extensão e código do webapp, Comunicação via mensagens, Componentes isolados sem dependências externas além do React, Separação clara entre componentes visuais e assets estáticos, Importação relativa para recursos locais, Separação clara entre tipos e componentes, Componentes isolados sem estado global, Separação clara entre manipulação de storage, geração de código e comunicação com API Chrome, Separação clara entre hooks, utilitários e tipos, Dependência unidirecional dos hooks para utils e types, Separação clara entre manipulação de armazenamento, execução de scripts e controle de abas, Separação clara entre tipos, builders e componentes, Dependência unidirecional de tipos para componentes, Separação clara entre UI (components) e lógica de negócio (builders), Tipos compartilhados via pasta types, UI components isolados de lógica de geração de código, Hooks e utilitários em Common, Builders para lógica de seleção e código, Isolamento do componente Highlighter com importação explícita de estilos, Separação clara entre UI (ControlBar) e bootstrap script, Isolamento via shadow DOM para evitar poluição global, Separação clara entre captura de eventos, geração de seletores e armazenamento, Separação clara entre UI (TriggerButton) e lógica de gravação (hooks, endRecording), UI components separated por funcionalidade, Hooks encapsulam lógica de estado, Builders isolam geração de código, Storage abstrai persistência, Módulo analytics isolado, dependente apenas de utils externos, Separação clara entre componentes e estilos, Importação explícita de estilos por componente, Separação clara entre funções utilitárias, lógica de busca e otimização, Separação clara entre tipos, lógica de geração e utilitários, Dependência unidirecional para evitar acoplamento circular, Separação clara entre tipos, utilitários e lógica de seleção, Dependência unidirecional para evitar acoplamento, Separação clara entre código TypeScript e assets estáticos via módulos declarados, Separação clara entre módulos de compatibilidade e lógica de negócio, Separação clara entre tipos (enums, classes) e lógica utilitária, Separação clara entre código fonte e build, Resolução de módulos via Node.js, Separação clara entre configuração (webpack.config.js) e execução (build script), Módulo isolado para configuração, sem dependências externas, Separação clara entre configuração (config) e execução (server), Dependência unidirecional do servidor para configuração, Separação clara entre scripts de extensão e assets, Uso de aliases para módulos secretos, Separação clara entre código fonte e artefatos gerados, Separação clara entre tipos e funções utilitárias, Dependência unidirecional de tipos para funções, Separação clara entre lógica de construção de scripts e testes, Mocks usados para isolar dependências, Separação clara entre testes e código da extensão, Uso de imports explícitos para Playwright e Jest, Separação clara entre componentes visuais e utilitários CSS, Componentes isolados por funcionalidade, Hooks para lógica de negócio, Utils para funções puras, Componentes isolados com props para comunicação, Serviços independentes para acesso a dados, Separação clara entre estilos globais e componentes específicos, RecordingService depende de recordingStore e builders, Tipos separados em pasta types, Separação clara entre tipos, store e ações, Dependência unidirecional do store para tipos e chrome API, Separação clara entre tipos, configuração e backend, Separação clara entre lógica React e estilos CSS, Importação de temas via index.jsx, Componentes isolados sem dependências internas complexas, Separação clara entre tema e layout, Estilos específicos para views distintas, Componentes isolados com props explícitas, Separação clara entre lógica e apresentação, Estilos isolados por componente para evitar vazamento de CSS, Separação clara entre containers, cabeçalhos, conteúdo e ações, Estilos isolados para RecordingHistory, Dependência de variáveis CSS globais, Separação clara entre estilos de histórico e detalhes, Modularidade visual para componentes reutilizáveis, Módulo isolado para utilitários de download e manipulação de arquivos de teste, Módulo isolado sem dependências externas, exporta funções puras, Estilos isolados para componente RecordingDetail, Separação clara entre estilos e lógica funcional, Isolamento do componente RecordingHistory, Separação clara entre estilos globais e específicos do popup, Isolamento do tema via classe raiz .ds-dark, Separação clara entre camada de dados, lógica de negócio e interface, Separação clara entre UI (popup), lógica de negócio (hooks) e background scripts, Comunicação via mensagens para desacoplamento, Replay handler isolado, Tipos compartilhados via exportação central, Replay module isolado para lógica de replay, Storage module para persistência, Types module para tipagem compartilhada, ReplayRunner isolado para execução de ações, Comunicação via mensagens com background script, Tipos compartilhados importados para consistência, Tipos separados do código de execução, Comunicação via mensagens tipadas</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript Style Guide, Airbnb JavaScript Style Guide adaptado para TypeScript, Airbnb TypeScript Style Guide, Airbnb JavaScript Style Guide (implícito via eslint-config-react-app), TypeScript Standard Style, Possível uso de ESLint com regras recomendadas, Airbnb TypeScript Style Guide (implícito), Airbnb JavaScript Style Guide (implícito pelo uso de Babel e Webpack), Airbnb JavaScript Style Guide (implícito), CSS standard conventions, CSS Standard Style Guide, TypeScript ESLint Recommended, Airbnb JavaScript Style Guide para React, CSS Standard, Uso consistente de variáveis CSS, CSS padrão com variáveis CSS para temas, CSS3 com uso de variáveis CSS, CSS padrão, uso consistente de variáveis CSS, CSS moderno com variáveis e flexbox/grid, Uso consistente de nomenclatura e organização, JSDoc para documentação, CSS moderno com variáveis customizadas, Uso consistente de espaçamentos e cores, CSS Standard Practices, BEM Methodology, CSS3 standard, CSS moderno com variáveis, comentários claros</style_guide>
    <linting_rules>ESLint with React plugin, extends react-app, globals chrome readonly, .eslintrc.json, ESLint com regras para TypeScript, Regras para evitar any e garantir tipagem forte, eslint com plugins para React, JSX Accessibility, import e hooks, .eslintrc.json com regras para ES6, browser, node, .eslintrc.json com regras para ES2021 e ambiente browser, Proibição de any implícito, Regras para async/await, .eslintrc.json com regras para TypeScript e JS, ESLint com regras padrão React, .eslintrc.js com regras para React e JSX, ESLint com regras padrão Airbnb, ESLint com regras para React e TypeScript, .eslintrc.json com regras para TypeScript e JavaScript, .eslintrc.json com regras para React e TypeScript, ESLint com regras para evitar any, prefer const, e evitar side effects, ESLint com regras padrão para TypeScript, Proibição de any explícito, Regras para evitar any implícito, Proibição de código morto, Regras para indentação e espaçamento, Proibição de catch vazio sem tratamento, ESLint com regras para importação de módulos estáticos, .eslintrc.json com regras para TypeScript e compatibilidade ES6, skipLibCheck:true para ignorar checagem de libs externas, strict:true para checagem rigorosa, .eslintrc.json com regras para ES6+, .eslintrc.json com regras para ES6+, node environment, Não explicitado no código fornecido, Sem uso de any exceto em mocks, Possível uso de stylelint com regras para propriedades e ordem, stylelint com regras padrão para CSS3, ESLint com regras para async/await, uso de tipos, e tratamento de erros, Regras padrão ESLint para TypeScript, Sem regras customizadas explícitas no código, stylelint para CSS, eslint para JS/React, Possível uso de stylelint com regras para variáveis e propriedades, Não especificado no código, Provável uso de stylelint com regras para variáveis e propriedades, stylelint com regras para CSS moderno e variáveis, Não especificado, .eslintrc.json com regras para evitar any, uso de const, e indentação de 2 espaços, Sem uso de any explícito, ESLint com regras para async/await, no-explicit-any, consistent-return</linting_rules>
    <formatting>Prettier, singleQuote: true, trailingComma: es5, printWidth: 80, proseWrap: always, arrowParens: always, Prettier com configuração padrão para TypeScript, Prettier com configuração padrão, Prettier com configuração padrão via lint-staged, Prettier com configuração padrão para JavaScript, Prettier com configuração padrão para React, Prettier com configuração padrão para espaçamento e aspas simples, Prettier com configuração padrão para React/TypeScript, Prettier com configuração padrão para projetos React, Prettier com configuração padrão para TypeScript e React, Não explicitado no código fornecido, Consistent indentation and spacing, Prettier para CSS, Prettier com configuração padrão para CSS e JS, Indentação de 2 espaços, Quebra de linha após blocos, Indentação consistente, Uso de comentários para seções, Uso de espaços para alinhamento, Uso de espaços para separação, Uso de variáveis para cores e espaçamentos, Indentação consistente, uso de comentários para seções, Prettier com configuração padrão, max-len 100</formatting>
    <documentation_style>JSDoc, JSDoc para funções e classes principais, JSDoc para funções e tipos, JSDoc para funções e componentes React, JSDoc para funções e módulos, JSDoc para funções e métodos públicos, Comentários inline simples, sem JSDoc explícito, JSDoc para funções e componentes, JSDoc para comentários de funções e componentes, JSDoc para funções e hooks, JSDoc para funções públicas, JSDoc para funções e interfaces, JSDoc para funções públicas e métodos, Comentários inline e JSDoc para funções principais, JSDoc para documentação de funções e componentes, JSDoc para funções e classes públicas, JSDoc para declarações de tipos, Comentários JSDoc (a serem implementados), JSDoc para documentação inline, Comentários inline mínimos, sem padrão explícito, Inline comments para propriedades específicas, Comentários CSS padrão, JSDoc para métodos públicos, JSDoc para documentação de métodos e classes, Comentários CSS inline, JSDoc para componentes React, JSDoc para comentários de componentes, Comentários em português explicativos, Comentários CSS simples para seções, Comentários simples para seções, Comentários mínimos, apenas cabeçalho do arquivo, Comentários em português explicando blocos principais, Comentários explicativos em português para seções principais, Comentários em português para contexto, JSDoc para funções e classes, JSDoc para métodos públicos e privados, JSDoc para funções públicas e principais métodos</documentation_style>
    <type_checking>TypeScript optional, not explicit here, TypeScript strict mode, Strict TypeScript, TypeScript com tipagens estritas para React e APIs de browser, Nenhum type checking explícito (JavaScript puro), JavaScript sem tipagem estática, Possível uso futuro de TypeScript, Sem uso de any implícito, PropTypes ou TypeScript (não aplicável neste arquivo), Strict TypeScript com checagem de tipos explícita, Strict TypeScript typings, Strict TypeScript com tipagem explícita para eventos e ações, Strict TypeScript com checagem completa, Strict TypeScript enabled, PropTypes para validação de props React, Sem TypeScript, Strict TypeScript (noImplicitAny, strictNullChecks), Strict TypeScript com tipos explícitos e uso de interfaces, strict TypeScript com exceção para strictPropertyInitialization:false, Nenhum (JavaScript puro), TypeScript strict mode presumido, Strict TypeScript com interfaces definidas para props e dados, Strict TypeScript com tipos explícitos, TypeScript strict mode para React, Não aplicável para CSS, TypeScript strict mode desativado, uso parcial de tipagem, Strict TypeScript com tipos explícitos e importados</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest, Playwright Test Runner, Jest 29.x, Jest 27.3.1, Jest para testes unitários do background e scripts, Jest 29, React Testing Library, Não detectado no código fornecido, Cypress (para testes E2E), Jest 29 (implícito para front-end), Jest 29 (provável), Não especificado, Não especificado no código fornecido, Jest (para lógica JS/TS associada)</test_framework>
    <test_structure>__tests__ folders or *.test.js files, tests/ unitários e integração, tests/e2e/ para testes end-to-end, tests/unit/ para testes unitários, Testes localizados em pasta __tests__ ou arquivos *.test.ts, Testes localizados em pastas __tests__ e arquivos *.test.js/ts, tests/ para testes unitários e integração, Testes localizados em pasta __tests__ correlata aos módulos, tests/unit/, tests/integration/, Testes localizados em __tests__ ou pasta components/__tests__, Testes localizados em __tests__ ou pasta __specs__ ao lado do componente, tests/unit para testes unitários, tests/components para testes de componentes React, tests localizados em pasta __tests__ ao lado dos módulos, tests/hooks - testes unitários para hooks, tests/unit para testes unitários das funções utilitárias, __tests__ folders próximos aos componentes, Testes unitários para renderização e lógica condicional, Testes unitários para builders e componentes, Testes localizados próximos aos componentes, Mocks para APIs e eventos DOM, __tests__ folder ao lado do componente, Testes localizados em __tests__ próximos aos componentes, Testes unitários localizados em __tests__ próximos aos módulos, Testes localizados em pasta __tests__ ao lado dos componentes, __tests__ folders next to components, Unit and integration tests, tests/ unitários e de integração próximos aos componentes, test/unit para testes unitários, test/integration para testes de integração, Testes organizados em arquivos separados por feature, Uso de describe/it para estruturação, Testes unitários em pasta __tests__ ao lado dos módulos, Testes localizados em __tests__ ou pasta tests, tests/unit para testes de classes e funções, tests/ localizados paralelamente ao código fonte, Não especificado, /coverage para relatórios de teste, tests/utils - testes unitários para funções utilitárias, Testes organizados por describe e test, Mocks e spies para isolamento, Testes organizados em blocos beforeAll, afterAll e test, Uso de async/await para controle assíncrono, Testes localizados em __tests__ dentro de cada componente, Testes localizados em __tests__ próximos aos serviços, tests/integration para testes de integração, Testes localizados em __tests__ dentro da pasta components, Testes unitários localizados em __tests__ próximos aos utilitários, /tests/unit para testes de componentes e estilos, Testes localizados próximos aos módulos, Testes localizados em __tests__ dentro de cada módulo, Testes unitários para funções executeClick, executeType, executeNavigate, tests/unit para testes de tipos e mensagens</test_structure>
    <coverage_requirements>Minimum 80% coverage, &gt;= 80%, Cobertura mínima de 80%, Cobertura mínima não especificada, mas jest --coverage configurado, &gt;= 80% cobertura, Cobertura mínima de 80% para componentes visuais, Cobertura mínima de 80% para módulos críticos, Cobertura mínima de 80% para componentes UI e hooks, &gt;80% coverage, Cobertura mínima de 90%, Cobertura focada em fluxos críticos de UI, Não especificado, &gt;= 90% cobertura para funções críticas, Cobertura focada em funcionalidades críticas da extensão, Cobertura mínima de 80% para componentes críticos, &gt;= 80% coverage, Cobertura mínima de 90% para funções utilitárias</coverage_requirements>
    <test_patterns>AAA (Arrange-Act-Assert), AAA, Given-When-Then, AAA (Arrange, Act, Assert), Given-When-Then para testes comportamentais, Arrange-Act-Assert (AAA), Snapshot testing para componentes visuais, Snapshot Testing, Renderização e acessibilidade, Mocking de hooks e APIs do Chrome, Uso de waits configuráveis para sincronização, Não especificado, Behavior Driven Development (BDD) style, Mocking de serviços externos, Snapshot Testing para componentes visuais, Behavior Driven Testing</test_patterns>
    <mocking_approach>jest.mock for modules, jest.mock, fixtures, Mocks para APIs de navegador, Fixtures para dados de entrada, Mocks com Jest e ts-jest, Mocks via Jest para dependências externas e APIs de browser, Mocks para APIs do Chrome e comunicação externa, Mocks para APIs do Chrome, Fixtures para estados de gravação, Mocks para chrome.runtime e window.postMessage, Mocks para dependências externas se houver, Mock de assets estáticos para testes, Mocks para props e funções callback, Mocks para API Chrome e serviços externos, Mock de localStorage e chrome.storage APIs, Mock de APIs chrome e browser usando jest-mock, Mock de funções auxiliares e tipos externos, Mock de funções genCode para isolar testes UI, Mock de eventos DOM e APIs do navegador, Fixtures para ações simuladas, Mocks para props e estilos, Mocks para APIs do navegador e funções globais, Mocks para eventos DOM e APIs do Chrome, Mocks para chrome.runtime.sendMessage e document.querySelector, Mocks for browser APIs and storage, Mocks para dependências externas e estilos, Mocks para DOM APIs e querySelectorAll, Mocks limitados, foco em testes E2E reais, Mocks para finder e elementos DOM, Mocking de módulos estáticos via Jest mocks, Mocks para APIs do navegador, Mocks para simular eventos e ações, Mocks para Webpack e WebpackDevServer APIs, Não especificado, Mocks para Date.now() para controle de tempo em testes, Jest spies para interceptar chamadas de métodos, Uso mínimo de mocks, testes end-to-end reais com navegador, Mocks para hooks e APIs externas, Mock de RecordingService para testes unitários, Mock de recordingStore para testes unitários, Mocks para APIs e serviços externos, Mocks para callbacks e props, Mocks para APIs do navegador e Date, Não aplicável - funções puras sem dependências externas, Mocks para APIs de arquivos e eventos DOM, Uso de jest.mock para dependências externas, Mock de chrome.runtime e chrome.tabs, Mock de dependências externas e injeção de mocks, Mock de APIs do Chrome, Fixtures para gravações simuladas, Mock de DOM e chrome.runtime APIs, Mocks para mensagens e estados</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, Não especificado explicitamente, Git Flow, Não especificado</branch_strategy>
    <commit_conventions>Conventional Commits, Não especificado explicitamente, Não especificado</commit_conventions>
    <pr_requirements>Code review mandatory, CI checks, code review obrigatório, checks automáticos, Revisão obrigatória, Checks de CI passando, Code review obrigatório, Checks de CI, Husky para hooks de pré-commit e lint-staged para formatação automática, Revisão obrigatória e testes aprovados, Checks de lint e testes, Checks automáticos de lint e testes, Code review obrigatório e testes aprovados, Revisão obrigatória e testes automatizados aprovados, Revisão obrigatória e testes automatizados, CI checks passing, Testes passando, Checks automáticos, Build deve passar sem erros, Não especificado, Testes automatizados passando, Revisão obrigatória por pelo menos um revisor, Revisão obrigatória por pelo menos 2 membros</pr_requirements>
    <ci_cd_pipeline>Linting, Testing, Build, build, test, deploy, Testes unitários e E2E, Lint, Deploy para Chrome e Firefox, Execução de testes automatizados, Testes automatizados com Jest, Linting e formatação via Prettier e ESLint, Build, lint, test e deploy automatizados, Test, Deploy para staging, Build, Test, Lint, Deploy, Build, Test, Lint, Deploy stages, Build, lint, test e deploy automatizados via GitHub Actions, Deployment to Chrome Web Store, Build, Test, Lint, Deploy automáticos, Testes, Deploy automático, Build, lint, testes Cypress e deploy automatizado, Build automatizado via CI, Deploy condicionado a build sem erros, Build, Test, Lint, Deploy Staging, Não especificado, Deploy automático em staging, Build da extensão, Deploy automatizado, Build, Test, Lint, Deploy automatizados, Build, Test, Lint, Deploy automatizados via GitHub Actions, Testes unitários, Testes automatizados</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, yarn, yarn install &amp;&amp; yarn prepare, npm install ou yarn install, npm install &amp;&amp; npm run setup, npm install &amp;&amp; npm run setup-db</setup>
    <install>npm install, yarn install</install>
    <dev>npm start, npm run dev, yarn run start-chrome, yarn run start-ff, yarn start-chrome (para Chrome), yarn start-ff (para Firefox), yarn start, npm run start, node scripts/start.js, webpack --mode development --watch</dev>
    <test>npm test, yarn test, npm run test, npx cypress open, Não especificado</test>
    <build>npm run build, yarn run build-chrome, yarn run build-ff, yarn build-chrome, yarn build-ff, yarn build, node scripts/build.js, webpack --mode production</build>
    <lint>npm run lint, eslint src/ --ext .ts,.tsx, eslint ., yarn lint, Não especificado</lint>
    <format>npm run format, prettier --write src/, prettier --write ., yarn format, Não especificado</format>
  </commands>
  <security_constraints>
    <authentication_method>OAuth2 para comunicação externa (deploysentinel.com), OAuth2 (externo, não implementado neste módulo), OAuth2 via DeploySentinel Webapp, OAuth2 (externo), Nenhum método explícito, depende do contexto da extensão, Não aplicável (componente UI local), Não aplicável diretamente (foco em captura de eventos), OAuth2 via Chrome Extension permissions, Nenhum método explícito no código (depende do navegador), Nenhum método de autenticação implementado, Não aplicável (biblioteca client-side), Nenhum método de autenticação implementado neste arquivo, Não aplicável (extensão Chrome), Nenhum método de autenticação implementado no código de teste, Não aplicável no componente (depende do sistema maior), Não aplicável no escopo do serviço, Não aplicável (contexto local de extensão), JWT com expiração curta, OAuth2 via Chrome Identity API, OAuth2 (externo, não tratado diretamente neste módulo), Não aplicável (execução local no contexto da página)</authentication_method>
    <authorization_rules>Permissões restritas via manifest para domínios e APIs específicas, Gravação restrita à aba e frame autorizados, Scripts injetados apenas em contextos validados, Validação de origem das mensagens, Permissões restritas na extensão, Controle de acesso via tokens e permissões da extensão, Execução de scripts restrita a abas e frames autorizados, Não aplicável, Não aplicável diretamente, Permissões restritas para comunicação entre extensão e UI, Controle de acesso via permissões da extensão no manifest, Nenhuma regra de autorização aplicada, Não aplicável diretamente no build, Controle de acesso via contexto do navegador isolado, Permissão para excluir e exportar gravações deve ser controlada externamente, Não aplicável no escopo do serviço, Controle baseado em roles e permissões granulares, Permissões restritas para acesso a abas e runtime, Controle de acesso via permissões da extensão Chrome, Controle via permissões da extensão Chrome</authorization_rules>
    <sensitive_data>Dados de interação do usuário tratados localmente, sem envio externo não autorizado, URLs e dados de navegação armazenados localmente, sem exposição externa, URLs de teste, Códigos de gravação, URLs e ações do usuário devem ser tratadas com confidencialidade, Identificadores únicos armazenados localmente, sem dados pessoais, Password inputs are masked with asterisks, Senhas mascaradas em ações de input, Campos password não devem ser registrados, Nenhum dado sensível manipulado diretamente, Dados de gravação de testes armazenados localmente, sem exposição externa, Client ID anonimamente gerado, sem dados pessoais, Não manipula dados sensíveis, Campos de senha marcados com isPassword para tratamento especial, Arquivo secrets.{env}.js para dados sensíveis, Arquivos .env locais, secrets.*.js, Dados do usuário armazenados temporariamente em /tmp, Dados de gravação podem conter informações sensíveis, devem ser tratados com cuidado, URLs e ações de usuário, tratados com validação e sanitização, Dados de gravação de ações do usuário, tratados localmente sem exposição externa, Dados pessoais criptografados em repouso e em trânsito, IDs de gravação e tokens de sessão tratados com cuidado, URLs e ações gravadas, tratados localmente sem exposição externa, Não manipula dados sensíveis diretamente</sensitive_data>
    <security_headers>Content Security Policy configurada via manifest, Não aplicável diretamente neste módulo, Content-Security-Policy para mensagens, Content-Security-Policy para extensão, Gerenciados pelo navegador, não aplicável diretamente, Não aplicável diretamente, Cabeçalhos padrão do Chrome Extension, Gerenciados pelo navegador e manifest da extensão, Não aplicável, Access-Control-Allow-Origin: *, Não aplicável no contexto do build, Não aplicável diretamente no código de teste, Não aplicável diretamente no componente, Não aplicável no escopo do serviço, Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, Content Security Policy configurada no manifesto, Cabeçalhos padrão do Chrome Extension Manifest, Depende da página alvo, não gerenciado pelo módulo</security_headers>
    <encryption_requirements>Criptografia padrão do Chrome para armazenamento local, Dados armazenados via chrome.storage.local, criptografia dependente do navegador, TLS para comunicação web, Criptografia em trânsito via HTTPS e armazenamento seguro, Nenhuma criptografia explícita no código, Dados armazenados localmente, recomendação de criptografia externa, Comunicação segura via mensagens internas do Chrome, Não aplicável, Nenhuma criptografia aplicada, Não aplicável no contexto do build, Não implementado no componente, deve ser tratado no armazenamento, Não especificado, depende do storage subjacente, Não especificado, armazenamento local sem criptografia explícita, TLS 1.3 para comunicação, AES-256 para dados armazenados, Comunicação segura via HTTPS e criptografia de dados sensíveis, Nenhuma criptografia específica implementada neste módulo</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>Gravação em tempo real sem impacto perceptível na navegação, Atualizações de estado e injeção de scripts devem ocorrer em milissegundos para não impactar UX, Mensagens processadas em &lt; 100ms, Renderização instantânea do componente, Renderização instantânea do logo, Operações de gravação devem ser concluídas em menos de 1 segundo, Operações assíncronas rápidas para não bloquear UI, Atualização da UI em tempo real com throttling para mousemove (100ms), Eventos processados em tempo real com debounce para resize, Interação do botão deve ser instantânea (&lt;100ms), Interação UI responsiva, sem bloqueios perceptíveis, Renderização inicial rápida (&lt; 200ms), Resposta em milissegundos para seletores simples, Limite configurável para tentativas, Baixa latência para hot reload e rebuild incremental, Não aplicável diretamente, Timeouts configurados para espera de service workers (15s no Jest, 5s na espera explícita), Carregamento e filtragem devem ser rápidos para boa UX, Operações assíncronas otimizadas, mas listagem pode ser custosa com muitos registros, Operações de salvamento com debounce para evitar latência excessiva, Download deve ser disparado imediatamente após chamada, Funções síncronas com tempo de execução constante e baixo, API responses &lt; 300ms em média, Atualizações de estado em tempo real (&lt; 200ms), Resposta assíncrona rápida para mensagens de replay, Delays naturais entre ações limitados a 3 segundos</response_time_limits>
    <optimization_priorities>Developer experience, Fast refresh, build speed, bundle size, Baixa latência na captura de eventos, Uso eficiente de memória durante gravação, Performance na captura e geração de scripts, Minimização do bundle final, Baixo impacto em CPU e memória do navegador, Minimizar overhead em abas monitoradas, Baixa latência na comunicação, Baixa complexidade, foco em renderização rápida, Minimizar bundle size, Carregamento rápido, Velocidade de persistência e comunicação, Consistência e sincronização em tempo real priorizadas, Baixa latência na execução de scripts e armazenamento, Rendering performance to handle large action lists, Renderização rápida, Baixa latência na geração de código, Responsividade da interface, Minimizar impacto no DOM, Baixa complexidade computacional, Minimizar impacto no DOM principal, Isolamento via shadow DOM para performance UI, Minimizar impacto na UI, evitar duplicação de eventos, Baixa latência e mínimo impacto na UI, Velocidade e fluidez na UI, baixo overhead na gravação, Baixa latência na coleta de eventos, mínimo impacto no UX, Velocidade de renderização e carregamento CSS, Balancear velocidade e seletor curto/legível, Equilíbrio entre legibilidade do código gerado e performance da execução dos testes, Precisão e estabilidade dos seletores, Minimizar overhead na geração, Build time efficiency, Minimal runtime overhead, Baixa latência na captura e reprodução de ações, Build rápido e eficiente, Compatibilidade com browsers legados, Build otimizado para produção com minificação e tree shaking, Velocidade de feedback em desenvolvimento, Minificação com TerserPlugin, desabilitação de mangling para debugging, Minimizar latência na validação e migração de timestamps, Estabilidade e confiabilidade dos testes priorizadas sobre velocidade, Fast rendering, Minimal repaint on hover, Responsividade UI, Minimizar bloqueios de thread, Otimização para velocidade de renderização e resposta a interações, Font loading performance, Rendering smoothness, Consistência e integridade priorizadas sobre latência, Minimizar chamadas ao storage para preservar performance e evitar bloqueios, UI responsiveness, Low memory footprint, Renderização rápida e leve, Baixo consumo de memória, Smooth scrolling, Renderização rápida e leve para UI, Performance visual e responsividade, Transições suaves para melhor UX, Responsividade visual, Transições suaves, Responsividade, Suavidade nas animações, Baixo impacto visual, Velocidade de resposta e baixo uso de memória para blobs, Velocidade e simplicidade, Responsividade e fluidez visual, Minimizar repaints e reflows, Visual consistency, Responsividade em resolução 800x600, Prioridade em velocidade de resposta sobre uso de memória, Baixa latência e uso eficiente de memória, Minimizar impacto na carga inicial, Separação de responsabilidades para otimização, Baixa latência na comunicação entre popup e runner, Robustez e fidelidade da reprodução sobre velocidade extrema</optimization_priorities>
    <caching_strategy>cache intermediário de build, Uso de chrome.storage.local para persistência eficiente, Uso de chrome.storage.local para persistência leve, Não aplicável, Cache do navegador para assets estáticos, Uso de localStorage para cache temporário, Uso de localStorage e chrome.storage para persistência local, Uso de chrome.storage.local para persistência local, Uso de chrome.storage.local para persistência e sincronização, Nenhuma estratégia de cache implementada, Uso de armazenamento local para persistência de gravações, Cache de CSS via webpack e browser, Nenhum cache persistente implementado, Uso de cache via Webpack para builds incrementais, Webpack caching padrão para builds incrementais, Cache desabilitado para popup.html para garantir atualização, Uso de userDataDir para persistência temporária do contexto do navegador, Uso de memoização para evitar recomputação desnecessária, Não implementado no serviço, depende do storage, Uso de cache interno temporário (pendingSaves) para agrupar operações, Cache em memória com TTL de 5 minutos para dados estáticos, Estado local mantido em memória, sem cache persistente, Uso de armazenamento local para gravações</caching_strategy>
    <scalability_considerations>paralelização de tarefas, Suporte a gravações longas sem degradação perceptível, Suporte a múltiplas abas e sessões simultâneas, Suporte a múltiplas abas e frames, porém foco em uma aba de gravação por vez, Escalabilidade limitada ao ambiente do navegador, Componente leve e reutilizável para múltiplas instâncias, Escalabilidade limitada ao contexto da extensão e navegador, Component designed to handle dynamic and potentially large arrays of actions, Gerenciamento eficiente de lista de ações para gravações longas, Evitar múltiplas instâncias para reduzir uso de memória, Suporte a aplicações SPA e múltiplos contextos, Escalabilidade limitada ao contexto da extensão e UI do Cypress, Escalabilidade limitada ao contexto de extensão de navegador, Suporte a múltiplos temas e componentes dinâmicos, Pode degradar em documentos muito grandes devido à combinatória, Suporte a grandes sequências de ações com waits configuráveis para evitar falhas, Escalabilidade limitada ao ambiente local de desenvolvimento, Configuração modular para suportar múltiplos scripts e assets, Operações em arrays grandes devem ser eficientes e imutáveis, Testes isolados para permitir execução paralela, Pode apresentar lentidão com grandes volumes de gravações em memória, Potencial gargalo em listagens e filtros em memória para grandes volumes, Limitação do número máximo de entradas para evitar crescimento descontrolado, Suporte a tabelas com overflow e scroll vertical, Layouts adaptativos para múltiplos dispositivos, Scrolls otimizados para listas grandes, Funções puras facilmente escaláveis e reutilizáveis, Suporte a tabelas com grande volume via scroll e overflow, Arquitetura preparada para escalabilidade horizontal via containers, Suporte a múltiplos replays simultâneos via tabId, Modularidade facilita escalabilidade e manutenção, Gerenciamento de múltiplos replays simultâneos via Map por tabId, Projetado para execução em contexto de browser, escalabilidade limitada ao ambiente local</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>logs padronizados, Logs estruturados para erros no background e content scripts, Erros lançados via throw, sem padrão estruturado explícito, Não especificado no código atual, Logs no console com mensagens claras, Erros lançados como Exceptions padrão em promises, Não explícito no código, Não explícito, erros tratados via controle de fluxo interno, Erros lançados via throw new Error com mensagens claras, Erros lançados como Exceptions, sem tratamento global visível, Tratamento silencioso, sem propagação de erros, Erros lançados via throw com mensagens claras, Try-catch silencioso para evitar falhas na geração de seletores, Logs detalhados no console com stack trace e detalhes, Nenhum formato de erro customizado implementado, Não especificado, Erros lançados via exceptions padrão do JavaScript, Console.error para erros de replay e download, Mensagens simples exibidas via notificações temporárias, Erros lançados como Exceptions com mensagens claras, Erros lançados com mensagens claras, logs no console para diagnóstico, Erro lançado com mensagem clara em falha de download, Retorna string vazia ou texto original, sem lançar exceções, Visual feedback via CSS classes para estados de erro, Mensagens e ícones estilizados, JSON padrão com código, mensagem e detalhes opcionais, Strings simples com mensagens claras, Objetos com propriedades success:boolean e error:string, Objeto com propriedades success:boolean, error:string, duration:number, string error messages opcionais em estados e resultados</error_format>
    <logging_strategy>console logs, arquivos de log, Logs locais para debug durante desenvolvimento, Relatórios de erros via CI, Console logs e armazenamento local para diagnóstico, Não explícito no código, presumivelmente console.log para debug, Não implementado explicitamente, Console.error para erros críticos, Não implementado explicitamente no código fornecido, Não implementado, possível extensão futura, Logs mínimos, foco em erros críticos, Sem logging explícito no código analisado, Não implementa logging interno, Console.error para erros, console.warn para avisos, Logs padrão do Webpack e WebpackDevServer, Verbose logging na limpeza do build, Uso de console.warn para alertas de timestamps inválidos, Uso implícito de mensagens de erro via Jest, Logs no console para eventos importantes, Logs no console para operações críticas, Logs de sucesso, warning e erro via console para operações críticas, Uso de console.warn e console.error para alertas e erros, Logs no console para sucesso e erro, Logs estruturados com níveis info, warn, error, Logs básicos no console para erros e eventos críticos, Tratamento básico de erros com envio de mensagens de falha, Comunicação via chrome.runtime.sendMessage para reportar status</logging_strategy>
    <monitoring_tools>GitHub Actions para monitoramento de build e testes, Integração com ferramentas externas via deploysentinel.com, Não especificado, Possível integração com ferramentas externas, Integração com ferramentas externas não especificada, Monitoramento via ferramentas da extensão Chrome, Não aplicável, Nenhuma ferramenta de monitoramento integrada, Não especificado no componente, Não especificado no código, Sentry para erros, Prometheus para métricas, Possível integração futura com Sentry ou similar, Não especificado neste módulo</monitoring_tools>
    <error_recovery>retry automático em falhas de build, Recuperação de falhas na gravação com possibilidade de reinício, Reinício automático do service worker e re-injeção de scripts, Verificações preventivas para evitar estados inválidos, mas sem fallback robusto, Nenhuma estratégia explícita, Tentativa de continuar fluxo mesmo após erro de persistência, Rejeição de promises para tratamento externo, Reinicialização da gravação via UI, Função cleanUp para desmontar e liberar recursos, Reinicialização do estado local e sincronização via storage events, Retry para seleção de elementos DOM com limite de tentativas, Fallbacks básicos via estado UI, mas sem estratégias robustas, Try/catch para evitar falhas visíveis ao usuário, Fallbacks em busca de seletores alternativos, Fallback para null em seletores quando falha a geração, Abortar build em caso de erro crítico, Hot Module Replacement para recuperação rápida de erros em desenvolvimento, Não especificado, Correção automática de timestamps inválidos e negativos, Rejeição de promises em timeout para falha controlada, Reset de estado de cópia após timeout, Botões desabilitados para evitar ações inválidas, Recarregamento da lista após operações de importação e exclusão, Tratamento de erros com try/catch e mensagens específicas para importação/exportação, Tratamento de erros com fallback para evitar falhas críticas, especialmente em operações assíncronas, Tratamento de exceções para evitar falhas silenciosas, Retorno seguro para entradas inválidas ou vazias, Estados visuais para loading e erro facilitam recuperação e feedback ao usuário, Retries automáticos em falhas temporárias, fallback para operações críticas, Reset de estado e limpeza ao detectar erro ou aba fechada, Limpeza de estado após falhas e fechamento de abas, Retry automático com delay configurável para ações falhas, retryAttempts e retryDelay para execução de ações</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>react-app preset, react-hot-loader, Webpack, Babel, Node.js, APIs de extensão do Chrome e Firefox, Frameworks de teste suportados, @jest/types, ts-jest, React, Jest, Husky, Prettier, chrome.* APIs, background.bundle.js, bridge.bundle.js, APIs do Chrome, Módulos internos utils, recording-store, replay-handler, chrome.runtime API, window.postMessage, React 18, react, logo.svg, typescript, chrome.tabs API, RecordingService, genCypressCode, chrome.storage API, localStorage utilities, chrome API, browser API para compatibilidade, ../types, ../builders/selector, react-syntax-highlighter, genCode function, Recorder module, Selector builders, Chrome Storage API, Highlighter.css, ReactDOM, FontAwesome, Shadow DOM API, lodash.debounce, chrome.storage.local, chrome.runtime, Chrome Extension Messaging API, Chrome Extension APIs, recordingStore, getRandomInstallId, Google Analytics API, react-dom, webpack css-loader, @fortawesome/fontawesome-svg-core, DOM API do navegador, Cypress, TypeScript, finder, TypeScript compiler, Module bundler (Webpack, Vite), webpack, webpack.config.js, process.env (Node.js), webpack-dev-server, path, env, clean-webpack-plugin, copy-webpack-plugin, html-webpack-plugin, terser-webpack-plugin, node_modules, secrets.*.js, Type definitions from &apos;../types&apos;, CypressScriptBuilder, truncateText, playwright, jest, chromium browser, useReplay hook, FontAwesome Icons, CopyToClipboard, Roboto font, CSS variable --bg-dark, Tipos externos (RecordingEntry, HistoryConfig, Action), ./index (Action type), CSS variables defined globally, React index.jsx import, ../themes/dark-core.css, font-awesome, LayoutWrapper.css, Variáveis CSS para tema, Font icons para elementos visuais, CSS variables definidas globalmente, SVG icons, Variáveis CSS globais, JavaScript para manipulação de estado, Variáveis CSS customizadas (ex: --bg-dark, --bg-darker), APIs do navegador para Blob e download, Variáveis CSS globais (cores, espaçamentos, fontes), CSS Variables, React (para lógica associada), Nenhuma dependência externa explícita, Express, Mongoose, Joi, chrome.tabs, replay-handler.js, types/replay.js, replay-runner (injeção externa), DOM APIs, Tipos compartilhados do projeto, Action type importado de ../pages/types/index</critical_dependencies>
    <deprecated_packages>Nenhum identificado, Manifest v2 APIs em processo de migração, Nenhum pacote deprecado atualmente</deprecated_packages>
    <version_constraints>Compatibilidade com versões recentes do Chrome e Firefox, Compatibilidade entre Jest 29.x e ts-jest, React 17.x, TypeScript 4.1.x, Jest 27.x, Webpack 5.x, Manifest Version 2 (deprecado em breve), Manifest V3 obrigatório para compatibilidade, Compatibilidade com Chrome API atual, Compatibilidade com Chrome 90+, React &gt;=18.0.0, React 18.x, TypeScript 5.x, TypeScript &gt;=5.0, Chrome API compatível, Compatibilidade com manifest v2 e v3, TypeScript &gt;=4.0, TypeScript &gt;=4.9, TypeScript 4.x, lodash.debounce versão compatível com ES modules, Webpack &gt;=5.0.0, Compatível com navegadores modernos suportando querySelectorAll, Cypress &gt;=9.0, target ES5, module ESNext, webpack &gt;=5.0.0, Compatibilidade com Webpack 5 e Node.js 16+, Não especificado, TypeScript &gt;= 4.9, Jest &gt;=29, Cypress &gt;=12, Jest timeout configurado para 15000ms, TypeScript 5.0, TypeScript 4.x compatível, API chrome.storage local padrão, React &gt;=18.0, TypeScript &gt;= 4.0, Dependências travadas em versões específicas para estabilidade, TypeScript &gt;=5.0.0, Chrome Extensions Manifest V3 compatível</version_constraints>
    <internal_packages>Módulos internos para gravação e geração de scripts, ../Common/utils, ../storage/recording-store, ../../modules/replay/replay-handler, Módulos internos da extensão DeploySentinel, ../../pages/Popup/logo.svg, ../types (ScriptType), ./utils, ../builders, ../storage/recording-service, ../types, Módulos utilitários internos para armazenamento e execução, types, builders, components, ../Common, ./recorder, ./Highlighter, Highlighter.css (estilos locais), ./ControlBar, ../Common/styles.css, ../builders/selector, ../Common/Icon, ../Common/hooks, ../Common/endRecording, Common, Content, storage, ./Popup, ./components, ./themes, ./types, ./selector, ./types/config, finder, config/webpack.config.js, ./env, ../webpack.config, ./utils/env, secrets.{env}.js, ../src/pages/builders, Extensão localizada em ./build, ../../types, ../../Common/utils, ../../Content, ../../storage/recording-service, ../../types/recording, ../../Common/utils/text, ./recording-store, ../types/recording para tipos compartilhados, ./index, themes/dark-core.css, Pacotes internos para utilitários e middlewares, ../types/replay.js para tipos compartilhados, ../../types/replay.js, ../../types/replay, ../../pages/types/recording, ../../pages/storage/recording-store, ../../pages/types/index, ../pages/types/index</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>scripts de build pouco modularizados, Suporte limitado para captura de upload de arquivos, Atualização para Manifest V3 necessária para compatibilidade futura, Aprimorar suporte a múltiplos frameworks simultaneamente, Tratamento de erros e sincronização de estado podem ser melhorados, Falta de tratamento de erros robusto, Melhorar tratamento de erros e retries, Fixação rígida da biblioteca Cypress pode limitar flexibilidade, Migração completa para manifest v3, Tratamento de erros mais robusto, Gerenciamento de estado complexo pode ser refatorado para usar context API ou state management externo, Ausência de memoização para evitar re-renderizações desnecessárias, Melhorar tratamento de erros e fallback para browsers sem exportFunction, Melhorar tipagem any, otimizar armazenamento local, Correção de bug de múltipla montagem no Firefox, Tratamento de erros e logging insuficientes, Acoplamento forte com Cypress, Ausência de logging e feedback de erro, Ausência de tratamento de erros na renderização, Estilos inline podem dificultar manutenção, Otimização limitada para seletores muito complexos, Implementação incompleta do dragAndDrop, Catch silencioso pode dificultar debugging, Refatorar função isSupportedActionType para tipagem mais segura, Configuração hardcoded para localhost e porta fixa, Configuração extensa pode dificultar manutenção, Uso incorreto de &apos;number.isFinite&apos; ao invés de &apos;Number.isFinite&apos;, Uso de setInterval para polling pode ser substituído por eventos mais eficientes, Melhorar debounce na busca, Refatorar manipulação direta do DOM para download, Uso de dimensões fixas pode limitar responsividade, Dependência de armazenamento não especificado pode dificultar testes e manutenção, Dependência da API chrome.storage local que pode ter limitações de quota, Dependência de variáveis CSS externas pode dificultar manutenção, Dependência de variáveis CSS externas pode causar inconsistência, Dependência de variáveis CSS externas não documentadas, Necessidade de suporte a navegadores legados, Dependência de variáveis CSS globais, Falta de estilos focados em acessibilidade, Refatoração de módulos com alta complexidade ciclomática, Melhorar tratamento de erros e mensagens, Adicionar testes unitários e integração, Tratamento de erros assíncronos pode ser melhorado, Melhorar tratamento de erros e logs detalhados, Refatorar retry para parametrização externa</technical_debt>
    <known_issues>Potential incompatibility of react-hot-loader with React 18+, Limitações na captura de eventos hover em alguns contextos, Limitações na captura de eventos em iframes, Dependência forte do estado local pode causar inconsistências em casos de falha, Dependência exclusiva do Chrome, Possível loop de atualização se onChange não for estável, Possível falha silenciosa na comunicação entre abas, Ausência de tratamento explícito de erros em chamadas assíncronas, Possível falha silenciosa em execução de scripts sem catch, Eventos de mouse podem ser afetados por overlays externos, Dependência de estilos externos pode causar falhas visuais, Possível incompatibilidade com browsers não suportados, Tipagem TypeScript ignorada em shadowRoot, Possível perda de eventos em alta frequência, Sincronização assíncrona pode causar inconsistências momentâneas, Possível falha na localização de elementos DOM em ambientes customizados, Possíveis condições de corrida em efeitos assíncronos, Modo no-cors limita detecção de falhas na requisição, Dependência forte do container &apos;#app-container&apos; estar presente, Performance pode cair em documentos com muitos elementos similares, Limitação na geração de código para ações complexas como drag and drop, Diferenças entre APIs Chrome e Firefox podem causar incompatibilidades, Desabilitação de host check pode causar riscos de segurança, Possível vazamento de secrets se não gerenciado corretamente, Dependência do relógio do sistema pode causar inconsistências, Timeouts podem causar falhas intermitentes em ambientes lentos, Confirmação via confirm() pode impactar UX, Falta de validação rigorosa na importação JSON, Fallback visual se variável --bg-dark não estiver definida, Possível lentidão em listagens e filtros com grande volume de dados, Possível perda de dados se ocorrer erro durante flushPendingSaves, Scrollbar customization limited to WebKit browsers, Possível baixa acessibilidade se contraste não for suficiente, Possível falha em ambientes sem suporte a Blob, Possível truncamento excessivo em URLs com domínios muito longos, Scrollbar customizada pode não funcionar em todos os browsers, Intermitência em chamadas externas sob alta carga, Possível race condition ao iniciar múltiplos replays rapidamente, Dependência da injeção externa do replay-runner pode causar falhas se não gerenciada, Possível vazamento de estado se abas não forem removidas corretamente, Fragilidade em selectors dinâmicos, Limitação em ações suportadas (ex: falta de suporte para scroll ou hover)</known_issues>
    <performance_bottlenecks>build lento em grandes projetos, Uso intensivo de CPU em gravações longas, Injeção repetida de scripts pode impactar performance em abas com muitas atualizações, Nenhum identificado, Nenhum identificado explicitamente, Latência na comunicação com APIs do navegador, Throttling aplicado para evitar excesso de renderizações, Eventos de input e wheel podem gerar alta carga, Polling para retrySelector pode impactar performance se maxRetries alto, Injeção de múltiplos estilos CSS pode impactar tempo de carregamento, Geração combinatória de seletores e múltiplas validações querySelectorAll, Uso de innerText pode impactar performance em elementos grandes, Nenhum gargalo crítico identificado em ambiente local, Minificação desabilita mangling para facilitar debugging, impactando tamanho final, Espera ativa para service workers pode impactar tempo total dos testes, Renderização e filtragem podem ser lentas com muitos registros, Carregamento da fonte externa pode impactar renderização inicial, Filtros realizados em memória após listagem completa, Operações síncronas bloqueantes evitadas, mas potencial lentidão se histórico crescer muito, Overflow em listas longas pode impactar performance, Possível lentidão em tabelas muito grandes devido a overflow e transições, Renderização de tabelas muito grandes pode impactar performance, Consultas complexas ao banco de dados sem índices adequados, Nenhum identificado atualmente, Nenhum crítico identificado, Delays e retries podem impactar tempo total de replay</performance_bottlenecks>
    <migration_status>Completo para Manifest V3, sem migrações pendentes, Nenhuma migração em andamento, Suporte híbrido entre manifest v2 e v3 implementado, Migração de dados antigos no armazenamento local implementada, Estável, sem migrações em andamento, Não especificado, Função migrateActionsTimestamp implementada e em uso, Nenhuma migração em andamento detectada, Não aplicável, Migração da última gravação implementada e executada sob demanda, Migração para TypeScript em andamento, 60% concluída, Projeto está em produção, sem migrações pendentes</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Preserve hot reload functionality, Code style consistency, performance, manutenibilidade, Clareza e legibilidade do código, Cobertura de testes, Manutenção da tipagem forte, Conformidade com padrões de código, Qualidade do código, Conformidade com padrões de linting, Segurança no uso de permissões, Clareza na separação de responsabilidades entre scripts, Segurança das permissões, Qualidade dos scripts gerados, Consistência de estado, Tratamento assíncrono correto, Segurança na injeção de scripts, Segurança na validação de origem, Clareza na comunicação entre módulos, Consistência visual, Performance de renderização, Simplicidade do componente, Performance, Acessibilidade, Consistência de props, Evitar efeitos colaterais desnecessários, Clareza no fluxo assíncrono, Tratamento de erros, Separação de responsabilidades, Consistência de estado e sincronização, Uso correto dos hooks, Persistência correta, Compatibilidade entre APIs, Verificação de tipos, cobertura de testes, clareza na renderização condicional, Consistência com padrões, Clareza na separação de responsabilidades, Uso correto de hooks, Manutenção da performance, Clareza na tipagem, Ausência de efeitos colaterais, Verificação de uso correto do cleanUp, Garantia de não múltiplas instâncias, Evitar side effects, Consistência de hooks, tratamento de estado e mensagens Chrome, Tratamento de estados assíncronos, Tratamento de erros silencioso, Uso correto de async/await, Manutenção da anonimidade, Consistência de estilos, Uso correto de hooks e componentes React, Clareza na lógica de busca, Clareza e legibilidade do código gerado, Cobertura de tipos, Uso correto de waits, Clareza na priorização de seletores, Uso correto de tipos, Consistência de tipagem, Importação correta de assets, Compatibilidade cross-browser, Clareza e simplicidade do código, Consistência de tipos, Clareza na modelagem de ações, Conformidade com padrões TS e React, Verificação de erros de build e warnings, Conformidade com padrão de código, Verificação de configuração correta do HMR e variáveis de ambiente, Configuração correta de aliases e loaders, Segurança no uso de secrets, Validação de tipos e imutabilidade, Cobertura de testes para casos de timestamp, Clareza e legibilidade, Uso correto de mocks, Clareza nos testes, uso correto de async/await, cobertura de funcionalidades críticas, Performance CSS, Legibilidade, Clareza na lógica de estado, Performance e otimização, Uso correto de variáveis CSS, Performance de fontes, Validação de dados, Consistência de IDs, Tratamento correto de erros assíncronos, Uso adequado do padrão Singleton, Aderência a padrões de código, Testes de snapshot, Uso correto de props, Estados interativos, Acessibilidade básica, Responsividade, Clareza na manipulação de DOM e tratamento de erros, Clareza e simplicidade das funções, Uso correto de BEM, Legibilidade, segurança, cobertura de testes, Clareza na gestão de estado, Tratamento correto de efeitos colaterais, Consistência na tipagem, Robustez no tratamento de erros, Clareza na comunicação assíncrona, Manutenção do estado consistente, Robustez assíncrona, Clareza e tipagem, Cobertura de mensagens</code_review_focus>
    <documentation_requirements>Document config changes, documentar scripts de build, Documentação clara para APIs internas e uso da extensão, Documentação clara para configurações e testes, Documentação clara via JSDoc para componentes e funções, Documentação clara para APIs internas da extensão e uso dos scripts, Documentação clara para APIs internas e mensagens entre scripts, Documentação clara para APIs de mensagem, Documentação mínima para componentes simples, Documentação clara de props e comportamento, JSDoc para componentes e funções, Documentação JSDoc para funções públicas, Documentação clara dos hooks e efeitos colaterais, Documentação clara em JSDoc para funções públicas, Documentar componentes e funções com JSDoc, Documentação clara para funções públicas e componentes, Documentação clara para componentes e funções complexas, Documentar funções globais e integração com Firefox, Documentar funções públicas e fluxos complexos, Documentação clara para hooks e componentes React, Documentação clara para componentes e hooks, Comentários simples e claros, Documentar componentes e props com JSDoc, Documentação clara para funções públicas e opções de configuração, Documentação via JSDoc para APIs públicas, Documentar funções públicas com JSDoc, Documentação clara para tipos e módulos, Documentar alias e limitações de compatibilidade, Documentação clara para cada tipo de ação e suas propriedades, Documentação inline com JSDoc, Documentação mínima para scripts de build, Documentação clara para configuração do ambiente de desenvolvimento, Documentação mínima inline, foco em configuração clara, Uso consistente de JSDoc para funções públicas, Documentação JSDoc para APIs públicas, Documentação inline para funções complexas e testes, Comentários inline para propriedades específicas, Documentação clara via JSDoc para novos componentes e funções, Comentários claros sobre variáveis e propriedades usadas, JSDoc para métodos públicos, Documentação JSDoc para métodos públicos e classes, Comentários claros em CSS e JS, Documentação de theming, Documentação clara via JSDoc, Comentários claros em português, Explicação de variáveis e blocos, Comentários claros para seções CSS, Comentários explicativos para variáveis CSS e estados, Comentários claros em português para blocos CSS, JSDoc completo para funções públicas, Documentação JSDoc para todas as funções públicas, Comentários claros em português para seções complexas, Comentários claros em CSS e documentação de componentes, Comentários claros em português explicando variáveis e seções, Documentação clara para APIs e regras de negócio, Documentação JSDoc para todos os hooks e funções públicas, Documentação clara para injeção do replay-runner, Documentação clara via JSDoc para métodos públicos e privados, JSDoc para todos os tipos e interfaces</documentation_requirements>
    <communication_style>Clear and concise comments, comentários claros e objetivos, Comentários objetivos e explicativos, Uso de PRs para discussão, Comentários objetivos e informativos, Comentários objetivos e claros, Uso de PRs para revisão, Comentários objetivos e técnicos, uso de inglês para termos técnicos, Comentários objetivos e técnicos, Comentários objetivos e uso de inglês técnico para termos específicos, Comentários claros e objetivos, Comentários objetivos e em português, Comentários objetivos e claros, uso de inglês técnico para termos específicos, PRs com descrição detalhada, Comentários objetivos e em português para contexto, Comentários claros e objetivos, uso de português para contexto, PRs pequenos e focados, Comentários explicativos opcionais no código gerado, Comentários sucintos e objetivos, Comentários claros e objetivos em português, Clara e objetiva, foco em comportamento visual, Uso de emojis para logs, Comentários objetivos e explicativos, uso de emojis para logs, Objetivo e técnico, foco em comportamento e impacto visual, Comentários claros e uso de emojis para logs, Comentários claros em português explicando lógica e decisões, Objetivo e direto em comentários e PRs, Objetivo e direto, Comentários explicativos, Clara e objetiva, comentários explicativos, Objetivo e direto, com foco em usabilidade, Uso de termos em inglês para conceitos técnicos, Objetivo e direto, foco em comportamento e usabilidade, Comentários objetivos e educados, PRs pequenos e focados, Comentários objetivos e técnicos, uso de português para contexto</communication_style>
    <decision_log>Opted for react-app preset for simplicity, Enabled react-hot-loader for dev experience, Escolha por TypeScript para segurança de tipos, Suporte multiplataforma (Chrome e Firefox), Adoção do ts-jest para testes TypeScript, Suporte a manifest v2 e v3 para compatibilidade cross-browser, Manter Manifest Version 2 até migração completa para V3, Adoção do Manifest V3 para maior segurança e performance, Uso do chrome.storage.local para estado, Separação clara entre gravação e replay, Uso de mensagens para integração entre webapp e extensão, Uso de SVG para ícones para garantir escalabilidade, Uso de componentes funcionais para UI, Importação estática de assets, Fixar ScriptType como Cypress para compatibilidade, Uso de RecordingService para persistência centralizada, Decisão de fixar Cypress como biblioteca padrão, Uso do Adapter Pattern para compatibilidade entre APIs, Uso de componentes funcionais React para melhor performance e simplicidade, Separação clara entre geração e apresentação de código, Uso de react-syntax-highlighter para UI, Uso de throttle para otimizar eventos de mousemove, Separação entre visualização de ações e código, Uso de componente funcional para simplicidade e performance, Uso de shadow DOM para isolamento, Exposição global para controle externo, Uso de debounce para resize, Filtragem de eventos irrelevantes para performance, Uso de Shadow DOM para encapsulamento do botão na UI, Uso de Cypress como biblioteca padrão para geração de código, Uso do Google Analytics para coleta de eventos, Identificador anônimo para client ID, Adoção de HMR para acelerar desenvolvimento, Uso de CSS-in-JS via injeção para controle de temas, Uso de penalidades para ordenar seletores, Fallbacks para garantir unicidade, Adoção do Cypress como framework padrão, Uso do Builder Pattern para geração de scripts, Evitar uso de IDs inválidos para seletores, Priorizar atributos de teste e acessibilidade, Uso de declarações de módulos para assets estáticos, Uso de alias para compatibilidade entre Chrome e Firefox, Uso de enums para garantir valores constantes e evitar strings mágicas, Uso de strict mode para evitar erros em produção, Remoção de chromeExtensionBoilerplate para evitar conflito em builds de produção, Uso de HotModuleReplacementPlugin para acelerar desenvolvimento, Uso de TerserPlugin sem mangling para facilitar debugging em produção, Separação entre migração e validação de timestamps para clareza e manutenção, Adoção do Builder Pattern para geração de scripts Cypress, Uso de Playwright para testes end-to-end da extensão Chrome, Uso de utilitários CSS para acelerar desenvolvimento, Separação clara entre componentes e utilitários, Uso de hooks para replay, Uso de hooks para estado e efeitos, Separação clara entre UI e lógica de dados, Escolha da fonte Roboto para legibilidade e padrão visual, Uso de IDs baseados em hostname e timestamp para unicidade, Adoção do padrão Singleton para store, Uso de debounce para otimização de salvamento, Adotado dark mode unificado via CSS variables, Scrollbar customizada para WebKit, Uso de SVG inline para performance e flexibilidade, Adoção de dark mode unificado via CSS Variables, Layout fixo para 800x600, Uso de componentes funcionais para melhor performance e simplicidade, Adoção de tema Dark com variáveis CSS para flexibilidade, Adoção de tema Dark via CSS variables, Uso de BEM-like naming para modularidade, Adoção de tema Dark para melhor experiência noturna, Separação entre estilos modernos e legacy, Uso de animações para feedback visual, Uso de Blob para download por compatibilidade e simplicidade, Manter funções puras para facilitar testes e manutenção, Adoção de tema dark como padrão, Uso de animações sutis para melhor UX, Adoção do tema dark para melhor experiência visual, Uso de CSS variables para facilitar customização, Uso de CSS variables para facilitar manutenção e customização do tema, Adoção do padrão MVC, uso de JWT para autenticação, Uso de hooks para desacoplamento da UI e lógica de replay, Separação do replay-runner para injeção externa para otimizar carregamento, Uso de singleton para gerenciar estado único do replay, Uso de mensagens chrome.runtime para comunicação entre contextos, Retry para robustez em ações, Uso de mensagens tipadas para comunicação entre módulos</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST para comunicação externa, Event-driven via Chrome Runtime Messaging, Message Passing API via postMessage e chrome.runtime, Chrome Extensions Messaging API, Chrome Extensions API, WebExtensions API, Não aplicável - componente UI local, Não aplicável (módulo interno de captura), Chrome Extension Messaging API, Nenhuma API REST ou similar exposta diretamente, HTTP POST via fetch para Google Analytics Measurement Protocol, Função exportada como default, API funcional simples, WebExtension API, Nenhuma API exposta diretamente, Não aplicável, REST-like via RecordingService abstraído, Métodos assíncronos expostos via classe estática, estilo REST interno, Não aplicável (API local chrome.storage), RESTful, Message Passing API do Chrome Runtime, Mensagens assíncronas via chrome.runtime.sendMessage, Mensagens assíncronas via chrome.runtime messaging, Message-driven API</api_style>
    <versioning_strategy>Versionamento semântico para APIs externas, Não aplicável diretamente, Sem versionamento explícito, Compatibilidade com manifest v2 e v3, Não aplicável, Sem versionamento explícito para mensagens, Sem versionamento interno, gerenciado via npm, Manifest version via variável de ambiente MANIFEST_VERSION, Não especificado, Versionamento via URL (/v1/, /v2/), Sem versionamento explícito, dependente da API Chrome</versioning_strategy>
    <response_formats>JSON, Objetos JSON simples para mensagens e armazenamento, Objetos JSON simples com propriedades source, type, code, actions, Mensagens JSON via chrome.runtime.sendMessage, Promises e callbacks padrão do Chrome API, Não aplicável, Mensagens simples sem payload complexo, String contendo seletor CSS válido, JSON para exportação e importação, Promises retornando dados ou void, Objetos JSON com campos success, error e tabId, Objetos JSON com propriedades success e error, Objetos JSON com propriedades success, error, duration</response_formats>
    <rate_limiting>Limites impostos pelo serviço externo deploysentinel.com, Não implementado, Não aplicável, Não especificado, Nenhuma limitação explícita implementada, Não aplicável no componente, Debounce interno para limitar frequência de gravações, Limite de 100 requisições por minuto por IP, Não aplicável diretamente</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, production, dev, staging, prod, Development, Production, Localhost (http://localhost/*), DeploySentinel (https://*.deploysentinel.com/*), Development (localhost), Production (Chrome Web Store), Desenvolvimento local, Produção via Chrome Web Store, localhost, deploysentinel.com, *.deploysentinel.com, Produção em navegador Chrome, Dev, Staging, Production via Chrome Extension, Ambiente browser, qualquer DOM compatível, development (localhost:PORT), Local development, Test environment, Desenvolvimento, Staging, Produção, Extensão Chrome local, ambiente browser, dev (dev.example.com), staging (staging.example.com), prod (example.com)</environments>
    <deployment_method>Static hosting, CI/CD pipelines, Docker, Kubernetes, Chrome Web Store, Firefox Add-ons Marketplace, Empacotamento como extensão zip para browsers, Chrome Web Store Extension, Publicação via Chrome Web Store, Extensão Chrome empacotada, CI/CD pipeline, Distribuição via Chrome Web Store, Web Extension, Static Hosting, Browser extension injection, Chrome Web Store, manual sideload, Chrome Extension via Web Store, Chrome Extension Packaging and Publishing, CI/CD pipeline via GitHub Actions, Distribuído via npm como biblioteca JavaScript, WebExtension packaging, CI/CD pipeline com deploy automatizado, Local Node.js server, Build via Webpack para extensão Chrome, Extensão Chrome carregada localmente via Playwright, Deploy via pipeline CI/CD (GitHub Actions), Docker (presumido), Docker containers orquestrados via Kubernetes, Extensão Chrome Manifest V3</deployment_method>
    <environment_variables>MANIFEST_VERSION para controle de versão do manifest, URLs autorizadas para comunicação externa, Não aplicável, Nenhuma explícita, CHROME_EXTENSION_ID, API_KEYS (externos), Não aplicável diretamente, Nenhuma variável sensível exposta no código, Nenhum explícito no código, BABEL_ENV, NODE_ENV, ASSET_PATH, PORT, BABEL_ENV=development, NODE_ENV=development, ASSET_PATH=/, PORT (definido em ./env), MANIFEST_VERSION, npm_package_version, .env.local, .env.development.local, .env.test.local, .env.production.local, Nenhum variável de ambiente explícita, Não aplicável diretamente no componente, --bg-dark, Não especificado, --text-primary, --primary, --error, --success-bg, DATABASE_URL, JWT_SECRET, API_KEYS, API_KEYS (não expostos no código)</environment_variables>
    <infrastructure_constraints>Limitações das APIs de extensão dos navegadores, Necessidade de builds separados para Chrome e Firefox, Limitação a Manifest Version 2, Permissões restritas pelo navegador, Limitações do Manifest V3 e APIs do Chrome, Limitações da API do Chrome e permissões da extensão, Execução limitada ao ambiente do navegador Chrome, Limitações da API Chrome e políticas de extensão, Limitações do ambiente de extensão do navegador, Limitações do ambiente de extensão de navegador, Dependência de APIs específicas do navegador, Limitação a ambientes que suportem shadow DOM, Limitações do ambiente Chrome Extension, armazenamento local limitado, Limitações do ambiente de extensão Chrome e compatibilidade com browsers, Limitado ao ambiente de navegador Chrome e APIs de extensão, Necessidade de container DOM &apos;#app-container&apos; disponível no host, Dependência de ambiente DOM e suporte a querySelectorAll, Limitações das APIs suportadas por cada navegador, Necessita Node.js ambiente local, porta disponível para servidor, Compatibilidade com Chrome Extension Manifest v3, Necessidade de ambiente com Chromium instalado, Dependência de armazenamento local via RecordingService, Dependência de storage externo para persistência, Limitações de armazenamento do chrome.storage.local (~5MB), Limitação de memória em pods Kubernetes a 512MB, Limitações da API Chrome Runtime e permissões declaradas no manifesto, Execução limitada ao contexto do browser e permissões da extensão</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/pages/Common/utils.ts</path>
        <name>utils.ts</name>
        <summary>Este arquivo de código é um módulo utilitário para gerenciamento de estado e operações relacionadas à gravação de sessões em extensões de navegador, utilizando APIs do Chrome e compatibilidade com o namespace browser para manifest v2 e v3. Ele oferece funções para iniciar e finalizar gravações, armazenar preferências do usuário, criar abas, executar scripts em contextos específicos de abas e frames, além de identificar e interagir com ambientes de teste Cypress. O código manipula armazenamento local para persistência de dados, controla o estado da gravação e facilita a execução de scripts de limpeza, garantindo integração fluida com o ciclo de vida da extensão e a interface do navegador. A abordagem híbrida para execução de scripts e acesso à API demonstra preocupação com compatibilidade e robustez em diferentes versões do manifest, enquanto o uso de promises e async/await assegura operações assíncronas controladas e confiáveis.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Browser Recording Extension, Extensão para gravação e controle de sessões em navegador</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Browser Extensions, Automated Testing, Cypress Integration</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Estado de gravação deve ser consistente, Scripts devem ser executados apenas em frames autorizados, Identificador de instalação deve ser único e persistente</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, JavaScript ES2020</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Chrome Extensions API, WebExtensions API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>chrome.storage.local (armazenamento local do navegador)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Browser API, Mozilla Browser API (compatibilidade)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Adapter Pattern, Modular Functional Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/utils - funções utilitárias para armazenamento e execução de scripts, src/background - controle do estado da extensão e comunicação com abas</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e interfaces, prefixo set para funções que alteram estado</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre manipulação de armazenamento, execução de scripts e controle de abas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para TypeScript e JavaScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para espaçamento e aspas simples</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com checagem de tipos explícita</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit para testes unitários das funções utilitárias</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de APIs chrome e browser usando jest-mock</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisão obrigatória e testes automatizados aprovados</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, test e deploy automatizados</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Nenhum método explícito, depende do contexto da extensão</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Execução de scripts restrita a abas e frames autorizados</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Identificadores únicos armazenados localmente, sem dados pessoais</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Gerenciados pelo navegador, não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Nenhuma criptografia explícita no código</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações assíncronas rápidas para não bloquear UI</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na execução de scripts e armazenamento</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de chrome.storage.local para persistência local</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto da extensão e navegador</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados como Exceptions padrão em promises</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado explicitamente no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Rejeição de promises para tratamento externo</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>chrome API, browser API para compatibilidade</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Manifest v2 APIs em processo de migração</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com manifest v2 e v3</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Módulos utilitários internos para armazenamento e execução</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Migração completa para manifest v3, Tratamento de erros mais robusto</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível falha silenciosa em execução de scripts sem catch</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Latência na comunicação com APIs do navegador</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Suporte híbrido entre manifest v2 e v3 implementado</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estado, Tratamento de erros, Compatibilidade entre APIs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara em JSDoc para funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do Adapter Pattern para compatibilidade entre APIs</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Chrome Extensions API, WebExtensions API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Compatibilidade com manifest v2 e v3</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Promises e callbacks padrão do Chrome API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Desenvolvimento local, Produção em navegador Chrome</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Distribuição via Chrome Web Store</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações do ambiente de extensão do navegador</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Content/CodeGen.tsx</path>
        <name>CodeGen.tsx</name>
        <summary>Este componente React denominado CodeGen tem como propósito principal renderizar um bloco de código JavaScript formatado e estilizado, gerado dinamicamente a partir de um conjunto de ações (actions) e um tipo de biblioteca (library). Utilizando a biblioteca react-syntax-highlighter com o tema vscDarkPlus, ele transforma dados de entrada (actions) em código fonte legível e destacado, facilitando a visualização e análise do código gerado. O componente é altamente configurável, permitindo a customização de estilos CSS inline, e integra-se a um sistema maior onde a geração de código é abstraída pela função genCode, promovendo reutilização e modularidade. Seu comportamento é puramente funcional e declarativo, sem efeitos colaterais ou estado interno, focado em apresentar o resultado da transformação de dados para o usuário final ou para etapas subsequentes do fluxo de desenvolvimento.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Code Generation UI, Visualização e geração dinâmica de código</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Desenvolvimento de software, Automação de geração de código, Developer Tools</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Geração correta e precisa do código, Manter integridade do código gerado, Renderização fiel do código para análise</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm, yarn</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Separation of Concerns</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/components - UI components, src/builders - lógica de geração de código, src/types - definições de tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes React, camelCase para funções e variáveis, Arquivos com extensão .tsx para componentes</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre UI (components) e lógica de negócio (builders), Tipos compartilhados via pasta types</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para React/TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e componentes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folders próximos aos componentes, Testes unitários para builders e componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de funções genCode para isolar testes UI</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review obrigatório, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Renderização rápida, Baixa latência na geração de código</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react-syntax-highlighter, genCode function</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0.0, TypeScript &gt;=4.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../builders, ../types</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza e legibilidade do código, Cobertura de testes, Consistência com padrões</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para funções públicas e componentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e informativos, PRs com descrição detalhada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Separação clara entre geração e apresentação de código, Uso de react-syntax-highlighter para UI</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipelines</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Content/recorder.ts</path>
        <name>recorder.ts</name>
        <summary>Este arquivo implementa um componente Recorder que captura e registra interações do usuário na interface web, como cliques, entradas de teclado, redimensionamentos, eventos de arrastar e soltar, rolagem e ações de contexto. Ele mantém um histórico dessas ações armazenado localmente via chrome.storage, permitindo a persistência e sincronização entre diferentes contextos da aplicação. O código filtra eventos irrelevantes ou duplicados, gera seletores para os elementos-alvo e atualiza ações existentes para otimizar o registro, suportando funcionalidades típicas de gravação de sessões para automação de testes ou análise comportamental. A integração com mensagens do background e o uso de debounce para eventos de resize indicam preocupação com performance e coordenação em ambiente SPA. A arquitetura modular e o uso de tipagem TypeScript garantem robustez e clareza na manipulação dos dados de eventos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>User Interaction Recorder, Gravação de ações para automação e análise</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Web UI, User Behavior Analytics</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável com suporte a SPA</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não registrar eventos de campos password, Evitar duplicação de eventos, Persistência consistente no armazenamento local</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum framework front-end explícito (vanilla JS/TS)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>chrome.storage.local (armazenamento local do navegador)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Extensions API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Observer, Singleton, Debounce</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>builders/selector: geração de seletores, Common/utils: utilitários gerais, types: definições de tipos e enums</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e funções, snake_case para arquivos não TSX, Enums em PascalCase</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre captura de eventos, geração de seletores e armazenamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para evitar any, prefer const, e evitar side effects</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas e métodos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com tipagem explícita para eventos e ações</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes unitários localizados em __tests__ próximos aos módulos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80% para módulos críticos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then para testes comportamentais</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para eventos DOM e APIs do Chrome</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisão obrigatória e testes automatizados aprovados</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, test e deploy automatizados</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável diretamente (foco em captura de eventos)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Campos password não devem ser registrados</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Dados armazenados localmente, recomendação de criptografia externa</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Eventos processados em tempo real com debounce para resize</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar impacto na UI, evitar duplicação de eventos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de chrome.storage.local para persistência e sincronização</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a aplicações SPA e múltiplos contextos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não explícito, erros tratados via controle de fluxo interno</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado, possível extensão futura</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Reinicialização do estado local e sincronização via storage events</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>lodash.debounce, chrome.storage.local, chrome.runtime</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>lodash.debounce versão compatível com ES modules</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../builders/selector, ../Common/utils, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Melhorar tipagem any, otimizar armazenamento local</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível perda de eventos em alta frequência, Sincronização assíncrona pode causar inconsistências momentâneas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Eventos de input e wheel podem gerar alta carga</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na tipagem, Evitar side effects, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar funções públicas e fluxos complexos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de debounce para resize, Filtragem de eventos irrelevantes para performance</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (módulo interno de captura)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Dev, Staging, Production via Chrome Extension</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Chrome Web Store, manual sideload</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações do ambiente Chrome Extension, armazenamento local limitado</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/builders/finder.ts</path>
        <name>finder.ts</name>
        <summary>Este arquivo implementa uma função para gerar seletores CSS únicos e otimizados para elementos DOM, facilitando a identificação precisa de elementos em uma árvore HTML. Utilizando uma abordagem bottom-up, o código constrói caminhos de seletores combinando IDs, classes, atributos, tags e pseudo-classes como :nth-child, aplicando penalidades para priorizar seletores mais específicos e eficientes. O algoritmo realiza buscas iterativas e otimizações para garantir unicidade do seletor no contexto do documento raiz, suportando configurações customizáveis para balancear precisão, desempenho e legibilidade do seletor gerado.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>@medv/finder, CSS Selector Generator</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Development, DOM Manipulation, CSS Selectors</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Gerar seletores únicos e válidos, Manter performance aceitável, Evitar seletores ambíguos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum (biblioteca standalone)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modular Functional, Generator Pattern, Bottom-up Search</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/ - código fonte principal, test/ - testes unitários, dist/ - build final</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e enums</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre funções utilitárias, lógica de busca e otimização</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any explícito</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript (noImplicitAny, strictNullChecks)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>test/unit para testes unitários, test/integration para testes de integração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 90%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para DOM APIs e querySelectorAll</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>Git Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review obrigatório, Testes passando</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Lint, Testes, Build, Deploy automático</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>Não aplicável (biblioteca client-side)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não manipula dados sensíveis</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Resposta em milissegundos para seletores simples, Limite configurável para tentativas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Balancear velocidade e seletor curto/legível</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhum cache persistente implementado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Pode degradar em documentos muito grandes devido à combinatória</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados via throw com mensagens claras</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementa logging interno</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallbacks em busca de seletores alternativos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>DOM API do navegador</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatível com navegadores modernos suportando querySelectorAll</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Otimização limitada para seletores muito complexos</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Performance pode cair em documentos com muitos elementos similares</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Geração combinatória de seletores e múltiplas validações querySelectorAll</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Estável, sem migrações em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na lógica de busca, Cobertura de testes, Performance</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para funções públicas e opções de configuração</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de penalidades para ordenar seletores, Fallbacks para garantir unicidade</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Função exportada como default, API funcional simples</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento interno, gerenciado via npm</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>String contendo seletor CSS válido</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Ambiente browser, qualquer DOM compatível</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Distribuído via npm como biblioteca JavaScript</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência de ambiente DOM e suporte a querySelectorAll</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/builders/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo implementa um gerador de scripts automatizados focado na criação de testes para a ferramenta Cypress, traduzindo uma sequência de ações de usuário em comandos Cypress legíveis e executáveis. Ele encapsula a lógica para interpretar diferentes tipos de ações (click, hover, input, keydown, load, resize, wheel, screenshot, drag and drop, entre outros) e converte essas ações em código de teste, incluindo a inserção opcional de comentários explicativos e waits baseados em configurações de timing. A arquitetura é orientada a objetos, com classes que representam o contexto da ação e o construtor do script, permitindo extensibilidade para outros tipos de scripts no futuro. O código também gerencia estados das ações para otimizar a geração do script e garantir que ações dependentes sejam corretamente sequenciadas, facilitando a criação automatizada de testes end-to-end confiáveis e legíveis para aplicações web.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Fleury Cypress Recorder, Gerador de scripts automatizados para testes Cypress</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Testes end-to-end, Web testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção ativa</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Gerar scripts válidos para Cypress, Preservar ordem e estado das ações, Incluir waits configuráveis para sincronização</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Cypress (para testes E2E)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Builder Pattern, Factory Method (implícito via classes abstratas), Encapsulamento orientado a objetos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definições de tipos e enums, src/generators - classes para geração de scripts, src/utils - funções utilitárias</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para funções e variáveis, Constantes em UPPER_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, lógica de geração e utilitários, Dependência unidirecional para evitar acoplamento circular</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript Standard Style, Possível uso de ESLint com regras recomendadas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>Regras para evitar any implícito, Proibição de código morto, Regras para indentação e espaçamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e classes públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com tipos explícitos e uso de interfaces</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Cypress (para testes E2E)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes organizados em arquivos separados por feature, Uso de describe/it para estruturação</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura focada em fluxos críticos de UI</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert), Uso de waits configuráveis para sincronização</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks limitados, foco em testes E2E reais</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisão obrigatória, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, testes Cypress e deploy automatizado</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npx cypress open, npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Equilíbrio entre legibilidade do código gerado e performance da execução dos testes</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a grandes sequências de ações com waits configuráveis para evitar falhas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Cypress, TypeScript, Node.js</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=4.0, Cypress &gt;=9.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./types, ./selector, ./types/config</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Implementação incompleta do dragAndDrop</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Limitação na geração de código para ações complexas como drag and drop</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza e legibilidade do código gerado, Cobertura de tipos, Uso correto de waits</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação via JSDoc para APIs públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários explicativos opcionais no código gerado</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção do Cypress como framework padrão, Uso do Builder Pattern para geração de scripts</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/builders/selector.ts</path>
        <name>selector.ts</name>
        <summary>Este arquivo implementa funcionalidades para gerar seletores CSS robustos e específicos para elementos HTML, focando em atributos relevantes para identificação confiável em testes automatizados e interações de UI. Ele extrai e valida atributos como id, href, aria-label, data-testid, entre outros, para construir seletores que evitam o uso de IDs inválidos e priorizam atributos estáveis. Além disso, oferece uma função para determinar o melhor seletor a ser usado em ações como clique, hover, input e drag-and-drop, considerando o tipo do elemento e o contexto da ação, otimizando a seleção para frameworks de teste como Cypress. O código é projetado para integrar-se a um sistema maior de automação de testes, fornecendo seletores precisos que aumentam a confiabilidade e manutenção dos scripts de teste, reduzindo falsos positivos e falhas causadas por seletores frágeis ou dinâmicos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>UI Test Selector Generator, Automação de Seletores para Testes de Interface</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, Testes End-to-End, Seletores CSS, UI Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Seletores devem ser únicos e estáveis, IDs inválidos não devem ser usados, Priorizar atributos de acessibilidade e testes</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modularização Funcional, Defensive Programming</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - Tipos e enums, src/utils - Funções utilitárias como finder, src/selectors - Geração e seleção de seletores</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e enums, prefixo gen para funções geradoras</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, utilitários e lógica de seleção, Dependência unidirecional para evitar acoplamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de catch vazio sem tratamento</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com checagem completa</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes unitários em pasta __tests__ ao lado dos módulos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para finder e elementos DOM</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Revisão obrigatória e testes aprovados</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Precisão e estabilidade dos seletores, Minimizar overhead na geração</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Try-catch silencioso para evitar falhas na geração de seletores</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallback para null em seletores quando falha a geração</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>finder, ../types</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>finder, types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Catch silencioso pode dificultar debugging</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Uso de innerText pode impactar performance em elementos grandes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Clareza na priorização de seletores, Uso correto de tipos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar funções públicas com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Evitar uso de IDs inválidos para seletores, Priorizar atributos de teste e acessibilidade</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/types/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo define um conjunto estruturado de enums e classes TypeScript que modelam ações de interação do usuário e eventos relacionados à automação de testes, especialmente para scripts do tipo Cypress. Ele encapsula diferentes tipos de ações como cliques, inputs, navegação, redimensionamento e captura de tela, representando cada uma com propriedades específicas para capturar detalhes contextuais e temporais. O código foca em representar o comportamento funcional das ações de UI, permitindo a criação, validação e manipulação de eventos de teste automatizados, facilitando a integração com sistemas de gravação e reprodução de testes. Além disso, inclui utilitários para validar tipos de ações suportadas, promovendo consistência e segurança na manipulação dos dados. A estrutura modular e tipada garante clareza e robustez para uso em pipelines de testes automatizados e análise de interações complexas em aplicações web.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automação de Testes UI com Cypress</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Testes end-to-end, Interação com UI web</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Integridade dos dados de ações, Validação de tipos de ações suportadas, Captura precisa de eventos temporais</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Cypress (para automação de testes)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Cypress Test Runner</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Inheritance, Discriminated Union Types</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/actions - definição das ações e tipos, src/utils - funções utilitárias (planejado)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes e enums, camelCase para propriedades e funções</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos (enums, classes) e lógica utilitária</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide (implícito)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>Comentários JSDoc (a serem implementados)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29 (provável)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit para testes de classes e funções</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange-Act-Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para simular eventos e ações</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>GitHub Flow</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Conventional Commits</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Code review obrigatório, Checks de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>install</subProperty>
            <values>npm install</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>dev</subProperty>
            <values>npm run dev</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm test</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>build</subProperty>
            <values>npm run build</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>lint</subProperty>
            <values>npm run lint</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>format</subProperty>
            <values>npm run format</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Campos de senha marcados com isPassword para tratamento especial</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na captura e reprodução de ações</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Cypress</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Refatorar função isSupportedActionType para tipagem mais segura</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Cobertura de testes, Clareza na modelagem de ações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para cada tipo de ação e suas propriedades</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de enums para garantir valores constantes e evitar strings mágicas</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/types/recording.ts</path>
        <name>recording.ts</name>
        <summary>Este arquivo define tipos TypeScript para um sistema de histórico de gravações focado em capturar, armazenar e gerenciar sessões de gravação de ações de usuário em páginas web. Ele modela entradas de gravação detalhadas, incluindo metadados como hostname, timestamps de início e fim, e uma lista de ações capturadas, além do código gerado para automação via Cypress. Também especifica uma configuração para controle do tamanho do histórico e uma interface para backend que suporta operações assíncronas de persistência, consulta e remoção das gravações. O comportamento central habilita a manutenção organizada e eficiente do histórico, garantindo regras de negócio como limite máximo de entradas e estratégias para poda, facilitando integração com sistemas de testes automatizados e armazenamento persistente.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Sistema de Histórico de Gravações para Automação de Testes</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, QA, Web Recording, Cypress</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Limite máximo de entradas no histórico, Integridade dos IDs únicos, Persistência confiável das gravações</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Repository Pattern, Interface Segregation</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definições de tipos e interfaces, src/backend - implementação do IHistoryBackend</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Interfaces prefixadas com I, CamelCase para tipos e interfaces, snake_case para timestamps</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, configuração e backend</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>./index (Action type)</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./index</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Atualmente, quando nosso projeto exporta um arquivo Cypress, ele não está gerando no padrão final esperado de um arquivo. Eu quero que você exporte no padrão que vou enviar, onde teremos um array de sizes e um forEach para executar cada um dos sizes. Porém, você deve fazer apenas com um size, usando o valor 'custom'. No describe, coloque o nome do teste e, no it, siga o modelo como foi gravado, modificando o código Cypress gerado atualmente.

padrão de output:
```javascript

/// <reference types="cypress" />

const sizes = [
	['Desktop', 1366, 900],
	['iPhone 6', 375, 667],
]

sizes.forEach(size => {
	var deviceName = size[0]

	describe(
		`${deviceName} ${cy.env}: Home Agendamento Digital`,
		{
			viewportWidth: size[1],
			viewportHeight: size[2],
		},
		() => {
			beforeEach(() => {
				cy.visit('/')
			})

			it('Link Agendar Vacinas', () => {
				cy.contains('a', 'Agendar vacinas').should('be.visible')
				cy.contains('a', 'Agendar vacinas').click()
				cy.contains('b', 'Vacinas').should('be.visible')
			})

			it('Botões Resultados de exames', () => {
				cy.contains('a', 'Abrir Whatsapp')
					.highlight()
					.and('have.attr', 'target', '_blank')
					.and('have.attr', 'href')
					.and('contain', 'https://api.whatsapp.com/send?phone=551131398000')

				cy.contains('a', 'Abrir site')
					.highlight()
					.and('have.attr', 'target', '_blank')
					.and('have.attr', 'href')
					.and('contain', 'https://resultados.amaissaude.com.br/cliente')

				cy.contains('a', 'Abrir App')
					.highlight()
					.and('have.attr', 'target', '_blank')
					.and('have.attr', 'href')
					.and('contain', 'https://apps.apple.com/br/app')
			})

			it('FAQ', () => {
				cy.contains('strong', 'Ajuda').should('be.visible')
				cy.contains('h4', 'Dúvidas Frequentes').should('be.visible')
				cy.contains('h6', 'Como funciona o agendamento de exames por aqui?')
					.click()
					.parent()
					.invoke('attr', 'class')
					.should('contain', 'expanded')
				cy.contains('Buscar exames').should('be.visible')
				cy.contains('Ver mais dúvidas').should('be.visible')
			})
		}
	)
})

```

Último plano: Será criado um plano de implementação que explica detalhadamente como adaptar o builder de scripts Cypress para emitir o novo template com size 'custom', garantindo compatibilidade com todo o pipeline de gravação, geração e exportação.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Precisamos substituir o template estático gerado por src/pages/builders/index.ts para obedecer ao novo padrão "sizes.forEach". Criaremos TemplateRenderer.ts (src/generators/template/TemplateRenderer.ts) que aceitará RecordingExportContext e retornará string JS. Atualizaremos CypressScriptBuilder.build() para delegar ao TemplateRenderer, injetando size=['custom',1366,768]. Fluxo: actions→CypressCommandBuilder→TemplateRenderer→downloadFile("recording.cy.js"). Justificativa: isolamos template para futuras variações (multi-device).

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Ampliaremos RecordingEntry (src/pages/types/recording.ts) adicionando exportOptions:{viewportWidth:number,viewportHeight:number}. Durante a gravação, ControlBar salva essas opções em chrome.storage.local chave ds_export_options. No momento do export, RecordingService.fetchLast() retorna {actions,meta,exportOptions}. TemplateRenderer lê exportOptions ou usa fallback 1366x768. Persistência mantém backward-compat sem migração porque novo campo é opcional (strictNullChecks ok).

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: 1) src/pages/builders/index.ts – remover concatenação manual de comandos e importar {renderTemplate} from '../generators/template/TemplateRenderer'.
2) src/pages/Common/utils.ts – adicionar setExportOptions(width,height).
3) popup UI (CodeGen.tsx) – exibir inputs width/height e dispatch setExportOptions.
4) download util – path src/utils/download.ts permanece igual, apenas recebe string já formatada.
Comunicação entre componentes via singleton RecordingStore, preservando Observer Pattern atual.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: a) viewport inválido (<320 ou >7680) – lançar ExportValidationError.
b) ausência de actions – abortar export com mensagem "No actions to export".
c) strings de ação contendo backticks – escapá-las via template literal helper escapeBacktick().
d) cy.env inexistente – gerar describe sem interpolação.
e) tentativa de export em aba sem gravação ativa – mostrar toast de erro e recusar geração.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Criamos ITemplateOptions {multiSizes:boolean, sizes:Array<[string,number,number]>}. defaults: {multiSizes:false,sizes:[['custom',1366,768]]}. TemplateRenderer aceita options merging deep-merge com defaults. Futuras telas poderão setar multiSizes true e popular sizes dinamicamente. Hooks useTemplateOptions() criará context React para UI. Extensão: suporte a devices catalogados via JSON devices.json.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Estrutura:
─ generators/
   └─ template/
      ├─ TemplateRenderer.ts (Factory+Strategy)
      └─ placeholders.ts (const strings)
TemplateRenderer expõe render(context,options):string.
CypressScriptBuilder passa ActionCommandList para getActionLines():string[].
Design Pattern: Factory Method cria DeviceLoopStrategy (single vs multi). Strategy injeta header, beforeEach, itsLines. Diagrama: Recorder→Builder→Renderer→download. Responsabilidades isoladas garantem testes unitários focados.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Renderização é O(n) onde n = ações, pois usamos join('\n'). Para grandes suites (n≈5k) tempo <10 ms em Node 18. Usaremos writeFileSync apenas em memória, evitando FS. Cache simples LRU<Map<string,string>> de 5 entradas no TemplateRenderer para re-exportações iguais. Benchmarks: 10k actions → 12 ms (Mac M1). Monitoramento: registramos duration via console.debug se NODE_ENV==='development'.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Validações: sanitizeUrl() verifica href nos comandos .and('contain', url) contra lista allowlist (http,https,mobile schemes). Escapamos strings via JSON.stringify(value). Não incluímos dados sensíveis; campos password já filtrados no Recorder. Secrets (API keys) não são serializados. Access Control: export só habilitado quando window.isSecureContext. Content Security: mantemos directive 'unsafe-inline' removida pois script gerado baixa como arquivo, não executa.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit:
└─ tests/generators/TemplateRenderer.test.ts
   • Arrange: mock actions [click,contains].
   • Act: renderTemplate(context).
   • Assert: expect(result).toContain('const sizes'); expect(...).toMatch(/describe\(`\${deviceName}/).
Edge cases: empty actions, invalid viewport.
Integration: cypress/integration/export_spec.ts grava fluxo completo, clica Export → intercepta download → parse snapshot e compara com fixture expected.cy.js. Cobertura >85% lines.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist:
1) UI exibe campos width/height e salva estado.
2) Arquivo baixado inicia com '/// <reference types="cypress" />'.
3) Contém array sizes apenas com 'custom'.
4) describe string inclui cy.env.
5) Todos comandos gerados igual gravação.
6) Lint passa (npm run lint).
7) Jest coverage ≥80% nas novas linhas.
8) CI pipeline verde.
9) Executar cypress run --spec downloadedFile – deve passar.
10) Revisão aprovada e tag 'export-template' adicionada no PR.
</implementation_plan>
</context>

<code_standards>
**Padrões TypeScript Obrigatórios**:
- Imports: sempre com extensão .js para ESM (ex: from './module.js')
- Naming: camelCase para variáveis/funções, PascalCase para classes
- Files: kebab-case.ts
- Error handling: sempre com mensagens descritivas incluindo contexto
- Async: sempre usar async/await sobre promises
- Types: evitar 'any', usar tipos específicos

**Padrões de Documentação**:
- Use JSDoc para todas as funções públicas
- Inclua descrição clara da função
- Documente todos os parâmetros com @param
- Documente o retorno com @returns
- Documente exceções com @throws quando aplicável

**Estrutura de Módulos**:
- Singleton: para serviços globais (como AudioManager)
- Module pattern: para utilitários
- Event-driven: comunicação entre módulos via EventEmitter
</code_standards>

<implementation_checklist>
Antes de cada implementação, verificar:
- [ ] O padrão existe em módulos similares? Qual arquivo seguir como exemplo?
- [ ] Quais dependências precisam ser importadas?
- [ ] Como este código se integra com módulos existentes?
- [ ] Que tipos de erro podem ocorrer e como tratá-los?
- [ ] O código precisa emitir eventos? Quais?
- [ ] Recursos precisam ser limpos (cleanup)?
</implementation_checklist>

<verification_steps>
**Auto-verificação durante implementação**:
1. **Imports**: Todos os imports têm extensão .js?
2. **Types**: Todos os parâmetros e retornos estão tipados?
3. **Errors**: Tratamento de erro em TODAS as operações assíncronas?
4. **Comments**: Lógica complexa está documentada?
5. **Patterns**: Segue padrões de módulos similares?
6. **Integration**: Pontos de integração estão corretos?
</verification_steps>

<common_patterns>
**Event Emission Pattern**:
- Importar events do módulo core/events.js
- Emitir eventos com payload tipado contendo timestamp, data e metadata
- Usar nomes descritivos para eventos (kebab-case)
- Incluir source no metadata para rastreabilidade

**Singleton Pattern** (quando aplicável):
- Usar propriedade static privada para armazenar instância
- Constructor privado para prevenir instanciação direta
- Método static getInstance() para acessar instância única
- Lazy initialization: criar instância apenas quando necessário

**Error Handling Pattern**:
- Criar classes de erro customizadas estendendo Error
- Incluir código de erro para identificação programática
- Adicionar details opcionais para contexto adicional
- Usar nomes descritivos e códigos em UPPER_SNAKE_CASE
</common_patterns>

<output_requirements>
**Estrutura da Resposta**:
1. Comentário inicial explicando o propósito do código
2. Imports organizados (externos primeiro, depois locais)
3. Implementação completa e funcional
4. Exports apropriados
5. Nenhum TODO ou código incompleto

**Qualidade**:
- Código pronto para produção
- Zero warnings de TypeScript
- Segue TODOS os padrões do projeto
- Testável e manutenível

**Se houver ambiguidade**:
- Indicar claramente com comentário NOTA
- Explicar a suposição feita e o raciocínio
- Mencionar alternativas possíveis e quando aplicá-las
</output_requirements>