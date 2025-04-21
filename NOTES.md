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

## Deploy на Netlify
1. Создать или переключиться на ветку deploy
	git checkout [-b] deploy
2. В файле .gitignore убираем папку dist/ (папка dist/ должна деплоиться)
3. Сделать коммит ветки на GitHub

## Чтобы прошли автотесты в Pull Request
Добавить разделы node и engines в package.json (ошибка:
Check NodeJS version7/7 ✗ Check NodeJS version
   (from function `fatal' in file /tmp/tests-middle-frontend/tests/utils/utils.bash, line 3,
    in test file /tmp/tests-middle-frontend/tests/sprint_1.bats, line 50)
     `[[ "$output" = "null" ]] && fatal "$output" # "node" in "engines" section in package.json' failed
   null
):

## Установка TypeScript
### Установка компилятора
    npm install --save-dev typescript
### Config
Сделать конфиг tsconfig.json
### Валидация в режиме разработки (dev)
Для валидации без компиляции запустить в папке проекта в отдельном окне (опция --watch постоянно следит за изменениями):
    [./node_modules/.bin/]tsc --noEmit --watch
### Валидация в режиме production
Добавить в package.json раздел prebuild, он будет автоматически исполняться перед build:
    "scripts": {
        "prebuild": "tsc --noEmit",
    },
Если автоматически не исполняется, также модифицировать раздел build:
    "scripts": {
        "build": "npm run prebuild && vite build",
    },
Если npm run start не запускает проверку typescript, модифицировать раздел start:
    "scripts": {
        "start": "npm run prebuild && vite build && node server.cjs",
    },
### Утилита позволяет компилировать и сразу запускать .ts файлы
~$ npm install --save-dev ts-node
~$ ts-node script.ts

## Стиль кода
### Codestyle.md
Вербальное описание соглашений
### .editorconfig
Конфигурация IDE

## Линтер JavaScript/TypeScript - ESLint (версия 9 +)
### Установка
Установка для режима разработки (только там он и нужен):
    npm install --save-dev eslint
### Конфигурация
Создать конфиг:
    .eslintrc.json .

!!!ВАЖНО!!! Так как не установлен реакт, чтобы избежать ошибки линтера, указана произвольная версия, надо ее заменить при установке react на detect.

Установить (при необходимости) готовые наборы правил, например, AirBnB:
    npm install --save-dev eslint-config-airbnb
Создать список игнорируемых файлов - файл:
    .eslintignore
Установить плагины для TypeScript:
    npm install --save-dev @typescript-eslint/parser
    npm install --save-dev @typescript-eslint/eslint-plugin
и добавить их в .eslintrc.json .
Добавить секцию include в tsconfig.json с указанием файлов TypeScript и конфига ESLint (указано в видео, в моем случае ничего не изменилось).
Добавить в package.json скрипты lint и lint:fix , чтобы запускать через npm.
В коде можно указывать, какие правила игнорировать или изменить:
    Для всего файла:
        /* eslint-disable import/prefer-default-export */
        /* eslint no-unused-vars: 0 */
        /* eslint max-params: [2, 4] */
    Для следующей строки:
        // eslint-disable-next-line import/no-unresolved
### Запуск
Запустить линтер для проверки проекта:
    node_modules/.bin/eslint .
а лучше через npm, потому про предыдущий формат не находит проблем:
    npm run lint

## Линтер CSS - Stylelint
### Установка
Установить stylelint:
    npm install --save-dev stylelint
и дополнительные компоненты:
    npm install --save-dev stylelint-config-standard stylelint-order
### Конфигурация
Создать конфиг:
    .stylelintrc.json .
Список игнорируемых файлов:
    .stylelintignore
Добавить в package.json скрипт lint:style и lint:style:fix , чтобы запускать через npm.
### Запуск
    npm run lint:style

## Другие пакеты
### UUID (для компонента Block)
    npm install uuid
