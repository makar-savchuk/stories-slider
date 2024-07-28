# Слайдер Историй

Слайдер Историй - это слайдер в стиле Instagram, созданный с помощью [Swiper](https://swiperjs.com).

Его легко интегрировать в ваше приложение [Framework7](https://framework7.io) или [Ionic](https://ionicframework.com), так как Swiper уже интегрирован в эти фреймворки.

## Функции

- Он основан на [Swiper](https://swiperjs.com), поэтому поддерживается множество функций Swiper.
- Любое содержимое может быть размещено в слайдах (историях).
- Правильно работающий автозапуск историй с паузой при касании/удерживании.
- Поддерживает любое количество историй.
- Поддерживает видео.
- Может иметь любой размер (соотношение сторон).

## Пакет

В пакете вы найдете:

- полностью функциональный проект, созданный с помощью Vite и Swiper (для версий Core, React и Vue).
- все необходимые дополнительные стили (в `SCSS`).
- весь необходимый JavaScript для работы.
- готовые компоненты для React и Vue.
- инструкции по сборке, запуску и предварительному просмотру проекта.

## Структура проекта

Этот проект использует [Vite](https://vitejs.dev) для разработки и сборки производственной версии.

- `/src/` - папка с исходными файлами Слайдера Историй (скрипты, стили, компоненты React, Vue).
- `/demo/core` - папка с исходными файлами `.html`, `.js`, `.scss`. Эти файлы обрабатываются Vite во время разработки и будут собраны в производственной версии.
- `/demo/react` - папка с демо-проектом React.
- `/demo/vue` - папка с демо-проектом Vue.
- `/public/` - папка со статическими ресурсами (обычно изображениями), которые не обрабатываются Vite во время разработки, но будут собраны в производственной версии.
- `/dist/` - папка с готовыми к использованию файлами Слайдера Историй.
- `/www/` - папка с производственной сборкой демо, собранной с помощью Vite (эта папка появится после выполнения команды для создания производственной сборки).

## Демо

Проект поставляется с демо-проектом, который вы можете запустить и изучить исходный код.

Во-первых, нам нужно установить все зависимости, выполните в терминале:

```
npm i
```

Для запуска сервера разработки выполните одну из следующих команд в терминале:

- `npm run core` - для запуска демо-проекта Core (расположен в папке `/demo/core`).
- `npm run react` - для запуска демо-проекта React (расположен в папке `/demo/react`).
- `npm run vue` - для запуска демо-проекта Vue (расположен в папке `/demo/vue`).

И проект будет доступен по адресу [http://localhost:3000](http://localhost:3000).

## Использование версии Core

### HTML Разметка

Посмотрите `./demo/core/index.html` для необходимой HTML разметки.

### В браузерной среде

Вам нужно включить скрипты и стили Слайдера Историй в дополнение к скриптам и стилям Swiper из папки (`./dist/`), например:

```html
<head>
  <!-- Стили Swiper -->
  <link rel="stylesheet" href="http://unpkg.com/swiper/swiper-bundle.min.css" />
  <!-- Стили Слайдера Историй -->
  <link rel="stylesheet" href="path/to/stories-slider.min.css" />
</head>

<body>
  <div id="app">
    <!-- Слайдер Историй -->
    <div class="stories-slider">
      <!-- ... -->
    </div>
  </div>
  <!-- Скрипт Swiper -->
  <script src="http://unpkg.com/swiper/swiper-bundle.min.js"></script>
  <!-- Скрипт Слайдера Историй -->
  <script src="path/to/stories-slider.min.js"></script>
</body>
```

### В ESM Среде

В среде с поддержкой ES модулей (webpack, Vite, rollup и т.д.) вы можете просто импортировать `stories-slider.esm.js` и `stories-slider.css` (или `stories-slider.scss`) из папки `./dist/`, например:

```js
// импорт основной функции Слайдера Историй
import createStoriesSlider from './stories-slider.esm.js';
// импорт стилей Слайдера Историй
import './stories-slider.scss';
```

### Инициализация

После включения (или импорта) необходимых скриптов и стилей Слайдера Историй и создания необходимой разметки, вам нужно передать HTML элемент Слайдера Историй (`<div class="stories-slider">`) функции `createStoriesSlider`:

В браузерной среде:

```html
<head>
  <link rel="stylesheet" href="http://unpkg.com/swiper/swiper-bundle.min.css" />
  <link rel="stylesheet" href="path/to/stories-slider.min.css" />
</head>

<body>
  <div id="app">
    <div class="stories-slider">
      <!-- ... -->
    </div>
  </div>
  <script src="http://unpkg.com/swiper/swiper-bundle.min.js"></script>
  <script src="path/to/stories-slider.min.js"></script>
  <!-- Инициализация Слайдера Историй -->
  <script>
    const sliderEl = document.querySelector('.stories-slider');
    createStoriesSlider(sliderEl, parameters);
  </script>
</body>
```

В ESM среде:

```js
import createStoriesSlider from './stories-slider.esm.js';
import './stories-slider.scss';
import './main.scss';

// Инициализация Слайдера Историй
const sliderEl = document.querySelector('.stories-slider');
createStoriesSlider(sliderEl, parameters);
```

## Параметры Слайдера Историй

Следующие параметры можно передать функции `createStoriesSlider` во втором аргументе:

| Параметр                | Тип                            | По умолчанию | Описание                                                                                                                                                                      |
| ----------------------- | ------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoplayDuration`      | `number`                        | `5000`       | Длительность автозапуска (в мс)                                                                                                                                                |
| `Swiper`                |                                 |              | Только в случае использования ESM импорта, передайте сюда конструктор Swiper (например, результат `import Swiper from 'swiper'`)                                               |
| `EffectCube`            |                                 |              | Только в случае использования ESM импорта, передайте сюда модуль эффекта Cube (например, результат `import { EffectCube } from 'swiper'`)                                      |
| `onSlidesIndexesChange` | `function(mainIndex, subIndex)` |              | Функция обратного вызова, которая будет вызвана при смене Историй/Слайда, принимает в качестве аргументов номер текущей активной Истории и номер текущего активного Слайда.   |
| `onAutoplayStart`       | `function(swiper)`              |              | Функция обратного вызова, которая будет вызвана каждый раз при запуске автозапуска (смена слайда)                                                                             |
| `onAutoplayStop`        | `function(swiper)`              |              | Функция обратного вызова, которая будет вызвана каждый раз при остановке автозапуска (смена слайда)                                                                            |

## Объект Слайдера Историй

Функция `createStoriesSlider` возвращает специальный объект `storiesSlider` с следующими свойствами и методами:

| Параметр                        | Тип          | Описание                                                        |
| ------------------------------- | ------------ | --------------------------------------------------------------- |
| `el`                            | `HTMLElement`| Основной HTML элемент Слайдера Историй                           |
| `mainSwiper`                    | `Swiper`     | Основной экземпляр swiper для историй                            |
| `subSwipers`                    | `[Swiper]`   | Массив с экземплярами swipers для слайдов                        |
| `.enable()`                     |              | Метод для включения Слайдера Историй (например, запуск автозапуска) |
| `.disable()`                    |              | Метод для отключения Слайдера Историй (например, остановка автозапуска) |
| `.slideTo(mainIndex, subIndex)` |              | Метод для перехода к определенной Истории и перехода к определенному Слайду |
| `.destroy()`                    |              | Метод для уничтожения Слайдера Историй                           |

## Использование версии React и Vue

Существуют компоненты `<StoriesSlider>`, `<Stories>` и `<Story>`, специфичные для фреймворка, которые вам нужно импортировать из `./dist/stories-slider-[framework].js`

Для примера использования и разметки смотрите файл `./demo/[framework]/App`.

### Свойства `<StoriesSlider>`

Компонент `<StoriesSlider>` принимает те же свойства, что и <b>Параметры Слайдера Историй</b> с несколькими дополнительными:

| Параметр         | Тип                      | По умолчанию | Описание                                                                                                 |
| ----------------- | ------------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
|

 `enabled`         | `boolean`                 | `true`       | Полезно установить изначально в `false`, когда компонент создан скрытым и должен стать видимым позже       |
| `onStoriesSlider` | `function(storiesSlider)` |              | Функция обратного вызова, которая будет вызвана при создании Слайдера Историй с объектом Слайдера Историй в качестве аргумента |

### Свойства `<Story>`

Компонент `<Story>` принимает следующие свойства:

| Параметр            | Тип                      | Описание                                                                                                    |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `avatar`             | `string \| React.Element` | Содержимое аватара пользователя для отображения в истории. В компонентах Vue должно быть передано как слот `avatar` |
| `userLink`           | `boolean`                 | Атрибут `href` ссылки пользователя, отображаемой в истории                                                    |
| `name`               | `string`                  | Имя пользователя для отображения в истории. В компонентах Vue может быть передано как слот `name`             |
| `date`               | `string`                  | Дата истории для отображения в истории. В компонентах Vue может быть передано как слот `date`                |
| `closeButton`        | `boolean`                 | Отображает кнопку закрытия в истории                                                                          |
| `onCloseButtonClick` | `function()`              | Функция обратного вызова, которая будет вызвана при нажатии на кнопку закрытия. В версии Vue, должна использоваться как событие `closeButtonClick` |
| `duration`           | `number`                  | Перезаписывает длительность (в мс) для конкретного слайда/истории                                             |

## Настройка длительности для конкретной истории/слайда

Каждая история будет переключаться на следующую после истечения времени `autoplayDuration`. Можно управлять длительностью конкретных историй.

В HTML/Core версии нужно использовать свойство `data-duration` на слайдах историй, например:

```html
<!-- история пользователя с индивидуальной длительностью 10000 мс (10 секунд) -->
<div class="swiper-slide" data-duration="10000">...</div>
```

В фреймворках React/Vue это можно контролировать с помощью свойства `duration` на компоненте `<Story>`, например:

```jsx
{/* история пользователя с индивидуальной длительностью 10000 мс (10 секунд) */}
<Story duration={10000}>
 ...
```

## Использование с видео

Слайдер Историй поддерживает элементы `<video>`. Просто поместите тег `<video>` вместо изображения истории, и он должен работать из коробки. Также рекомендуется установить атрибуты `preload="metadata"` и `playsinline` на видео элементе, чтобы правильно считывать длительность видео:

```html
<video src="path/to/video" playsinline preload="metadata"></video>
```

## Подключение к Git

Можно подключить эту папку проекта к новому репозиторию. Например, для GitHub:

1. Создайте новый репозиторий GitHub на https://github.com/new

2. Инициализируйте Git. Выполните в терминале:

   ```
   git init
   ```

3. Добавьте удаленный репозиторий. Замените $USERNAME и $REPOSITORY на ваше имя пользователя GitHub и имя вновь созданного репозитория:
   ```
   git remote add origin https://github.com/$USERNAME/$REPOSITORY.git
   ```

Вот и все, после этого вы можете отслеживать, коммитить и пушить/пуллить в репозиторий, например:

```
git add .
git commit -m "initial commit"
git push origin master
```
