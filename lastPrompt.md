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
    <name>DeploySentinel Recorder - extensão para gravação de interações e geração automática de scripts de teste</name>
    <domain>Web Development, Frontend Development, Browser Extensions, Automated Testing, End-to-End Testing, Browser Automation, UI Components, DevOps, Continuous Deployment, Monitoring, Web Analytics, Developer Tools, Web Automation, Quality Assurance, UI Debugging, CSS Selector Highlighting, Web UI Testing, Shadow DOM, Build Automation, JavaScript, Node.js environment management, Cross-browser compatibility</domain>
    <current_phase>Development, Production, Stable Release, Active Maintenance, MVP, Stabilization</current_phase>
    <critical_business_rules>Preserve fast refresh functionality, Ensure JSX transpilation compatibility, Build must generate consistent artifacts, Do not break deploy pipeline, Accurate and complete capture of user events, Correct and readable script generation, Compatibility with multiple test frameworks, Consistent test execution, TypeScript support via ts-jest, Node.js environment for testing, Accurate and faithful test script generation, Compatibility with multiple browsers, Maintain integrity of captured data, Ensure accurate capture of user interactions, Generate scripts compatible with Cypress, Playwright, and Puppeteer, Maintain security and privacy of captured data, Recording must be started and finished correctly, Navigation events must be captured only in the correct tab and frame, Injected scripts must execute only in authorized context, Strict validation of message origin, Secure communication between webapp and extension, Visual consistency of the icon, Compatibility with React 18+, Correct SVG rendering, Ensure external links open in new tab, Maintain brand visual consistency, Avoid improper DOM manipulation, Valid ScriptType selection must be ensured, onChange callback must be called with correct value, Ensure integrity of recorded data, Send code only to authorized tabs, Correct persistence of user preferences, Consistent synchronization of recording state across tabs, Recording state must be consistent, Scripts must execute only in correct frames, Unique identifiers must be persisted, Actions must be displayed in correct order, Only supported actions should be rendered, Selectors must be precise to ensure correct element identification, Correct and precise code generation, Maintain integrity of generated code, Faithful code rendering for analysis, Accurate capture of user actions, Secure handling of sensitive inputs, Reliable code generation for multiple test frameworks, Accurate highlighter positioning, Consistent label rendering, Do not interfere with user interaction, Ensure only one active script instance, Allow complete component cleanup to avoid leaks, Do not register synthetic events, Ignore events from control interface (overlay-controls), Avoid duplicate event registration, Ensure only one recording is active at a time, Do not mount multiple buttons in the DOM, Correct communication with Chrome extension, Ensure recordings are started and finished correctly, Maintain integrity of recorded action data, Do not allow simultaneous recording in multiple tabs without control, Ensure user anonymity, Send event data without impacting UX, Maintain integrity of sent data, Render Popup correctly in designated container, Apply global styles without conflict, Generate unique and valid selectors, Maintain acceptable performance, Avoid ambiguous selectors, Generate valid scripts for multiple frameworks, Maintain correct synchronization with navigation, Preserve state of stateful actions, Do not use invalid IDs for selectors, Prioritize stable selectors to avoid test failures, Ensure correct typing for CSS style imports, Ensure browser API calls are compatible between Chrome and Firefox, Actions must be typed and validated to avoid invalid executions, Maintain integrity of interaction data for traceability, Ensure strict typing to avoid runtime errors, Maintain ES5 compatibility for legacy browsers, Build must run in production mode, Environment variables must be correctly defined, NODE_ENV must always be set, PORT must be a valid number, Hot Module Replacement must be enabled for dev mode, Dev server must serve assets with CORS headers, Manifest version consistency, Environment variable integrity, Asset path correctness</critical_business_rules>
  </project_metadata>
  <technical_stack>
    <primary_language>TypeScript, JavaScript ES6+, JSX, Node.js, JSON</primary_language>
    <frameworks>React 18, Webpack 5, Babel 7, Cypress, Playwright, Puppeteer, Jest, ts-jest, Chrome Extensions API (Manifest V2 and V3), APIs WebExtensions, ReactDOM, FontAwesome SVG Core, WebpackDevServer</frameworks>
    <databases>chrome.storage.local</databases>
    <external_services>Chrome Web Store, Firefox Add-ons Marketplace, GitHub Actions, DeploySentinel Webapp, https://www.deploysentinel.com, Chrome Extensions API, Chrome Storage API, APIs WebExtensions Chrome and Firefox, Chrome Extension Messaging API, DeploySentinel Analytics, Google Analytics Measurement Protocol API, FontAwesome CDN, Firefox WebExtension API, Browsers headless control APIs via Puppeteer/Playwright/Cypress, Node.js environment, Chrome APIs</external_services>
    <package_manager>npm, yarn</package_manager>
  </technical_stack>
  <architecture_patterns>
    <design_pattern>Modular Build Configuration, Pipeline, Observer Pattern, Event-driven Architecture, Modular Architecture, Configuration Object Pattern, Component-based UI, Script-driven build pipeline, Modular Chrome Extension Pattern, Service Worker, Content Script Injection, Message Passing, Controlled Component Pattern, Custom React Hooks, Adapter Pattern, Declarative UI, Separation of Concerns, Hook-based State Management, Functional Components, Singleton, Shadow DOM Encapsulation, Factory Pattern, Strategy Pattern, Middleware Pattern, Plugin Pattern</design_pattern>
    <folder_structure>Config files in root or config folder, Source code in src/, build/, dist/, assets/ - images and icons, tests/ - E2E tests, dist/ - builds for Chrome and Firefox, utils - build and server utility scripts, background/ - background scripts, content_scripts/ - injected scripts, popup/ - extension UI, Common/utils - shared utility functions, src/components - reusable UI components, src/types - TypeScript type definitions and enums, builders - code generation logic, src/hooks - custom hooks, src/utils - state and tab management utilities, types/ - type definitions and enums, builders/ - selector and code generation helpers, components/ - reusable React components, styles/ - CSS files, src/builders - code generation logic, /Common - shared hooks and utilities, /types - TypeScript type definitions, src/components/Highlighter - visual component and styles, ./ControlBar - main React component, ../Common - shared styles, root - bootstrap and injection script, Content - recording content components, Popup - extension popup UI, Common/utils for utility functions, analytics module for events, ./Popup (component), ./index.css (local styles), ../Common/styles.css (shared styles), test/ - unit tests, src/actions - action and type definitions, config/ - centralized configuration files, scripts/ - automation scripts, src/pages - extension-specific scripts (Popup, Background, Content, Bridge, CypressTrigger), src/assets - static resources</folder_structure>
    <naming_conventions>camelCase for variables and functions, PascalCase for React components, kebab-case for files, PascalCase for types and interfaces, snake_case for config files, UPPER_SNAKE_CASE for enums and constants, Descriptive names for scripts and assets, prefix use for hooks, PascalCase for classes, kebab-case for CSS classes, CamelCase for classes and functions, *.css for style files, declaration.d.ts for global declarations, PascalCase for classes and plugins, CamelCase for files and folders, Extensions indicate language (.jsx, .tsx, .ts)</naming_conventions>
    <module_boundaries>Separation between config and source code, Plugins isolated from presets, Clear separation between source code and generated artifacts, Clear separation between event capture, script generation, and extension UI, Independent modules for Chrome and Firefox, Isolated configuration for Jest, Clear separation between frontend (React) and build scripts, Dependencies isolated by environment (devDependencies vs dependencies), Clear separation between background scripts, content scripts, and UI (popup), Communication via Chrome Runtime messages, Clear separation between utilities and background logic, Injected scripts isolated by tab and frame context, Clear separation between extension code and webapp code, Components isolated with props for communication, Types imported for consistency, Clear separation between state management, code generation, and runtime communication, Clear separation between hooks, utilities, and types, Unidirectional dependency from hooks to utils and types, Clear separation between storage handling, script execution, and tab control, Clear separation between types, builders, and components, UI components separated from business logic, Builders isolated for selector and code generation, Common utilities shared across modules, Highlighter component isolated with explicit style import, Clear separation between UI (ControlBar) and bootstrap script, Shadow DOM isolation for UI performance, Unidirectional dependency to avoid circular coupling, Custom hooks for shared state, Analytics module isolated, dependent only on external utils, Clear separation between components and styles, Unidirectional dependency from Popup component to styles, Clear separation between utility functions, search logic, and optimization, Clear separation between TypeScript code and static CSS files, Clear separation between compatibility modules and business logic, Specific classes for each ActionType, Clear separation between source code and build, Module resolution via Node.js, Clear separation between configuration (webpack.config.js) and execution (build script), Isolated configuration module, no external dependencies, Clear separation between extension scripts and assets, Use of aliases for secret modules</module_boundaries>
  </architecture_patterns>
  <code_standards>
    <style_guide>Airbnb JavaScript/TypeScript Style Guide, Prettier</style_guide>
    <linting_rules>ESLint with React plugin, ESLint with TypeScript rules, ESLint with plugins for React, JSX Accessibility, import, and React Hooks, TypeScript strict mode enabled, No explicit use of any, Prohibition of implicit any, ESLint with Airbnb standard rules</linting_rules>
    <formatting>Prettier with default settings, singleQuote: true, trailingComma: es5, printWidth: 80, arrowParens: always</formatting>
    <documentation_style>JSDoc for functions and components, JSDoc for public functions and complex methods, Inline comments for complex logic, TypeScript typing for implicit documentation</documentation_style>
    <type_checking>Strict TypeScript, Strict TypeScript typing, Strict TypeScript with explicit typing in components and functions, Strict TypeScript (noImplicitAny, strictNullChecks), Extensive use of types and enums</type_checking>
  </code_standards>
  <testing_strategy>
    <test_framework>Jest, Playwright test Runner, React Testing Library</test_framework>
    <test_structure>__tests__ folders colocated with components, tests/unit/ for unit tests, tests/e2e/ for end-to-end tests, Test files with .test.tsx extension</test_structure>
    <coverage_requirements>Minimum 80% coverage, Minimum 80% coverage for UI components and hooks</coverage_requirements>
    <test_patterns>AAA (Arrange-Act-Assert), Given-When-Then, Snapshot testing for visual components, Mocking of hooks and Chrome APIs</test_patterns>
    <mocking_approach>jest.mock for modules, Mocks for browser APIs, Fixtures for input data, Mocks with Jest and ts-jest, Mocks for chrome.runtime and window.postMessage, Mocks for external dependencies, Mocks for Chrome APIs and DOM events</mocking_approach>
  </testing_strategy>
  <development_workflow>
    <branch_strategy>GitHub Flow, git Flow</branch_strategy>
    <commit_conventions>Conventional Commits</commit_conventions>
    <pr_requirements>Code review mandatory, CI checks, Checks for lint and automated tests, Mandatory review and approved automated tests</pr_requirements>
    <ci_cd_pipeline>Linting, Build, Testing, Deploy, Automated build, lint, test, and deploy via GitHub Actions, Deploy to Chrome and Firefox</ci_cd_pipeline>
  </development_workflow>
  <commands>
    <setup>npm install, yarn install</setup>
    <install>npm install, yarn install</install>
    <dev>npm start, npm run dev, yarn start, yarn run start-chrome, yarn run start-ff, webpack --mode development --watch</dev>
    <test>npm test, yarn test, npm run test</test>
    <build>npm run build, yarn build, yarn run build-chrome, yarn run build-ff, webpack --mode production</build>
    <lint>npm run lint, eslint src/ --ext .ts,.tsx, eslint ., yarn lint</lint>
    <format>npm run format, prettier --write src/, prettier --write ., yarn format</format>
  </commands>
  <security_constraints>
    <authentication_method>OAuth2 via DeploySentinel Webapp, OAuth2 via Chrome Extension permissions</authentication_method>
    <authorization_rules>Recording restricted to authorized tab and frame, Injected scripts only after state validation, Message origin validation, Restricted permissions in the extension, Access control via browser context and extension permissions</authorization_rules>
    <sensitive_data>Recording data stored locally without explicit encryption, Test URLs, Recording codes, User recording data handled with care, Unique identifiers stored locally without encryption, Password inputs are masked in display, isPassword flag for sensitive data handling, Client ID generated anonymously, no personal data</sensitive_data>
    <security_headers>Content-Security-Policy for messaging, Recommended use of rel=&quot;noopener noreferrer&quot; for external links, Default Chrome Extension headers, Managed by browser and extension</security_headers>
    <encryption_requirements>No encryption implemented for local storage, TLS for web communication, Secure communication via internal Chrome messages</encryption_requirements>
  </security_constraints>
  <performance_requirements>
    <response_time_limits>Recording updates and script injection must occur in milliseconds to avoid UX impact, Messages processed in &lt; 100ms, Instant component rendering, Asynchronous operations with Promises to avoid blocking, UI update with throttling for mouse events (100ms), Real-time event processing with debounce for resize, Button interaction must be instant (&lt;100ms), Responsive UI interaction without perceptible blocking, Low latency for selector generation</response_time_limits>
    <optimization_priorities>Developer experience, Fast refresh, Build speed, Bundle size, Low latency in event capture, Efficient memory usage during recording, Performance in event capture, Minimize browser impact, Minimize overhead in non-recorded tabs, Low latency in communication, Clarity and UI legibility prioritized over extreme performance, Fast rendering, Low latency in code generation, Responsiveness of the interface, Minimize impact of listeners, Low computational complexity, Minimize impact on main DOM, Shadow DOM isolation for UI performance, Minimize event listener overhead, avoid duplication, Low latency and minimal UI impact, Speed and UI fluidity prioritized, Low latency in event collection, minimal UX impact, Minimize re-renders, Avoid excessive inline style injection, Balance speed and short/readable selectors, Efficiency in script generation, Minimization of redundant code, Speed and robustness in selector generation, Low latency in action capture and execution, Fast and efficient build, Optimized production build (minification, tree shaking), Fast feedback in development, Minification with TerserPlugin, mangling disabled for debugging</optimization_priorities>
    <caching_strategy>Intermediate build cache, Use of chrome.storage.local for lightweight persistence, Browser cache for static resources, Use of localStorage for temporary persistence, Use of React state for in-memory local cache, No persistent cache implemented, Webpack default caching for incremental builds, Cache disabled for popup.html to ensure update</caching_strategy>
    <scalability_considerations>Task parallelization, Support for long recordings without perceptible degradation, Scalability limited to browser context and number of open tabs, Lightweight, reusable component for multiple instances, Componentization for easy extension and maintenance, Avoid multiple instances to reduce memory usage, Support for continuous recording in SPA applications, Support for multiple frameworks and sequential actions, Extensibility for new action types, Modular configuration to support multiple scripts and assets</scalability_considerations>
  </performance_requirements>
  <error_handling>
    <error_format>Standardized logs, Errors thrown via throw new Error with clear messages, Errors thrown via promise reject with clear messages, Try-catch to avoid visible user failures, Immediate error throw on build failure, Fallbacks for unsupported script types</error_format>
    <logging_strategy>console logs, Local logs for debug during development, Error reports via CI, Minimal use of console.log, no structured logging system, Implicit use of console and analytics for monitoring, Logs for critical errors</logging_strategy>
    <monitoring_tools>GitHub Actions for build and test monitoring, DeploySentinel Analytics integrated, Possible integration with external tools, Chrome extension monitoring tools</monitoring_tools>
    <error_recovery>Automatic retry on build failures, Recovery from recording failures with restart option, Basic handling via state checks and early returns, Promise rejection for critical failures, no explicit fallback, Listeners correctly removed to avoid leaks, Function cleanUp to unmount and release resources, Avoid duplication and invalid events to maintain integrity, Retry for DOM element selection with attempt limit, Basic handling via React states and UI messages, Fallbacks for alternative selectors, Hot Module Replacement for fast error recovery in development</error_recovery>
  </error_handling>
  <dependencies_context>
    <critical_dependencies>react-app preset, react-hot-loader, Webpack, Babel, Node.js, Chrome and Firefox extension APIs, Supported test frameworks, @jest/types, ts-jest, react, typescript, jest, playwright, webpack, babel, chrome.runtime, chrome.storage, chrome.contextMenus, chrome.webNavigation, deploysentinel.com API, ../Common/utils, window.postMessage, React 18, ScriptType enum, localStorageGet and setEndRecordingStorage utils, builders genCode, Chrome Storage API, APIs chrome and browser for WebExtensions, Playwright selectors, type definitions, react-syntax-highlighter, genCode function, Recorder, Selector builders, Highlighter.css, ReactDOM, FontAwesome, Shadow DOM API, chrome.storage.local, lodash.debounce, genSelectors, Chrome Extension Messaging API, react-copy-to-clipboard, getRandomInstallId, Google Analytics API, react-dom, @fortawesome/fontawesome-svg-core, DOM browser API, @playwright/test, puppeteer, cypress, finder module, TypeScript, css-loader (Webpack), chrome API, webpack.config.js, process.env (Node.js), webpack-dev-server, path, env, clean-webpack-plugin, copy-webpack-plugin, html-webpack-plugin, terser-webpack-plugin</critical_dependencies>
    <deprecated_packages>No deprecated packages identified, Mixed use of chrome and browser may indicate ongoing migration</deprecated_packages>
    <version_constraints>Compatibility with recent Chrome and Firefox versions, Compatibility between Jest 29.x and ts-jest, React &gt;=18.0.0, TypeScript &gt;=5.0, Manifest Version 3, Chrome Extensions API compatible, TypeScript &gt;=4.9, Compatibility with manifest v2 and v3, lodash.debounce compatible with lodash 4.x, Target ES5, Module ESNext, Compatibility with Webpack 5 and Node.js 16+</version_constraints>
    <internal_packages>../Common/utils, Internal modules of DeploySentinel extension, ../types (ScriptType), ./utils, ../builders, ../types, ../builders/selector, ./recorder, ./Highlighter, ./ActionList, ./CodeGen, Highlighter.css (local styles), ./ControlBar, ../Common/styles.css, ../Common/Icon, ../Common/hooks, ../Common/endRecording, Common, Content, Popup, builders, types, ./Popup, ./selector, ./finder, ./env, ../webpack.config, ./utils/env, secrets.{env}.js</internal_packages>
  </dependencies_context>
  <current_challenges>
    <technical_debt>Build scripts not fully modularized, Limited support for file upload capture, Dependency on Manifest V2, which is being deprecated, Lack of robust error handling, No structured logging, Use of inline styles may hinder maintenance, Complex state management may grow with new features, Lack of memoization to avoid unnecessary re-renders, Improve error handling and fallback for browsers without exportFunction, Strong dependency on Chrome Extensions environment, Bug fix for multiple mounting in Firefox, Async error handling can be improved, Limited internal documentation, Limited optimization for very complex selectors, Incomplete dragAndDrop implementation in Cypress, Hardcoded configuration for localhost and fixed port, Extensive configuration may hinder maintenance</technical_debt>
    <known_issues>Potential incompatibility of react-hot-loader with React 18+, Limitations in capturing hover events in some contexts, Possible race condition in async updates, Strong dependency on Chrome API limits local testing, Exclusive dependency on Chrome, Missing rel=&quot;noopener noreferrer&quot; in external links, Strong dependency on chrome.runtime API, chrome.storage API dependency limits use outside extension environment, Lack of error handling in some Promises, Dependency on browser-specific APIs may limit portability, Dependency on external styles may cause visual failures, Possible incompatibility with unsupported browsers, TypeScript typing ignored in shadowRoot, Possible event loss in concurrency cases, Possible failure to locate DOM elements in custom environments, Possible inconsistency when switching tabs during recording, no-cors mode limits failure detection in requests, Possible performance impact from inline styles, Performance may drop in documents with many similar elements, Exposure of action object via getter (FIXME comment), Selectors may not be unique in apps with unreliable IDs, Differences between Chrome and Firefox APIs may cause incompatibilities, Host check disabling may cause security risks, Possible secrets leakage if not managed correctly</known_issues>
    <performance_bottlenecks>Slow build in large projects, Possible browser performance impact due to continuous script injection, Frequent navigation events may cause overhead, Script execution may impact performance in tabs with many frames, Frequent mouse events mitigated by throttling, Global event listeners may impact performance, Polling for retrySelector may impact performance if maxRetries is high, Multiple inline style injections may affect rendering, Combinatorial selector generation and multiple querySelectorAll validations, Selector generation in very large DOMs may be slow, Minification disables mangling for easier debugging, impacting final size</performance_bottlenecks>
    <migration_status>Stable, no migrations in progress, Partial migration to manifest v3 evidenced by conditional API usage</migration_status>
  </current_challenges>
  <team_preferences>
    <code_review_focus>Preserve hot reload functionality, Code style consistency, Performance, Maintainability, Code clarity and readability, Test coverage, Strong typing maintenance, Conformance to code standards, Code quality, Security in data handling, Clear separation of responsibilities, Correct use of Chrome APIs, Proper async handling, Recording state maintenance, Script injection security, Origin validation security, Clear module communication, Visual consistency, Rendering performance, Component simplicity, External link security, Error handling, Communication security, State consistency, Correct use of hooks, Side effect handling, Consistency in chrome/browser API usage, Proper error handling, Conditional rendering clarity, Correct use of types, Action order maintenance, Performance and accessibility, Typing clarity, No side effects, Correct use of cleanUp, No multiple instances, Event duplication and strong typing verification, Consistency of hooks, state handling, and Chrome messages, State management clarity, UI consistency, Silent error handling, Correct use of async/await, Anonymity maintenance, Style consistency, Correct use of HMR, Component rendering clarity, Search logic clarity, Code generation clarity, Selector generation robustness, Typing and CSS integration consistency, Cross-browser compatibility, Type consistency, Action modeling clarity, Conformance to TS and React standards, Build configuration verification, HMR and environment variable configuration verification, Correct configuration of aliases and loaders, Secrets usage security</code_review_focus>
    <documentation_requirements>Document config changes, Document build scripts, Clear documentation for internal APIs and extension usage, Clear documentation for configurations and tests, Clear documentation in JSDoc, Explanatory code comments, Clear documentation for internal APIs and capture flow, Clear documentation for public functions and events, Clear documentation for messaging APIs, Minimal documentation for simple components, Clear documentation for reusable components, JSDoc for components and functions, Clear documentation for hooks and types, Clear documentation for utility functions and data contracts, Document new action types and components, Clear documentation for public functions and components, Clear documentation for complex components and functions, Props and behavior documentation, Document global functions and Firefox integration, Document public functions and complex flows, Clear documentation for React hooks and components, Clear comments in complex functions, Custom hook documentation, Simple and clear comments, Document React components with JSDoc, Clear documentation for public functions and config options, Explanatory comments for complex actions, Document attribute selection criteria, Document global types and modules, Document aliases and compatibility limitations, Document classes and enums with JSDoc, Inline documentation with JSDoc, Clear documentation for build scripts, Clear documentation for development environment configuration, Minimal inline documentation, focus on clear configuration</documentation_requirements>
    <communication_style>Clear and concise comments, Objective and explanatory comments, Use of PRs for discussion, Objective and informative comments, Objective and technical comments, focus on behavior and impact, Objective and technical comments, Objective and clear comments, Objective and direct comments, Technical comments in Portuguese, technical terms in English, PRs with detailed description, Clear and objective comments, use of Portuguese for context, Clear and objective comments, use of JSDoc, Objective comments and use of technical English for specific terms, Use of English for technical terms, Inline comments to describe generated actions, Clear and objective in Portuguese with technical terms in English, Succinct and objective comments</communication_style>
    <decision_log>Opted for react-app preset for simplicity, Enabled react-hot-loader for dev experience, Chose TypeScript for type safety, Multi-platform support (Chrome and Firefox), Adopted ts-jest for TypeScript testing, Use of manifest v2 and v3 for compatibility, Adopted React and TypeScript for UI, Adopted Manifest V2 for current compatibility, Use of content scripts for granular capture, Use of chrome.storage.local for persistence, Clear separation between background and content scripts, Use of messages for integration between webapp and extension, Use of SVG for scalable icons, Stateless functional component for simplicity, Use of enum for script types, Controlled component for better integration, Use of Playwright for script generation, Communication via chrome.runtime.sendMessage, Use of hooks to encapsulate state and persistence logic, Decision to support manifest v2 and v3 simultaneously, Use of Playwright selectors for higher accuracy, Filtering supported actions to avoid errors, Clear separation between code generation and presentation, Use of react-syntax-highlighter for UI, Use of enums for action types and modes, Throttling for event optimization, Functional component for simplicity and performance, Shadow DOM for isolation, Global exposure for external control, Debounce for resize and overlay event filtering, Shadow DOM for button encapsulation in UI, React hooks for shared state, Clear separation between UI and recording logic, Use of Google Analytics for event collection, Anonymous identifier for client ID, HMR for faster development, Penalties to order selectors, Fallbacks to ensure uniqueness, Builders separated by framework, Abstract classes for standardization, Avoid use of id when invalid, Prioritize testIdSelector for tests, declaration.d.ts for CSS Modules support, Alias for Chrome and Firefox compatibility, Enums to ensure valid values, Clear separation between action types, Strict mode to avoid production errors, Webpack for production build, Explicit environment variable definition, HotModuleReplacementPlugin for faster development, TerserPlugin without mangling for easier production debugging</decision_log>
  </team_preferences>
  <api_specifications>
    <api_style>Chrome Extensions Messaging API, Message Passing API via postMessage and chrome.runtime, APIs WebExtensions standard (chrome/browser), Event-driven via DOM and Chrome Runtime messages, HTTP POST via fetch for Google Analytics Measurement Protocol</api_style>
    <versioning_strategy>No explicit versioning in code, Compatibility with multiple manifest versions, Manifest version via MANIFEST_VERSION environment variable</versioning_strategy>
    <response_formats>Simple JSON messages between scripts, JSON objects with properties source, type, code, actions, Promises and standard API callbacks, JSON objects representing user actions</response_formats>
    <rate_limiting>Debounce applied for resize events, No explicit rate limiting implemented</rate_limiting>
  </api_specifications>
  <deployment_context>
    <environments>development, production, staging, Dev: http://localhost, Prod: https://*.deploysentinel.com, Production via Chrome Web Store, Production in extension stores, Local development, Chrome Extensions environment, Browser environment, any compatible DOM</environments>
    <deployment_method>Static hosting, CI/CD pipelines, Docker, Kubernetes, Chrome Web Store, Firefox Add-ons Marketplace, Distribution via zip packages for Chrome and Firefox, Chrome Extension packaging, Publicação em Chrome Web Store e Firefox Add-ons, Webpack Dev Server with HMR</deployment_method>
    <environment_variables>MANIFEST_VERSION, NODE_OPTIONS, BABEL_ENV, NODE_ENV, ASSET_PATH, PORT, npm_package_version</environment_variables>
    <infrastructure_constraints>Browser extension API limitations, Need for separate builds for Chrome and Firefox, Manifest V2 limitations, Manifest V3 limitations for background scripts, Restricted permissions for security, Chrome Extensions API dependency, HTTPS support for external links, WebExtensions environment limitations, Browser API dependency for storage and events, Shadow DOM support limitation, Node.js compatible environment for local builds, Chrome Extension Manifest v3 compatibility</infrastructure_constraints>
  </deployment_context>
