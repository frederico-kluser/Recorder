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
    <name>DeploySentinel Recorder – Extensão Web para Gravação e Geração Automatizada de Scripts de Teste End-to-End (Cypress, Playwright, Puppeteer)</name>
    <domain>Web/Mobile/Desktop Development, Browser Extensions, Test Automation, End-to-End Testing, UI Components, Web Automation, Quality Assurance, Developer Tools, Browser Interaction Recording, Web Analytics</domain>
    <current_phase>Development, Production, Active Maintenance, Stable Release, MVP, Local Testing</current_phase>
    <critical_business_rules>Preserve fast refresh functionality, Ensure JSX transpilation compatibility, Build must generate consistent artifacts, Do not break deploy pipeline, Accurate and complete capture of user events, Correct and readable script generation, Compatibility with multiple test frameworks (Cypress, Playwright, Puppeteer), Consistent test execution, TypeScript support via ts-jest, Node.js environment for testing, Accurate and faithful test script generation, Cross-browser compatibility, Maintain integrity of captured data, Accurate recording of user interactions, Correct script generation for Cypress, Playwright, and Puppeteer, Browser permission security, Security and privacy of captured data, Recording must start and end correctly, Navigation events must be captured only in the correct tab and frame, Injected scripts must execute only in authorized contexts, Strict message origin validation, Secure communication between webapp and extension, Visual icon consistency, React 18+ compatibility, Correct SVG rendering, Brand visual consistency, Minimum logo load performance, Valid ScriptType selection must be ensured, onChange callback must be called with correct value, Ensure integrity of recorded data, Send code only to authorized tabs, Correct persistence of user preferences, Consistent synchronization of recording state across tabs, Integrity of stored data, Correct persistence of recording state, Safe script execution in specific frames, Accurate identification of Cypress test tabs, Actions must be displayed in correct order, Only supported actions should be rendered, Selectors must be precise to ensure correct element identification, Correct and precise code generation, Maintain integrity of generated code, Faithful code rendering for analysis, Accurate capture of user actions, Secure handling of sensitive inputs, Reliable code generation for multiple test frameworks, Accurate highlighter positioning, Consistent label rendering, Do not interfere with user interaction, Ensure only one active script instance, Allow complete component cleanup to avoid leaks, Do not log password field events, Avoid event duplication, Consistent persistence in local storage, Ensure only one recording is active at a time, Do not mount multiple buttons in the DOM, Correct communication with Chrome extension, Accurate recording of user actions, Correct code generation compatible with supported libraries, Persistence of library preference, Correct synchronization with browser tabs, Ensure user anonymity, Send event data without impacting UX, Maintain integrity of sent data, Render Popup correctly in designated container, Apply global styles without conflict, Generate unique and valid selectors, Maintain acceptable performance, Avoid ambiguous selectors, Generate valid scripts for multiple frameworks, Maintain correct temporal synchronization between actions, Do not use invalid IDs for selectors, Prioritize stable selectors to avoid test failures, Correct and typed import of static files, Avoid asset-related build errors, Ensure browser API calls are compatible between Chrome and Firefox, Actions must be typed and validated to avoid invalid executions, Maintain interaction data integrity for traceability, Ensure strict typing to avoid runtime errors, Maintain ES5 compatibility for legacy browsers, Build must run in production mode, Build errors must be reported and block deploy, NODE_ENV must always be defined, PORT must be a valid number, Hot Module Replacement must be enabled for dev mode, Dev server must serve assets with CORS headers, Manifest version consistency, Environment variable integrity, Asset path correctness, Do not version dependency files, Do not expose sensitive config files, Keep repository clean and organized, All actions must have valid, non-negative, and sequential timestamps, Correct and syntactically valid script generation for each framework, Maintain compatibility with Cypress, Playwright, and Puppeteer APIs, Correct Playwright code generation, Extension installation validation</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript, JavaScript (ES6+), JSX, Node.js</primary_language>
    <frameworks>React 18, Webpack 5, Babel 7, Cypress, Playwright, Puppeteer, Jest 29, ts-jest, WebExtensions API, ReactDOM, FontAwesome SVG Core</frameworks>
    <databases>chrome.storage.local, localStorage (browser)</databases>
    <external_services>Chrome Web Store, Firefox Add-ons Marketplace, GitHub Actions, Browser APIs (chrome.*), Cypress, Playwright, Puppeteer, DeploySentinel Webapp, Google Analytics Measurement Protocol API, FontAwesome CDN, Firefox WebExtension API</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Modular Build Configuration, Pipeline, Observer Pattern, Event-driven Architecture, Modular Architecture, Configuration Object Pattern, Component-based UI, Extension Architecture (Background Script, Content Script, Browser Action), Service Worker Background Processing, Message Passing, Controlled Component Pattern, Custom React Hooks, Facade Pattern for API Abstraction, Declarative UI, Separation of Concerns, Hook-based State Management, Functional Components, Singleton, Shadow DOM Encapsulation, Debounce, Hooks Pattern, Modular Design, Hot Module Replacement, Generator Pattern, Factory Method, Template Method, Strategy Pattern, Alias Pattern, Object-Oriented Programming, Enum-based State Modeling, Build Pipeline Script, Configuration Module Pattern, Middleware Pattern, Plugin Pattern, Functional Programming, Builder Pattern, Test-Driven Development (TDD), Test Automation Pattern, Page Object Pattern (implicit)</design_pattern>
    <folder_structure>Config files in root or config folder, Source code in src/, build/, dist/, assets/ - images and icons, tests/ - E2E and unit tests, background/ - background scripts, content_scripts/ - injected scripts, popup/ - extension UI, Common/utils - shared utility functions, src/components - reusable UI components, src/types - TypeScript type definitions, src/hooks - custom hooks, src/utils - storage and script utilities, builders/ - code and selector generation, styles/ - CSS files, declarations/ - .d.ts files, config/ - Webpack and environment configs, scripts/ - build and automation scripts, node_modules - external dependencies, coverage/ - test reports, tmp/ - temporary browser context data</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for React components, types, and classes, kebab-case for files and folders, snake_case for config and static files, UPPER_SNAKE_CASE for enums and constants, Descriptive names for scripts and files, Prefix &apos;use&apos; for hooks, File extensions indicate language (.jsx, .tsx, .ts), test prefix for test functions, *.d.ts for type declarations</naming_conventions>
    <module_boundaries>Separation between config and source code, Plugins isolated from presets, Clear separation between event capture, script generation, and extension UI, Independent modules for Chrome and Firefox, Isolated configuration for Jest, Clear separation between frontend (React) and build scripts, Dependencies isolated by environment (devDependencies vs dependencies), Clear separation between background scripts, content scripts, and UI (popup), Message-based communication between scripts, Isolated injected scripts by tab and frame context, Clear separation between extension code and webapp code, Isolated visual components from static assets, Relative imports for local resources, Isolated components with props for communication, Types imported for consistency, Clear separation between state management, code generation, and runtime communication, Clear separation between hooks, utils, and types, Unidirectional dependency from hooks to utils and types, Clear separation between storage handling, script execution, and tab control, Clear separation between types, builders, and components, UI components separated from business logic, Builders isolated for selector and code generation, Common utilities shared across modules, Isolated Highlighter component with explicit style import, Clear separation between UI (ControlBar) and bootstrap script, Shadow DOM isolation to avoid global pollution, Clear separation between event capture, selector generation, and storage, Clear separation between UI (TriggerButton) and recording logic (hooks, endRecording), Clear separation between UI, recording logic, code generation, and utilities, Unidirectional dependencies to avoid circular coupling, Isolated analytics module, dependent only on external utils, Clear separation between components and styles, Explicit imports for Playwright and Jest</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, Prettier for formatting</style_guide>
    <linting_rules>ESLint with React and TypeScript plugins, TypeScript strict mode enabled, No explicit any, ESLint with Airbnb rules, ESLint with async/await, no-unused-vars, consistent-return, ESLint with rules for WebExtensions compatibility</linting_rules>
    <formatting>Prettier with default settings, singleQuote: true, trailingComma: es5, printWidth: 80, arrowParens: always</formatting>
    <documentation_style>JSDoc for functions, classes, and components, Inline comments for complex logic</documentation_style>
    <type_checking>Strict TypeScript, Strict TypeScript with explicit typing for events and actions, Strict TypeScript with explicit typing in components and hooks</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest 29, Playwright, React Testing Library</test_framework>
    <test_structure>__tests__ folders colocated with components and modules, tests/unit/ for unit tests, tests/e2e/ for end-to-end tests, Test files with .test.ts or .test.tsx extension</test_structure>
    <coverage_requirements>Minimum 80% coverage, Minimum 80% coverage for critical modules and UI components, Minimum 90% coverage for critical functions</coverage_requirements>
    <test_patterns>AAA (Arrange-Act-Assert), Given-When-Then for behavioral tests, Snapshot testing for UI components, Mocking browser APIs</test_patterns>
    <mocking_approach>jest.mock for modules and browser APIs, Fixtures for input data, Mocks for Chrome and WebExtension APIs, Mocks for localStorage and chrome.storage APIs, Mocks for external dependencies and utility functions</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, Git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, CI checks, Automated lint and test checks, At least one reviewer approval, Build must pass without errors</pr_requirements>
    <ci_cd_pipeline>Linting, Testing, Build, Deploy, Automated build, lint, test, and deploy via GitHub Actions, Deploy to Chrome and Firefox</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, yarn install</setup>
    <install>npm install, yarn install</install>
    <dev>npm start, npm run dev, yarn start-chrome, yarn start-ff, yarn start, npm run watch, node scripts/start.js, webpack --mode development --watch</dev>
    <test>npm test, yarn test, npm run test, jest</test>
    <build>npm run build, yarn build-chrome, yarn build-ff, yarn build, node scripts/build.js, webpack --mode production</build>
    <lint>npm run lint, eslint src/ --ext .ts,.tsx, eslint ., yarn lint</lint>
    <format>npm run format, prettier --write src/, prettier --write ., yarn format</format>
  </commands>
  <security_constraints>
    <authentication_method>OAuth2 via DeploySentinel Webapp, OAuth2 via Chrome Extension permissions, Not applicable (local state management)</authentication_method>
    <authorization_rules>Restricted permissions via manifest for specific domains and APIs, Recording restricted to authorized tab and frame, Injected scripts only after state validation, Message origin validation, Access control based on browser context and active tab</authorization_rules>
    <sensitive_data>User interaction data handled locally, no unauthorized external transmission, Recording data stored locally, no explicit encryption, Password inputs are masked in display, Password fields must not be recorded, Client ID generated anonymously, no personal data</sensitive_data>
    <security_headers>Content Security Policy configured via manifest, Content-Security-Policy for messages, Default Chrome Extension headers</security_headers>
    <encryption_requirements>Chrome default encryption for local storage, TLS for web communication, Secure communication via Chrome internal messaging</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>Real-time recording with no perceptible navigation impact, Script injection and recording updates must occur in milliseconds, Messages processed in &lt; 100ms, Instant component rendering, Fast asynchronous operations for smooth UX, UI interaction must be responsive, fast state updates</response_time_limits>
    <optimization_priorities>Developer experience, Fast refresh, Build speed, Bundle size, Low latency in event capture, Efficient memory usage during recording, Minimize browser CPU and memory impact, Minimize overhead in non-recorded tabs, Low latency in communication, Quick UI rendering, Minimize unnecessary reads/writes, Minimize re-renders, Minimize inline style injection, Balance code readability and execution performance, Fast and robust selector generation, Optimized build for production with minification and tree shaking</optimization_priorities>
    <caching_strategy>Intermediate build cache, chrome.storage.local for efficient persistence, Browser cache for static assets, Webpack caching for incremental builds, Local storage for temporary persistence</caching_strategy>
    <scalability_considerations>Task parallelization, Support for long recordings without perceptible degradation, Support for multiple tabs and simultaneous sessions, Componentization for extensibility and maintainability, Efficient action list management to avoid excessive growth, SPA and multi-context support</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standardized logs, Structured logs for background and content script errors, Errors thrown via throw new Error with clear messages, Fallback to default values on error, Abort build on critical error</error_format>
    <logging_strategy>Console logs, Local logs for development debugging, Error reporting via CI, Console.error for errors, console.warn for warnings, Analytics for event tracking</logging_strategy>
    <monitoring_tools>GitHub Actions for build and test monitoring, Integration with external tools via deploysentinel.com, Chrome Extension monitoring tools, Custom analytics for usage tracking</monitoring_tools>
    <error_recovery>Automatic retry on build failures, Recovery from recording failures with restart option, Automatic service worker restart and script re-injection, Cleanup function to unmount and release resources, Hot Module Replacement for rapid error recovery in development, Retry for DOM element selection with attempt limit</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>React 18, Webpack 5, Babel 7, Node.js, Chrome and Firefox extension APIs, Cypress, Playwright, Puppeteer, ts-jest, typescript, jest, chrome.* APIs, chrome.storage.local, chrome.runtime, FontAwesome, react-dom, lodash.debounce, react-syntax-highlighter, getRandomInstallId, Google Analytics API, TypeScript compiler, Module bundler (Webpack, Vite)</critical_dependencies>
    <deprecated_packages>None identified</deprecated_packages>
    <version_constraints>React &gt;=18.0.0, TypeScript &gt;=5.0, Jest &gt;=29.0.0, Webpack &gt;=5.0.0, Manifest V3 required for compatibility, Chrome Extensions API compatible, Playwright &gt;=1.20.0, TypeScript version compatible with ES6+, target ES5, module ESNext</version_constraints>
    <internal_packages>Internal modules for recording and script generation, ../Common/utils, ../types (ScriptType), ../builders, ./utils, ./recorder, ./Highlighter, ./ControlBar, ./analytics, ./Popup, ./selector, ./finder, config/webpack.config.js, ./env</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Build scripts lack modularization, Limited support for file upload capture, Manifest V3 migration required for future compatibility, Improve support for multiple frameworks simultaneously, Lack of robust error handling, No structured logging, Async error handling can be improved, Complex state management may grow with new features, No memoization to avoid unnecessary re-renders, Improve error handling and fallback for browsers without exportFunction, Improve any typing, optimize local storage usage, Hardcoded config for localhost and fixed port, Extensive config may hinder maintainability</technical_debt>
    <known_issues>Potential incompatibility of react-hot-loader with React 18+, Limitations in hover event capture in some contexts, Limitations in event capture within iframes, Possible race conditions in async updates, Strong dependency on Chrome API limits local testing, Exclusive Chrome dependency, Possible inconsistency in multi-tab sync without lock, Possible race conditions in async storage operations, Dependency on browser-specific APIs may limit portability, Dependency on external styles may cause visual failures, Possible incompatibility with unsupported browsers, TypeScript typing ignored in shadowRoot, Possible event loss at high frequency, Async sync may cause momentary inconsistencies, Possible failure locating DOM elements in custom environments, No-cors mode limits failure detection in requests, Possible performance impact from inline styles, Performance may degrade in documents with many similar elements, Exposure of action object directly in ActionContext (FIXME comment), Selectors may not be unique in apps with unreliable IDs, Differences between Chrome and Firefox APIs may cause incompatibilities, Disabling host check may cause security risks, Possible secrets leakage if not managed correctly, System clock dependency may cause inconsistencies, Occasional timeouts activating service workers</known_issues>
    <performance_bottlenecks>Slow build in large projects, High CPU usage in long recordings, Frequent navigation events may cause overhead, Potential growth of stored action list, Frequent mouse events mitigated by throttling, Input and wheel events may generate high load, Polling for retrySelector may impact performance if maxRetries is high, Multiple inline style injections may affect rendering, Combinatorial selector generation and multiple querySelectorAll validations, Selector generation in very large DOMs may be slow, Minification disables mangling for easier debugging, impacting final size, Active waiting with setInterval can be optimized</performance_bottlenecks>
    <migration_status>Complete for Manifest V3, no pending migrations, Stable, no ongoing migrations, Partial migration to Manifest V3 in progress, Function migrateActionsTimestamp implemented and in use</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Preserve hot reload functionality, Code style consistency, Performance, Maintainability, Code clarity and readability, Test coverage, Strong typing maintenance, Conformance to code standards, Security in permission usage, Clear separation of responsibilities between scripts, Quality of generated scripts, Correct async handling, Recording state maintenance, Security in script injection, Security in origin validation, Clear module communication, Visual consistency, Rendering performance, Component simplicity, Accessibility, Type consistency, Correct use of hooks, No side effects, Correct use of cleanUp, No multiple instances, Consistent hooks, state handling, and Chrome messaging, Silent error handling, Anonymity maintenance, Consistent styles, Correct HMR usage, Component rendering clarity, Selector generation robustness, Type conformance, Build error and warning checks, Correct alias and loader configuration, Security in secrets usage, Type validation and immutability, Test coverage for timestamp cases, Correct use of mocks, Critical flow coverage, Readability maintenance</code_review_focus>
    <documentation_requirements>Document config changes, Document build scripts, Clear documentation for internal APIs and extension usage, Clear documentation for configs and tests, Clear JSDoc documentation, Explanatory code comments, Clear documentation for extension internal APIs and script usage, Clear documentation for public functions and events, Clear documentation for message APIs, Clear documentation for props and behavior, JSDoc for components and functions, Clear documentation for hooks and side effects, Document new action types and components, Clear documentation for public methods and classes, Document selection attribute criteria, Clear documentation for type declarations, Document alias and compatibility limitations, Document classes and enums with JSDoc, Consistent JSDoc for public functions, Clear documentation for builder public methods, Clear environment setup documentation</documentation_requirements>
    <communication_style>Clear and concise comments, Objective and technical comments, use English for technical terms, Objective and clear comments in Portuguese for context, PRs with detailed description, Use of FIXME for improvement points</communication_style>
    <decision_log>Opted for react-app preset for simplicity, Enabled react-hot-loader for dev experience, Chose TypeScript for type safety, Multi-platform support (Chrome and Firefox), Adopted ts-jest for TypeScript testing, Use of manifest v2 and v3 for compatibility, Adopted React and TypeScript for UI, Maintain Manifest Version 2 until full migration to V3, Adopted Manifest V3 for greater security and performance, Use of chrome.storage.local for persistence, Clear separation between background and content scripts, Use of messages for integration between webapp and extension, SVG for scalable icons, Functional components for UI, Static asset import, Enum for script types, Controlled component for better integration, Playwright for script generation, Communication via chrome.runtime.sendMessage, Hooks for encapsulating state and persistence logic, Feature detection for Chrome and browser API compatibility, Playwright selectors for greater accuracy, Filter supported actions to avoid errors, Clear separation between code generation and presentation, react-syntax-highlighter for UI, Enums for action and mode types, Throttling for event optimization, Functional component for simplicity and performance, Shadow DOM for isolation, Global exposure for external control, Debounce for resize, Filter irrelevant events for performance, Shadow DOM for button encapsulation in UI, React Functional Components and hooks for state and effects, Separation between UI and recording logic, Google Analytics for event collection, Anonymous identifier for client ID, HMR for faster development, Penalties for selector ordering, Fallbacks to ensure uniqueness, Abstract classes for script generation contracts, Subclass separation by framework, Avoid id usage when invalid, Prioritize testIdSelector for tests, Type declarations (.d.ts) for static assets to avoid build errors, Alias for Chrome and Firefox compatibility, Enums to ensure valid values, Clear separation between action types, Strict mode to avoid production errors, Remove chromeExtensionBoilerplate to avoid production build conflicts, HotModuleReplacementPlugin for faster development, TerserPlugin without mangling for easier production debugging, Separation between migration and timestamp validation for clarity and maintenance, Builder Pattern for script generation, Clear separation between automation frameworks, Playwright for end-to-end extension testing</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>REST for external communication, Chrome Extensions Messaging API, Message Passing API via postMessage and chrome.runtime, WebExtensions API, HTTP POST via fetch for Google Analytics Measurement Protocol, Playwright API</api_style>
    <versioning_strategy>Semantic versioning for external APIs, Manifest V3 compatibility, No explicit versioning for internal APIs</versioning_strategy>
    <response_formats>JSON, Simple JSON messages between scripts, JavaScript Promises and callbacks</response_formats>
    <rate_limiting>Limits imposed by deploysentinel.com external service</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, production, staging, localhost, DeploySentinel (*.deploysentinel.com), Chrome Web Store, Firefox Add-ons Marketplace, Dev, Staging, Production via Chrome Extension</environments>
    <deployment_method>Static hosting, CI/CD pipelines, Chrome Web Store, Firefox Add-ons Marketplace, Distribution via zip packages for Chrome and Firefox, Chrome Extension packaging, Browser extension injection, Webpack Dev Server with HMR</deployment_method>
    <environment_variables>MANIFEST_VERSION, NODE_OPTIONS, NODE_ENV, ASSET_PATH, PORT, npm_package_version, .env.local, .env.development.local, .env.test.local, .env.production.local</environment_variables>
    <infrastructure_constraints>Browser extension API limitations, Separate builds required for Chrome and Firefox, Manifest V3 and Chrome API limitations, Browser permission restrictions, Dependency on Chrome Extensions API, Execution limited to Chrome browser environment, Shadow DOM support required, Node.js local environment required for server, Chrome Extension Manifest V3 compatibility</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/pages/Background/index.ts</path>
        <name>index.ts</name>
        <summary>Este arquivo implementa um sistema de gravação e monitoramento de navegação em abas do navegador Chrome, focado em capturar eventos de navegação e interações do usuário para fins de automação de testes. Ele gerencia o ciclo de vida da gravação, incluindo início, atualização e término, armazenando os dados localmente e sincronizando o estado com a interface do usuário via mensagens e menus contextuais. O código integra-se com frameworks de teste como Cypress e Playwright, injetando scripts específicos para capturar ações e eventos, além de habilitar funcionalidades contextuais como gravação de hover e espera por texto selecionado. A arquitetura é orientada a eventos, reagindo a mudanças de estado, atualizações de abas e comandos externos, garantindo que a gravação seja consistente e sincronizada com o estado do navegador e do usuário. A solução habilita a criação automatizada de scripts de teste baseados em interações reais, otimizando o fluxo de trabalho de QA e desenvolvimento de testes end-to-end.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>DeploySentinel, Automação de gravação de testes end-to-end</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, QA, Test Automation, Browser Automation</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Gravação deve ser iniciada e finalizada corretamente, Eventos de navegação devem ser capturados apenas na aba e frame corretos, Scripts injetados devem ser executados somente em contexto autorizado</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Chrome Extensions API, Playwright, Cypress</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>chrome.storage.local (armazenamento local do navegador)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Cypress Test Runner, Playwright Test Runner</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Event-driven Architecture, Observer Pattern</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Common/utils - funções utilitárias compartilhadas, Background scripts - controle central da gravação e eventos, Content scripts - scripts injetados para captura de interações</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>Constantes em UPPER_SNAKE_CASE, Funções camelCase, Variáveis camelCase, IDs de menu contextuais com prefixo &apos;deploysentinel-menu&apos;</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre utilitários e lógica de background, Comunicação via mensagens entre background e content scripts, Isolamento de scripts injetados por contexto de aba e frame</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para async/await, no-unused-vars, consistent-return</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>Comentários JSDoc para funções públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com checagem completa</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29 para testes unitários e integração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em pasta __tests__ ao lado dos módulos</values>
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
            <values>Mocks para chrome API usando jest-mock-chrome</values>
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
            <values>Revisão obrigatória por pelo menos um revisor, Checks de lint e testes automatizados</values>
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
            <name>security_constraints</name>
            <subProperty>authentication_method</subProperty>
            <values>OAuth2 (externo, não implementado neste módulo)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Gravação restrita à aba e frame autorizados, Scripts injetados somente após validação do estado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Dados de gravação armazenados localmente, sem criptografia explícita</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável diretamente (extensão Chrome)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Nenhuma criptografia implementada para armazenamento local</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Atualizações de gravação e injeção de scripts devem ocorrer em milissegundos para não impactar UX</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência na captura de eventos, Minimizar overhead em abas não gravadas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de chrome.storage.local para persistência leve</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto do navegador e número de abas abertas</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados via throw, sem padrão estruturado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso mínimo de console.log, sem sistema de logging estruturado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não implementado neste módulo</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento básico via checagem de estados e retornos antecipados</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>chrome.* APIs, ../Common/utils</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com Chrome 90+</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../Common/utils</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta de tratamento robusto de erros, Ausência de logging estruturado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível condição de corrida em atualizações assíncronas, Dependência forte da API Chrome limita testes locais</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Eventos de navegação frequentes podem gerar overhead</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Estável, sem migrações em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Assincronismo correto, Manutenção do estado da gravação, Segurança na injeção de scripts</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para funções públicas e eventos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, sem excesso</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de chrome.storage.local para persistência, Separação clara entre background e content scripts</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Chrome Extensions Messaging API</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito no código</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Mensagens JSON simples entre scripts</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Desenvolvimento local, Produção via Chrome Web Store</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Extensão Chrome empacotada e publicada</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitação ao ambiente do navegador Chrome, Dependência da API Chrome Extensions</values>
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
        <summary>Este arquivo de código é um módulo utilitário para gerenciamento de estado e operações relacionadas a gravação de sessões em extensões de navegador, utilizando APIs do Chrome e compatibilidade com o namespace browser para manifest v2 e v3. Ele oferece funções para iniciar e finalizar gravações, armazenar preferências do usuário, criar abas, executar scripts em contextos específicos e identificar ambientes de teste Cypress. O código manipula o armazenamento local do navegador para persistir estados e configurações, além de interagir com frames e tabs para controlar o fluxo de gravação e limpeza de recursos. A abordagem híbrida para execução de scripts e consulta de abas garante compatibilidade entre diferentes versões de manifest, enquanto o uso de promises e async/await facilita o controle assíncrono. O módulo é fundamental para orquestrar o comportamento da extensão em relação à captura e manipulação de sessões de navegação, garantindo a integridade do estado e a integração com testes automatizados Cypress.</summary>
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
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Persistência correta do estado de gravação, Execução segura de scripts em frames específicos, Identificação precisa de abas de teste Cypress</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Chrome Extensions API, WebExtensions API</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>chrome.storage.local (local storage)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>Cypress Testing Framework</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Modular Utility Functions, Facade Pattern for API abstraction</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/utils - funções utilitárias para armazenamento e execução de scripts, src/background - lógica de background da extensão</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre manipulação de storage, execução de scripts e controle de tabs</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript e compatibilidade com WebExtensions</values>
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
            <values>Strict TypeScript checking enabled</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/unit/utils, tests/integration/background</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 80% cobertura</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then, Mocking APIs do navegador</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para chrome.* APIs, Fixtures para estados de storage</values>
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
            <values>Lint, Testes unitários, Build e deploy para ambiente staging</values>
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
            <values>npm run watch</values>
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
            <values>Nenhum método explícito no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle implícito via permissões da extensão no manifest</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Nenhum dado sensível manipulado diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável no contexto de extensão</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações assíncronas devem ser rápidas para não impactar UX</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Baixa latência em armazenamento local e execução de scripts</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso do chrome.storage.local para persistência local</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto de extensão de navegador</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Uso básico de rejeição de promises com Error objects</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado explicitamente no código</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Rejeição de promises para falhas, sem retries automáticos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>chrome.* APIs, browser.* APIs para compatibilidade</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Nenhum pacote externo identificado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com manifest v2 e v3</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Módulos utilitários internos para storage e execução de scripts</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento de erros pode ser melhorado, Compatibilidade entre manifest v2 e v3 pode gerar complexidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possíveis race conditions em operações assíncronas de storage</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum gargalo crítico identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração parcial para manifest v3 em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência no uso de async/await, Tratamento adequado de erros, Compatibilidade cross-browser</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para funções públicas e contratos de storage</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos, sem excesso de verbosidade</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de feature detection para compatibilidade entre APIs chrome e browser</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>WebExtensions API</values>
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
            <values>Development, Staging, Production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Publicação via Chrome Web Store</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhum variável sensível no código analisado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações inerentes a extensões de navegador e APIs disponíveis</values>
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
        <path>src/pages/Popup/Popup.tsx</path>
        <name>Popup.tsx</name>
        <summary>Este arquivo implementa um componente React para uma extensão de navegador que permite a gravação, visualização e gerenciamento de scripts de teste automatizados baseados em ações do usuário no navegador. Ele oferece uma interface para iniciar e finalizar gravações, alternar entre visualização de ações e código gerado em diferentes bibliotecas (Cypress, Playwright, Puppeteer), além de gerenciar o estado da gravação e integração com abas do navegador. O componente coordena interações com APIs do navegador, manipula estados locais e globais, e integra funcionalidades auxiliares para geração de código, cópia para clipboard e análise de uso, proporcionando uma experiência fluida para criação de testes automatizados sem necessidade de codificação manual.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Browser Test Recorder Extension, Extensão para gravação e geração de scripts de teste automatizados</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de Testes, QA, Test Automation, Browser Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Gravação precisa das ações do usuário, Geração correta de código compatível com bibliotecas suportadas, Persistência da preferência de biblioteca, Sincronização correta com abas do navegador</values>
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
            <values>Chrome Extension APIs, Analytics Service (custom)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Component-Based Architecture, Hooks Pattern, Modular Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>Common - componentes e utilitários compartilhados, Content - componentes específicos de conteúdo, Builders - geração de código, Popup - componente principal da UI da extensão</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para componentes e funções, PascalCase para tipos e enums, snake_case para arquivos CSS</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre UI, lógica de gravação, geração de código e utilitários, Dependências unidirecionais para evitar acoplamento circular</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras padrão Airbnb e customizações para React</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para React/TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções e componentes principais</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript com tipagem explícita em componentes e hooks</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Jest 29, React Testing Library</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Testes localizados em pastas __tests__ próximas aos componentes</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80% para componentes críticos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Arrange-Act-Assert (AAA), Testes unitários e de integração</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para APIs do navegador e módulos auxiliares</values>
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
            <values>Build e testes automatizados no push, Deploy automático para ambiente de staging</values>
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
            <values>Nenhum método de autenticação implementado no componente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de acesso baseado em contexto do navegador e aba ativa</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>URLs das abas e frames tratados com cuidado, sem exposição externa</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Gerenciados pelo navegador, não aplicável diretamente</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Nenhuma criptografia implementada no código analisado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Interação UI deve ser responsiva, atualizações de estado rápidas</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Prioridade para experiência do usuário fluida e baixa latência</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Persistência local de preferências via storage do navegador</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto de extensão de navegador</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados como exceções JavaScript padrão</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de analytics para eventos, sem logging explícito de erros</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Analytics customizado para rastreamento de uso</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Tratamento básico via try/catch implícito, sem fallback robusto</values>
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
            <values>../Common, ../Content, ../builders, ./analytics</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Tratamento de erros assíncronos pode ser melhorado, Documentação interna pode ser expandida</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência de APIs específicas do navegador pode limitar compatibilidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Nenhum gargalo crítico identificado no código analisado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento detectada</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na separação de responsabilidades, Uso correto de hooks e estados, Tratamento adequado de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para componentes e hooks principais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e em português para contexto</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de React Functional Components e hooks para estado e efeitos, Separação entre UI e lógica de gravação</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>APIs do navegador Chrome Extension</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Sem versionamento explícito no código da extensão</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Promises e callbacks padrão do JavaScript</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Desenvolvimento local, Produção via Chrome Web Store</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Extensão Chrome empacotada e publicada</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhuma variável sensível exposta no código</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações inerentes a extensões de navegador, como permissões e APIs disponíveis</values>
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
        <path>src/pages/Common/migration.ts</path>
        <name>migration.ts</name>
        <summary>Este arquivo contém funções utilitárias para garantir a integridade temporal de objetos do tipo Action, focando na migração e validação de timestamps. A função migrateActionsTimestamp adiciona timestamps baseados em Date.now() para ações que não possuem ou possuem timestamps inválidos, aplicando um incremento de 100ms entre cada ação para simular intervalos naturais. Já a função validateActionTimestamps corrige timestamps negativos, inválidos ou desordenados, garantindo uma sequência temporal coerente e emitindo alertas via console para inconsistências detectadas. Essas operações são essenciais para manter a consistência temporal dos dados de ações, facilitando o processamento correto em sistemas que dependem de ordenação cronológica, como logs, eventos ou auditorias. O código é escrito em TypeScript, utiliza tipagem estática e segue boas práticas de imutabilidade e transformação funcional de arrays, integrando-se a um sistema maior que manipula ações com propriedades temporais.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Timestamp Migration and Validation Utility</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Software Development, Event Processing, Action Logging</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>All actions must have valid, non-negative, and sequential timestamps</values>
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
            <values>Functional Programming, Modular Design</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/types - definição de tipos, src/utils - funções utilitárias para manipulação de dados</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos e funções utilitárias, Dependência unidirecional de tipos para funções</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
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
            <values>Jest 29</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>tests/utils - testes unitários para funções utilitárias</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>&gt;= 90% cobertura para funções críticas</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>AAA (Arrange, Act, Assert)</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para Date.now() para controle de tempo em testes</values>
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
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar latência na validação e migração de timestamps</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Operações em arrays grandes devem ser eficientes e imutáveis</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Uso de console.warn para alertas de timestamps inválidos</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Correção automática de timestamps inválidos e negativos</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>Type definitions from &apos;../types&apos;</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>TypeScript &gt;= 4.9</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Uso incorreto de &apos;number.isFinite&apos; ao invés de &apos;Number.isFinite&apos;</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência do relógio do sistema pode causar inconsistências</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Função migrateActionsTimestamp implementada e em uso</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Validação de tipos e imutabilidade, Cobertura de testes para casos de timestamp</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Uso consistente de JSDoc para funções públicas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos em português</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Separação entre migração e validação de timestamps para clareza e manutenção</values>
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
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Quero fazer uma adição na nossa aplicação, que lá nós temos o botão "Ver última gravação", só que ao invés de "Ver última gravação", eu quero que o botão seja "Ver gravações". Ele vai abrir na última, porém, eu quero que você use a memória que tem disponível para Chrome Extension V3 e quero que todas as gravações você salve elas pelo nome do site com a data de dia, mês, ano e hora que foi feita a gravação e minuto que foi feita a gravação, vai ser esse o nome. Então, a gente vai ter salvo no banco as ações, o código já para os três tipos que tem, para o Pupiter, para o Bright e para o Cypress, e aí nós vamos poder navegar entre as gravações e quando clicar nelas, aí sim vai ter aquela tela que atualmente é a tela que está escrito no título, último teste, código gerado, que daí vai mudar esse título pelo título da gravação e que daí vai abrir essa tela que hoje nós temos. E aí o voltar, a partir desse ponto vai ser voltar para aquele histórico que a gente pode selecionar ou pesquisar do histórico e nós vamos ter um histórico em que as coisas são salvas nesse histórico a partir de agora.

