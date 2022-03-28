## Pontos Positivos:
- Aplicação dockerizada
- Makefile para simplificar os comandos
- Swagger;
- Código está bem estruturado
- Helmet e rate limit na aplicação
- [x] Testes bem completos (apesar do teste e2e usar mocks)
- Aplicação rodando no Heroku (https://eng-gruposbf-backend.herokuapp.com/)

## Pontos de Melhoria:
- [ ] O README parece informar bastante sobre a arquitetura e comandos disponíveis, mas não absolutamente nada sobre portas, Swagger, etc. Então achei bem confuso e pessoalmente não gosto de ficar procurando qual a porta ou endpoints disponíveis (tive que pesquisar onde fica exposto o endpoint do Swagger, por exemplo).
- [ ] As moedas estão fixas na API
- [ ] Sem log, métricas, telemetria
- [x] Diretório root não cumpre nenhuma função (além de apresentar uma mensagem na home)
- [ ] Sem retaguarda para a API do BCB. Se a API cair, nada funciona
- [x] Módulo de cache, que aparentemente não funciona
- [x] Erros não são informativos (ex.: "BcbApiException: BCB_API_EXCEPTION")