</system_architecture>

<project_files>
  <relevant_files>
    <directory path=".">
      <file>
        <path>src/pages/Common/hooks.ts</path>
        <name>hooks.ts</name>
        <summary>Este arquivo contém hooks React customizados que gerenciam preferências do usuário e estado de gravação, utilizando localStorage e a API de armazenamento do Chrome para persistência e sincronização. As funções usePreferredLibrary e usePreferredBarPosition permitem armazenar e recuperar configurações de interface, como biblioteca preferida e posição da barra, garantindo que as preferências sejam mantidas entre sessões. O hook useRecordingState gerencia o estado de gravação de ações do usuário, sincronizando dados entre o armazenamento local e eventos de mudança do Chrome, possibilitando uma experiência reativa e consistente em múltiplas abas. O código foca em manter o estado sincronizado com armazenamento persistente e eventos externos, habilitando personalização e controle de gravação em um ambiente de extensão ou aplicação web.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>User Preferences and Recording State Management</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Web Extensions, User Interface Customization, State Persistence</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Production</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Persistência correta das preferências do usuário, Sincronização consistente do estado de gravação entre abas</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 5.0</values>
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
            <values>Custom React Hooks, Observer Pattern (event listener)</values>
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
            <values>Separação clara entre hooks, utilitários e tipos, Dependência unidirecional dos hooks para utils e types</values>
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
            <values>JSDoc para funções e tipos</values>
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
            <values>tests/hooks - testes unitários para hooks</values>
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
            <values>Mock de localStorage e chrome.storage</values>
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
            <values>Build, lint, test, deploy automatizados</values>
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
            <values>Minimizar latência na leitura e escrita do armazenamento local</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de estado React para cache local em memória</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>React, Chrome Storage API, utils de armazenamento local</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>React &gt;=18.0, TypeScript &gt;=4.9</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./utils, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Falta de tratamento robusto de erros na persistência</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Dependência da API chrome.storage limita uso fora do ambiente de extensão</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência de estado, Uso correto de hooks, Tratamento de efeitos colaterais</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara dos hooks e tipos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários objetivos e técnicos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de hooks para encapsular lógica de estado e persistência</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>development, production</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Docker, CI/CD pipeline</values>
          </property>
        </properties>
      </file>
      <file>
        <path>src/pages/Common/utils.ts</path>
        <name>utils.ts</name>
        <summary>Este arquivo contém um conjunto de funções utilitárias para gerenciar o estado de gravação e preferências do usuário em extensões de navegador baseadas em Chrome e Firefox, utilizando as APIs de armazenamento local e tabs. Ele permite iniciar e finalizar sessões de gravação, armazenar preferências como biblioteca preferida e posição da barra, além de criar novas abas e executar scripts em contextos específicos de abas e frames. O código também inclui mecanismos para identificar se uma aba está rodando testes Cypress, localizar frames específicos e realizar limpeza de estado via scripts injetados. A abordagem híbrida entre as APIs chrome e browser garante compatibilidade entre manifestos v2 e v3, facilitando a integração com diferentes versões de extensões. O arquivo é fundamental para controlar o fluxo de gravação e interação com o navegador, mantendo o estado sincronizado e permitindo extensibilidade para testes automatizados e manipulação dinâmica de abas e frames.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Browser Recording Extension, Extensão para gravação e manipulação de sessões em navegador</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Browser Extensions, Automated Testing, Recording Sessions</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Estabilização</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Estado de gravação deve ser consistente, Scripts devem ser executados apenas em frames corretos, Identificadores únicos devem ser persistidos</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>primary_language</subProperty>
            <values>TypeScript 4.x</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>frameworks</subProperty>
            <values>Nenhum framework frontend específico, APIs WebExtensions</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>databases</subProperty>
            <values>chrome.storage.local (armazenamento local do navegador)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>external_services</subProperty>
            <values>APIs WebExtensions Chrome e Firefox</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Adapter Pattern, Modular Utility Functions</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>src/utils - funções utilitárias para manipulação de estado e abas, src/background - scripts de background da extensão</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>camelCase para funções e variáveis, PascalCase para tipos e interfaces</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre manipulação de armazenamento, execução de scripts e controle de abas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para TypeScript, Sem uso explícito de any</values>
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
            <values>Testes localizados em __tests__ próximos aos módulos</values>
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
            <values>Mock de APIs chrome e browser</values>
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
            <values>Nenhum método explícito no código analisado</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Controle de execução de scripts restrito a abas e frames específicos</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Identificadores únicos armazenados localmente sem criptografia</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>security_headers</subProperty>
            <values>Não aplicável diretamente no código</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>encryption_requirements</subProperty>
            <values>Não implementado no código</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>response_time_limits</subProperty>
            <values>Operações assíncronas com Promises para evitar bloqueios</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Compatibilidade e responsividade em execução de scripts</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso do armazenamento local do navegador para persistência leve</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Escalabilidade limitada ao contexto de extensão de navegador</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Erros lançados via Promise reject com mensagens claras</values>
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
            <values>Rejeição de Promises para falhas críticas, sem fallback explícito</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>APIs chrome e browser para WebExtensions</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>deprecated_packages</subProperty>
            <values>Uso misto de chrome e browser pode indicar migração em andamento</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>Compatibilidade com manifest v2 e v3</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>Nenhum pacote interno identificado</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Compatibilidade entre manifest v2 e v3 pode gerar complexidade</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Falta de tratamento de erros em algumas Promises</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Execução de scripts pode impactar performance em abas com muitos frames</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Migração parcial para manifest v3 evidenciada pelo uso condicional de APIs</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Consistência no uso das APIs chrome/browser, Tratamento adequado de erros</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentação clara para funções utilitárias e contratos de dados</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários técnicos em português, termos técnicos em inglês</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Decisão de suportar manifest v2 e v3 simultaneamente</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>APIs WebExtensions padrão (chrome/browser)</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Compatibilidade com múltiplas versões de manifest</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Promises e callbacks padrão das APIs</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Não especificado</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Desenvolvimento local, Produção em lojas de extensões</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Publicação em Chrome Web Store e Firefox Add-ons</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Nenhum variável de ambiente explícita</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Limitações inerentes a extensões de navegador e APIs WebExtensions</values>
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
        <summary>Este arquivo implementa um componente Recorder que captura e registra interações do usuário na interface web, como cliques, entradas de teclado, arrastes, redimensionamentos e eventos de roda do mouse. Ele monitora eventos DOM em tempo real, filtra eventos irrelevantes ou duplicados, e armazena ações detalhadas com metadados como seletores CSS, timestamps e valores de input, garantindo rastreabilidade precisa das ações do usuário. A integração com armazenamento local do Chrome e comunicação via mensagens permite sincronização e atualização dinâmica do estado de gravação, suportando fluxos de automação e testes end-to-end em aplicações web complexas.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>Recorder de Interações para Automação Web</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Web UI, Gravação de sessões, Automação de navegadores</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Não registrar eventos sintéticos, Ignorar eventos originados da interface de controle (overlay-controls), Evitar duplicidade no registro de eventos</values>
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
            <values>APIs do Chrome Extensions (storage, runtime messaging)</values>
          </property>
          <property>
            <name>technical_stack</name>
            <subProperty>package_manager</subProperty>
            <values>npm</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>design_pattern</subProperty>
            <values>Observer, Singleton-like, Event-driven</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>folder_structure</subProperty>
            <values>builders: geração de seletores, Common: utilitários gerais, types: definições de tipos e enums</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes e funções, snake_case para arquivos não TS, Enums e tipos em PascalCase</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, utilitários e lógica de gravação, Dependência unidirecional para evitar acoplamento circular</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>style_guide</subProperty>
            <values>Airbnb JavaScript Style Guide adaptado para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>linting_rules</subProperty>
            <values>ESLint com regras para evitar any implícito e garantir tipagem forte</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>formatting</subProperty>
            <values>Prettier com configuração padrão para TypeScript</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>documentation_style</subProperty>
            <values>JSDoc para funções públicas e métodos complexos</values>
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
            <values>Testes unitários localizados em __tests__ próximos aos módulos</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Cobertura mínima de 80%</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Given-When-Then para testes comportamentais</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Mocks para APIs do Chrome e eventos DOM</values>
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
            <values>Não aplicável (componente client-side)</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Campos password são identificados e tratados com cuidado</values>
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
            <values>Eventos processados em tempo real com debounce para resize</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Minimizar overhead de escuta de eventos, evitar duplicidade</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Uso de armazenamento local do Chrome para persistência</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a gravação contínua em aplicações SPA</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Não explícito, erros são tratados silenciosamente</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não há logging explícito no código fornecido</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Evita duplicidade e eventos inválidos para manter integridade</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>chrome.storage.local, lodash.debounce, genSelectors</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>version_constraints</subProperty>
            <values>lodash.debounce versão compatível com lodash 4.x</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>../builders/selector, ../Common/utils, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Dependência forte do ambiente Chrome Extensions</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Possível perda de eventos em casos de concorrência</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>performance_bottlenecks</subProperty>
            <values>Escuta global de múltiplos eventos pode impactar performance</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>migration_status</subProperty>
            <values>Nenhuma migração em andamento</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Verificação de duplicidade de eventos e tipagem forte</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Documentar funções públicas e fluxos complexos</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários claros e objetivos, uso de JSDoc</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Uso de debounce para resize e filtragem de eventos overlay</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Event-driven via DOM e mensagens Chrome Runtime</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>versioning_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>response_formats</subProperty>
            <values>Objetos JSON representando ações do usuário</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>rate_limiting</subProperty>
            <values>Debounce aplicado para eventos resize</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environments</subProperty>
            <values>Desenvolvimento local, ambiente Chrome Extensions</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>deployment_method</subProperty>
            <values>Extensão Chrome</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>environment_variables</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>deployment_context</name>
            <subProperty>infrastructure_constraints</subProperty>
            <values>Dependência do ambiente Chrome e permissões de extensão</values>
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
        <summary>Este arquivo implementa um sistema de geração de scripts automatizados para testes de interface web, suportando múltiplos frameworks populares como Playwright, Puppeteer e Cypress. Ele abstrai ações do usuário (click, hover, input, keydown, etc.) em uma estrutura orientada a objetos que traduz essas ações em código específico para cada framework, considerando aspectos como navegação e estado da aplicação. A arquitetura modular permite fácil extensão e manutenção, enquanto a geração condicional de comentários e seletores otimizados melhora a legibilidade e precisão dos scripts gerados, facilitando a automação de testes end-to-end em diferentes ambientes.</summary>
        <properties>
          <property>
            <name>project_metadata</name>
            <subProperty>name</subProperty>
            <values>DeploySentinel Recorder, Gerador de scripts automatizados para testes UI</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>domain</subProperty>
            <values>Automação de testes, Testes end-to-end, Web UI Testing</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>current_phase</subProperty>
            <values>Produção, Manutenção</values>
          </property>
          <property>
            <name>project_metadata</name>
            <subProperty>critical_business_rules</subProperty>
            <values>Gerar scripts válidos para múltiplos frameworks, Manter sincronização correta com navegação, Preservar estado das ações stateful</values>
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
            <values>src/: código fonte principal, types/: definições de tipos, builders/: implementações específicas de geração de scripts</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>naming_conventions</subProperty>
            <values>CamelCase para classes, camelCase para métodos e variáveis, const e enum em UPPER_SNAKE_CASE</values>
          </property>
          <property>
            <name>architecture_patterns</name>
            <subProperty>module_boundaries</subProperty>
            <values>Separação clara entre tipos, builders e utilitários, Dependência unidirecional para evitar acoplamento circular</values>
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
            <values>JSDoc para funções e classes públicas</values>
          </property>
          <property>
            <name>code_standards</name>
            <subProperty>type_checking</subProperty>
            <values>Strict TypeScript, Uso extensivo de tipos e enums</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_framework</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_structure</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>coverage_requirements</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>test_patterns</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>testing_strategy</name>
            <subProperty>mocking_approach</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>branch_strategy</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>commit_conventions</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>pr_requirements</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>development_workflow</name>
            <subProperty>ci_cd_pipeline</subProperty>
            <values>Não especificado no código fornecido</values>
          </property>
          <property>
            <name>commands</name>
            <subProperty>setup</subProperty>
            <values>Não especificado no código fornecido</values>
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
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>authorization_rules</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>security_constraints</name>
            <subProperty>sensitive_data</subProperty>
            <values>Não aplicável</values>
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
            <values>Não especificado</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>optimization_priorities</subProperty>
            <values>Eficiência na geração de scripts, Minimização de código redundante</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>caching_strategy</subProperty>
            <values>Não aplicável</values>
          </property>
          <property>
            <name>performance_requirements</name>
            <subProperty>scalability_considerations</subProperty>
            <values>Suporte a múltiplos frameworks e ações sequenciais</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_format</subProperty>
            <values>Lançamento de erros para tipos de script não suportados</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>logging_strategy</subProperty>
            <values>Não implementado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>monitoring_tools</subProperty>
            <values>Não implementado</values>
          </property>
          <property>
            <name>error_handling</name>
            <subProperty>error_recovery</subProperty>
            <values>Não implementado</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>critical_dependencies</subProperty>
            <values>@playwright/test, puppeteer, cypress</values>
          </property>
          <property>
            <name>dependencies_context</name>
            <subProperty>internal_packages</subProperty>
            <values>./selector, ../types</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>technical_debt</subProperty>
            <values>Implementação incompleta do dragAndDrop no Cypress</values>
          </property>
          <property>
            <name>current_challenges</name>
            <subProperty>known_issues</subProperty>
            <values>Exposição do objeto action via getter (comentário FIXME)</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>code_review_focus</subProperty>
            <values>Clareza na geração de código, Manutenção da tipagem forte, Uso correto de async/await</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>documentation_requirements</subProperty>
            <values>Comentários explicativos para ações complexas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>communication_style</subProperty>
            <values>Comentários inline para descrever ações geradas</values>
          </property>
          <property>
            <name>team_preferences</name>
            <subProperty>decision_log</subProperty>
            <values>Separação de builders por framework, Uso de classes abstratas para padronização</values>
          </property>
          <property>
            <name>api_specifications</name>
            <subProperty>api_style</subProperty>
            <values>Não aplicável</values>
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
    </directory>
  </relevant_files>
