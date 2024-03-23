# [MRT] - Машинное чтение текста
Расширение позволяет воспроизвести написанный текст синтезированным голосом, теперь доступен не только в Yandex Browser версии Windows. Признателен **[Yandex.Translate](https://translate.yandex.ru/)** за такую возможность.
- Функция **"Слушать"** имеет лимит в 20k символов *(≈3000 слов* **/** *≈11 минут)* на запрос. **(✅ Стабильна)**
- Функция **"Скачать"** имеет лимит в 1k символов *(≈140 слов* **/** *≈30 секунд)* на запрос. **(⚠️ НЕ стабильна + ЗАБРОШЕНА)**

|  | From | To | Date |
|---|---|---|---|
| Расширение | ~~v0.4.7~~ | **v0.4.8**_(js)_ | 01.03.24 |
| Страница окна | ~~v0.3~~ | **v0.3.4**_(web)_ | 23.03.24 |

<details>
<summary>
# Навигация
</summary>

- [**Установка расширения**](#установка-расширения)
- [**Обновление скрипта**](#обновление-скрипта)
- [**Примечание**](#примечание)
- [**Демонстрационные страницы**](#демонстрационные-страницы)
- [**Окно объявлений**](#окно-объявлений)
- [**Окно сообщений**](#окно-сообщений)

</details>

## Демо видео:

https://github.com/Alkohole/udr/assets/59339504/99fdac2b-0f26-42e5-94eb-2a550acb5a7c

## Установка расширения:

1. Установите расширение **[Tampermonkey](https://www.tampermonkey.net/)** (Альтернатива для Safari: **[UserScripts](https://apps.apple.com/app/userscripts/id1463298887 )**).
2. **[Установите Скрипт](https://github.com/Alkohole/machine-reading-text/raw/main/mrt.user.js)**.


## Обновление скрипта:
### Ручное обновление (Рекомендуется):

1. **[Перейдите по ссылке](https://github.com/Alkohole/machine-reading-text/raw/main/mrt.user.js)**.
2. Нажмите кнопку **Перезаписать**

### Авто обновление (Не рекомендуется):

1. В расширениях браужера откройте расширение **Tampermonkey**.
2. Войдите в раздел **Утилиты**.
3. Нажмите на кнопку **Проверить обновления скриптов**.

## Примечание:

| Кнопка | Действие |
|----|---------|
| **⇅** | Cворачивает/разворачивает окно ввода. |
| **⚙** | Cворачивает/разворачивает окно настроек. |
| **▶** | Воспроизводит озвучивание текста. |
| **■** | Останавливает озвучивание текста. |
| **⏎** | Скачивает озвученный текст. |

- Имеется обработчик дропа в окно ввода (Выделите текст и перетащите его в окно ввода, ранее находящийся в окне текст автоматически стирается).
- Имеется счетчик количества символов в окне (Если превышение лимита - вы увидите сообщение).
- Имеется выбор голосов озвучки: 7 женских и 5 мужских голоса. (**Oksana** таже самая **Alena**)

### Голоса:
| TTS Name | Model | Examples |
|----|----|----|
| **Alice** (♀) _(дефолтный)_| `tatyana_shitova.gpu` |[Tatyana_Shitova.ogg](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Shitova.ogg)|
| **Oksana** (♀) | `oksana.gpu` |[Oksana.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Oksana.wav)|
| **Jane** (♀) | `jane.gpu` |[Jane.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Jane.wav)|
| **Omazh** (♀) | `omazh.gpu` |[Omazh.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Omazh.wav)|
| **Nastya** (♀) | `nastya.gpu` |[Nastya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Nastya.wav)|
| **Sasha** (♀) | `sasha.gpu` |[Sasha.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Sasha.wav)|
| **Tatyana Abramova** (♀) | `tatyana_abramova.gpu` |[Tatyana_Abramova.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Tatyana_Abramova.wav)|
| **Ermil** (♂) | `ermil.gpu` |[Ermil.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Ermil.wav)|
| **Zahar** (♂) | `zahar.gpu` |[Zahar.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Zahar.wav)|
| **Kolya** (♂) | `kolya.gpu` |[Kolya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Kolya.wav)|
| **Kostya** (♂) | `kostya.gpu` |[Kostya.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Kostya.wav)|
| **Anton Samokhvalov** (♂) | `anton_samokhvalov.gpu` |[Anton_Samokhvalov.wav](https://github.com/Alkohole/machine-reading-text/raw/main/examples/Anton_Samokhvalov.wav)|

### Эмоции:
|  | Злой | Грустный | Нормальный | Счастливый |
|---|---|----|---|---|
| **Alice** (♀) |❌|❌|✅|✅|
| **Oksana** (♀) |❌|❌|✅|❌|
| **Jane** (♀) |❌|*✅***|✅|❌|
| **Omazh** (♀) |❌|❌|✅|❌|
| **Nastya** (♀) |❌|*✅***|✅|❌|
| **Sasha** (♀) |❌|❌|✅|❌|
| **Tatyana Abramova** (♀) |❌|❌|❌|✅|
| **Ermil** (♂) |❌|❌|✅|❌|
| **Zahar** (♂) |❌|*✅***|✅|❌|
| **Kolya** (♂) |❌|*✅***|✅|❌|
| **Kostya** (♂) |❌|❌|✅|❌|
| **AntonSamokhvalov** (♂) |❌|❌|✅|❌|

**✅** - Поддерживается.<br>
*✅*** - Возможно, есть небольшая разница в окончаниях.<br>
**❌** - Нет поддержки.

### ⚠️ Возможные планы:
- [ ] Пауза. _(Функция найдена)_
- [ ] Скачивание. _(Функция найдена, возможно будет в следующем обновлении)_
- [ ] Визуализация блоков озвучки.
- [ ] ~~Регулировка громкости.~~ _(Не возможно на уровне TTS)_
- [ ] Переосмысление логики.
- [x] Переход с **WAV** формат на **WEBM**/**OGG** форматы.
- [x] Возможность менять скорость.
- [x] Возможность менять эмоции.
- [x] Выбор голоса озвучки.
- [x] **Исправить ошибки в README.md**...

## Демонстрационные страницы:
1. **[Слушать](https://alkohole.github.io/machine-reading-text/)** **(✅ Stable)**
2. **[Скачать](https://alkohole.github.io/machine-reading-text/down)** **(⚠️ Unstable and Abandoned)**



<br>
<br>
<br>
<br>
<br>
<br>
<br>


# Окно объявлений:

> [!TIP]
> Если вам нужна английская версия - воспользуйтесь **[Edge TTS](https://github.com/EdgeTTS/EdgeTTS.github.io)** или любым другим TTS.

> [!IMPORTANT]
> В случае неполадок - перезагрузите браузер.

> [!NOTE]
> <sup>_Edit 18.02.24_</sup> <br>
> Функция **"Скачать"** - **НЕ стабильна**, да еще и **ЗАБРОШЕНА**, а вероятность сбоя выше альпийских гор. Если вам интересна данная функця - пожалуйста, взгляните на **[Скрипта](https://github.com/Alkohole/machine-reading-text/blob/main/down.html#L81)**, и можете предложить мне вашу разгадку.

> [!NOTE]
> <sup>_Update in v0.4.8(js)_</sup> <br>
> Добавлена проверка на наличие дубликатов расширения на сайте. _(Были проблемы с `<iframe>`, от чего элементы расширения дублировались.)_

> [!NOTE]
> <sup>_Update in v0.3.4(web)_</sup> <br>
> Лишнии функции удалены.<br>
> Добавлен голос Алисы.<br>
> Добавленна возможность смены эмоцый.<br>
> Добавлена возможность менять скорость речи.<br>
> Сменился формат с **WAV** на **WEBM**/**OGG** форматы. Для экономии трафика интернета и RAM.<br>

<br>

# Окно сообщений:

> [!NOTE]
> <sup>_Add 24.03.24_</sup> <br>
> Что происходит с **GitHub?!** Это просто _**пиз__Ц**_... Постоянно мой `README.md` саморедактируется и откатывается, чо это за _**на__Й**_**?!**

> [!NOTE]
> <sup>_Add 23.03.24_</sup> <br>
> В скором времени буду работать над функцией скачивания.

> [!NOTE]
> <sup>_Add 10.03.24_</sup> <br>
> Не представлюя как я умудрился пропустить еще 6 моделей TTS... Вроде бы они не работали раньше...<br>
> В дополнение, я чуть почистил скрипт TTS... Надо бы еще чуток почитить...<br>
> Фикс поля ввода для браузеров построенных на **Chromium**.

> [!NOTE]
> <sup>_Add 24.02.24_</sup> <br>
> Оригинальный скрипт **TTS** полный ад, переменные и константы просто однобуквенные приколы (пример: `a`, `e`, `t`, `g`, ...) и ищи-свищи кто есть что.

> [!NOTE]
> <sup>_Add 23.02.24_</sup> <br>
> Искал громкость, но случайно наткнулся на смену TTS модели.

> [!NOTE]
> <sup>_Add 22.02.24_</sup> <br>
> Забавно, но это расширение работает на телефоне Android.


