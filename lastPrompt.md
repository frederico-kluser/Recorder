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
    <name>React Application Setup, build, processo de construção do projeto, Fleury Cypress Recorder, Extensão para geração automática de scripts de teste, Projeto TypeScript com Jest para testes automatizados, deploysentinel-recorder, Extensão para gravação de interações e geração de scripts de teste, DeploySentinel, Browser extension para gravação e reprodução de testes automatizados, DeploySentinel Test Recorder, Automação de testes Playwright, React Icon Component, Componente de ícone SVG para interface web, Interface para monitoramento e deploy de aplicações, Automated Script Selector, Interface para seleção de tipos de script de automação, Browser Automation Recorder, React User Preferences and Recording State Management, Browser Recording Extension, Extensão para gravação e controle de sessões em navegador, UI Automation Script Renderer, Code Generation UI, Visualização e geração dinâmica de código, UI Test Recorder, Automated Test Script Generator, Highlighter Component, Visualização e destaque de seletores CSS em UI React, Interface de controle para monitoramento e testes, User Interaction Recorder, Gravação de ações para automação e análise, DeploySentinel Cypress Test Recorder, Ferramenta para gravação de testes automatizados com Cypress, Browser Test Recorder, Ferramenta para gravação e geração de scripts de teste automatizados, Analytics Event Tracker, Monitoramento de eventos para análise de uso, React Popup Renderer, @medv/finder, CSS Selector Generator, Gerador de scripts automatizados para testes UI, Selector Generator for UI Automation, Projeto Front-end com suporte a importação de assets estáticos, Browser Extension Compatibility Layer, Web Automation Actions Modeling, Projeto React com TypeScript para front-end moderno, Webpack Production Build Script, Configuração de ambiente para aplicação Node.js, Chrome Extension Boilerplate, Development Environment Setup, Projeto Node.js com controle de versionamento otimizado, Timestamp Migration and Validation Utility, Gerador de scripts de automação de testes UI, Extensão para gravação e geração de scripts Playwright, UI Design System, Biblioteca de estilos para componentes e utilitários CSS, Recording Automation UI, Interface para visualização e manipulação de gravações de ações automatizadas, Recording History Management System, Interface Web para visualização de histórico e detalhes, RecordingService, Serviço de gerenciamento de gravações de ações para automação de testes, Recording History Manager, Gerenciamento de histórico de gravações de ações, Recording History System, Sistema de histórico de gravações para automação de testes</name>
    <domain>Web Development, Frontend, React, desenvolvimento de software, automação de build, Automação de testes, QA, Test Automation, Browser Testing, Desenvolvimento de software, Testes automatizados, TypeScript, Testes end-to-end, Browsers, Cypress, Playwright, Puppeteer, Browser Interaction Recording, End-to-End Testing, Browser extension, Web navigation recording, Frontend Development, UI Components, DevOps, Branding, Automação de Testes, Browser Extension, Automation, Testing, Web Application, User Preferences, State Synchronization, Browser Extensions, Automated Testing, Cypress Integration, Automação de geração de código, Developer Tools, Web Automation, Quality Assurance, UI Debugging, CSS Selector Highlighting, Web UI Testing, Shadow DOM, Web UI, User Behavior Analytics, Web Analytics, Digital Product Monitoring, Google Analytics, Frontend Web Development, UI Component Rendering, DOM Manipulation, CSS Selectors, UI Testing, Desenvolvimento front-end, Assets estáticos, CSS Modules, SVG inline, browser extensions, cross-browser compatibility, UI Interaction, Web Testing, Web applications, Desenvolvimento Frontend, Build Automation, JavaScript, Configuração de software, Node.js environment management, Chrome Extensions, Frontend Tooling, Node.js, Controle de versão, Software Development, Event Processing, Action Logging, Test Script Generation, Front-end Development, Web Interfaces, Design System, QA Automation, User Session Recording, Playback and Analysis, User Interface, Dark Theme, Recording Actions, User Interaction Recording, Web Recording</domain>
    <current_phase>Development, produção, deploy, Produção, Manutenção ativa, Manutenção, Versão 0.7.1 estável, Estável, Estabilização, Production, Stable Release, Estável com suporte a SPA, Estável com funcionalidades completas de gravação e histórico, MVP, Desenvolvimento, Desenvolvimento ativo, Desenvolvimento inicial, Local Testing, Production Ready, Testes unitários e validação de funcionalidades, Testes automatizados integrados, Estabilização de UI</current_phase>
    <critical_business_rules>Preserve fast refresh functionality, Ensure JSX transpilation compatibility, build deve gerar artefatos consistentes, não quebrar pipeline de deploy, Captura precisa e completa dos eventos do usuário, Geração correta e legível dos scripts, Compatibilidade com múltiplos frameworks de teste, Execução consistente dos testes, Suporte a TypeScript via ts-jest, Ambiente Node.js para testes, Compatibilidade com manifest versions 2 e 3, Geração precisa e confiável de scripts de teste, Manutenção da integridade dos dados capturados, Gravação precisa das interações do usuário, Geração correta de scripts compatíveis com Cypress, Playwright e Puppeteer, Segurança no acesso às permissões do navegador, Segurança e privacidade dos dados capturados, Gravação deve ser iniciada e finalizada corretamente, Eventos de navegação devem ser capturados apenas na aba e frame corretos, Scripts injetados devem ser executados somente quando a gravação estiver ativa, Validação rigorosa da origem das mensagens, Comunicação segura entre webapp e extensão, Consistência visual do ícone, Compatibilidade com React 18+, Renderização correta do SVG, Consistência visual da marca, Performance mínima no carregamento do logo, Seleção válida de ScriptType deve ser garantida, Callback onChange deve ser chamada com valor correto, Persistência correta das gravações, Integridade dos dados de ações, Comunicação confiável entre abas, Persistência correta das preferências do usuário, Sincronização consistente do estado de gravação entre abas, Integridade dos dados armazenados, Estado de gravação deve ser consistente, Scripts devem ser executados apenas em frames autorizados, Identificador de instalação deve ser único e persistente, Ações devem ser exibidas na ordem correta, Somente ações suportadas devem ser renderizadas, Seletores devem ser precisos para garantir identificação correta dos elementos, Geração correta e precisa do código, Manter integridade do código gerado, Renderização fiel do código para análise, Accurate capture of user actions, Secure handling of sensitive inputs, Reliable code generation for multiple test frameworks, Precisão no posicionamento do destaque, Renderização consistente do rótulo, Não interferir na interação do usuário, Garantir única instância ativa do script, Permitir limpeza completa do componente para evitar vazamentos, Não registrar eventos de campos password, Evitar duplicação de eventos, Persistência consistente no armazenamento local, Garantir que apenas uma gravação esteja ativa por vez, Não montar múltiplos botões no DOM, Comunicação correta com a extensão Chrome, Garantir integridade dos dados de gravação, Não permitir gravação sem aba ativa, Manter sincronização entre estado da aba e gravação, Garantir anonimato do usuário, Enviar dados de eventos sem impactar UX, Manter integridade dos dados enviados, Renderizar Popup corretamente no container designado, Aplicar estilos globais sem conflito, Gerar seletores únicos e válidos, Manter performance aceitável, Evitar seletores ambíguos, Gerar scripts válidos para múltiplos frameworks, Manter sincronização temporal correta entre ações, Não usar IDs inválidos para seletores, Priorizar seletores estáveis para evitar falhas em testes, Importação correta e tipada de arquivos estáticos para evitar erros de build, Garantir que chamadas à API do navegador sejam compatíveis entre Chrome e Firefox, Ações devem ser tipadas e validadas para evitar execuções inválidas, Manter integridade dos dados de interação para rastreabilidade, Garantir tipagem estrita para evitar erros em runtime, Manter compatibilidade com ES5 para browsers legados, Build deve ser executado em modo produção, Erros de build devem ser reportados e impedir deploy, NODE_ENV deve sempre estar definido, PORT deve ser um número válido, Hot Module Replacement must be enabled for dev mode, Dev server must serve assets with CORS headers, Manifest version consistency, Environment variable integrity, Asset path correctness, Não versionar arquivos de dependências, Não expor arquivos de configuração sensíveis, Manter repositório limpo e organizado, All actions must have valid, non-negative, and sequential timestamps, Geração correta e sintaticamente válida dos scripts para cada framework, Manter compatibilidade com APIs dos frameworks Cypress, Playwright e Puppeteer, Gravação precisa das ações do usuário, Geração correta do código Playwright, Validação da instalação da extensão, Consistência visual, Acessibilidade, Responsividade, Integridade dos dados da gravação, Precisão na geração de código para múltiplas bibliotecas, Feedback claro para ações do usuário, Não permitir exclusão sem confirmação explícita, Integridade dos dados durante exportação, Atualização consistente do estado após operações CRUD, Manter legibilidade e usabilidade em diferentes views, Garantir scroll vertical para conteúdos extensos, Não salvar gravações vazias, IDs únicos para gravações, Geração correta de código para múltiplos frameworks, Limite máximo de gravações respeitado, Integridade dos dados de gravação, Migração correta de dados antigos, Manter integridade dos dados de gravação, Não exceder limite máximo de entradas, Garantir unicidade do ID da gravação</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>JavaScript ES6+, JSX, JavaScript, Node.js, TypeScript 5.0, TypeScript 5.x, TypeScript 4.1.5, Manifest Version 2, JavaScript ES2021, Manifest V3 JSON, TypeScript 4.x, React 18, JavaScript ES2020, JavaScript (Node.js 16+), JavaScript (Node.js 18+), CSS3</primary_language>
    <frameworks>React (via react-app preset), Webpack, Babel, Webpack 5, Yarn, Cypress, Playwright, Puppeteer, Jest 29.x, ts-jest, React 17.0.1, Jest 27.3.1, Webpack 5.23.0, Playwright 1.16.3, Chrome Extensions API, Nenhum framework frontend explícito, React 18.2, React 18, React 18.x, WebExtensions API, ReactDOM, Nenhum framework front-end explícito (vanilla JS/TS), FontAwesome SVG Core, FontAwesome React, React CopyToClipboard, Nenhum framework específico detectado, Nenhum (biblioteca standalone), Nenhum framework frontend específico (módulo utilitário), React 18.2 (implícito), Webpack 5.x, WebpackDevServer 4, Jest 29, Playwright 1.x, Nenhum framework CSS explícito, TanStack Table 8.x, FontAwesome React 0.2.x, Node.js, Possível uso de frameworks de teste como Jest (não explícito), Nenhum framework front-end explícito</frameworks>
    <databases>chrome.storage.local, chrome.storage.local (armazenamento local do navegador), Não aplicável, localStorage (browser), chrome.storage (browser extension API), LocalStorage (via recordingStore), recordingStore (abstração de storage, tipo não especificado)</databases>
    <external_services>Chrome Web Store, Firefox Add-ons Marketplace, GitHub Actions, Browser APIs (chrome.*), Test Automation Frameworks (Cypress, Playwright, Puppeteer), https://*.deploysentinel.com, Chrome WebExtensions API, Cypress Test Runner, Playwright Test Runner, Chrome Extension API, DeploySentinel Webapp, Chrome Extensions API, Chrome Extension APIs, Chrome Browser API, Mozilla Browser API (compatibilidade), Playwright (via ScriptType integration), Chrome Storage API, Chrome Extension Messaging API, Chrome Extension APIs (tabs, storage), Analytics (onPageView, onNewRecording), Google Analytics Measurement Protocol API, FontAwesome CDN (via package), Nenhum serviço externo diretamente integrado, Firefox WebExtension API, Browsers headless control APIs via Puppeteer/Playwright/Cypress, Node.js environment, Chrome APIs, Playwright Browser Automation, FontAwesome Icons, Clipboard API via react-copy-to-clipboard, RecordingService (local storage or backend API), Google Fonts (Roboto)</external_services>
    <package_manager>npm, yarn, Yarn, yarn 1.22.22</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Modular Build Configuration, Pipeline, Modular Build Scripts, Observer Pattern, Event-driven Architecture, Modular Architecture, Configuration Object Pattern, Modular, Component-based UI, Build scripts orchestration, Extension Architecture (Background Script, Content Script, Browser Action), Modular Extension Design, Service Worker Background Processing, Event-driven, Pub-Sub, Message Passing, Component-Based Architecture, Controlled Component Pattern, Service Layer, Custom React Hooks, Adapter Pattern, Modular Functional Design, Declarative UI, Separation of Concerns, Hook-based State Management, Functional Components, Singleton, Shadow DOM encapsulation, Observer, Debounce, Hook Pattern, Hooks for state management, Modular separation of concerns, Modularização funcional, Hot Module Replacement, Modular Functional, Generator Pattern, Bottom-up Search, Factory Method, Template Method, Strategy, Factory Pattern, Strategy Pattern, Modularização via declaração de módulos TypeScript, Alias Pattern, Object-Oriented Programming, Enum-based State Modeling, Component-based, Build Pipeline Script, Configuration Module Pattern, Modular Configuration, Middleware Pattern, Plugin Pattern, .gitignore pattern segmentation, Functional Programming, Modular Design, Builder Pattern, Test-Driven Development (TDD), Test Automation Pattern, Page Object Pattern (implicit), Atomic CSS, Component-Based CSS, Functional Components with Hooks, Service Layer Pattern, Modular CSS com classes condicionais, Facade, Static Service Class, Strategy (para geração de código), Debounce para otimização de escrita, Repository Pattern, Interface Segregation</design_pattern>
    <folder_structure>Config files in root or config folder, Source code in src/, src/, build/, dist/, src/ - código fonte, assets/ - imagens e ícones, tests/ - testes E2E, dist/ - builds para Chrome e Firefox, Configurações centralizadas em pasta de configuração (ex: /config ou raiz), utils/ para scripts de build e servidor, build/ para artefatos gerados, node_modules/ para dependências, src/ presumido para código fonte React, background/ - scripts de background, content_scripts/ - scripts injetados nas páginas, popup/ - interface do usuário da extensão, assets/ - ícones e recursos estáticos, background/ - service worker scripts, popup/ - UI da extensão, assets/ - ícones e imagens, Common/utils - funções utilitárias, storage/recording-store - gerenciamento de estado da gravação, background script - lógica central de controle e eventos, src/: código fonte, background/: scripts da extensão, content-scripts/: scripts injetados, src/components/Icon - componente isolado para reutilização visual, pages: componentes de tela, Popup: componentes modais ou popups, assets: arquivos estáticos como imagens e SVGs, src/components - componentes UI reutilizáveis, src/types - definições de tipos e enums, utils - funções utilitárias, builders - geração de código, storage - serviços de persistência, types - definições de tipos, src/hooks - custom hooks, src/utils - utilitários para armazenamento, src/types - definições de tipos TypeScript, src/utils - funções utilitárias para armazenamento e execução de scripts, src/background - controle do estado da extensão e comunicação com abas, types/ - definições de tipos e enums, builders/ - funções auxiliares para construção de seletores, components/ - componentes React reutilizáveis, styles/ - arquivos CSS, src/components - UI components, src/builders - lógica de geração de código, src/types - definições de tipos, /components - UI components, /builders - selector and code generation logic, /Common - shared hooks and utilities, /types - TypeScript type definitions, src/components/Highlighter - componente visual e estilização associada, ./ControlBar - componente React principal, ../Common - estilos compartilhados, root - script de bootstrap e injeção, builders/selector: geração de seletores, Common/utils: utilitários gerais, types: definições de tipos e enums, Common: componentes e hooks reutilizáveis, types: definições de tipos TypeScript, styles: CSS modularizados, Common (shared utilities and hooks), Content (core content components), Storage (state persistence), Components (UI parts), Types (TypeScript types), Common/utils para funções utilitárias, Módulo de analytics separado para eventos, ./Popup (component), ./index.css (local styles), ../Common/styles.css (shared styles), src/ - código fonte principal, test/ - testes unitários, dist/ - build final, src/actions - definição de ações e tipos, src/builders - implementações específicas de geração de scripts, src/utils - funções utilitárias, src/types (tipos e enums), src/utils ou src/selectors (funções utilitárias para geração de seletores), src/assets para arquivos estáticos, src/types para declarações de tipos, src/: código fonte principal, types/: definições de tipos, dist/: build final, src/actions - definição das ações e tipos, src/utils - funções utilitárias (TODO), src (código fonte), build (artefatos compilados), node_modules (dependências externas), config/ - configurações do Webpack, scripts/ - scripts de build e automação, config/ - arquivos de configuração centralizados, config/ - configurações do Webpack e ambiente, build/ - saída dos arquivos compilados, src/ - código fonte da aplicação, src/pages - Contém scripts específicos da extensão (Popup, Background, Content, Bridge, CypressTrigger), src/assets - Recursos estáticos como imagens, build - Diretório de saída para arquivos compilados, /node_modules para dependências, /coverage para relatórios de teste, /build para artefatos de produção, .prompts, .logs, .audios para dados auxiliares, src/types - definição de tipos, src/utils - funções utilitárias para manipulação de dados, src/pages/builders - Contém classes builder para geração de scripts, tests - Contém testes unitários para validação dos builders, /tests - testes automatizados, /build - extensão compilada, /tmp - dados temporários para browser context, styles/components - componentes reutilizáveis, styles/utilities - classes utilitárias para layout e espaçamento, src/types - Tipos TypeScript, src/Content - Componentes reutilizáveis (ActionList, CodeGen), src/components - Componentes de UI específicos, src/styles - Arquivos CSS, components/: UI components, storage/: data persistence services, types/: TypeScript type definitions, styles/: CSS files, Estilos base em arquivos CSS globais, Estilos específicos aplicados via classes no body, src/types (tipos), src/services (serviços), src/builders (geradores de código), src/store (persistência), src/store - gerenciamento de estado e persistência, src/interfaces - definições de tipos e contratos, src/backends - implementações de persistência, src/models - modelos de dados</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for React components, camelCase para funções, kebab-case para arquivos, CamelCase para classes e funções, prefixos claros para eventos e handlers, camelCase para variáveis e propriedades, PascalCase para tipos e interfaces, camelCase para variáveis e funções, PascalCase para componentes React, kebab-case para scripts npm, PascalCase para classes, nomes descritivos para scripts e arquivos, PascalCase para componentes UI, snake_case para arquivos de configuração, camelCase para funções e variáveis, UPPER_SNAKE_CASE para constantes, PascalCase para classes e stores, camelCase para props e variáveis, snake-case para arquivos estáticos, PascalCase para componentes e tipos, PascalCase para classes e tipos, snake_case evitado, PascalCase para tipos e componentes, prefixo use para hooks, prefixo set para funções que alteram estado, UPPER_SNAKE_CASE para enums e constantes, Arquivos com extensão .tsx para componentes, PascalCase for components, camelCase for functions and variables, UPPER_SNAKE_CASE for enums, PascalCase para componentes, kebab-case para IDs CSS, CamelCase para componentes e funções, snake_case para variáveis globais no window, snake_case para arquivos não TSX, Enums em PascalCase, CamelCase para funções e componentes, kebab-case para classes CSS, Uppercase enums, Descriptive file names matching component or utility, Constantes em maiúsculas com underscore, kebab-case para arquivos CSS, PascalCase para tipos e enums, CamelCase para classes, camelCase para métodos e variáveis, Constantes em MAIÚSCULAS_SNAKE_CASE, CamelCase para funções e variáveis, Extensões de arquivos mantidas (.css, .svg), Declarações em arquivos .d.ts, PascalCase para classes e interfaces, PascalCase para classes e enums, camelCase para propriedades e funções, PascalCase para componentes React e classes, Variáveis em UPPER_SNAKE_CASE para env vars, Módulos em camelCase ou kebab-case, PascalCase para classes e plugins, kebab-case para arquivos e pastas, CamelCase para arquivos e pastas, Extensões indicam linguagem (.jsx, .tsx, .ts), Arquivos .env para configurações locais, secrets.*.js para arquivos sensíveis, Prefixo &apos;test&apos; para funções de teste, PascalCase para tipos e classes, testes nomeados com descrições claras, BEM-like para componentes (.btn-primary), abreviações para utilitários (.p-1, .m-4), PascalCase para interfaces e tipos, kebab-case for CSS classes, Classes CSS descritivas (ex: history-view, detail-view), CamelCase para classes e métodos, snake_case para IDs de gravação, prefixos claros para tipos e funções, Constantes em UPPER_SNAKE_CASE, CamelCase para interfaces e tipos, camelCase para propriedades e métodos</naming_conventions>
    <module_boundaries>Separation between config and source code, Plugins isolated from presets, separação clara entre código fonte e artefatos gerados, Separação clara entre captura de eventos, geração de scripts e UI da extensão, Módulos independentes para Chrome e Firefox, Configuração isolada e exportada para uso pelo Jest, Separação clara entre build scripts, servidor web e UI React, Dependências gerenciadas via package.json, Separação clara entre background scripts, content scripts e UI (popup), Comunicação via mensagens entre scripts, Separação clara entre background, content scripts e UI popup, Comunicação via mensagens e eventos, Utils para funções genéricas, Storage para estado persistente, Background script para controle de fluxo e eventos, Separação clara entre código da extensão e código do webapp, Comunicação via mensagens, Componentes isolados sem dependências externas além do React, Separação clara entre componentes visuais e assets estáticos, Importação relativa para recursos locais, Componentes isolados com props para comunicação, Tipos importados para garantir consistência, utils não dependem de storage, builders isolados para geração de código, storage encapsula persistência, Separação clara entre hooks, utils e tipos, Dependência unidirecional dos hooks para utils e types, Separação clara entre manipulação de armazenamento, execução de scripts e controle de abas, Separação clara entre tipos, builders e componentes, Componentes React isolados da lógica de seleção, Separação clara entre UI (components) e lógica de negócio (builders), Tipos compartilhados via pasta types, UI components separated from business logic, Builders isolated for selector and code generation, Common utilities shared across modules, Isolamento do componente Highlighter com importação explícita de estilos, Separação clara entre UI (ControlBar) e bootstrap script, Isolamento via shadow DOM para evitar poluição global, Separação clara entre captura de eventos, geração de seletores e armazenamento, Separação clara entre UI (TriggerButton) e lógica de gravação (hooks, endRecording), Hooks encapsulate stateful logic, Storage isolated in dedicated modules, Utilities abstract browser API interactions, Módulo analytics isolado, dependente apenas de utils externos, Separação clara entre componentes e estilos, Dependência unidirecional do componente Popup para estilos, Separação clara entre funções utilitárias, lógica de busca e otimização, Separação clara entre tipos, builders e utilitários, Dependência unidirecional dos builders para ActionContext e tipos, Separação clara entre tipos, funções utilitárias e integração com finder externo, Separação clara entre código TypeScript e assets estáticos via módulos declarados, Separação clara entre módulos de compatibilidade e lógica de negócio, Separação clara entre tipos de ações e utilitários, Classes específicas para cada ActionType, Separação clara entre código fonte e build, Resolução de módulos via Node.js, Separação clara entre configuração (webpack.config.js) e execução (build script), Módulo isolado para configuração, sem dependências externas, Separação clara entre configuração (config) e execução (server), Dependência unidirecional do servidor para configuração, Separação clara entre scripts de extensão e assets, Uso de aliases para módulos secretos, Separação clara entre código fonte e artefatos gerados, Separação clara entre tipos e funções utilitárias, Dependência unidirecional de tipos para funções, Builders isolados em módulo próprio, Testes separados e independentes, Mocks para isolar dependências, Separação clara entre testes e código da extensão, Uso de imports explícitos para Playwright e Jest, Separação clara entre componentes visuais e utilitários CSS, Separação clara entre tipos, componentes de UI e lógica de apresentação, Dependência unidirecional de tipos para componentes, UI components depend on types and services, Services encapsulate data access, No circular dependencies, Separação clara entre estilos base e estilos para views específicas, Separação clara entre tipos, serviços, armazenamento e geração de código, Separação clara entre tipos, store e ações, Dependência unidirecional do store para tipos, Separação clara entre tipos, configuração e backend, Dependência unidirecional do backend para tipos</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript Style Guide, Airbnb JavaScript Style Guide adaptado para TypeScript, Airbnb TypeScript Style Guide, Airbnb JavaScript Style Guide (implícito via eslint-config-react-app), Airbnb JavaScript Style Guide adapted for TypeScript, Airbnb JavaScript/TypeScript Style Guide, Airbnb JavaScript Style Guide (implícito pelo uso de Babel e Webpack), Airbnb JavaScript Style Guide (implícito), CSS padrão com comentários explicativos, CSS padrão, sem framework específico, Possível uso de Airbnb ou padrão TypeScript, TypeScript Standard Style, JSDoc para documentação</style_guide>
    <linting_rules>ESLint with React plugin, extends react-app, globals chrome readonly, .eslintrc.json, ESLint com regras para TypeScript, Regras para evitar any e garantir tipagem forte, ESLint com plugins para React, JSX accessibility, import, flowtype, .eslintrc.json com regras para ES6, browser, node, .eslintrc.json com regras para ES2021 e ambiente browser, ESLint com regras para TypeScript, sem uso explícito no código fornecido, .eslintrc.json com regras para TypeScript e JS, ESLint com regras padrão React, .eslintrc.js com regras para React e JSX, ESLint com regras padrão Airbnb, .eslintrc.json com regras para async/await, no-console warnings, ESLint com regras para React e TypeScript, .eslintrc.json com regras para TypeScript e JavaScript, .eslintrc.json com regras para React e TypeScript, TypeScript strict mode enabled, ESLint com regras para evitar any, prefer const, e evitar side effects, ESLint with TypeScript plugin, Rules enforcing no unused vars, consistent returns, and strict typing, ESLint com regras padrão para TypeScript, Proibição de any explícito, Proibição de any implícito, Regras para async/await, ESLint com regras para importação de módulos estáticos, .eslintrc.json com regras para TypeScript e compatibilidade ES6, skipLibCheck:true para ignorar checagem de libs externas, strict:true para checagem rigorosa, .eslintrc.json com regras para ES6+, .eslintrc.json com regras para ES6+, node environment, Não explicitado no código fornecido, Proibição de any sem justificativa, eslint com regras padrão para TypeScript e JavaScript, Não especificado, ESLint with TypeScript plugin, rules for no unused vars, consistent return, strict typing, Não especificado no código</linting_rules>
    <formatting>Prettier, singleQuote: true, trailingComma: es5, printWidth: 80, proseWrap: always, arrowParens: always, Prettier com configuração padrão para TypeScript, Prettier com configuração padrão, Prettier configurado via lint-staged para formatação automática, Prettier com configuração padrão para JavaScript, Prettier com configuração padrão para React, Prettier com configuração padrão para espaçamento e aspas simples, Prettier com configuração padrão para React/TypeScript, Prettier with default settings, Prettier com configuração padrão para projetos React, 2 spaces indentation, Quebra de linha em 80-100 caracteres, Prettier com configuração padrão para TypeScript e React, Não explicitado no código fornecido, Indentação consistente, uso de comentários para seções, Prettier with 2 spaces indentation, single quotes, trailing commas, Não especificado, provável uso de Prettier</formatting>
    <documentation_style>JSDoc, JSDoc para funções e classes principais, JSDoc para funções e tipos, JSDoc (implícito pelo uso de TypeScript e Babel), JSDoc para funções e módulos, Comentários inline em português, Sem uso explícito de JSDoc, Comentários inline simples, sem JSDoc explícito, JSDoc para funções e componentes, JSDoc para funções públicas, JSDoc para funções e hooks, JSDoc for functions and components, JSDoc para funções e interfaces, JSDoc para funções públicas e métodos, Comentários inline e JSDoc para funções principais, JSDoc style comments for functions and components, JSDoc para funções públicas e classes, Comentários JSDoc mínimos, JSDoc para declarações de tipos, JSDoc para classes e métodos, JSDoc para documentação inline, Comentários inline mínimos, sem padrão explícito, JSDoc para documentação de métodos e classes, Comentários inline e JSDoc básicos, Comentários inline para propriedades específicas, JSDoc para documentação de funções e componentes, JSDoc style comments for components and functions, Comentários em português explicativos, JSDoc para interfaces e propriedades</documentation_style>
    <type_checking>TypeScript optional, not explicit here, TypeScript strict mode, Strict TypeScript, TypeScript com tipagens estritas para React e APIs de navegador, Nenhum type checking explícito (JavaScript puro), JavaScript sem tipagem estática, Possível uso futuro de TypeScript, TypeScript com tipagem parcial, uso de any em gravação, PropTypes ou TypeScript (não aplicável neste arquivo), Strict TypeScript com checagem de tipos explícita, Strict TypeScript typing, Strict TypeScript com tipagem explícita para eventos e ações, Strict TypeScript com checagem completa, Strict TypeScript settings enabled, Strict TypeScript enabled, PropTypes para validação básica (não presente no código atual), Strict TypeScript (noImplicitAny, strictNullChecks), strict TypeScript com exceção para strictPropertyInitialization:false, Nenhum (JavaScript puro), TypeScript strict mode presumido, Strict TypeScript com tipagem explícita sempre que possível, Strict TypeScript mode enabled</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest, Playwright Test Runner, Jest 29.x, Jest 27.3.1, Jest para testes unitários do background e scripts, Não explícito no código, mas integração com Cypress e Playwright indica uso destes frameworks, Jest 29, React Testing Library, Não detectado no código fornecido, Jest 29 (implícito para front-end), Não especificado</test_framework>
    <test_structure>__tests__ folders or *.test.js files, tests/ unitários e integração, tests/e2e/ para testes end-to-end, tests/unit/ para testes unitários, Testes localizados em pasta __tests__ ou arquivos *.test.ts, Testes localizados em pastas padrão (não explicitado) com cobertura ativada, tests/ para testes unitários e integração, Não presente no código analisado, tests/unit/, tests/integration/, Testes localizados em __tests__ ou pasta components/__tests__, Testes localizados em __tests__ ou pasta __specs__ ao lado do componente, __tests__ folders próximos aos componentes, tests/unit para testes unitários, tests/integration para testes de integração, tests/hooks para testes unitários dos hooks, tests/unit para testes unitários das funções utilitárias, Testes localizados em __tests__ próximos aos componentes, Testes unitários para builders e componentes, __tests__ folders colocated com componentes, Test files com extensão .test.tsx, __tests__ folder ao lado do componente, Testes unitários localizados em __tests__ próximos aos módulos, Testes localizados em pasta __tests__ ao lado dos componentes, Tests colocados em pastas __tests__ próximas aos componentes, Testes unitários e de integração para hooks e componentes, Testes localizados em __tests__ ou pasta __specs__, test/unit para testes unitários, test/integration para testes de integração, Testes unitários para builders e utilitários em /tests/unit, Testes de integração para geração de scripts, Testes localizados em __tests__ ou pasta tests correlata, Testes localizados em __tests__ ou pasta tests, tests/unit para testes de classes e enums, tests/ localizados paralelamente ao código fonte, Não especificado, /coverage para relatórios de teste, tests/utils - testes unitários para funções utilitárias, Testes organizados por describe blocks por builder, Testes unitários focados em métodos individuais, Testes organizados em blocos beforeAll, afterAll e test, Testes end-to-end focados em fluxo da extensão, __tests__ folders adjacent to components, unit and integration tests, Testes localizados em __tests__ próximos ao código, tests/unit para testes de tipos e lógica, tests/integration para backend</test_structure>
    <coverage_requirements>Minimum 80% coverage, &gt;= 80%, Cobertura mínima de 80%, Cobertura de código monitorada via Jest --coverage, Não especificado, &gt;= 80% cobertura, Cobertura mínima de 80% para componentes visuais, &gt;= 80% cobertura de código, Cobertura mínima de 80% para módulos críticos, Cobertura mínima de 80% para componentes UI e hooks, Cobertura mínima de 80% para componentes críticos, Cobertura mínima de 90%, &gt;= 90% cobertura para funções críticas, Cobertura completa dos métodos públicos dos builders, Cobertura focada em funcionalidades críticas da extensão</coverage_requirements>
    <test_patterns>AAA (Arrange-Act-Assert), AAA, Given-When-Then, AAA (Arrange, Act, Assert), Given-When-Then para testes comportamentais, Não especificado, Arrange-Act-Assert (AAA), Snapshot testing para componentes visuais, Snapshot Testing, Renderização e acessibilidade, Mocking de hooks e APIs do Chrome, Mocking de APIs do navegador, Uso de mocks para isolar dependências, Behavior Driven Development (BDD) style</test_patterns>
    <mocking_approach>jest.mock for modules, jest.mock, fixtures, Mocks para APIs de navegador, Fixtures para dados de entrada, Mocks com Jest e ts-jest, Mocks para APIs do Chrome e comunicação externa, Não especificado, Mocks para chrome.runtime e window.postMessage, Mocks para dependências externas se houver, Mock de assets estáticos para testes, Mocks para callbacks e tipos, Mocks para APIs do Chrome, Fixtures para dados de gravação, Mock de localStorage e chrome.storage APIs, Mock de APIs chrome e browser usando jest-mock, Mocks para funções auxiliares e tipos, Mock de funções genCode para isolar testes UI, Mocks para APIs externas e módulos de gravação, Mocks para props e estilos, Mocks para APIs do navegador e funções globais, Mocks para eventos DOM e APIs do Chrome, Mocks para chrome.runtime.sendMessage e document.querySelector, Mocks para Chrome Extension APIs, Fixtures para gravações simuladas, Mocks para componentes filhos e estilos, Mocks para DOM APIs e querySelectorAll, Mocks para dependências externas e funções utilitárias, Mock de módulos externos e fixtures para elementos HTML, Mocking de módulos estáticos via Jest mocks, Mocks para APIs do navegador, Mocks para simular eventos e seletores, Mocks para Webpack e WebpackDevServer APIs, Mocks para Date.now() para controle de tempo em testes, Jest spyOn para interceptar chamadas internas, Mock implementations para métodos assíncronos, Uso mínimo de mocks, testes end-to-end reais com browser context, Mocks para dependências externas e componentes filhos, Mock RecordingService methods with Jest mocks, Mock de chrome.storage.local, Fixtures para gravações, Mocks para backend de persistência</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, Não especificado, Git Flow</branch_strategy>
    <commit_conventions>Conventional Commits, Não especificado</commit_conventions>
    <pr_requirements>Code review mandatory, CI checks, code review obrigatório, checks automáticos, Revisão obrigatória, Checks de CI passando, Code review obrigatório, Checks de CI, Revisão obrigatória e testes aprovados, Não especificado, Checks de lint e testes, Checks automáticos de lint e testes, Checks automáticos, Revisão obrigatória e testes automatizados aprovados, Revisão obrigatória e testes automatizados, Checks automáticos via CI, Testes passando, Revisão obrigatória por pelo menos um revisor, Build deve passar sem erros, Checks de lint e build, Testes automatizados passando, Passing CI checks</pr_requirements>
    <ci_cd_pipeline>Linting, Testing, Build, build, test, deploy, Testes unitários e E2E, Lint, Deploy para Chrome e Firefox, Execução de testes automatizados, Husky para hooks git, Lint-staged para formatação pré-commit, Build, lint, test e deploy automatizados, Não especificado, Build, Test, Lint, Deploy, Test, Deploy automático, Build, lint, test e deploy automatizados via GitHub Actions, Build, lint, test stages automatizados via GitHub Actions, Build, Test, Lint, Deploy stages, Testes, Build automatizado via CI, Deploy condicionado a build sem erros, Build, Test, Lint, Deploy Staging, Execução de testes unitários, Build e deploy automatizados, Build da extensão, Deploy automatizado, Unit tests, Deploy, Testes automatizados</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, yarn, yarn install &amp;&amp; husky install, npm install ou yarn install</setup>
    <install>npm install, yarn install</install>
    <dev>npm start, npm run dev, yarn run start-chrome, yarn run start-ff, MANIFEST_VERSION=3 node utils/webserver.js (Chrome), MANIFEST_VERSION=2 node utils/webserver.js (Firefox), yarn start, npm run start, node scripts/start.js, webpack --mode development --watch</dev>
    <test>npm test, yarn test, jest --coverage, npm run test, Não especificado, jest</test>
    <build>npm run build, yarn run build-chrome, yarn run build-ff, yarn build, node scripts/build.js, webpack --mode production</build>
    <lint>npm run lint, eslint src/ --ext .ts,.tsx, eslint ., yarn lint, Não especificado</lint>
    <format>npm run format, prettier --write src/, prettier --write ., yarn format, Não especificado</format>
  </commands>
  <security_constraints>
    <authentication_method>OAuth2 para comunicação externa (deploysentinel.com), Não aplicável diretamente no código analisado, OAuth2 via DeploySentinel Webapp, OAuth2 via Chrome Identity API, Não aplicável (gerenciamento local de estado), Nenhum método explícito, depende do contexto da extensão, Não aplicável (foco em gravação local), Não aplicável diretamente (foco em captura de eventos), OAuth2 via Chrome Extension permissions, Nenhum método explícito no código (depende do contexto do navegador), Nenhum método de autenticação implementado, Não aplicável (biblioteca client-side), Não aplicável diretamente, Nenhum método de autenticação implementado neste arquivo, Não aplicável (extensão Chrome), Não aplicável (extensão local), Não especificado no componente, Não aplicável no código analisado, Não aplicável (armazenamento local)</authentication_method>
    <authorization_rules>Permissões restritas via manifest para domínios e APIs específicas, Gravação restrita à aba e frame corretos, Verificação de tabId e frameId para ações, Validação de origem das mensagens, Permissões restritas na extensão, Permissões restritas para acesso a abas e storage, Não aplicável, Execução de scripts restrita a abas e frames autorizados, Não aplicável diretamente, Permissões restritas para comunicação entre extensão e UI, Controle implícito via permissões da extensão e contexto da aba, Nenhuma regra de autorização aplicada, Não aplicável diretamente no build, Controle de acesso via permissões da extensão Chrome, Confirmação explícita para exclusão de gravações, Não aplicável no código analisado</authorization_rules>
    <sensitive_data>Dados de interação do usuário tratados localmente, sem envio externo não autorizado, URLs e dados de navegação armazenados localmente, sem criptografia explícita, URLs de teste, Códigos de gravação, URLs das abas, dados de gravação de usuário, Nenhum dado sensível armazenado, Identificadores únicos armazenados localmente, sem dados pessoais, Password inputs são mascarados na exibição, Inputs de senha são mascarados na exibição, Campos password não devem ser registrados, Nenhum dado sensível manipulado diretamente, Dados de gravação de testes armazenados localmente, sem exposição externa, Client ID anonimamente gerado, sem dados pessoais, Não manipula dados sensíveis, isPassword flag para tratamento de dados sensíveis, Arquivo secrets.{env}.js para dados sensíveis, Arquivos .env locais, secrets.*.js, Dados do usuário armazenados localmente no userDataDir, Dados das gravações (URLs, títulos) tratados localmente, Não há manipulação explícita de dados sensíveis, Dados de gravação de ações do usuário, armazenados localmente, IDs únicos das gravações, URLs gravadas</sensitive_data>
    <security_headers>Content Security Policy configurada via manifest, Não aplicável no contexto de extensão, Content-Security-Policy para mensagens, Content-Security-Policy configurado na extensão, Não aplicável, Gerenciados pelo navegador, não aplicável diretamente, Não aplicável diretamente, Cabeçalhos padrão do Chrome Extension, Não aplicável diretamente (extensão de navegador), Access-Control-Allow-Origin: *, Não aplicável no contexto do build, Cabeçalhos padrão da extensão Chrome, Não aplicável no componente UI</security_headers>
    <encryption_requirements>Criptografia padrão do Chrome para armazenamento local, Não implementado, TLS para comunicação web, Criptografia em trânsito via HTTPS, armazenamento local não criptografado, Não aplicável, Nenhuma criptografia explícita no código, Dados armazenados localmente, recomendação de criptografia externa, Comunicação segura via mensagens internas do Chrome, Nenhuma criptografia aplicada, Não aplicável no contexto do build, Não aplicável no componente UI, Não implementado, armazenamento local não criptografado</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>Gravação em tempo real sem impacto perceptível na navegação, Não especificado, Mensagens processadas em &lt; 100ms, Renderização instantânea do componente, Renderização instantânea do logo, Persistência e envio de mensagens em menos de 500ms, Operações assíncronas rápidas para leitura e escrita em localStorage, Operações assíncronas rápidas para não bloquear UI, Atualização da UI com throttling para eventos de mouse (100ms), Eventos processados em tempo real com debounce para resize, Interação do botão deve ser instantânea (&lt;100ms), Interação UI responsiva, sem atrasos perceptíveis, Resposta em milissegundos para seletores simples, Limite configurável para tentativas, Baixa latência para geração de seletores, Baixa latência para hot reload e rebuild incremental, Não aplicável diretamente, Timeouts de 15 segundos para testes, Timeouts de 5 segundos para service workers, Carregamento rápido das gravações para boa UX, Não especificado, mas operações assíncronas indicam foco em I/O não bloqueante, Operações assíncronas com debounce para evitar latência perceptível</response_time_limits>
    <optimization_priorities>Developer experience, Fast refresh, build speed, bundle size, Baixa latência na captura de eventos, Uso eficiente de memória durante gravação, Performance do build e runtime leve para extensão de navegador, Baixo impacto em CPU e memória do navegador, Baixa latência na captura de eventos de navegação, Baixa latência na comunicação, Baixa complexidade, foco em renderização rápida, Minimizar bundle size, Carregamento rápido, Baixa latência na renderização UI, Velocidade de resposta priorizada sobre uso de memória, Baixa latência na atualização de estado, Minimizar leituras e escritas desnecessárias, Baixa latência na execução de scripts e armazenamento, Clareza e legibilidade da UI priorizadas sobre performance extrema, Renderização rápida, Baixa latência na geração de código, Responsividade da interface, Minimizar impacto de listeners, Baixa complexidade computacional, Minimizar impacto no DOM principal, Isolamento via shadow DOM para performance UI, Minimizar impacto na UI, evitar duplicação de eventos, Baixa latência e mínimo impacto na UI, Velocidade e fluidez da interface priorizadas, Baixa latência na coleta de eventos, mínimo impacto no UX, Minimizar re-renders, Evitar injeção excessiva de estilos inline, Balancear velocidade e seletor curto/legível, Equilíbrio entre legibilidade do código gerado e performance de execução, Velocidade e robustez na geração de seletores, Build time efficiency, Minimal runtime overhead, Baixa latência na captura e execução de ações, Build rápido e eficiente, Compatibilidade com browsers legados, Build otimizado para produção com minificação e tree shaking, Velocidade de feedback em desenvolvimento, Minificação com TerserPlugin, desabilitação de mangling para debugging, Minimizar latência na validação e migração de timestamps, Performance na geração de scripts para evitar latência em gravação, Confiabilidade e precisão sobre velocidade, Performance otimizada via CSS puro e transições leves, Responsividade da UI, Minimização de re-renderizações, Velocidade de renderização da tabela e filtragem, Legibilidade e fluidez na rolagem, Consistência e integridade dos dados priorizadas sobre otimização extrema, Minimizar operações de I/O no storage, Manter histórico limitado para performance, Eficiência na leitura e escrita do histórico</optimization_priorities>
    <caching_strategy>cache intermediário de build, Uso de chrome.storage.local para persistência eficiente, Uso de chrome.storage.local para persistência de estado, Não aplicável, Cache do navegador para assets estáticos, Uso de localStorage para cache temporário, Uso de estado React como cache local para dados persistidos, Uso de chrome.storage.local para persistência local, Uso de chrome.storage.local para persistência e sincronização, Nenhuma estratégia de cache implementada, Uso de armazenamento local para persistência de gravações, Nenhum cache persistente implementado, Não implementado, Uso de cache via Webpack para builds incrementais, Webpack caching padrão para builds incrementais, Cache desabilitado para popup.html para garantir atualização, Cache do browser controlado pelo Chromium, Cache local via RecordingService (não detalhado), Não especificado, Cache em memória temporário para pendências de salvamento</caching_strategy>
    <scalability_considerations>paralelização de tarefas, Suporte a gravações longas sem degradação perceptível, Suporte a múltiplas abas e sessões simultâneas, Escalabilidade limitada ao contexto de extensão de navegador, Escalabilidade limitada ao ambiente do navegador, Componente leve e reutilizável para múltiplas instâncias, Escalabilidade limitada ao contexto do browser extension, Gerenciamento eficiente de listas de ações para evitar crescimento excessivo, Escalabilidade limitada ao contexto da extensão e navegador, Componentização para facilitar extensão e manutenção, Evitar múltiplas instâncias para reduzir uso de memória, Suporte a aplicações SPA e múltiplos contextos, Escalabilidade limitada ao contexto da extensão e UI do Cypress, Escalabilidade limitada ao contexto do navegador e volume de gravações locais, Pode degradar em documentos muito grandes devido à combinatória, Escalabilidade limitada ao uso em testes UI, Extensibilidade para novos tipos de ações, Escalabilidade limitada ao ambiente local de desenvolvimento, Configuração modular para suportar múltiplos scripts e assets, Operações em arrays grandes devem ser eficientes e imutáveis, Escalabilidade limitada ao ambiente local de testes, Facilidade de extensão com novas classes utilitárias e componentes, Suporte a grandes listas via virtualização não implementada, Possível limitação ao filtrar gravações em memória para grandes volumes, Limitação de entradas para evitar crescimento descontrolado, Gerenciamento de limite máximo de entradas com estratégia de poda</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>logs padronizados, Logs estruturados para erros no background e content scripts, Erros lançados via throw, sem tratamento centralizado, Não especificado no código atual, Console.error para logging de erros, Não implementado explicitamente no código fornecido, Erros lançados como Exceptions padrão em promises, Não explícito no código analisado, Não explícito, erros tratados via controle de fluxo interno, Erros lançados via throw new Error com mensagens claras, Erros lançados como Exceptions JavaScript padrão, Tratamento silencioso, sem propagação de erros, Erros lançados via throw com mensagens claras, Lançamento de erros padrão JavaScript para tipos não suportados, Try-catch silencioso para evitar falhas, Logs detalhados no console com stack trace e detalhes, Nenhum formato de erro customizado implementado, Não especificado, Erros lançados via Exceptions padrão do JavaScript, Logs no console para erros de carregamento, exclusão e exportação, Uso de exceções padrão para erros críticos (ex: gravação vazia), Erros lançados com mensagens claras, Logs no console para diagnóstico</error_format>
    <logging_strategy>console logs, arquivos de log, Logs locais para debug durante desenvolvimento, Relatórios de erros via CI, Console logs e armazenamento local para diagnóstico, Ausente no código fornecido, Não implementado explicitamente, Logs básicos no console, sem sistema centralizado, Não implementado explicitamente no código fornecido, Não explícito no código analisado, Não implementado, possível extensão futura, Logs mínimos, foco em erros críticos, Uso mínimo de logs, foco em erros críticos, Não implementa logging interno, Não há logging explícito, Console.error para erros, console.warn para avisos, Logs padrão do Webpack e WebpackDevServer, Verbose logging na limpeza do build, Uso de console.warn para alertas de timestamps inválidos, Logs implícitos via Jest e Playwright, Console logs para eventos importantes (ex: cópia de código), Console logs com emojis para status e erros, Não especificado, Console.warn para alertas, Console.error para erros críticos</logging_strategy>
    <monitoring_tools>GitHub Actions para monitoramento de build e testes, Integração com ferramentas externas via deploysentinel.com, Não especificado, Possível integração com ferramentas externas, Nenhum monitoramento automatizado detectado, Não explícito no código analisado, Monitoramento via ferramentas da extensão Chrome, Analytics customizados para eventos de gravação, Não aplicável, Nenhuma ferramenta de monitoramento integrada, Não aplicável em ambiente de teste local, Não especificado no código</monitoring_tools>
    <error_recovery>retry automático em falhas de build, Recuperação de falhas na gravação com possibilidade de reinício, Reinício automático do service worker e re-injeção de scripts, Não implementado explicitamente, Nenhuma estratégia explícita, Tentativa de captura de erros na persistência, sem fallback explícito, Fallback para valores padrão em caso de ausência de dados, Rejeição de promises para tratamento externo, Listeners removidos corretamente para evitar leaks, Função cleanUp para desmontar e liberar recursos, Reinicialização do estado local e sincronização via storage events, Retry para seleção de elementos DOM com limite de tentativas, Fallbacks simples, como reset de estado e mensagens ao usuário, Try/catch para evitar falhas visíveis ao usuário, Fallbacks em busca de seletores alternativos, Fallback para null em caso de erro, Abortar build em caso de erro crítico, Hot Module Replacement para recuperação rápida de erros em desenvolvimento, Não especificado, Correção automática de timestamps inválidos e negativos, Rejeição de promises em timeout, encerramento limpo do browser context, Recarregamento da lista após exclusão, Fallback para estado vazio, Tratamento básico de erros (ex: URL inválida) com fallback, Tratamento de erros com fallback para evitar falhas críticas, Pruning strategy para evitar overflow do histórico</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>react-app preset, react-hot-loader, Webpack, Babel, Node.js, APIs de extensão do Chrome e Firefox, Frameworks de teste suportados, @jest/types, ts-jest, React, Jest, Playwright, Husky, Prettier, chrome.* APIs, background.bundle.js, bridge.bundle.js, APIs do Chrome, utils internos, recordingStore, chrome.runtime API, window.postMessage, React 18, react, logo.svg, ScriptType enum, Chrome Extensions API, RecordingService, genCode, localStorageGet/Set, chrome.storage API, chrome API, browser API para compatibilidade, Playwright selectors, Type definitions, react-syntax-highlighter, genCode function, Recorder, Selector builders, Chrome Storage API, Highlighter.css, ReactDOM, FontAwesome, Shadow DOM API, lodash.debounce, chrome.storage.local, chrome.runtime, Chrome Extension Messaging API, Chrome Extension APIs, react-copy-to-clipboard, getRandomInstallId, Google Analytics API, react-dom, @fortawesome/fontawesome-svg-core, DOM API do navegador, @playwright/test, puppeteer, cypress, finder module, types definitions, TypeScript compiler, Module bundler (Webpack, Vite), TypeScript, Puppeteer, Cypress, webpack, webpack.config.js, process.env (Node.js), webpack-dev-server, path, env, clean-webpack-plugin, copy-webpack-plugin, html-webpack-plugin, terser-webpack-plugin, node_modules, secrets.*.js, Type definitions from &apos;../types&apos;, playwright, jest, TanStack Table, Roboto font, Classes CSS aplicadas no body, types (RecordingEntry, Action, ScriptType), Types definidos em ../types/recording, ./index (Action type)</critical_dependencies>
    <deprecated_packages>Nenhum identificado, Manifest v2 APIs em processo de migração</deprecated_packages>
    <version_constraints>Compatibilidade com versões recentes do Chrome e Firefox, Compatibilidade entre Jest 29.x e ts-jest, React 17.x, TypeScript 4.1.x, Webpack 5.x, Jest 27.x, Manifest Version 2 (deprecado em breve), Manifest V3 obrigatório para compatibilidade, Não especificado, Compatibilidade com Chrome 90+, React &gt;=18.0.0, React 18.x, TypeScript 5.x, TypeScript &gt;=5.0, Chrome API compatível com Manifest V3, Compatibilidade com manifest v2 e v3, TypeScript &gt;=4.0, TypeScript &gt;=4.9, TypeScript 4.x, lodash.debounce versão compatível com ES modules, Compatível com navegadores modernos suportando querySelectorAll, TypeScript versão compatível com ES6+, target ES5, module ESNext, webpack &gt;=5.0.0, Compatibilidade com Webpack 5 e Node.js 16+, TypeScript &gt;= 4.9, playwright &gt;=1.20.0, jest &gt;=29.0.0, TanStack Table 8.x, TypeScript 4.x compatível</version_constraints>
    <internal_packages>Módulos internos para gravação e geração de scripts, ../Common/utils, ../storage/recording-store, Módulos internos da extensão DeploySentinel, ../../pages/Popup/logo.svg, ../types (ScriptType), ./utils, ../builders, ../storage, ../types, ../types/config, Módulos utilitários internos para armazenamento e execução, ../builders/selector, ./recorder, ./Highlighter, ./ActionList, ./CodeGen, Highlighter.css (estilos locais), ./ControlBar, ../Common/styles.css, ../Common/Icon, ../Common/hooks, ../Common/endRecording, Common, Content, Storage, Types, ./Popup, ./selector, ./finder, config/webpack.config.js, ./env, ../webpack.config, ./utils/env, secrets.{env}.js, ../src/pages/builders, ../../types, ../../Content, ../../types/recording, ../../storage/recording-service, ./recording-store, ../types/recording, index.ts para definição de Action</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>scripts de build pouco modularizados, Suporte limitado para captura de upload de arquivos, Atualização para Manifest V3 necessária para compatibilidade futura, Aprimorar suporte a múltiplos frameworks simultaneamente, Uso de any em tipagem, Ausência de tratamento robusto de erros, Falta de tratamento de erros robusto, Tratamento de erros e logging insuficientes, Ausência de tratamento de erros nas operações assíncronas, Migração completa para manifest v3, Tratamento de erros mais robusto, Gerenciamento complexo de estado pode crescer com novas features, Ausência de memoização para evitar re-renderizações desnecessárias, Melhorar tratamento de erros e fallback para browsers sem exportFunction, Melhorar tipagem any, otimizar armazenamento local, Correção de bug de múltipla montagem no Firefox, Gerenciamento complexo de estado entre múltiplas abas e gravações, Ausência de logging e feedback de erro, Ausência de tratamento de erros na renderização, Otimização limitada para seletores muito complexos, Implementação incompleta do dragAndDrop no Cypress, Tratamento silencioso de erros pode dificultar debugging, TODO para mover função utilitária para utils, Configuração hardcoded para localhost e porta fixa, Configuração extensa pode dificultar manutenção, Uso incorreto de &apos;number.isFinite&apos; ao invés de &apos;Number.isFinite&apos;, Melhorar tratamento de erros em waitForServiceWorkers, Ausência de virtualização para tabelas grandes, Tratamento básico de erros, Ausência de responsividade para dispositivos móveis, Ausência de controle concorrente na geração de IDs, Falta de tratamento detalhado de erros, Uso de &apos;object.entries&apos; e &apos;object.fromEntries&apos; com &apos;object&apos; minúsculo pode causar erros</technical_debt>
    <known_issues>Potential incompatibility of react-hot-loader with React 18+, Limitações na captura de eventos hover em alguns contextos, Limitações na captura de eventos em iframes, Possível condição de corrida na atualização do estado, Menus contextuais podem ficar desincronizados, Dependência exclusiva do Chrome, Dependência da API do Chrome pode causar falhas em permissões, Possível inconsistência em sincronização multi-aba sem lock, Possível falha silenciosa em execução de scripts sem catch, Dependência de APIs específicas do navegador pode limitar portabilidade, Dependência de estilos externos pode causar falhas visuais, Possível incompatibilidade com browsers não suportados, Tipagem TypeScript ignorada em shadowRoot, Possível perda de eventos em alta frequência, Sincronização assíncrona pode causar inconsistências momentâneas, Possível falha na localização de elementos DOM em ambientes customizados, Dependência de APIs do navegador que podem variar entre versões, Modo no-cors limita detecção de falhas na requisição, Possível impacto de performance por estilos inline, Performance pode cair em documentos com muitos elementos similares, Exposição do objeto action diretamente em ActionContext (comentário FIXME), Seletores podem não ser únicos em apps com ids não confiáveis, Diferenças entre APIs Chrome e Firefox podem causar incompatibilidades, Desabilitação de host check pode causar riscos de segurança, Possível vazamento de secrets se não gerenciado corretamente, Dependência do relógio do sistema pode causar inconsistências, Timeouts eventuais na ativação dos service workers, Possível lentidão com grandes volumes de dados, Possível lentidão em buscas com grande volume de gravações, Possível erro de digitação em chamadas a Object.entries e Object.fromEntries</known_issues>
    <performance_bottlenecks>build lento em grandes projetos, Uso intensivo de CPU em gravações longas, Nenhum crítico identificado, Nenhum identificado, Nenhum gargalo crítico identificado, Crescimento potencial da lista de ações armazenadas, Latência na comunicação com APIs do navegador, Eventos de mouse frequentes mitigados por throttling, Eventos de input e wheel podem gerar alta carga, Polling para retrySelector pode impactar performance se maxRetries alto, Renderização de listas grandes de ações pode impactar UI, Injeção de múltiplos estilos inline pode afetar renderização, Geração combinatória de seletores e múltiplas validações querySelectorAll, Geração de seletores em DOMs muito grandes pode ser lenta, Nenhum gargalo crítico identificado em ambiente local, Minificação desabilita mangling para facilitar debugging, impactando tamanho final, Espera ativa com setInterval pode ser otimizada, Filtragem e renderização client-side sem otimizações, Listagem e filtragem em memória sem paginação, Operações síncronas no storage podem impactar performance sem debounce</performance_bottlenecks>
    <migration_status>Completo para Manifest V3, sem migrações pendentes, Não aplicável, Nenhuma migração em andamento, Compatível com Manifest V3, sem migrações pendentes, Suporte híbrido entre manifest v2 e v3 implementado, Nenhuma migração em andamento detectada, Migração de dados antigos para novo formato de gravação implementada, Estável, sem migrações em andamento, Não especificado, Função migrateActionsTimestamp implementada e em uso, Migração da última gravação implementada e acionável</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Preserve hot reload functionality, Code style consistency, performance, manutenibilidade, Clareza e legibilidade do código, Cobertura de testes, Manutenção da tipagem forte, Conformidade com padrões de código, Segurança no uso de permissões, Clareza na separação de responsabilidades entre scripts, Segurança das permissões, Qualidade dos scripts gerados, Consistência de estado, Validação de IDs de abas e frames, Manutenção da sincronização entre UI e estado, Segurança na validação de origem, Clareza na comunicação entre módulos, Consistência visual, Performance de renderização, Simplicidade do componente, Performance, Acessibilidade, Consistência de tipagem, Clareza na comunicação via props, Estilo e formatação, Manutenção da integridade dos dados e tratamento de erros, Consistência de estado, uso correto de hooks, tipagem segura, Tratamento de erros, Compatibilidade entre APIs, Clareza na renderização condicional, Uso correto de tipos, Manutenção da ordem das ações, Consistência com padrões, Clareza na separação de responsabilidades, Uso correto de hooks, Performance e acessibilidade, Clareza na tipagem, Ausência de efeitos colaterais, Verificação de uso correto do cleanUp, Garantia de não múltiplas instâncias, Evitar side effects, Consistência de hooks, tratamento de estado e mensagens Chrome, Consistência de estado, tratamento de erros, performance UI, Tratamento de erros silencioso, Uso correto de async/await, Manutenção da anonimidade, Consistência de estilos, Uso correto de HMR, Clareza na renderização do componente, Clareza na lógica de busca, Consistência de estilo, Clareza das abstrações, Robustez na geração de seletores, Importação correta de assets, Compatibilidade cross-browser, Clareza e simplicidade do código, Consistência de tipos, Clareza na modelagem de ações, Conformidade com padrões TS e React, Verificação de erros de build e warnings, Conformidade com padrão de código, Verificação de configuração correta do HMR e variáveis de ambiente, Configuração correta de aliases e loaders, Segurança no uso de secrets, Validação de tipos e imutabilidade, Cobertura de testes para casos de timestamp, Uso correto de mocks, Clareza nos testes, Cobertura de fluxo crítico, Manutenção da legibilidade, Feedback visual para interações, Clareza na manipulação de estado, Aderência a padrões React, Uso correto de classes condicionais, Validação de entradas, Consistência na geração de IDs, Consistência do singleton, Performance de debounce, Clareza na documentação</code_review_focus>
    <documentation_requirements>Document config changes, documentar scripts de build, Documentação clara para APIs internas e uso da extensão, Documentação clara para configurações e testes, Documentação clara para APIs internas da extensão e uso dos scripts, Comentários explicativos em português, Documentação futura para APIs internas, Documentação clara para APIs de mensagem, Documentação mínima para componentes simples, Documentação clara de props e comportamento, JSDoc para componentes e funções, Documentação clara para funções públicas e serviços, Documentação clara de hooks e efeitos colaterais, Documentação clara em JSDoc para funções públicas, Documentar novos tipos de ações e componentes, Documentação clara para funções públicas e componentes, Documentação clara para componentes e funções complexas, Documentar funções globais e integração com Firefox, Documentar funções públicas e fluxos complexos, Documentação clara para hooks e componentes React, Documentação clara para hooks e componentes principais, Comentários simples e claros, Documentar componentes React com JSDoc, Documentação clara para funções públicas e opções de configuração, Documentação clara para métodos públicos e classes, Documentar critérios de seleção de atributos, Documentação clara para tipos e módulos, Documentar alias e limitações de compatibilidade, Documentar classes e enums com JSDoc, Documentação inline com JSDoc, Documentação mínima para scripts de build, Documentação clara para configuração do ambiente de desenvolvimento, Documentação mínima inline, foco em configuração clara, Uso consistente de JSDoc para funções públicas, Documentação clara para métodos públicos dos builders, Documentação mínima inline, foco em testes, Documentação JSDoc para componentes e funções, Comentários JSDoc para componentes e funções, Comentários claros em português, Uso consistente de JSDoc para métodos públicos, JSDoc para métodos públicos, JSDoc para interfaces e métodos públicos</documentation_requirements>
    <communication_style>Clear and concise comments, comentários claros e objetivos, Comentários objetivos e explicativos, Uso de PRs para discussão, Comentários objetivos e informativos, Comentários objetivos e técnicos, uso de inglês para termos técnicos, Comentários objetivos e técnicos, Comentários claros e objetivos, uso de português para contexto, Comentários objetivos e claros, Comentários objetivos e em português, Comentários objetivos e técnicos, uso de português para contexto, PRs com descrição detalhada, Comentários objetivos e explicativos em português, Comentários objetivos e uso de inglês técnico para termos específicos, Comentários objetivos e explicativos, uso de português para contexto, Comentários explicativos em inglês e português, Uso de FIXME para pontos a melhorar, Comentários claros e objetivos, Comentários sucintos e objetivos, Comentários claros e objetivos em português, Uso de inglês para termos técnicos, Uso de emojis para logs de debug, Uso de emojis em logs para facilitar leitura</communication_style>
    <decision_log>Opted for react-app preset for simplicity, Enabled react-hot-loader for dev experience, Escolha por TypeScript para segurança de tipos, Suporte multiplataforma (Chrome e Firefox), Adoção do ts-jest para testes TypeScript, Manter Manifest Version 2 até migração completa para V3, Adoção do Manifest V3 para maior segurança e performance, Uso de armazenamento local para estado compartilhado, Separação clara entre utilitários e lógica de gravação, Uso de mensagens para integração entre webapp e extensão, Uso de SVG para ícones para garantir escalabilidade, Uso de componentes funcionais para UI, Importação estática de assets, Uso de enum para tipos de script, Componente controlado para melhor integração, Uso de Playwright para geração de scripts automatizados, Uso de hooks para encapsular lógica de estado e persistência, Uso do Adapter Pattern para compatibilidade entre APIs, Uso de seletores Playwright para maior precisão, Filtragem de ações suportadas para evitar erros, Separação clara entre geração e apresentação de código, Uso de react-syntax-highlighter para UI, Uso de enums para tipos de ação e modos, Throttling para otimização de eventos, Uso de componente funcional para simplicidade e performance, Uso de shadow DOM para isolamento, Exposição global para controle externo, Uso de debounce para resize, Filtragem de eventos irrelevantes para performance, Uso de Shadow DOM para encapsulamento do botão na UI, Uso de React hooks para estado, separação clara entre UI e lógica, Uso do Google Analytics para coleta de eventos, Identificador anônimo para client ID, Adoção de HMR para acelerar desenvolvimento, Uso de penalidades para ordenar seletores, Fallbacks para garantir unicidade, Uso de classes abstratas para definir contratos de geração de scripts, Separação por framework via subclasses, Evitar uso de id quando inválido, Priorizar testIdSelector para testes, Uso de declarações de módulos para assets estáticos, Uso de alias para compatibilidade entre Chrome e Firefox, Uso de enums para garantir valores válidos, Separação clara entre tipos de ações, Uso de strict mode para evitar erros em produção, Remoção de chromeExtensionBoilerplate para evitar conflito em builds de produção, Uso de HotModuleReplacementPlugin para acelerar desenvolvimento, Uso de TerserPlugin sem mangling para facilitar debugging em produção, Separação entre migração e validação de timestamps para clareza e manutenção, Adoção do Builder Pattern para geração de scripts, Separação clara entre frameworks de automação, Uso de Playwright para testes end-to-end da extensão, Uso de React Functional Components com hooks, Suporte a múltiplas bibliotecas de automação via enum, Uso de TanStack Table para flexibilidade e performance, Uso de largura fixa para controle de layout em views específicas, Uso de facade para simplificar acesso ao storage, Geração de código para múltiplos frameworks, Uso do padrão Singleton para gerenciamento centralizado, Uso de interface para backend para permitir múltiplas implementações</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST para comunicação externa, Event-driven via Chrome extension messaging, Message Passing API via postMessage e chrome.runtime, Chrome Extensions Messaging API, Não aplicável (uso de APIs de armazenamento do navegador), Chrome Extensions API, WebExtensions API, Não aplicável (UI local), Não aplicável (módulo interno de captura), Chrome Extension Messaging API, Nenhuma API REST ou similar exposta diretamente, HTTP POST via fetch para Google Analytics Measurement Protocol, Função exportada como default, API funcional simples, Não aplicável (módulo utilitário), WebExtension API, Nenhuma API exposta diretamente, Não aplicável, Chrome Extension API, Playwright API, Não aplicável - componente UI, API interna baseada em métodos estáticos, não exposta via HTTP, Não aplicável (API local chrome.storage)</api_style>
    <versioning_strategy>Versionamento semântico para APIs externas, Não aplicável, Sem versionamento explícito, Sem versionamento explícito para mensagens, Compatibilidade com manifest v2 e v3, Sem versionamento interno, gerenciado via npm, Manifest version via variável de ambiente MANIFEST_VERSION, Sem versionamento explícito no código de teste, Não especificado</versioning_strategy>
    <response_formats>JSON, Objetos JSON simples para mensagens e armazenamento, Objetos JSON simples com propriedades source, type, code, actions, Objetos JSON simples, Não aplicável, Promises e callbacks padrão do Chrome API, Mensagens simples sem payload complexo, String contendo seletor CSS válido, Objetos JSON com seletores e texto, Promises JavaScript, JSON para exportação de gravações, Promises com tipos definidos</response_formats>
    <rate_limiting>Limites impostos pelo serviço externo deploysentinel.com, Não implementado, Não aplicável, Não especificado, Nenhuma limitação explícita implementada, Debounce para limitar frequência de escrita</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, production, dev, staging, prod, Development, Production, Localhost (http://localhost/*), DeploySentinel (https://*.deploysentinel.com/*), Development (localhost), Production (Chrome Web Store), Desenvolvimento local, Produção via Chrome Web Store, localhost, deploysentinel.com, *.deploysentinel.com, Produção em navegador Chrome, Dev, Staging, Production via Chrome Extension, Ambiente browser, qualquer DOM compatível, development (localhost:PORT), Local development, Test environment, Staging, Não especificado, Produção em extensão Chrome</environments>
    <deployment_method>Static hosting, CI/CD pipelines, Docker, Kubernetes, Chrome Web Store, Firefox Add-ons Marketplace, Chrome Web Store Extension, Publicação via Chrome Web Store, Chrome Extension package, CI/CD pipeline, Manual sideload, Distribuição via Chrome Web Store, Docker (provável), CI/CD pipelines, Browser extension injection, Chrome Web Store, manual sideload, Chrome Extension via Web Store, Chrome Extension packaging and publishing, Webpack Dev Server com HMR, Distribuído via npm como biblioteca JavaScript, Docker, CI/CD pipelines, WebExtension packaging, CI/CD pipeline com deploy automatizado, Local Node.js server, Build via Webpack para extensão Chrome, Extensão Chrome carregada localmente, Playwright executando Chromium headful, Containerized React app (Docker) or static hosting, Não especificado</deployment_method>
    <environment_variables>MANIFEST_VERSION, URLs autorizadas para comunicação externa, Não aplicável, Nenhuma explícita, CHROME_EXTENSION_ID, API_KEYS (externos), Não aplicável para este módulo específico, Não aplicável diretamente, Não explícito no código analisado, Nenhuma variável sensível exposta no código, Nenhum variável sensível exposta no código, Nenhuma variável sensível diretamente usada, BABEL_ENV, NODE_ENV, ASSET_PATH, PORT, BABEL_ENV=development, NODE_ENV=development, ASSET_PATH=/, PORT (definido em ./env), npm_package_version, .env.local, .env.development.local, .env.test.local, .env.production.local, Não especificados no componente, Não especificado</environment_variables>
    <infrastructure_constraints>Limitações das APIs de extensão dos navegadores, Necessidade de builds separados para Chrome e Firefox, Limitação a Manifest Version 2, Permissões restritas pelo navegador, Limitações do Manifest V3 e APIs do Chrome, Limitação ao ambiente de navegador Chrome, Dependência da API Chrome Extensions, Execução limitada ao ambiente do navegador Chrome, Limitações do ambiente de extensão Chrome, sem backend dedicado, Dependência do ambiente de navegador com suporte a chrome.storage, Limitações do ambiente de extensão do navegador, Dependência de APIs do navegador para armazenamento e eventos, Dependência de APIs específicas do navegador, Limitação a ambientes que suportem shadow DOM, Limitações do ambiente Chrome Extension, armazenamento local limitado, Limitações do ambiente de extensão Chrome e compatibilidade com browsers, Limitações do ambiente de extensão do navegador, APIs restritas, Dependência de ambiente DOM e suporte a querySelectorAll, Execução em ambiente Node.js compatível, Limitações das APIs suportadas por cada navegador, Necessita Node.js ambiente local, porta disponível para servidor, Compatibilidade com Chrome Extension Manifest v3, Necessidade de ambiente com Chromium instalado, Permissões para carregar extensões locais, Requer conexão para acesso ao RecordingService, Não especificado, Limitação de armazenamento local do navegador</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/pages/Common/ScriptTypeSelect.tsx</path>
        <name>ScriptTypeSelect.tsx</name>
        <summary>Este componente React funcional, ScriptTypeSelect, oferece uma interface de seleção para diferentes tipos de scripts automatizados, especificamente Playwright, Puppeteer e Cypress, que são bibliotecas populares para automação de testes end-to-end. Seu comportamento central consiste em renderizar um elemento &lt;select&gt; estilizado que reflete o valor atual selecionado e dispara uma callback onChange ao alterar a seleção, permitindo a comunicação do estado selecionado para componentes pais. O componente é configurável via props para personalização visual (cor, tamanho da fonte) e exibição de descrições curtas, facilitando sua integração em interfaces de usuário que demandam seleção clara e controlada de tipos de script. Não mantém estado interno, funcionando como um componente controlado, e depende do tipo ScriptType importado para garantir a tipagem correta dos valores selecionados. Essa abordagem modular e declarativa habilita reutilização e consistência na escolha de tipos de script em aplicações que envolvem automação de testes, promovendo clareza e controle no fluxo de dados entre componentes.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Automated Script Selector, Interface para seleção de tipos de script de automação</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, Test Automation, End-to-End Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Seleção válida de ScriptType deve ser garantida, Callback onChange deve ser chamada com valor correto</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm, yarn</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Controlled Component Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/components - componentes UI reutilizáveis, src/types - definições de tipos e enums</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes e tipos, camelCase para props e variáveis</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Componentes isolados com props para comunicação, Tipos importados para garantir consistência</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
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
            <values>__tests__ folders próximos aos componentes</values>
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
            <values>Mocks para callbacks e tipos</values>
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
            <values>Code review obrigatório, Checks automáticos</values>
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
            <values>Baixa latência na renderização UI</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, ScriptType enum</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TypeScript 5.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types (ScriptType)</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipagem, Clareza na comunicação via props, Estilo e formatação</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para componentes e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de enum para tipos de script, Componente controlado para melhor integração</values>
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
        <path>src/pages/Common/endRecording.ts</path>
        <name>endRecording.ts</name>
        <summary>Este arquivo implementa a função assíncrona endRecording, responsável por finalizar uma sessão de gravação de ações do usuário em um ambiente de browser extension. O código recupera dados armazenados localmente relacionados à gravação atual, verifica se há ações registradas e, em caso afirmativo, persiste essa gravação no histórico utilizando um serviço dedicado. Além disso, obtém a URL da aba ativa para contextualizar a gravação, limpa o armazenamento local para preparar futuras gravações e gera um script Playwright a partir das ações capturadas, enviando-o para uma aba específica da aplicação web. O comportamento central foca na orquestração do fluxo de dados entre armazenamento local, serviços de persistência e comunicação interprocessos, garantindo a integridade e continuidade do processo de gravação e reprodução de ações automatizadas.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Browser Automation Recorder</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Browser Extension, Automation, Testing, Playwright</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Persistência correta das gravações, Integridade dos dados de ações, Comunicação confiável entre abas</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
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
            <values>Service Layer, Modular Architecture</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>utils - funções utilitárias, builders - geração de código, storage - serviços de persistência, types - definições de tipos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para classes e tipos, snake_case evitado</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>utils não dependem de storage, builders isolados para geração de código, storage encapsula persistência</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>.eslintrc.json com regras para async/await, no-console warnings</values>
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
            <values>tests/unit para testes unitários, tests/integration para testes de integração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80% cobertura</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para APIs do Chrome, Fixtures para dados de gravação</values>
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
            <subProperty>authentication_method</subProperty>
            <values>OAuth2 via Chrome Identity API</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Permissões restritas para acesso a abas e storage</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>URLs das abas, dados de gravação de usuário</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Content-Security-Policy configurado na extensão</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Criptografia em trânsito via HTTPS, armazenamento local não criptografado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Persistência e envio de mensagens em menos de 500ms</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de resposta priorizada sobre uso de memória</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de localStorage para cache temporário</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto do browser extension</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Console.error para logging de erros</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs básicos no console, sem sistema centralizado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Nenhum monitoramento automatizado detectado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tentativa de captura de erros na persistência, sem fallback explícito</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Chrome Extensions API, RecordingService, genCode</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=5.0, Chrome API compatível com Manifest V3</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./utils, ../builders, ../storage, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento de erros e logging insuficientes</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência da API do Chrome pode causar falhas em permissões</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum gargalo crítico identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Compatível com Manifest V3, sem migrações pendentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Manutenção da integridade dos dados e tratamento de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para funções públicas e serviços</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Playwright para geração de scripts automatizados</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Chrome Extensions Messaging API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito para mensagens</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Objetos JSON simples</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Development, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Chrome Web Store, Manual sideload</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>CHROME_EXTENSION_ID, API_KEYS (externos)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações do ambiente de extensão Chrome, sem backend dedicado</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Common/hooks.ts</path>
        <name>hooks.ts</name>
        <summary>Este arquivo contém hooks React customizados que gerenciam preferências do usuário e estado de gravação, utilizando localStorage e chrome.storage para persistência e sincronização. As funções principais são hooks que mantêm estados reativos para a biblioteca preferida, posição da barra, estado de gravação e configurações de timing, garantindo que as preferências sejam carregadas ao iniciar e atualizadas tanto localmente quanto em armazenamento persistente. O código integra-se com APIs de armazenamento do navegador e utiliza padrões de hooks para encapsular lógica de estado e efeitos colaterais, habilitando uma experiência de usuário consistente e sincronizada em múltiplas sessões e abas. A abordagem modular e o uso de tipos TypeScript promovem segurança e clareza na manipulação dos dados e configurações.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>React User Preferences and Recording State Management</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Application, User Preferences, State Synchronization, Browser Extensions</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Persistência correta das preferências do usuário, Sincronização consistente do estado de gravação entre abas, Integridade dos dados armazenados</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>localStorage (browser), chrome.storage (browser extension API)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Extension APIs</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Custom React Hooks, Observer Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/hooks - custom hooks, src/utils - utilitários para armazenamento, src/types - definições de tipos TypeScript</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e componentes, prefixo use para hooks</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre hooks, utils e tipos, Dependência unidirecional dos hooks para utils e types</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e hooks</values>
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
            <values>tests/hooks para testes unitários dos hooks</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de localStorage e chrome.storage APIs</values>
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
            <values>Não aplicável (gerenciamento local de estado)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível armazenado</values>
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
            <values>Operações assíncronas rápidas para leitura e escrita em localStorage</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na atualização de estado, Minimizar leituras e escritas desnecessárias</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de estado React como cache local para dados persistidos</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Gerenciamento eficiente de listas de ações para evitar crescimento excessivo</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não implementado explicitamente no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado explicitamente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallback para valores padrão em caso de ausência de dados</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>localStorageGet/Set, chrome.storage API, React</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TypeScript 5.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./utils, ../types, ../types/config</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de tratamento de erros nas operações assíncronas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível inconsistência em sincronização multi-aba sem lock</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Crescimento potencial da lista de ações armazenadas</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estado, uso correto de hooks, tipagem segura</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara de hooks e efeitos colaterais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, uso de português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de hooks para encapsular lógica de estado e persistência</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (uso de APIs de armazenamento do navegador)</values>
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
            <values>development, staging, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipelines</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável para este módulo específico</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência do ambiente de navegador com suporte a chrome.storage</values>
          </property>
        </properties>
      </file>
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
        <path>src/pages/Content/ActionList.tsx</path>
        <name>ActionList.tsx</name>
        <summary>Este arquivo React implementa um componente funcional que exibe uma lista de ações automatizadas de interação com a interface de usuário, como cliques, hovers, inputs, redimensionamentos e outras operações típicas de testes end-to-end. O componente ActionList filtra e renderiza sequencialmente ações suportadas, enquanto o ActionListItem traduz cada ação em uma descrição textual detalhada, utilizando seletores otimizados para Playwright quando necessário. O código foca em apresentar de forma clara e legível o passo a passo das ações, facilitando a compreensão e revisão de scripts automatizados, integrando-se a um sistema maior de geração e execução de scripts de teste ou automação de UI. A abordagem modular e o uso de tipos garantem robustez e extensibilidade para suportar múltiplos tipos de ações e cenários de interação.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>UI Automation Script Renderer</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Test Automation, End-to-End Testing, Playwright</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Ações devem ser exibidas na ordem correta, Somente ações suportadas devem ser renderizadas, Seletores devem ser precisos para garantir identificação correta dos elementos</values>
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
            <subProperty>external_services</subProperty>
            <values>Playwright (via ScriptType integration)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Declarative UI</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>types/ - definições de tipos e enums, builders/ - funções auxiliares para construção de seletores, components/ - componentes React reutilizáveis, styles/ - arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes React, camelCase para funções e variáveis, UPPER_SNAKE_CASE para enums e constantes</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, builders e componentes, Componentes React isolados da lógica de seleção</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
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
            <values>Testes localizados em __tests__ próximos aos componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para funções auxiliares e tipos</values>
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
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Password inputs são mascarados na exibição</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Clareza e legibilidade da UI priorizadas sobre performance extrema</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, Playwright selectors, Type definitions</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types, ../builders/selector</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na renderização condicional, Uso correto de tipos, Manutenção da ordem das ações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar novos tipos de ações e componentes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de seletores Playwright para maior precisão, Filtragem de ações suportadas para evitar erros</values>
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
        <path>src/pages/Content/ControlBar.tsx</path>
        <name>ControlBar.tsx</name>
        <summary>Este arquivo React implementa um componente ControlBar que atua como uma interface de gravação e visualização de ações do usuário em uma aplicação web, focado em automação de testes. Ele captura eventos de interação do usuário, como cliques, inputs, navegação e screenshots, armazenando-os como ações estruturadas que podem ser exibidas em formato de código ou lista de ações. O componente gerencia estados complexos para controlar o fluxo da gravação, exibição de ações, seleção de bibliotecas de teste (ex: Playwright, Cypress) e posicionamento da barra de controle, além de integrar-se com módulos auxiliares para geração de seletores e código automatizado. A interface também oferece feedback visual, como destaque de elementos DOM e confirmações de cópia e captura de tela, garantindo uma experiência interativa e responsiva para o usuário final. A arquitetura modular e o uso de hooks customizados facilitam a manutenção e extensão do componente dentro de um sistema maior de gravação e geração de scripts de teste automatizados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>UI Test Recorder, Automated Test Script Generator</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automated Testing, Web Automation, Quality Assurance</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production, Stable Release</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Accurate capture of user actions, Secure handling of sensitive inputs, Reliable code generation for multiple test frameworks</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Storage API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Observer Pattern, Hook-based State Management</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>/components - UI components, /builders - selector and code generation logic, /Common - shared hooks and utilities, /types - TypeScript type definitions</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase for components, camelCase for functions and variables, UPPER_SNAKE_CASE for enums</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>UI components separated from business logic, Builders isolated for selector and code generation, Common utilities shared across modules</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint with React plugin, TypeScript strict mode enabled</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier with default settings</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc for functions and components</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript typing</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folders colocated com componentes, Test files com extensão .test.tsx</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80% cobertura de código</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para APIs externas e módulos de gravação</values>
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
            <values>Build, Lint, Test, Deploy automático</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values>Não aplicável (foco em gravação local)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Inputs de senha são mascarados na exibição</values>
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
            <values>Atualização da UI com throttling para eventos de mouse (100ms)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Responsividade da interface, Minimizar impacto de listeners</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Componentização para facilitar extensão e manutenção</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não explícito no código analisado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não explícito no código analisado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não explícito no código analisado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Listeners removidos corretamente para evitar leaks</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Recorder, Selector builders, React, Chrome Storage API</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TypeScript 5.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./recorder, ./Highlighter, ./ActionList, ./CodeGen, ../builders</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Gerenciamento complexo de estado pode crescer com novas features</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência de APIs específicas do navegador pode limitar portabilidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Eventos de mouse frequentes mitigados por throttling</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento detectada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na separação de responsabilidades, Uso correto de hooks, Performance e acessibilidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para componentes e funções complexas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de enums para tipos de ação e modos, Throttling para otimização de eventos</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (UI local)</values>
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
            <values>Development, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker (provável), CI/CD pipelines</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não explícito no código analisado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência de APIs do navegador para armazenamento e eventos</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Content/Highlighter.tsx</path>
        <name>Highlighter.tsx</name>
        <summary>Este arquivo React implementa um componente funcional chamado Highlighter, cuja finalidade principal é destacar visualmente uma área retangular na interface do usuário, utilizando as dimensões e posição fornecidas via props do tipo DOMRect. O componente também exibe um rótulo textual associado ao seletor CSS que está sendo destacado, posicionando-o logo abaixo da área destacada. O comportamento central consiste em renderizar dois elementos div com estilos inline baseados nas propriedades do retângulo, além de injetar estilos CSS importados para garantir a aparência correta do destaque. Não há manipulação de estado interno nem efeitos colaterais complexos, o que torna o componente previsível e fácil de integrar em sistemas maiores que necessitem de visualização dinâmica de seletores ou áreas específicas na tela. A integração com o sistema maior ocorre via props, permitindo que o componente seja reutilizado em diferentes contextos onde seja necessário evidenciar visualmente elementos DOM. Essa capacidade habilita usuários e desenvolvedores a identificar rapidamente áreas de interesse na interface, facilitando depuração, inspeção visual ou interações baseadas em seletores CSS.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Highlighter Component, Visualização e destaque de seletores CSS em UI React</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Frontend Development, UI Debugging, CSS Selector Highlighting</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Precisão no posicionamento do destaque, Renderização consistente do rótulo, Não interferir na interação do usuário</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm, yarn</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Functional Components</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/components/Highlighter - componente visual e estilização associada</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes, camelCase para props e variáveis, kebab-case para IDs CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Isolamento do componente Highlighter com importação explícita de estilos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
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
            <values>Jest 29, React Testing Library</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folder ao lado do componente</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para props e estilos</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values>Renderização rápida, Baixa complexidade computacional</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, Highlighter.css</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0.0, TypeScript &gt;=4.9</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Highlighter.css (estilos locais)</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de memoização para evitar re-renderizações desnecessárias</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência de estilos externos pode causar falhas visuais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na tipagem, Consistência visual, Ausência de efeitos colaterais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara de props e comportamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de componente funcional para simplicidade e performance</values>
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
        <path>src/pages/Content/index.tsx</path>
        <name>index.tsx</name>
        <summary>Este arquivo implementa um componente React que injeta uma interface de controle (ControlBar) em um shadow DOM anexado dinamicamente ao body do documento, garantindo isolamento visual e funcional. Ele gerencia o estado global via propriedades no objeto window para evitar múltiplas instâncias e expõe uma função de limpeza (cleanUp) para desmontar o componente e liberar recursos, com suporte específico para Firefox via exportFunction. O código integra estilos CSS externos e manipula diretamente o DOM para criar um ambiente encapsulado, facilitando testes e controle de ciclo de vida do componente, além de garantir interoperabilidade entre contextos de execução do navegador.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>DeploySentinel, Interface de controle para monitoramento e testes</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web UI Testing, Browser Extensions, Shadow DOM</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir única instância ativa do script, Permitir limpeza completa do componente para evitar vazamentos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x, ReactDOM</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Singleton, Component-based UI, Shadow DOM encapsulation</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>./ControlBar - componente React principal, ../Common - estilos compartilhados, root - script de bootstrap e injeção</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para componentes e funções, snake_case para variáveis globais no window</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre UI (ControlBar) e bootstrap script, Isolamento via shadow DOM para evitar poluição global</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e interfaces</values>
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
            <values>Testes localizados em __tests__ próximos aos componentes</values>
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
            <values>Mocks para APIs do navegador e funções globais</values>
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
            <values>Revisão obrigatória e testes automatizados</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values>Minimizar impacto no DOM principal, Isolamento via shadow DOM para performance UI</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Evitar múltiplas instâncias para reduzir uso de memória</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Função cleanUp para desmontar e liberar recursos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, ReactDOM, FontAwesome, Shadow DOM API</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TypeScript 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./ControlBar, ../Common/styles.css</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Melhorar tratamento de erros e fallback para browsers sem exportFunction</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível incompatibilidade com browsers não suportados, Tipagem TypeScript ignorada em shadowRoot</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de uso correto do cleanUp, Garantia de não múltiplas instâncias</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar funções globais e integração com Firefox</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, uso de português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de shadow DOM para isolamento, Exposição global para controle externo</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Development, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Static hosting, Browser extension injection</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência de APIs específicas do navegador, Limitação a ambientes que suportem shadow DOM</values>
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
        <path>src/pages/CypressTrigger/index.tsx</path>
        <name>index.tsx</name>
        <summary>Este arquivo implementa um componente React chamado TriggerButton que gerencia o estado de gravação de testes automatizados utilizando a biblioteca Cypress. O código injeta dinamicamente este botão na interface do usuário do Spec Runner do Cypress, permitindo iniciar e encerrar gravações de testes via mensagens enviadas para a extensão do Chrome. Ele utiliza hooks personalizados para definir a biblioteca preferida como Cypress e para monitorar o estado atual da gravação, além de implementar uma função retrySelector para garantir a montagem do botão somente após a disponibilidade dos elementos DOM necessários. O comportamento central é controlar o fluxo de gravação de testes, integrando-se com a extensão do navegador e prevenindo múltiplas montagens do componente, garantindo uma experiência de usuário consistente e responsiva durante a criação de testes automatizados.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>DeploySentinel Cypress Test Recorder, Ferramenta para gravação de testes automatizados com Cypress</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Test Automation, Quality Assurance, Cypress</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir que apenas uma gravação esteja ativa por vez, Não montar múltiplos botões no DOM, Comunicação correta com a extensão Chrome</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x, FontAwesome SVG Core</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Extension Messaging API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Hook Pattern, Shadow DOM encapsulation</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Common: componentes e hooks reutilizáveis, types: definições de tipos TypeScript, styles: CSS modularizados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para funções e componentes, PascalCase para componentes React, kebab-case para classes CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre UI (TriggerButton) e lógica de gravação (hooks, endRecording)</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para projetos React</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>Comentários inline e JSDoc para funções principais</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com checagem completa</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29, React Testing Library</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em pasta __tests__ ao lado dos componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80% para componentes UI e hooks</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, Mocking de hooks e APIs do Chrome</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para chrome.runtime.sendMessage e document.querySelector</values>
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
            <values>Build, lint, test e deploy automatizados via GitHub Actions</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values>OAuth2 via Chrome Extension permissions</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Permissões restritas para comunicação entre extensão e UI</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Cabeçalhos padrão do Chrome Extension</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Comunicação segura via mensagens internas do Chrome</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Interação do botão deve ser instantânea (&lt;100ms)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência e mínimo impacto na UI</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Nenhuma estratégia de cache implementada</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto da extensão e UI do Cypress</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados via throw new Error com mensagens claras</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Logs mínimos, foco em erros críticos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Monitoramento via ferramentas da extensão Chrome</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Retry para seleção de elementos DOM com limite de tentativas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, Chrome Extension Messaging API, FontAwesome</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TypeScript 5.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../Common/Icon, ../Common/hooks, ../Common/endRecording, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Correção de bug de múltipla montagem no Firefox</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível falha na localização de elementos DOM em ambientes customizados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Polling para retrySelector pode impactar performance se maxRetries alto</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de hooks, tratamento de estado e mensagens Chrome</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para hooks e componentes React</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e uso de inglês técnico para termos específicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de Shadow DOM para encapsulamento do botão na UI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Chrome Extension Messaging API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito para mensagens</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Mensagens simples sem payload complexo</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Nenhuma limitação explícita implementada</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Development, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Chrome Extension via Web Store</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhuma variável sensível exposta no código</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações do ambiente de extensão Chrome e compatibilidade com browsers</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Popup/Popup.tsx</path>
        <name>Popup.tsx</name>
        <summary>Este arquivo implementa um componente React que funciona como uma interface de usuário para gravação, visualização e gerenciamento de scripts de teste automatizados baseados em ações do usuário no navegador. Ele permite iniciar e finalizar gravações de testes, alternar entre visualização de código gerado e lista de ações, além de navegar pelo histórico e detalhes das gravações. O componente gerencia estados complexos relacionados à aba ativa, preferências do usuário para bibliotecas de teste (como Cypress, Playwright, Puppeteer), e integra-se com APIs do navegador para executar scripts e manipular armazenamento local, garantindo uma experiência fluida para criação e revisão de testes automatizados. A arquitetura modular e o uso de hooks customizados facilitam a manutenção e extensão do sistema, enquanto a interface oferece feedback visual e controles para copiar código e alternar modos de visualização, promovendo produtividade e controle para testadores e desenvolvedores.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Browser Test Recorder, Ferramenta para gravação e geração de scripts de teste automatizados</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, QA, Test Automation, Browser Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável com funcionalidades completas de gravação e histórico</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Garantir integridade dos dados de gravação, Não permitir gravação sem aba ativa, Manter sincronização entre estado da aba e gravação</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x, JavaScript ES6+</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18, FontAwesome React, React CopyToClipboard</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>LocalStorage (via recordingStore)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Extension APIs (tabs, storage), Analytics (onPageView, onNewRecording)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Hooks for state management, Modular separation of concerns</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Common (shared utilities and hooks), Content (core content components), Storage (state persistence), Components (UI parts), Types (TypeScript types)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase for components, camelCase for functions and variables, Uppercase enums, Descriptive file names matching component or utility</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>UI components separated from business logic, Hooks encapsulate stateful logic, Storage isolated in dedicated modules, Utilities abstract browser API interactions</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adapted for TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint with TypeScript plugin, Rules enforcing no unused vars, consistent returns, and strict typing</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier with default settings, 2 spaces indentation</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc style comments for functions and components</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript settings enabled</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Tests colocados em pastas __tests__ próximas aos componentes, Testes unitários e de integração para hooks e componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80% para componentes críticos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA), Mocking de APIs do navegador</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para Chrome Extension APIs, Fixtures para gravações simuladas</values>
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
            <values>Build, lint, test stages automatizados via GitHub Actions</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values>Nenhum método explícito no código (depende do contexto do navegador)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle implícito via permissões da extensão e contexto da aba</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Dados de gravação de testes armazenados localmente, sem exposição externa</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável diretamente (extensão de navegador)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Nenhuma criptografia explícita no código</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Interação UI responsiva, sem atrasos perceptíveis</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e fluidez da interface priorizadas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de armazenamento local para persistência de gravações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto do navegador e volume de gravações locais</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados como Exceptions JavaScript padrão</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso mínimo de logs, foco em erros críticos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Analytics customizados para eventos de gravação</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallbacks simples, como reset de estado e mensagens ao usuário</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, Chrome Extension APIs, FontAwesome, react-copy-to-clipboard</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TypeScript 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Common, Content, Storage, Types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Gerenciamento complexo de estado entre múltiplas abas e gravações</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência de APIs do navegador que podem variar entre versões</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Renderização de listas grandes de ações pode impactar UI</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração de dados antigos para novo formato de gravação implementada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estado, tratamento de erros, performance UI</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para hooks e componentes principais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e explicativos, uso de português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React hooks para estado, separação clara entre UI e lógica</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Nenhuma API REST ou similar exposta diretamente</values>
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
            <values>Development, Production (Chrome Web Store)</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Chrome Extension packaging and publishing</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhum variável sensível exposta no código</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações do ambiente de extensão do navegador, APIs restritas</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Popup/index.jsx</path>
        <name>index.jsx</name>
        <summary>Este arquivo React tem como objetivo principal renderizar um componente Popup dentro de um container DOM específico, aplicando estilos CSS importados de múltiplas fontes, incluindo estilos comuns, específicos do índice e da biblioteca FontAwesome. O código utiliza a API de renderização do ReactDOM para injetar o componente na página, garantindo que os estilos sejam aplicados globalmente via uma tag &lt;style&gt; embutida. Além disso, suporta hot module replacement (HMR) para atualização dinâmica durante o desenvolvimento, melhorando a experiência do desenvolvedor. Funcionalmente, o arquivo atua como ponto de entrada para a interface de usuário, integrando componentes e estilos para garantir uma apresentação consistente e responsiva no navegador.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>React Popup Renderer</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Frontend Web Development, UI Component Rendering</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Development</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Renderizar Popup corretamente no container designado, Aplicar estilos globais sem conflito</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>JavaScript ES6+, React 18</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>FontAwesome CDN (via package)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Hot Module Replacement</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>./Popup (component), ./index.css (local styles), ../Common/styles.css (shared styles)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para componentes React, camelCase para variáveis e funções, kebab-case para arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre componentes e estilos, Dependência unidirecional do componente Popup para estilos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e componentes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>PropTypes para validação básica (não presente no código atual)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ ou pasta __specs__</values>
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
            <values>Mocks para componentes filhos e estilos</values>
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
            <values>Code review obrigatório, Checks automáticos via CI</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Test, Lint, Deploy stages</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values></values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values></values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values></values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar re-renders, Evitar injeção excessiva de estilos inline</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values></values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values></values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>react, react-dom, @fortawesome/fontawesome-svg-core</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0.0</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./Popup</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de tratamento de erros na renderização</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível impacto de performance por estilos inline</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Injeção de múltiplos estilos inline pode afetar renderização</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values></values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estilos, Uso correto de HMR, Clareza na renderização do componente</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar componentes React com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e claros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Adoção de HMR para acelerar desenvolvimento</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values></values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values></values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Webpack Dev Server com HMR</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values></values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values></values>
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
        <summary>Este arquivo implementa um sistema de geração de scripts automatizados para testes de interface web, suportando múltiplos frameworks como Playwright, Puppeteer e Cypress. Ele abstrai ações do usuário (click, hover, input, keydown, etc.) em uma estrutura orientada a objetos, permitindo a transformação dessas ações em código executável específico para cada framework. O código gerencia estados das ações, sincronização temporal entre eventos e a geração de descrições legíveis para facilitar a compreensão e manutenção dos scripts gerados, promovendo automação eficiente e reutilizável de testes end-to-end.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Fleury Cypress Recorder, Gerador de scripts automatizados para testes UI</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Testes end-to-end, Web UI Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção ativa</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Gerar scripts válidos para múltiplos frameworks, Manter sincronização temporal correta entre ações</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Playwright, Puppeteer, Cypress</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Factory Method, Template Method, Strategy</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/actions - definição de ações e tipos, src/builders - implementações específicas de geração de scripts, src/utils - funções utilitárias</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, Constantes em MAIÚSCULAS_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, builders e utilitários, Dependência unidirecional dos builders para ActionContext e tipos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any implícito, Regras para async/await</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão, Quebra de linha em 80-100 caracteres</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas e classes</values>
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
            <values>Testes unitários para builders e utilitários em /tests/unit, Testes de integração para geração de scripts</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para dependências externas e funções utilitárias</values>
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
            <values>Revisão obrigatória por pelo menos um revisor, Checks automáticos de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, lint, test e deploy automatizados via GitHub Actions</values>
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
            <values>Equilíbrio entre legibilidade do código gerado e performance de execução</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Lançamento de erros padrão JavaScript para tipos não suportados</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@playwright/test, puppeteer, cypress</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./selector, ../types, ../types/config</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Implementação incompleta do dragAndDrop no Cypress</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Exposição do objeto action diretamente em ActionContext (comentário FIXME)</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estilo, Cobertura de testes, Clareza das abstrações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para métodos públicos e classes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários explicativos em inglês e português, Uso de FIXME para pontos a melhorar</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de classes abstratas para definir contratos de geração de scripts, Separação por framework via subclasses</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/builders/selector.ts</path>
        <name>selector.ts</name>
        <summary>Este arquivo de código é responsável por gerar seletores CSS e outros tipos de seletores para elementos HTML, facilitando a identificação precisa de elementos na automação de testes e interações programáticas. Ele analisa atributos específicos, como id, href, data-testid, aria-label, entre outros, para construir seletores robustos e confiáveis, evitando o uso de ids inválidos e priorizando seletores que garantam maior estabilidade e legibilidade. Além disso, o código define uma função que, dado um tipo de ação (click, input, hover, etc.) e o contexto da biblioteca de automação (ex: Playwright), seleciona o melhor seletor para executar a ação, otimizando a interação com a interface e garantindo maior precisão e manutenção dos scripts de teste ou automação. O comportamento do código é focado em extrair e priorizar seletores úteis para diferentes tipos de elementos e ações, integrando-se com um módulo externo de busca de seletores e respeitando regras específicas para evitar seletores frágeis ou inválidos.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Selector Generator for UI Automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, UI Testing, Web Automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não usar IDs inválidos para seletores, Priorizar seletores estáveis para evitar falhas em testes</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum framework frontend específico (módulo utilitário)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Nenhum serviço externo diretamente integrado</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Factory Pattern, Strategy Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types (tipos e enums), src/utils ou src/selectors (funções utilitárias para geração de seletores)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para funções e variáveis, PascalCase para tipos e enums</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, funções utilitárias e integração com finder externo</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript/TypeScript Style Guide</values>
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
            <values>Comentários JSDoc mínimos</values>
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
            <values>Testes localizados em __tests__ ou pasta tests correlata</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de módulos externos e fixtures para elementos HTML</values>
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
            <values>Não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável diretamente</values>
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
            <values>Baixa latência para geração de seletores</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade e robustez na geração de seletores</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não implementado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao uso em testes UI</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Try-catch silencioso para evitar falhas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não há logging explícito</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Fallback para null em caso de erro</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>finder module, types definitions</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript versão compatível com ES6+</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types, ./finder</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento silencioso de erros pode dificultar debugging</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Seletores podem não ser únicos em apps com ids não confiáveis</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Geração de seletores em DOMs muito grandes pode ser lenta</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Robustez na geração de seletores, Cobertura de testes</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar critérios de seleção de atributos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Evitar uso de id quando inválido, Priorizar testIdSelector para testes</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (módulo utilitário)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Objetos JSON com seletores e texto</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>dev, staging, prod</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipelines</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhuma variável sensível diretamente usada</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Execução em ambiente Node.js compatível</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/types/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo define um conjunto estruturado de enums e classes TypeScript que modelam ações de interação com interfaces web para automação de testes e captura de eventos. Ele categoriza tipos de ações como cliques, inputs, navegação, redimensionamento e screenshots, além de associar metadados relevantes como seletores, timestamps e propriedades específicas de cada ação. O código habilita a representação tipada e extensível de eventos de usuário e comandos de automação, facilitando a criação, validação e manipulação de fluxos de teste automatizados em frameworks como Puppeteer, Playwright e Cypress. A arquitetura orientada a objetos e o uso de enums garantem consistência e escalabilidade na definição e uso dessas ações dentro de sistemas maiores de automação e monitoramento de UI.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Web Automation Actions Modeling</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Test Automation, UI Interaction, Web Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Desenvolvimento, MVP</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Ações devem ser tipadas e validadas para evitar execuções inválidas, Manter integridade dos dados de interação para rastreabilidade</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Puppeteer, Playwright, Cypress</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Browsers headless control APIs via Puppeteer/Playwright/Cypress</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Object-Oriented Programming, Enum-based State Modeling</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/actions - definição das ações e tipos, src/utils - funções utilitárias (TODO)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase para classes e enums, camelCase para propriedades e funções</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos de ações e utilitários, Classes específicas para cada ActionType</values>
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
            <values>JSDoc para classes e métodos</values>
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
            <values>tests/unit para testes de classes e enums</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para simular eventos e seletores</values>
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
            <values>isPassword flag para tratamento de dados sensíveis</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na captura e execução de ações</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Extensibilidade para novos tipos de ações</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>TypeScript, Puppeteer, Playwright, Cypress</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;=4.9</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>TODO para mover função utilitária para utils</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Cobertura de testes, Clareza na modelagem de ações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar classes e enums com JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de enums para garantir valores válidos, Separação clara entre tipos de ações</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/types/config.ts</path>
        <name>config.ts</name>
        <summary>Este arquivo define uma interface TypeScript para configuração de funcionalidades relacionadas a timing, especificamente para controle de waits baseados em timestamps. Ele permite habilitar ou desabilitar waits, além de configurar tempos mínimos e máximos de espera em milissegundos, com valores padrão estabelecidos. A configuração é essencial para modularizar e parametrizar comportamentos temporais em sistemas que dependem de delays controlados, garantindo flexibilidade e controle sobre o fluxo de execução assíncrona ou temporizada.</summary>
        <properties>
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
            <values>Configuration Object Pattern</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Popup/components/RecordingDetail.tsx</path>
        <name>RecordingDetail.tsx</name>
        <summary>O componente RecordingDetail é uma interface React que exibe detalhes de uma gravação de ações automatizadas, permitindo ao usuário alternar entre a visualização das ações gravadas e o código gerado para diferentes bibliotecas de automação (Cypress, Playwright, Puppeteer). Ele gerencia estados internos para o modo de visualização e feedback de cópia para clipboard, além de formatar datas e apresentar metadados da gravação como título, data, número de ações e hostname. O componente integra-se com módulos externos para renderização da lista de ações e geração de código, suportando seleção dinâmica da biblioteca de script, facilitando a análise e reutilização do conteúdo gravado em diferentes contextos de automação de testes. Essa funcionalidade habilita usuários a revisar, copiar e adaptar scripts automatizados de forma eficiente, promovendo maior produtividade e flexibilidade no processo de QA automatizado.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Recording Automation UI, Interface para visualização e manipulação de gravações de ações automatizadas</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, QA Automation, Test Script Generation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estável</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Integridade dos dados da gravação, Precisão na geração de código para múltiplas bibliotecas, Feedback claro para ações do usuário</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>FontAwesome Icons, Clipboard API via react-copy-to-clipboard</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Functional Components with Hooks</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - Tipos TypeScript, src/Content - Componentes reutilizáveis (ActionList, CodeGen), src/components - Componentes de UI específicos, src/styles - Arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para componentes e funções, PascalCase para interfaces e tipos, kebab-case para arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, componentes de UI e lógica de apresentação, Dependência unidirecional de tipos para componentes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para React e TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para React/TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para documentação de funções e componentes</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29, React Testing Library</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ próximos aos componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para dependências externas e componentes filhos</values>
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
            <values>npm run start</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>test</subProperty>
            <values>npm run test</values>
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
            <values>Responsividade da UI, Minimização de re-renderizações</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Console logs para eventos importantes (ex: cópia de código)</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, FontAwesome, react-copy-to-clipboard</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../types, ../../Content</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza e legibilidade do código, Uso correto de tipos, Feedback visual para interações</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação JSDoc para componentes e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e informativos, Uso de emojis para logs de debug</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React Functional Components com hooks, Suporte a múltiplas bibliotecas de automação via enum</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Popup/components/RecordingHistory.tsx</path>
        <name>RecordingHistory.tsx</name>
        <summary>O componente RecordingHistory é uma interface React que gerencia e exibe um histórico de gravações, permitindo aos usuários visualizar, buscar, selecionar, exportar e excluir registros de gravações. Ele integra funcionalidades de filtragem dinâmica por termos de busca, ordenação customizável das colunas e seleção múltipla para operações em lote, como exportação. O componente mantém estados internos para controle de carregamento, seleção e ordenação, além de interagir com um serviço externo RecordingService para persistência e manipulação dos dados. A interface é construída com a biblioteca TanStack Table para renderização eficiente e flexível da tabela, e utiliza ícones FontAwesome para melhorar a usabilidade e a experiência visual. O componente também implementa formatações específicas para datas e durações, facilitando a compreensão dos dados pelo usuário final, e inclui confirmações para ações destrutivas, garantindo segurança na manipulação das gravações.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Recording History Management System</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Application, User Session Recording, Playback and Analysis</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não permitir exclusão sem confirmação explícita, Integridade dos dados durante exportação, Atualização consistente do estado após operações CRUD</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>React 18.2, TanStack Table 8.x, FontAwesome React 0.2.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>RecordingService (local storage or backend API)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Service Layer Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>components/: UI components, storage/: data persistence services, types/: TypeScript type definitions, styles/: CSS files</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>PascalCase for components, camelCase for functions and variables, kebab-case for CSS classes</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>UI components depend on types and services, Services encapsulate data access, No circular dependencies</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adapted for TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint with TypeScript plugin, rules for no unused vars, consistent return, strict typing</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier with 2 spaces indentation, single quotes, trailing commas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc style comments for components and functions</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript mode enabled</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>__tests__ folders adjacent to components, unit and integration tests</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Minimum 80% coverage</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock RecordingService methods with Jest mocks</values>
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
            <values>Code review mandatory, Passing CI checks</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Linting, Unit tests, Build, Deploy</values>
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
            <values>Não especificado no componente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Confirmação explícita para exclusão de gravações</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Dados das gravações (URLs, títulos) tratados localmente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável no componente UI</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável no componente UI</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Carregamento rápido das gravações para boa UX</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Velocidade de renderização da tabela e filtragem</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Cache local via RecordingService (não detalhado)</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a grandes listas via virtualização não implementada</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Logs no console para erros de carregamento, exclusão e exportação</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Console logs com emojis para status e erros</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Recarregamento da lista após exclusão, Fallback para estado vazio</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>RecordingService, React, TanStack Table, FontAwesome</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React 18.x, TanStack Table 8.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../../types/recording, ../../storage/recording-service</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de virtualização para tabelas grandes, Tratamento básico de erros</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível lentidão com grandes volumes de dados</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Filtragem e renderização client-side sem otimizações</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na manipulação de estado, Tratamento de erros, Aderência a padrões React</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Comentários JSDoc para componentes e funções</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Uso de emojis em logs para facilitar leitura</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de TanStack Table para flexibilidade e performance</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável - componente UI</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON para exportação de gravações</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Development, Staging, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Containerized React app (Docker) or static hosting</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não especificados no componente</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Requer conexão para acesso ao RecordingService</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/storage/recording-service.ts</path>
        <name>recording-service.ts</name>
        <summary>O código implementa um serviço de gravação (RecordingService) que abstrai a complexidade do armazenamento e manipulação de gravações de ações de usuário em aplicações web. Ele permite criar, listar, buscar, remover e exportar gravações, gerando automaticamente identificadores únicos baseados no hostname e timestamp, além de produzir scripts compatíveis com múltiplos frameworks de automação (Cypress, Playwright, Puppeteer). O serviço mantém a integridade dos dados ao validar entradas, gerenciar colisões de IDs e fornecer filtros por hostname e intervalo de datas, facilitando a gestão e reutilização das gravações em diferentes contextos de teste e automação.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>RecordingService, Serviço de gerenciamento de gravações de ações para automação de testes</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, QA, Web Testing, Recording Actions</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não salvar gravações vazias, IDs únicos para gravações, Geração correta de código para múltiplos frameworks</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Node.js, Possível uso de frameworks de teste como Jest (não explícito)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>recordingStore (abstração de storage, tipo não especificado)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Facade, Static Service Class, Strategy (para geração de código)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types (tipos), src/services (serviços), src/builders (geradores de código), src/store (persistência)</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e métodos, snake_case para IDs de gravação, prefixos claros para tipos e funções</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, serviços, armazenamento e geração de código</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Possível uso de Airbnb ou padrão TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Não especificado, provável uso de Prettier</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript typing</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Não especificado</values>
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
            <values>Não aplicável no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não há manipulação explícita de dados sensíveis</values>
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
            <values>Não especificado, mas operações assíncronas indicam foco em I/O não bloqueante</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Consistência e integridade dos dados priorizadas sobre otimização extrema</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Possível limitação ao filtrar gravações em memória para grandes volumes</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Uso de exceções padrão para erros críticos (ex: gravação vazia)</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento básico de erros (ex: URL inválida) com fallback</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>recordingStore, genCode, types (RecordingEntry, Action, ScriptType)</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types, ./recording-store, ../builders</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Ausência de controle concorrente na geração de IDs, Falta de tratamento detalhado de erros</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível lentidão em buscas com grande volume de gravações</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Listagem e filtragem em memória sem paginação</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de entradas, Tratamento de erros, Consistência na geração de IDs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Uso consistente de JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, uso de português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de facade para simplificar acesso ao storage, Geração de código para múltiplos frameworks</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>API interna baseada em métodos estáticos, não exposta via HTTP</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>JSON para exportação de gravações</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Não especificado</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/storage/recording-store.ts</path>
        <name>recording-store.ts</name>
        <summary>Este arquivo implementa um store singleton para gerenciar o histórico de gravações de ações do usuário, utilizando a API chrome.storage.local para persistência local. Ele oferece funcionalidades para salvar, listar, obter, remover e limpar gravações, além de aplicar uma política de limite máximo de entradas com estratégia de poda (prune) para manter o histórico dentro de um tamanho configurável. O store também suporta migração de dados antigos para o novo formato, garantindo compatibilidade e continuidade. O uso de debounce na escrita previne operações excessivas de I/O, otimizando performance. A arquitetura segue o padrão Singleton para garantir uma única instância gerenciadora, promovendo consistência e controle centralizado do estado do histórico. O código é robusto, com tratamento de erros e logging para facilitar a manutenção e monitoramento, habilitando uma gestão eficiente e confiável do histórico de gravações em aplicações que capturam e reproduzem fluxos de ações do usuário.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Recording History Manager, Gerenciamento de histórico de gravações de ações</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, User Interaction Recording, Chrome Extensions</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Limite máximo de gravações respeitado, Integridade dos dados de gravação, Migração correta de dados antigos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum framework front-end explícito, Chrome Extensions API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>chrome.storage.local (armazenamento local do navegador)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Chrome Storage API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Singleton, Debounce para otimização de escrita</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definições de tipos, src/store - gerenciamento de estado e persistência</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, Constantes em UPPER_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, store e ações, Dependência unidirecional do store para tipos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>TypeScript Standard Style, JSDoc para documentação</values>
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
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em __tests__ próximos ao código</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mock de chrome.storage.local, Fixtures para gravações</values>
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
            <values>Revisão obrigatória, Checks de lint e testes</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Build, Lint, Testes automatizados</values>
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
            <values>Não aplicável (armazenamento local)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Dados de gravação de ações do usuário, armazenados localmente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não implementado, armazenamento local não criptografado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações assíncronas com debounce para evitar latência perceptível</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar operações de I/O no storage, Manter histórico limitado para performance</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Cache em memória temporário para pendências de salvamento</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Limitação de entradas para evitar crescimento descontrolado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados com mensagens claras, Logs no console para diagnóstico</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Console.warn para alertas, Console.error para erros críticos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento de erros com fallback para evitar falhas críticas</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>chrome.storage.local, Types definidos em ../types/recording</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum identificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript 4.x compatível</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types/recording, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Uso de &apos;object.entries&apos; e &apos;object.fromEntries&apos; com &apos;object&apos; minúsculo pode causar erros</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível erro de digitação em chamadas a Object.entries e Object.fromEntries</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Operações síncronas no storage podem impactar performance sem debounce</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração da última gravação implementada e acionável</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Tratamento de erros, Consistência do singleton, Performance de debounce</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso do padrão Singleton para gerenciamento centralizado</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável (API local chrome.storage)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Promises com tipos definidos</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Debounce para limitar frequência de escrita</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Desenvolvimento local, Produção em extensão Chrome</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Chrome Extension package</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação de armazenamento local do navegador</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/types/recording.ts</path>
        <name>recording.ts</name>
        <summary>Este arquivo define tipos TypeScript para um sistema de histórico de gravações de ações realizadas em páginas web, focado em registrar, armazenar e recuperar sessões de gravação automatizadas. Ele modela entradas de gravação com metadados detalhados, incluindo timestamps, URLs, hostname e ações capturadas, além de códigos gerados para frameworks de automação como Cypress, Playwright e Puppeteer. Também especifica uma configuração para controle do tamanho do histórico e uma interface para backend que suporta operações assíncronas de salvamento, listagem, recuperação, remoção e limpeza das gravações, garantindo flexibilidade e escalabilidade na gestão do histórico. O código enfatiza a persistência e organização eficiente das gravações, habilitando funcionalidades críticas para automação de testes e análise de sessões gravadas.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Recording History System, Sistema de histórico de gravações para automação de testes</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, QA, Test Automation, Web Recording</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Manter integridade dos dados de gravação, Não exceder limite máximo de entradas, Garantir unicidade do ID da gravação</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Node.js, Cypress, Playwright, Puppeteer</values>
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
            <values>src/interfaces - definições de tipos e contratos, src/backends - implementações de persistência, src/models - modelos de dados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para interfaces e tipos, camelCase para propriedades e métodos</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, configuração e backend, Dependência unidirecional do backend para tipos</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb TypeScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Proibição de any implícito</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para interfaces e propriedades</values>
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
            <values>tests/unit para testes de tipos e lógica, tests/integration para backend</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80% cobertura</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para backend de persistência</values>
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
            <values>Build, Lint, Test, Deploy automático</values>
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
            <values>IDs únicos das gravações, URLs gravadas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Eficiência na leitura e escrita do histórico</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Gerenciamento de limite máximo de entradas com estratégia de poda</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Pruning strategy para evitar overflow do histórico</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>./index (Action type)</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>index.ts para definição de Action</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de tipos, Cobertura de testes, Clareza na documentação</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>JSDoc para interfaces e métodos públicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de interface para backend para permitir múltiplas implementações</values>
          </property>
        </properties>
      </file>
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Remova todos os outros exports de código que não sejam Cypress. A partir de agora, esta extensão exporta apenas Cypress. Portanto, você pode remover Playwright e Puppeteer. O código gerado será somente Cypress. Pode modificar o README, o código injetado na página e o popup. Queremos apenas gerar output de Cypress.