</project_files>
</context>
</system_architecture>

<implementation_plan priority="high">
Comando original: Quero fazer uma modificação na nossa extensão. Atualmente, ela captura todos os elementos em que clicamos, o que está ótimo, mas não registra o timestamp de quando faço um clique, digito ou executo qualquer uma das ações capturadas. Por que isso é importante? Quero que a extensão registre esses timestamps para que, entre um comando e outro, seja possível inserir o tempo de wait correspondente. Assim, quando o usuário der stop no recorder, para cada comando registrado — seja no Cypress, Puppeteer ou Playwright — a aplicação deve inserir waits com o tempo exato que o usuário demorou entre uma ação e outra.

Último plano: Implementaremos suporte a timestamps em todo o pipeline: captura, persistência, geração de script e testes. O plano a seguir detalha as alterações de código, tipos, casos extremos, integração e validação em 10 Q&As técnicas.

Pergunta 1: Q1 - Qual é o problema principal e como vamos resolvê-lo especificamente?
Resposta: Precisamos registrar o instante exato de cada interação. Adicionaremos a propriedade mandatory "timestamp: number" (Date.now()) à classe base Action em src/pages/types/index.ts. O recorder (src/pages/Content/recorder.ts) passará a preencher esse campo ao criar cada Action. Na geração de scripts (src/pages/builders/index.ts) inseriremos, entre duas ações consecutivas cujo delta > 0, comandos wait: cy.wait(ms), await page.waitForTimeout(ms) ou await page.waitForTimeout(ms) para Puppeteer. Todos os módulos atualizados serão exportados sem quebrar APIs existentes.

