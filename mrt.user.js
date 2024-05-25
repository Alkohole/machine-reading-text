// ==UserScript==
// @name         [MRT] - Machine reading text
// @name:ru      [MRT] - Машинное чтение текста
// @namespace    http://tampermonkey.net/
// @version      0.5.3
// @description  Display custom HTML page from URL on button click with settings panel
// @author       Alkohole
// @match        *://*/*
// @exclude      https://alkohole.github.io/machine-reading-text/*
// @grant        none
// @icon         https://storage.yandexcloud.net/cloud-www-assets/region-assets/ru/favicon/favicon.ico
// @connect api.browser.yandex.ru
// @downloadURL https://github.com/Alkohole/udr/raw/main/mrt.user.js
// @homepageURL https://github.com/Alkohole/udr/issues
// @updateURL https://github.com/Alkohole/udr/raw/main/mrt.user.js
// ==/UserScript==

(function() {
    'use strict';

    var customButton = document.getElementById('customButton');
    var customIframe = document.getElementById('customIframe');
    var customSet = document.getElementById('customSet');

    var offsetRight = 0; // измените это значение, чтобы установить уровень сдвига по горизонтали для умолчания
    var charPos = "right"; // переключение позиционирования left/right для умолчания

    if (customButton && customIframe) {
        if (window.top !== window.self) {
            document.body.removeChild(customButton);
            document.body.removeChild(customIframe);
            document.body.removeChild(customSet);
        }
        return;
    }

    var button = document.createElement("button");
    button.id = 'customButton';
    button.style.backgroundImage = 'url("https://storage.yandexcloud.net/cloud-www-assets/region-assets/ru/favicon/favicon.ico")';
    button.style.backgroundSize = 'cover';
    button.style.backgroundColor = "rgb(248, 233, 214)";
    button.style.fontSize = "20px";
    button.style.position = "fixed";
    button.style.bottom = "10px";
    button.style[charPos] = `calc(10px + ${offsetRight}px)`;
    button.style.width = "30px";
    button.style.height = "30px";
    button.style.borderRadius = "50%";
    button.style.zIndex = 9999;
    button.style.opacity = 0.1;
    button.style.border = "none";
    button.style.boxSizing = "border-box";
    button.style.padding = "0";
    button.style.transition = "opacity 0.5s ease";
    button.onmouseover = function() { this.style.opacity = 0.8; }
    button.onmouseout = function() { this.style.opacity = 0.1; }

    var toggleButton = document.createElement("button");
    toggleButton.id = 'toggleButton';
    toggleButton.style.width = "60px";
    toggleButton.style.height = "4px";
    toggleButton.style.borderRadius = "15px";
    toggleButton.style.border = "none";
    toggleButton.style.position = "fixed";
    toggleButton.style[charPos] = `calc(130px + ${offsetRight}px)`;
    toggleButton.style.zIndex = 9998;
    toggleButton.style.backgroundColor = "rgb(78, 78, 78)";
    toggleButton.style.padding = "5px 10px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.transition = "bottom 0.5s ease";

    var settingsButton = document.createElement("button");
    settingsButton.id = 'customSet';
    settingsButton.textContent = "⚙";
    settingsButton.style.position = "fixed";
    settingsButton.style.display = "none";
    settingsButton.style.opacity = 0;
    settingsButton.style.bottom = "10px";
    settingsButton.style.width = "30px";
    settingsButton.style.height = "30px";
    settingsButton.style.borderRadius = "50%";
    settingsButton.style.border = "none";
    settingsButton.style[charPos] = `calc(50px + ${offsetRight}px)`;
    settingsButton.style.zIndex = 9999;
    settingsButton.style.cursor = "pointer";
    settingsButton.style.transition = "height 0.5s ease, opacity 0.5s ease";
    settingsButton.addEventListener("click", function() {
        var newOffset = prompt("Введите новое значение отступа справа (в пикселях):");
        if (newOffset !== null) {
            changeOffsetRight(parseInt(newOffset));
        }
    });
    document.body.appendChild(settingsButton);

    var iframe = document.createElement("iframe");
    iframe.id = 'customIframe';
    iframe.style.width = "310px";
    iframe.style.height = "460px";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0px";
    iframe.style[charPos] = `calc(5px + ${offsetRight}px)`;
    iframe.style.zIndex = 9997;
    iframe.style.display = "none";
    iframe.style.border = "none";
    iframe.style.opacity = 0;
    iframe.style.transition = "height 0.5s ease, opacity 0.5s ease";
    iframe.src = "https://alkohole.github.io/machine-reading-text/index.html"

    button.addEventListener("click", function() {
        if (iframe.style.display === "none" || iframe.style.display === "") {
            iframe.style.display = "block";
            settingsButton.style.display = "block";
            setTimeout(function() {
                settingsButton.style.opacity = 1;
                iframe.style.opacity = 1;
            }, 0);
        } else {
            iframe.style.opacity = 0;
            settingsButton.style.opacity = 0;
            setTimeout(function() {
                iframe.style.display = "none";
                settingsButton.style.display = "none";
            }, 500);
        }
        handleIframeDisplayChange();
    });

    function adjustToggleButtonPosition() {
        if (iframe.style.height === "460px") {
            toggleButton.style.display = "block";
            toggleButton.style.bottom = "453px";
            button.style.bottom = "445px";
            button.style[charPos] = `calc(10px + ${offsetRight}px)`;
            settingsButton.style.bottom = "445px";
            settingsButton.style[charPos] = `calc(50px + ${offsetRight}px)`;
        } else {
            toggleButton.style.display = "block";
            toggleButton.style.bottom = "110px";
            button.style.bottom = "100px";
            button.style[charPos] = `calc(10px + ${offsetRight}px)`;
            settingsButton.style.bottom = "100px";
            settingsButton.style[charPos] = `calc(50px + ${offsetRight}px)`;
        }
    }

    function adjustPositions() {
        button.style[charPos] = `calc(10px + ${offsetRight}px)`;
        iframe.style[charPos] = `calc(5px + ${offsetRight}px)`;
        toggleButton.style[charPos] = `calc(130px + ${offsetRight}px)`;
        settingsButton.style[charPos] = `calc(10px + ${offsetRight}px)`;
        adjustToggleButtonPosition();
    }

    function handleIframeDisplayChange() {
        if (iframe.style.display === "none" || iframe.style.display === "" || getComputedStyle(iframe).opacity === "1") {
            toggleButton.style.display = "none";
            button.style.bottom = "10px";
            button.style[charPos] = `calc(10px + ${offsetRight}px)`;
            settingsButton.style.bottom = "10px";
            settingsButton.style[charPos] = `calc(50px + ${offsetRight}px)`;
        } else {
            adjustToggleButtonPosition();
        }
    }

    toggleButton.addEventListener("click", function() {
        if (iframe.style.height === "460px") {
            iframe.style.height = "120px";
        } else {
            iframe.style.height = "460px";
        }
        adjustToggleButtonPosition();
    });

    document.body.appendChild(toggleButton);

    if (window.top === window.self) {
        document.body.appendChild(button);
        document.body.appendChild(iframe);
    }

    document.body.appendChild(iframe);
    adjustPositions();
    handleIframeDisplayChange();

    function changeOffsetRight(value) {
        offsetRight = value;
        adjustPositions();
    }
})();