Último plano: Implementaremos um histórico persistente de gravações com nomes ricos em contexto temporal, atualizaremos a UI da extensão (Popup e Content) e adaptaremos o armazenamento em chrome.storage.local para guardar múltiplas sessões. O plano abaixo detalha, em 10 Q&A, como integrar, armazenar, exibir e validar essa nova funcionalidade.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Precisamos deixar de exibir apenas a última gravação e oferecer lista de sessões persistentes. Criaremos src/storage/recording-store.ts com classe RecordingStore (Singleton) que salva cada recording sob chave prefixada "recording:{hostname}:{yyyy-MM-dd_HH-mm}". No Popup.tsx, substituímos botão por <ViewHistoryButton/> que usa chrome.runtime.sendMessage({cmd:'OPEN_HISTORY'}). Um HistoryPage.tsx será injetado em shadow DOM mostrando lista e navegando para DetailPage.tsx reaproveitando código existente, alterando cabeçalho dinamicamente.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Novo tipo RecordingEntry em src/types/recording.d.ts: { id: string; title: string; url: string; startedAt: number; actions: Action[]; code: { cypress: string; playwright: string; puppeteer: string; } }. RecordingStore usa chrome.storage.local.set/get com chave estática "recordings" contendo Record<string, RecordingEntry>. Operações expostas: save(entry), list():Promise<RecordingEntry[]>, get(id), remove(id). Salva incrementalmente via batching debounce 200 ms para minimizar I/O.

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: 1) recorder.ts: no endRecording() gera id e chama RecordingStore.save(). 2) Popup/Popup.tsx: import { list } from '../storage/recording-store' para mostrar count no badge. 3) Background/index.ts: intercepta mensagem OPEN_HISTORY e cria tab chrome.tabs.create({url:'history.html'}). 4) Content/index.tsx: Header component lê props.title e exibe gravação selecionada. 5) builders/genCode.ts permanece inalterado, apenas output guardado no RecordingEntry.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: • Falha de quota (>=5 MB): implementar pruneOld(max=50) apagando gravações mais antigas. • Hostname vazio (arquivos locais): usar 'localfile'. • Colisão de id (duas gravações no mesmo minuto): adicionar sufixo _n++. • Versões antigas sem RecordingEntry: migrateLastRecording() converte chave legacy 'lastRecording' em RecordingEntry e move para store. • Falha de deser. JSON: try/catch e fallback [].

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Criar src/config/history.config.ts exportando interface HistoryConfig { maxEntries:number; pruneStrategy:'drop-oldest'|'error'; } e defaults { maxEntries:100, pruneStrategy:'drop-oldest' }. RecordingStore lê chrome.storage.local.get('historyConfig') ou usa default. Futuras customizações (ex: sync cloud) poderão implementar interface HistoryBackend extendendo IHistory.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Camadas: UI (HistoryPage.tsx, DetailPage.tsx) -> Service (RecordingService.ts façade) -> Storage (RecordingStore.ts Singleton) -> chrome.storage.local. Padrões: Factory para criar HistoryBackend, Observer em RecordingStore (listeners para updates), Router simples baseado em queryString page=history|detail&id=xxx. Diagrama: Popup → router → (HistoryPage ↔ RecordingService ↔ RecordingStore) and (DetailPage ↔ RecordingService).

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Listagem: paginar 30 itens, virtualizada via react-window. Storage: O(1) para get/save usando objeto indexado. Batching writes evita até 90% de operações. DetailPage lazy-loads código grande (>200 KB) com dynamic import('react-syntax-highlighter'). Histórico com 100 entradas ocupa <3 MB. Monitoramos chrome.storage.onChanged para diff e renderização seletiva (memo).

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Sanitizar title usando encodeURIComponent, validar actions.length≤10 000, bloquear gravação de campos type='password'. Message passing: validar sender.id===chrome.runtime.id para OPEN_HISTORY. storage.get retorna deep clone para evitar mutação externa. Manifest.json mantém "storage" permission apenas. Sem dados pessoais, mas removemos query params sensíveis ao salvar url (stripSearch=true config).

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: tests/storage/recording-store.test.ts usa jest-mock-chrome para set/get, cobre save, list, pruneOld (95% coverage). Component: tests/popup/history-page.test.tsx com React Testing Library, mock store list() retornando 3 gravações, valida click → route detail. Integration: Playwright e2e abre extensão, grava sessão, verifica history list count++. Regression: migrates legacy lastRecording. CI exige 85% global coverage.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) Botão mostra "Ver gravações". 2) Após 3 gravações, history lista 3 itens com títulos corretos. 3) Clicar item navega ao detalhe com header=title. 4) Voltar retorna history. 5) Chrome reload mantém histórico. 6) Quota excedida remove antigos sem erro. Métricas: tempo de abertura history <150 ms (p95), armazenamento por gravação <40 KB. Documentação atualizada em README e JSDoc.
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