Pergunta 2: Q2 - Como os dados serão estruturados e qual a estratégia de persistência?
Resposta: Extenderemos a interface ActionMeta em src/pages/types com { timestamp: number }. Em chrome.storage.local, cada ação continuará sendo serializada via JSON, agora incluindo timestamp. Converteremos o schema versionado para v2, armazenando em key "ds_actions_v2" para backward-compat. Migrator em src/pages/Common/utils/persist.ts detectará v1 sem timestamp, atribuirá timestamps incrementais (100ms). Exemplos: [{type:"Click",selector:"#btn",timestamp:1699111111111}].

Pergunta 3: Q3 - Quais módulos existentes serão integrados e como?
Resposta: 1) src/pages/Content/recorder.ts: adicionar const ts = Date.now(); e passar ao construtor da Action.
2) src/pages/builders/index.ts: dentro de buildScript(framework), iterar actions e calcular delta = curr.timestamp - prev.timestamp; se delta > 20ms, inserir WaitBuilder.generate(delta).
3) Criar builders/wait/playwright.ts, builders/wait/cypress.ts, builders/wait/puppeteer.ts retornando strings corretas.
4) Update genCode tests em CodeGen.tsx para aceitar waits.

Pergunta 4: Q4 - Quais casos extremos e erros devemos tratar?
Resposta: • Ações importadas sem timestamp (versão antiga) → fallback para now() mantendo ordenação. 
• Delta negativo (relógio ajustado) → setar 0ms e logar warning.
• Intervalos > 30s geram wait máximo de 30_000ms para evitar testes lentos, comentando “// truncated”.
• Recorder em abas diferentes: timestamps obtidos localmente mas ordenados após merge por sort asc.
• Falha ao gravar storage lança StorageWriteError e continua em memória.

