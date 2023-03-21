This project is a backend for a photo sharing application called Mesto. It's built using Node.js and Express.js and uses MongoDB as its database. The API supports user authentication, CRUD operations for users and cards, and liking and disliking cards. It also includes error handling and validation for incoming data. The project demonstrates proficiency in building a RESTful API with Node.js and Express.js, integrating a MongoDB database, and implementing authentication and authorization.

Tech used:
Node.js
Express.js
MongoDB
Mongoose ODM
Git/GitHub
ESLint
Nodemon
Postman


[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