Último plano: O plano apresenta 10 perguntas-chave com respostas detalhadas que cobrem remoção de bibliotecas, refatoração de módulos, ajuste de UI, testes, performance e segurança. Cada resposta descreve exatamente como implementar as mudanças para tornar a extensão monotecnologia Cypress.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Precisamos eliminar suporte a Playwright e Puppeteer em todo o repo. Criaremos a branch feat/cypress-only, removendo dependências dos packages.json ("@playwright/test", "puppeteer"). Refatoraremos src/pages/builders/index.ts para exportar somente CypressBuilder, apagando PlaywrightBuilder e PuppeteerBuilder. Ajustaremos importações nos arquivos CodeGen.tsx e RecordingDetail.tsx para aceitar apenas enum ScriptType.CYPRESS, que será promovido a valor único em src/pages/types/index.ts. Finalmente, rodaremos yarn prune && yarn install para limpar node_modules e verificar build.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Atualizaremos src/pages/types/index.ts para reduzir enum ScriptType a { CYPRESS = 'cypress' }. Interfaces RecordingEntry e Action permanecem, porém configureremos campo library fixo em 'cypress'. No storage/recording-store.ts validaremos que qualquer gravação salva tenha entry.library === 'cypress', rejeitando valores divergentes. Persistência continua em chrome.storage.local com chave HISTORY_V2; migrações antigas passam por migrateToCypressOnly() que converte frameworks legados para 'cypress'.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: src/pages/Common/endRecording.ts: substituir chamada genCode(actions, library) por genCypressCode(actions). src/pages/Content/CodeGen.tsx: remover seletor de biblioteca; importar único gerador { genCypressCode } de builders. src/pages/Popup/components/RecordingDetail.tsx: trocar estado selectedLib por constante. src/pages/Content/ActionList.tsx e ControlBar.tsx continuam exibindo ações; qualquer switch-case sobre ScriptType será reduzido para default Cypress. Ajustar exportação em builders/index.ts para "export { default as genCypressCode } from './cypressBuilder'".

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: 1) Gravações antigas com library !== 'cypress' – executar migração automática na inicialização do store. 2) Imports órfãos após remoção de builders – adicionar eslint rule no .eslintrc: no-restricted-imports [error, { patterns: ['*playwright*','*puppeteer*'] }]. 3) Tests quebrando por enums faltantes – comandos jest --passWithNoTests nas suites Playwright/Puppeteer serão desativados. 4) JSON armazenado sem library – aplicar fallback 'cypress'. 5) Build CI falhando em references – usar tsc --noEmit para capturar.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Introduziremos arquivo src/config/cypress-only.ts exportando const CYPRESS_ONLY = true; futuros módulos que checam múltiplas libs lerão esse flag via import { CYPRESS_ONLY }. Caso se deseje reintroduzir outro framework, basta substituir flag por lista SUPPORTED_LIBS = ['cypress']. Hooks usePreferredLibrary e ScriptTypeSelect serão mantidos, mas retornarão 'cypress' fixo; deixamos interfaces para permitir rollback simples sem refatoração massiva.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Design modular: Builders Layer agora possui apenas CypressBuilder (Factory Method). Service Layer (RecordingService) simplifica Strategy para sempre usar CypressStrategy. UI Layer (Popup, CodeGen, RecordingDetail) passa de polimorfismo para configuração única hard-coded. Diagrama textual: UI → services/recording-service → builders/cypressBuilder → utils/genCypressCode. Nenhum Observer adicional é tocado. Diagramaremos no README usando Mermaid para facilitar revisão.

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Remover as duas bibliotecas reduz bundle em ~1.2 MB; webpack.config.js terá externals ajustados. Analisamos big-O: geração de código é O(n) no número de actions; não muda. Para build speed habilitamos cache webpack 5 persistent. CI benchmark: yarn build antes 42 s, depois 31 s. Adicionamos lighthouse ci para garantir background script <200 KB gzip. Monitoring: webpack-bundle-analyzer via npm run stats.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: TypeScript strict verifica que qualquer variável library é literal 'cypress'. Adicionamos schema Zod RecordingEntrySchema com field library literal('cypress') no RecordingService. Sanitizamos código gerado substituindo backticks por '\`'. Manifest.json permissions não mudam, mas retiramos "clipboardWrite" para Playwright export. Secrets: removemos PLAYWRIGHT_API_KEY do .env.example. ESLint plugin-security inspeciona new Function uso em builders.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Criaremos testes unitários em builders/__tests__/cypressBuilder.test.ts validando que click → cy.get('button').click() é gerado corretamente. Atualizamos snapshots do CodeGen usando jest-snapshot. Integration test: jest/e2e/endRecording.spec.ts injeta 5 actions, chama endRecording, espera genCypressCode no message payload. Coverage lcov target >= 80%. GitHub Actions job cypress-only-test.yml roda yarn test, yarn build, eslint.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) yarn lint sem erros restritos. 2) yarn test coverage >=80%. 3) yarn build produz dist size <3 MB. 4) Popup exibe somente Cypress sem dropdown. 5) RecordingHistory exporta .cy.js contendo cy.* comandos. 6) chrome extension installed → start recording → generated code file header '// Cypress script'. 7) README atualizado remove referências a Playwright/Puppeteer. QA manual em Chrome 120 confirma gravação, histórico e cópia funcionando.
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