Pergunta 5: Q5 - Como tornar a solução configurável e extensível?
Resposta: Adicionar seção "timing" em config/default.json: { enableWaits:true, maxWaitMs:30000, minWaitMs:20 }. Criar interface TimingConfig em src/types/config.ts e hook useTimingConfig em hooks.ts para leitura reativa. WaitBuilder lê valores para filtrar waits. Futuras extensões (ex.: random jitter) poderão implementar Strategy via ITimingStrategy plug-in registrado em TimingRegistry com DI simples.

Pergunta 6: Q6 - Qual a arquitetura técnica detalhada da implementação?
Resposta: Adotaremos Strategy Pattern: WaitBuilderFactory retorna IWaitBuilder para framework. Flow: Recorder → ActionStore (Observer) → Storage → CodeGen → WaitInsertionPipeline. Novos componentes: TimingMigrator, WaitBuilderFactory, TimingConfigContext. Diagrama textual:
Recorder -> ActionQueue -> Storage
                               ↓
                     ScriptGenerator
                               ↓
                     WaitInsertionPipeline -> WaitBuilder(n)

Pergunta 7: Q7 - Como garantir performance e escalabilidade?
Resposta: Registrar timestamp custa O(1). Na geração de script, iteramos lista O(n). Delta computation é aritmética simples (<1µs). storage.write é batch por debounce 200ms para evitar I/O excessivo. Benchmarks: 1 000 actions ➜ geração + waits em <5ms (Node 16). Utilizaremos memoized selector for config para evitar re-render em React. Monitoramos via performance.mark("script_build") com console.timing em dev.

