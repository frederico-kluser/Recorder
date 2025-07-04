# Fleury Cypress Recorder

![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/geggbdbnidkhbnbjoganapfhkpgkndfo?color=8F57F3&label=Chrome%20Rating)
![Tests](https://github.com/DeploySentinel/Recorder/actions/workflows/main.yml/badge.svg)

Uma extensão de navegador open source desenvolvida pela **Fleury** que gera automaticamente scripts de teste para Cypress, Playwright e Puppeteer a partir das suas interações no navegador.

Simplesmente navegue pelo seu site enquanto grava com o Fleury Cypress Recorder e a extensão converterá o fluxo capturado em scripts de teste automatizados.

[![Chrome Store Icon](assets/ChromeStoreIcon.png)](https://chrome.google.com/webstore/detail/deploysentinel-recorder/geggbdbnidkhbnbjoganapfhkpgkndfo)
[![Firefox Addon Icon](assets/FirefoxAddonIcon.png)](https://addons.mozilla.org/en-US/firefox/addon/deploysentinel-recorder/)

# Demonstração

![Demo](assets/demo.gif)

# Recursos

- 💻 Captura automática de cliques, entradas de teclado, redimensionamento de janelas e eventos de rolagem
- 🤖 Gera scripts limpos e comentados para Cypress, Playwright e Puppeteer
- 📋 Visualize o progresso da gravação e copie scripts gerados durante o teste
- 📛 Gera seletores de elementos usando `id` e `class`, além de outras propriedades HTML (ex: `aria-label`, `alt`, `name`, `data-testid`)
- 🖱 Captura eventos de hover através do menu de contexto (clique direito)
- ✅ Asserções/espera por texto específico visível na página
- 📸 Gera eventos de captura de tela de página completa
- 📊 **Histórico completo de gravações** com busca, filtros e exportação
- 🎯 **Interface em português** otimizada para equipes brasileiras
- 💾 **Armazenamento persistente** de todas as gravações realizadas

# Como Começar

1. Baixe a extensão
2. Visite o site que deseja começar a gravar
3. Clique no ícone da extensão e selecione "Iniciar Gravação"
4. Use o site normalmente (clique em links, preencha formulários, etc.)

   - Clique com o botão direito em um elemento e selecione "Gravar hover sobre elemento" para gravar um evento de hover
   - Selecione qualquer texto na página, clique com o botão direito e escolha "Fleury Cypress Recorder" > "Assertar/aguardar texto selecionado" para adicionar uma asserção baseada em texto

5. Clique em "Finalizar Teste" quando terminar. Você pode copiar o script gerado através da sobreposição de gravação
6. Acesse o **Histórico de Gravações** a qualquer momento para revisar, buscar e exportar gravações anteriores

_Dica: Para visualizar os passos capturados ou o código gerado durante a gravação, clique em "Mostrar Mais" na sobreposição de gravação._

# Recursos Exclusivos da Versão Fleury

## Histórico de Gravações

O Fleury Cypress Recorder inclui um sistema completo de histórico que permite:

- **Buscar gravações** por site ou URL
- **Ordenar** por data, duração ou número de ações
- **Visualizar detalhes** de cada gravação individual
- **Exportar gravações** selecionadas
- **Gerenciar** todas as suas gravações em um só lugar

## Interface em Português

Toda a interface foi traduzida e adaptada para o português brasileiro, facilitando o uso por equipes de QA e desenvolvimento no Brasil.

# Comparação com Alternativas

|                                | Fleury Cypress Recorder | Headless Recorder | Chrome Puppeteer Recorder | Playwright CLI Codegen |
| ------------------------------ | ----------------------- | ----------------- | ------------------------- | ---------------------- |
| Captura Automática de Cliques  | ✅                      | ✅                | ✅                        | ✅                     |
| Captura Automática de Inputs   | ✅                      | ⚠                 | ✅                        | ✅                     |
| Captura de Upload de Arquivos  | ❌                      | ❌                | ✅                        | ✅                     |
| Suporte a Seletores de Acesso. | ✅                      | ❌                | ✅                        | ✅                     |
| Copiar Código                  | ✅                      | ✅                | ❌                        | ✅                     |
| Suporte a data-testid          | ✅                      | ✅                | ❌                        | ✅                     |
| Suporte a seletores de texto   | ⚠                       | ❌                | ❌                        | ✅                     |
| Geração de screenshots         | ✅                      | ✅                | ❌                        | ❌                     |
| Geração de eventos hover       | ✅                      | ❌                | ❌                        | ❌                     |
| Histórico de Gravações         | ✅                      | ❌                | ❌                        | ❌                     |
| Interface em Português         | ✅                      | ❌                | ❌                        | ❌                     |

# Instruções para Desenvolvimento

Instalar Dependências: `yarn` (ou `yarn --frozen-lockfile`)

## Firefox

Iniciar servidor de desenvolvimento local para Firefox: `yarn run start-ff`

Gerar extensão comprimida para Firefox: `yarn run build-ff`

Empacotar arquivos fonte para revisão: `yarn run bundle-source`

## Chrome

Iniciar servidor de desenvolvimento local para Chrome: `yarn run start-chrome`

Gerar extensão comprimida para Chrome: `yarn run build-chrome`

Executar testes E2E: `yarn test`

# Tecnologias Utilizadas

- **React** com TypeScript para a interface
- **Chrome Extension API** para funcionalidades do navegador
- **TanStack Table** para gerenciamento de tabelas
- **React Syntax Highlighter** para visualização de código
- **Jest** e **Playwright** para testes

# Contribuindo

Este é um projeto open source desenvolvido e mantido pela equipe de tecnologia da Fleury. Contribuições são bem-vindas! Por favor, abra uma issue ou pull request no repositório.

## Processo de Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

# Licença

Este projeto é licenciado sob a Apache License 2.0 - veja o arquivo LICENSE para detalhes.

---

## Desenvolvido com ❤️ pela equipe de tecnologia [Fleury](https://www.fleury.com.br)

O Fleury Cypress Recorder é uma ferramenta essencial para automatizar testes em aplicações web, economizando tempo e aumentando a qualidade dos nossos produtos digitais.