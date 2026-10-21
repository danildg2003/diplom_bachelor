# diplom_bachelor

Бэкенд для дипломной работы. Два микросервиса на NestJS для работы с кредитами и мониторинг всего этого через Prometheus и Grafana.

Сервисы:
- credit-loans - хранит кредиты (сумма, ставка, срок) и считает по ним ежемесячный платеж, переплату и эффективную ставку
- credit-programs - список кредитных программ банка с описанием

У каждого сервиса своя база PostgreSQL, доступ к API по JWT токену. Документация API в Swagger.

Что еще есть в docker-compose:
- nginx как шлюз перед сервисами
- cAdvisor и node-exporter для сбора метрик
- Prometheus + Alertmanager (алерты приходят на почту)
- Grafana для графиков

## Запуск

Перед запуском скопировать `.env.example` в `.env` в папках сервисов и `alertmanager.example.yml` в `alertmanager.yml`, вписать свои данные.

```
docker compose up -d --build
```

При первом запуске базы заполняются тестовыми данными из папки `db-init`.

API: http://localhost/api (через nginx), Grafana: http://localhost:3000, Prometheus: http://localhost:9090
