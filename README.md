# [MRT] - Машинное чтение текста
Расширение позволяет воспроизвести написанный текст синтезированным голосом, теперь доступен не только в Yandex Browser версии Windows. Признателен **[Yandex.Translate](https://translate.yandex.ru/)** за такую возможность.
- Функция **"Слушать"** имеет лимит в 50k символов *(≈7500 слов)* на запрос. **(✅ Cтабильна)**
- Функция **"Скачать"** имеет лимит в 1k символов *(≈140 слов)* на запрос. **(⚠️ НЕ стабильна)**
  
> [!Note]
> У меня нет нужды чинить функцию **"Скачать"**, на данный момент она НЕ стабильна, а вероятность сбоя составляет ≈75%.
> Если вам интересно помоч мне починить функцию **"Скачать"**, пожалуйста, предлогайте **[Pull requests](https://github.com/Alkohole/udr/pulls)**, сам линк **[Скрипта](https://github.com/Alkohole/udr/blob/main/down.html#L81)**.

https://github.com/Alkohole/udr/assets/59339504/99fdac2b-0f26-42e5-94eb-2a550acb5a7c

## Установка расширения:
1. Установите расширение **[Tampermonkey](https://www.tampermonkey.net/)** (Альтернатива для Safari: **[UserScripts](https://apps.apple.com/app/userscripts/id1463298887 )**).
2. **[Установите Скрипт](https://github.com/Alkohole/udr/raw/main/mrt.user.js)**.

## Примечание:
- Кнопка **⇅** сворачивает/разворачивает окно ввода.
- Кнопка **⚙** сворачивает/разворачивает окно настроек.
- Кнопка **▶** воспроизводит/останавливает озвучивание текста.
- Кнопка **⏎** скачивает озвученный текст.
- Имеется обработчик дропа в окно ввода (Выделите текст и перетащите его в окно ввода, ранее находящийся в окне текст автоматически стирается).
- Имеется счетчик количества символов в окне (Если превышение лимита - вы увидите сообщение).

### ⚠️ Не доступно:
- Пауза.
- Регулировка громкости.
- Выбор голоса озвучки.

## Демонстрационные страницы:
1. **[Слушать](https://alkohole.github.io/udr/)** **(✅ Stable)**
2. **[Скачать](https://alkohole.github.io/udr/down)** **(⚠️ Unstable)**

### PS:
Это **домашний скрипт**, изначально предназначенный для личного использования. <br>
Т.к. я являюсь пользователем Linux, я не имею желания и возможности пользоваться Yandex Browser, где только в версии Windows есть возможность прочитать страницу с помощь Яндекс Алисы.
