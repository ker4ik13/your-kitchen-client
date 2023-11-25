## Твоя Кухня

Приложение разработано для компании ["Твоя Кухня"](https://youkuhnya.ru)

### Стек:
- React
- Next JS
- TypeScript
- Redux
- SASS
  
Архитектура приложения - **Feature Sliced Design**.

Папка src:
-  app
   -  styles - глобальные стили
   -  остальные файлы - страницы
- data
  - статичные данные, картинки и т.д.
- features
  - функции
- http - axios interceptors
- pages = страницы для статичной загрузки
- services - запросы на бек
- shared - часто используемые компоненты и функции
- store - глобальное хранилище Redux
- types - типы и интерфейсы
- widgets - блоки и компоненты

Автор: [Киреев Кирилл](https://t.me/ker4ik13)