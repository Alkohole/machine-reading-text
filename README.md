# [MRT] - Машинное чтение текста
Расширение позволяет воспроизвести написанный текст синтезированным голосом, теперь доступен не только в Yandex Browser версии Windows. Признателен **[Yandex.Translate](https://translate.yandex.ru/)** за такую возможность.
- Функция **[Слушать](https://alkohole.github.io/machine-reading-text/)** имеет лимит в 20k символов *(≈3000 слов* **/** *≈11 минут)* на запрос. **(✅ Стабильна)**

|  | From | To | Date |
|---|---|---|---|
| Расширение | ~~v0.5.3~~ | [**v0.5.4**_(js)_](#update-in-v054js) | 09.06.24 |
| Страница окна | ~~v0.4~~ | [**v0.4.1**_(web)_](#update-in-v041web) | 12.07.24 |

<details>
<summary>
  
## `Навигация`
</summary>

- [**Интерфейс и Управление**](#интерфейс-и-управление)
- [**Установка и Обновление**](#установка-и-обновление)
- [**Голоса и Эмоции**](#голоса-и-эмоции)
- [**Окно обновлений**](#окно-обновлений)

</details>

## Демо <sup>_`(Dec 9, 2023)`_</sup>:

https://github.com/Alkohole/udr/assets/59339504/99fdac2b-0f26-42e5-94eb-2a550acb5a7c

<div class="video-box">
  <video id="player" controls>
    <source src="https://github-production-user-asset-6210df.s3.amazonaws.com/59339504/289288865-99fdac2b-0f26-42e5-94eb-2a550acb5a7c.mp4" size="720">
    Your browser does not support the video tag.
  </video>
</div>

## Интерфейс и Управление:
| Интерфейс веба | Интерфейс плагина | Интерфейс плагина  (свернутый)  |
|---|---|---|
| ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/full.png) | ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/normal.png) | ![](https://github.com/Alkohole/machine-reading-text/raw/main/examples/small.png) |

| Кнопка | Действие |
|----|---------|
| **▶** | Воспроизводит озвучивание текста. |
| **■** | Завершает озвучивание текста. |
| **▶II** | Останавлевает/Воспроизводит озвучивание текста. |
| **✖▶** | Невозможность прочитать текст, превышение лимита. |
| **⚙** | Настройки |

- Имеется обработчик дропа в окно ввода (Выделите текст и перетащите его в окно ввода, ранее находящийся в окне текст автоматически стирается).
- Имеется счетчик количества символов в окне (Если превышение лимита - вы увидите сообщение).
- Имеется выбор голосов озвучки: 9 женских и 9 мужских голоса.
- Имеется возможность самостоятельно выставлять ударения в словах омографах используя `+` перед ударной буквой, также имеется пауза между словами `-`. Пример: `З+амок, Зам+ок`

https://github.com/Alkohole/machine-reading-text/blob/680cc10ebb3280dc628a6bbc7de56536fe2c705c/mrt.user.js#L25-L26
В этих двух переменных вы можете указать значение сдвига по умолчанию и позиционирование по умолчанию. <br>
```var offset =``` - число сдвига в пикселях _(пиксели не указываются)_ <br>
```var charPos =``` - сторона по умолчанию **left**/**right**

## Установка и Обновление:

### Установка скрипта
1. Установите расширение **[Tampermonkey](https://www.tampermonkey.net/)** (Альтернатива для Safari: **[UserScripts](https://apps.apple.com/app/userscripts/id1463298887 )**).
2. **[Установите Скрипт](https://github.com/Alkohole/machine-reading-text/raw/main/mrt.user.js)**.

### Ручное обновление (Рекомендуется):

1. **[Перейдите по ссылке](https://github.com/Alkohole/machine-reading-text/raw/main/mrt.user.js)**.
2. Нажмите кнопку **Перезаписать**

### Авто обновление (Не рекомендуется):

1. В расширениях браужера откройте расширение **Tampermonkey**.
2. Войдите в раздел **Утилиты**.
3. Нажмите на кнопку **Проверить обновления скриптов**.

## Голоса и Эмоции:

_В качестве примера для голоса служит глава 3 стихотворения Томаса Стернза Элиота "Полые люди"_

| TTS Name | 😈 | 😐 | ☺️ | 🥳 | Model | Examples |
|--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **Alice** (♀)<sup>`дефолтный`</sup> |❌|✅|❌|✅| `tatyana_shitova.gpu` |[Tatyana.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Shitova.ogg) |
| **Oksana** (♀) |*✅***|✅|*✅***|❌| `oksana.gpu` |[`RU`](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Oksana.wav) / [`UA`](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Oksana_nogpu_ua.ogg) |
| **Jane** (♀) |*✅***|✅|*✅***|❌| `jane.gpu` |[Jane.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Jane.wav) |
| **Omazh** (♀) |*✅***|✅|❌|❌| `omazh.gpu` |[Omazh.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Omazh.wav) |
| **Nastya** (♀) |✅|*✅***|❌|❌| `nastya.gpu` |[Nastya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Nastya.wav) |
| **Sasha** (♀) |*✅***|*✅***|✅|❌| `sasha.gpu` |[Sasha.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Sasha.wav) |
| **Tatyana** (♀) |❌|❌|✅|❌| `tatyana_abramova.gpu` |[Tatyana.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Abramova.wav) |
| **Ermil** (♂) |*✅***|✅|*✅***|❌| `ermil.gpu` |[Ermil.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Ermil.wav) |
| **Zahar** (♂) |*✅***|✅|*✅***|❌| `zahar.gpu` |[Zahar.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Zahar.wav) |
| **Kolya** (♂) |*✅***|✅|*✅***|❌| `kolya.gpu` |[Kolya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Kolya.wav) |
| **Kostya** (♂) |*✅***|✅|*✅***|❌| `kostya.gpu` |[Kostya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Kostya.wav) |
| **Anton** (♂) |❌|✅|❌|❌| `anton_samokhvalov.gpu` |[Anton.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Anton_Samokhvalov.wav) |
| **Levitan** (♂) |❌|*✅***|*✅***|❌| `levitan` ||
| **Nick** (♂) |*✅***|*✅***|*✅***|❌| `nick` ||
| **Zhenya** (♂) |*✅***|*✅***|*✅***|❌| `zhenya` ||
| **Selay** <sup>`Tr`</sup> (♀) |❌|✅|❌|❌| `selay.gpu` | [Selay.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Selay.ogg) |
| **Silaerkan** <sup>`En`</sup> (♀) |❌|*✅***|❌|❌| `silaerkan` ||
| **Erkanyavas** <sup>`En`</sup> (♂) |*✅***|*✅***|*✅***|❌| `erkanyavas` | [Erkanyavas.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Erkanyavas.ogg) |


**✅** - Поддерживается.<br>
*✅*** - Доступно только в **`CPU`** версии модели.<br>
**❌** - Нет поддержки.

## ⚠️ Возможные планы:
- [ ] Поблочная озвучка и визуализация блоков.
- [ ] Кэширование параметров селектора. _(память)_
- [ ] Плавающее окно.
- [x] Пауза.
- [x] Настройки, позиционирование окна расширения.
- [x] Возможности переключатся между **`CPU`** и **`GPU`**. _(На данный момент частично)_
- [x] Возможности смены языка. _(`Ru`, `Tr`, `Uk`, `En`)_
- [x] Переход с **`WAV`** формат на **`WEBM`**/**`OGG`** форматы.
- [x] Возможность менять скорость.
- [x] Возможность менять эмоции.
- [x] Выбор голоса озвучки.
- [x] **Исправить ошибки в `README.md`**...

<br><br>
  
# Окно обновлений

<br>

## Update in v0.5.4(js)
- Добавлена капсуляция `Shadow DOM` - теперь css/js сайтов не будет влиять на интерфейс плагина.
- `offsetRight` был переименован в `offset`.
- Остальная мелочь

_Предыдущее обновление:_
> ### Update in v0.5.3(js)
> - Добавлена возможность изменения позиционирования окна.
> - Добавлена кнопка настроек.

## Update in v0.4.1(web)
- Сервер скрипта изменен, - решение проблемы с отказом в озвучке текста.
- Добавлена кнопка Паузы

_Предыдущее обновление:_
> ### Update in v0.4(web)
> - Добавлен голоса: **Selay**, **Erkanyavas**, **Silaerkan**.
> - Добавлены языки: `Tr`, `Uk`, `En`.
> - Добавлена дополнительные скорости речи.
> - Добавлена возможность выставлять ударения используя `+` перед ударной буквой, и пауза `-`.
> - Интерфейс переработан.
> - Исправлена проблема когда модель для Английского языка использовала Русский язык.
> - Удалены голоса **Erkanyavas** и **Silaerkan** из Турецкого языка.
> - Добавлены 3 голоса: **Levitan**, **Nick** и **Zhenya**.

<br>

> [!IMPORTANT]
> Этот проект - мой личный каприз, и он не рассчитан на что-то серьезное. <br>
> Из-за того что данный tts доступен только в браузере `Yandex` и только под **`Windows`**, а обладателям **`MacOS`** и **`Linux`** даже с браузером `Yandex` данная читалка не доступна, я захотел реализовать такую возможность для любых браузеров и **`OS`**'ей. <br>

> [!TIP]
> Если вам нужна английская версия - воспользуйтесь **[Edge TTS](https://github.com/EdgeTTS/EdgeTTS.github.io)** или любым другим TTS. <br>
> Если вам интересны реализации другого функционала из `Yandex` браузера: <br>
> - **[[VOT] - voice-over-translation](https://github.com/ilyhalight/voice-over-translation)** - позволяет переводить видео на `YouTube` _(и не только)_ в виде озвучки и/или субтитров.

> [!IMPORTANT]
> В случае неполадок - перезагрузите браузер. <br>
> `1` запрос размером около `20k` символов приблизительно равен `10MB`, <br>
> `102` запроса в `20k` будет приближаться к `1GB`, <br>
> это забивает вашу оперативную память и может вызвать зависания, <br>
> на данный момент, я пытаюсь решить эту проблему, а временное решение - `перезагрузка браузера`. <br>
> <br>
> Для тех, у кого трафик интернета ограничен, рекомендуется контролировать количество запросов, которые вы отправляете, чтобы избежать излишнего расходования трафика и ограничений вашего интернет-подключения.