Pergunta 8: Q8 - Quais validações e medidas de segurança implementar?
Resposta: Sanitizar timestamp para garantir Number.isFinite && ≥ 0. Validação de payloads recebidos via postMessage usando schema Zod {timestamp:number, …}. Bloquear mutação manual via Object.freeze em Action instances. Secrets não são afetados; nonetheless, mantenha rigor de permissions: storage.write ocorre somente em extension context verificado por chrome.runtime.id. Nenhum dado pessoal adicional é salvo.

Pergunta 9: Q9 - Como testar completamente a implementação?
Resposta: Unit: recorder.test.ts -> simula click, verifica action.timestamp ~ Date.now(). WaitBuilder.test.ts -> recebe array de timestamps [0,500], espera insert "cy.wait(500)". Integration: codegen-e2e.test.ts gera script Playwright com waits corretos. Mock chrome.storage usando jest-webextension-mock. Coverage alvo 90% para novos arquivos. E2E: run extension in Puppeteer, gravar 3 ações, asserta script final via page.evaluate.

Pergunta 10: Q10 - Como validar que a implementação está correta e completa?
Resposta: Checklist: 1) Action possui timestamp em devtools. 2) Stop recorder => script contém waits exatos. 3) Config flag enableWaits=false remove waits. 4) Migração v1→v2 mantém ações. 5) Testes >90% passam em CI. 6) Performance benchmark <10ms/1k actions. 7) Lint OK. 8) Manual QA nos três frameworks executa sem timeout falso-positivo. Documentar CHANGELOG.md e atualizar docs/recorder.md.
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