// ==UserScript==
// @name         [MRT] - Machine reading text
// @name:ru      [MRT] - Машинное чтение текста
// @namespace    http://tampermonkey.net/
// @version      0.4.6
// @description  Display custom HTML page from URL on button click with settings panel
// @author       Alkohole
// @match        *://*/*
// @exclude      https://librettolab.xyz/udr/*
// @exclude      https://Alkohole.github.io/udr/*
// @grant        none
// @icon         https://storage.yandexcloud.net/cloud-www-assets/region-assets/ru/favicon/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    // Проверка, созданы ли уже элементы
    if (document.getElementById('customButton') || document.getElementById('customSettingsButton') || document.getElementById('customIframe')) {
        return;
    }



    // Создаем кнопку для открытия страницы
    var button = document.createElement("button");
    button.id = 'customButton'; // Добавляем уникальный идентификатор
    button.innerHTML = "⇅";
    button.style.backgroundColor = "rgb(248, 233, 214)";
    button.style.fontSize = "20px";
    button.style.position = "fixed";
    button.style.bottom = "10px";
    button.style.right = "50px";
    button.style.width = "30px"; // Устанавливаем ширину
    button.style.height = "30px"; // Устанавливаем высоту
    button.style.borderRadius = "50%"; // Закругляем углы
    button.style.zIndex = 9999;
    button.style.opacity = 0.1;
    button.style.border = "2px solid";
    button.style.borderColor = "rgb(255, 140, 0)";
    button.style.color = "rgb(255, 140, 0)";
    button.style.transition = "opacity 0.5s ease";
    button.onmouseover = function() { this.style.opacity = 0.8; }
    button.onmouseout = function() { this.style.opacity = 0.1; }

    // Создаем кнопку для настроек
    var settingsButton = document.createElement("button");
    settingsButton.id = 'customSettingsButton'; // Добавляем уникальный идентификатор
    settingsButton.innerHTML = "⚙";
    settingsButton.style.position = "fixed";
    settingsButton.style.bottom = "10px";
    settingsButton.style.right = "10px";
    settingsButton.style.width = "30px"; // Устанавливаем ширину
    settingsButton.style.height = "30px"; // Устанавливаем высоту
    settingsButton.style.borderRadius = "50%"; // Закругляем углы
    settingsButton.style.zIndex = 9999;
    settingsButton.style.opacity = 0.1;
    settingsButton.style.transition = "opacity 0.5s ease";
    settingsButton.style.border = "2px solid";
    settingsButton.style.borderColor = "rgb(255, 140, 0)";
    settingsButton.style.color = "rgb(255, 140, 0)";
    settingsButton.style.fontSize = "20px";
    settingsButton.onmouseover = function() { this.style.opacity = 0.8; }
    settingsButton.onmouseout = function() { this.style.opacity = 0.1; }

    // Создаем выпадающее окно для настроек
    var settingsPanel = document.createElement("div");
    settingsPanel.style.position = "fixed";
    settingsPanel.style.bottom = "10px";
    settingsPanel.style.right = "85px";
    settingsPanel.style.zIndex = 9998;
    settingsPanel.style.opacity = 0.1;
    settingsPanel.style.display = "none";
    settingsPanel.style.border = "2px solid";
    settingsPanel.style.padding = "3px";
    settingsPanel.style.fontSize = "20px";
    settingsPanel.style.borderColor = "rgb(255, 140, 0)";
    settingsPanel.style.color = "rgb(255, 140, 0)";
    settingsPanel.style.transition = "opacity 0.5s ease";
    settingsPanel.style.backgroundColor = "rgb(248, 233, 214)";
    settingsPanel.style.borderRadius = "5px";
    settingsPanel.onmouseover = function() { this.style.opacity = 0.8; }
    settingsPanel.onmouseout = function() { this.style.opacity = 0.1; }


    // Создаем радиокнопки
    var radioListenDiv = document.createElement("div");
    var radioListen = document.createElement("input");
    radioListen.type = "radio";
    radioListen.name = "iframeOption";
    radioListen.value = "https://Alkohole.github.io/udr/index.html";
    radioListen.checked = true;
    radioListenDiv.appendChild(radioListen);
    radioListenDiv.appendChild(document.createTextNode(" Слушать"));
    var listenInfo = document.createElement("span");
    listenInfo.title = "Функция ''Слушать'' воспроизводит написанный текст.\nЛимит 20 000 символов на запрос.";
    listenInfo.innerHTML = " ⓘ";
    radioListenDiv.appendChild(listenInfo);
    settingsPanel.appendChild(radioListenDiv);

    var radioDownloadDiv = document.createElement("div");
    var radioDownload = document.createElement("input");
    radioDownload.type = "radio";
    radioDownload.name = "iframeOption";
    radioDownload.value = "https://Alkohole.github.io/udr/down.html";
    radioDownloadDiv.appendChild(radioDownload);
    radioDownloadDiv.appendChild(document.createTextNode(" Скачать (Бета)"));
    var betaInfo = document.createElement("span");
    betaInfo.title = "Функция ''Скачать'' находится в бета-версии.\nЛимит 1 000 символов на запрос.\nВозможны сбои.";
    betaInfo.innerHTML = " ⓘ";
    radioDownloadDiv.appendChild(betaInfo);
    settingsPanel.appendChild(radioDownloadDiv);


    // Создаем iframe для модального окна
    var iframe = document.createElement("iframe");
    iframe.id = 'customIframe'; // Добавляем уникальный идентификатор
    iframe.style.width = "300px";
    iframe.style.height = "300px";
    iframe.style.position = "fixed";
    iframe.style.bottom = "80px";
    iframe.style.right = "10px";
    iframe.style.zIndex = 9997;
    iframe.style.display = "none";
    iframe.style.border = "none"; // Убираем рамку
    iframe.style.borderRadius = "30px"; // Закругляем углы
    iframe.style.opacity = 0;
    iframe.style.transition = "opacity 0.5s ease";
    iframe.src = "https://Alkohole.github.io/udr/index.html"

    // Добавляем событие для открытия/закрытия модального окна
    button.addEventListener("click", function() {
        if (iframe.style.display === "none" || iframe.style.display === "") {
            iframe.style.display = "block"; // Переключаем на "block" сразу
            setTimeout(function() { // Задаем задержку, чтобы изменение display завершилось
                iframe.style.opacity = 1;
            }, 0); // Задержка 0 миллисекунд, чтобы код выполнился после переключения display
        } else {
            iframe.style.opacity = 0; // Начинаем анимацию угасания
            setTimeout(function() { // Ждем окончания анимации
                iframe.style.display = "none";
            }, 500); // Задержка в 500 миллисекунд соответствует длительности анимации
        }
    });

    // Добавляем событие для открытия/закрытия панели настроек
    settingsButton.addEventListener("click", function() {
        settingsPanel.style.display = (settingsPanel.style.display === "none" || settingsPanel.style.display === "") ? "block" : "none";
    });

    // Добавляем событие для обновления URL в iframe
    settingsPanel.addEventListener("change", function(e) {
        if (e.target.name === "iframeOption") {
            iframe.src = e.target.value;
        }
    });

    // Добавляем элементы на страницу
    document.body.appendChild(button);
    document.body.appendChild(settingsButton);
    document.body.appendChild(settingsPanel);
    document.body.appendChild(iframe);
})();