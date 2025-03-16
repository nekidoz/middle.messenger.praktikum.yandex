## Vite
В корне репозитория Git: 
- Создать проект Vite - выбрать "messenger" -> Vanilla -> JavaScript
    npm create vite@latest 
- Перейти в папку проекта
    cd messenger
В папке проекта:
    npm install
    npm run dev
Теперь к проекту можно получить доступ по ссылке:
    http://localhost:5173/
### Конфигурация Vite
В папке проекта Vite создать файл конфигурации:
    vite.config.js
## Шаблонизатор
Шаблонизатор Handlebars
    npm install vite-plugin-handlebars
Добавить в конфиг vite.config.js
## Препроцессор CSS - НЕ НУЖЕН
Установка LESS в проект (больше ничего для Vite не требуется):
    npm add -D less
## PostCSS
Установить postcss:
    npm install postcss-nested
Создать postcss.config.cjs .
Добавить секцию css в vite.config.js .
## Git
Установить локального пользователя, если нужно
    git config --local user.name "Nekidoz" 
    git config --local user.email nekidoz@yandex.ru
Посмотреть конфигурацию
    git config { --global | --local } --list
Добавить upstream для другого пользователя github
- Просмотреть список upstream
    git remote -v
- Удалить ненужный upstream
    git remote remove origin
- Создать новый upstream для другого пользователя
    remote add origin git@nekidoz-github:nekidoz/middle.messenger.praktikum.yandex.git
где nekidoz-github - имя хоста в ssh config
## Конфигурация Express для Production - npm run start
Установить Express:
    npm install express
Создать файл конфигурации
    server.cjs
В package.json в раздел scripts добавить строку дополнительно к тому, что генерирует vite:
    "start": "vite build && node server.cjs",
## Установка требуемых зависимостей
Установить все, что есть в package-lock.json:
    npm i
