// ==UserScript==
// @name         [MRT] - Machine reading text
// @name:ru      [MRT] - Машинное чтение текста
// @namespace    http://tampermonkey.net/
// @version      0.5.6
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

    if (window !== window.top) {
        return;
    }

    if (document.querySelector('#mrt-script-initialized')) {
        return;
    }

    let offset, charPos;
    let settingsContainer, offsetInput, charPosLeft, charPosRight;
    var currentVersion = "0.5.6";

    async function loadSavedValues() {
        offset = await GM.getValue('offset', 0);
        charPos = await GM.getValue('charPos', 'right');
    }

    function applyStyles(elements) {
        elements.button.style[charPos] = `calc(10px + ${offset}px)`;
        elements.iframe.style[charPos] = `calc(5px + ${offset}px)`;
        elements.toggleButton.style[charPos] = `calc(130px + ${offset}px)`;
        elements.settingsButton.style[charPos] = `calc(50px + ${offset}px)`;
    }

    async function initScript() {
        await loadSavedValues();

        const shadowHost = document.createElement('div');
        shadowHost.style.position = 'fixed';
        shadowHost.style.zIndex = 10002;
        document.body.appendChild(shadowHost);

        const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
            #customButton, #toggleButton, #customSet {
                outline: none;
            }
            #customButton:focus, #toggleButton:focus, #customSet:focus,
            #customButton:active, #toggleButton:active, #customSet:active {
                outline: none;
            }
            hr {
                position: relative;
                width: calc(100% + 35px);
                margin-top: 10px;
                margin-left: -19px;
            }
            a, #resetButton {
                text-decoration: none;
                font-family: "Source Code Pro", monospace;
                font-weight: 300;
                background-color: rgb(246, 246, 246);
                color: rgba(0, 0, 0);
                border-radius: 0.3125rem;
                padding-left: 0.3125rem;
                padding-right: 0.3125rem;
                text-align: center;
                cursor: pointer;
            }
            #contSettings {
                font-family: "M PLUS Rounded 1c", sans-serif;
                font-weight: 300;
                font-style: normal;
            }
            #resetButton {
            border: 0;
                &&:hover {background-color: rgb(255, 255, 255);}
            }
        `;
        shadowRoot.appendChild(style);

        const initMarker = document.createElement('div');
        initMarker.id = 'mrt-script-initialized';
        initMarker.style.display = 'none';
        document.body.appendChild(initMarker);

        const button = document.createElement("button");
        button.id = 'customButton';
        button.style.position = "fixed";
        button.style.bottom = "5px";
        button.style[charPos] = `calc(10px + ${offset}px)`;
        button.style.width = "30px";
        button.style.height = "4px";
        button.style.borderRadius = "15px";
        button.style.zIndex = 9999;
        button.style.opacity = 0.1;
        button.style.border = "none";
        button.style.boxSizing = "border-box";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";

        const toggleButton = document.createElement("button");
        toggleButton.id = 'toggleButton';
        toggleButton.style.width = "60px";
        toggleButton.style.height = "4px";
        toggleButton.style.borderRadius = "15px";
        toggleButton.style.border = "none";
        toggleButton.style.position = "fixed";
        toggleButton.style[charPos] = `calc(130px + ${offset}px)`;
        toggleButton.style.zIndex = 9999;
        toggleButton.style.backgroundColor = "rgb(78, 78, 78)";
        toggleButton.style.padding = "5px 10px";
        toggleButton.style.cursor = "pointer";

        const settingsButton = document.createElement("button");
        settingsButton.id = 'customSet';
        settingsButton.style.backgroundColor = "rgb(255, 207, 94)";
        settingsButton.style.position = "fixed";
        settingsButton.style.display = "none";
        settingsButton.style.bottom = "10px";
        settingsButton.style.width = "30px";
        settingsButton.style.height = "4px";
        settingsButton.style.borderRadius = "15px";
        settingsButton.style.border = "none";
        settingsButton.style[charPos] = `calc(50px + ${offset}px)`;
        settingsButton.style.zIndex = 9999;
        settingsButton.style.padding = "5px 10px";
        settingsButton.style.cursor = "pointer";

        const iframe = document.createElement("iframe");
        iframe.id = 'content';
        iframe.style.width = "310px";
        iframe.style.height = "460px";
        iframe.style.position = "fixed";
        iframe.style.bottom = "0px";
        iframe.style[charPos] = `calc(5px + ${offset}px)`;
        iframe.style.zIndex = 9998;
        iframe.style.display = "none";
        iframe.style.border = "none";
        iframe.style.opacity = 0;
        iframe.style.transition = "height 0.5s ease, opacity 0.5s ease";
        iframe.src = "https://alkohole.github.io/machine-reading-text/index.html";

        function adjustToggleButtonPosition() {
            if (iframe.style.height === "460px") {
                toggleButton.style.display = "block";
                toggleButton.style.bottom = "454px";
                button.style.bottom = "454px";
                button.style[charPos] = `calc(10px + ${offset}px)`;
                settingsButton.style.bottom = "454px";
                settingsButton.style[charPos] = `calc(50px + ${offset}px)`;
                button.style.backgroundColor = "rgb(255, 94, 94)";
                button.style.opacity = 0.8;
                settingsButton.style.opacity = 0.8;
                toggleButton.style.opacity = 0.8;
                button.onmouseover = function() { this.style.opacity = 1; };
                button.onmouseout = function() { this.style.opacity = 0.8; };
                settingsButton.onmouseover = function() { this.style.opacity = 1; };
                settingsButton.onmouseout = function() { this.style.opacity = 0.8; };
                toggleButton.onmouseover = function() { this.style.opacity = 1; };
                toggleButton.onmouseout = function() { this.style.opacity = 0.8; };
            } else {
                toggleButton.style.display = "block";
                toggleButton.style.bottom = "110px";
                button.style.bottom = "110px";
                button.style[charPos] = `calc(10px + ${offset}px)`;
                settingsButton.style.bottom = "110px";
                settingsButton.style[charPos] = `calc(50px + ${offset}px)`;
                button.style.backgroundColor = "rgb(255, 94, 94)";
                button.style.transition = "opacity 0.5s ease";
                button.style.opacity = 0.1;
                settingsButton.style.opacity = 0.3;
                toggleButton.style.opacity = 0.1;
                settingsButton.style.transition = "opacity 0.5s ease";
                toggleButton.style.transition = "opacity 0.5s ease";
                button.onmouseover = function() { this.style.opacity = 0.8; };
                button.onmouseout = function() { this.style.opacity = 0.1; };
                settingsButton.onmouseover = function() { this.style.opacity = 0.8; };
                settingsButton.onmouseout = function() { this.style.opacity = 0.3; };
                toggleButton.onmouseover = function() { this.style.opacity = 0.8; };
                toggleButton.onmouseout = function() { this.style.opacity = 0.1; };
            }
        }

        function adjustPositions() {
            button.style[charPos] = `calc(10px + ${offset}px)`;
            iframe.style[charPos] = `calc(5px + ${offset}px)`;
            toggleButton.style[charPos] = `calc(130px + ${offset}px)`;
            settingsButton.style[charPos] = `calc(50px + ${offset}px)`;
            adjustToggleButtonPosition();
        }

        function handleIframeDisplayChange() {
            if (iframe.style.display === "none" || iframe.style.display === "" || getComputedStyle(iframe).opacity === "1") {
                toggleButton.style.display = "none";
                button.style.bottom = "10px";
                button.style[charPos] = `calc(10px + ${offset}px)`;
                settingsButton.style.bottom = "10px";
                settingsButton.style[charPos] = `calc(50px + ${offset}px)`;
                button.style.backgroundColor = "rgb(94, 197, 255)";
                button.style.opacity = 0.1;
                button.onmouseover = function() { this.style.opacity = 0.8; };
                button.onmouseout = function() { this.style.opacity = 0.1; };
                button.style.transition = "opacity 0.5s ease";
            } else {
                adjustToggleButtonPosition();
            }
        }

        button.addEventListener("click", function() {
            if (iframe.style.display === "none" || iframe.style.display === "") {
                iframe.style.display = "block";
                settingsButton.style.display = "block";
                setTimeout(function() {
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

        toggleButton.addEventListener("click", function() {
            if (iframe.style.height === "460px") {
                iframe.style.height = "120px";
            } else {
                iframe.style.height = "460px";
            }
            adjustToggleButtonPosition();
        });

        settingsButton.addEventListener("click", openSettings);

        shadowRoot.appendChild(button);
        shadowRoot.appendChild(toggleButton);
        shadowRoot.appendChild(settingsButton);
        shadowRoot.appendChild(iframe);

        adjustPositions();
        handleIframeDisplayChange();

        function changeOffset(value) {
            const maxOffset = getMaxOffset();
            if (value < 0) {
                value = 0;
            } else if (value > maxOffset) {
                value = maxOffset;
            }
            offset = value;
            GM.setValue('offset', offset);
            adjustPositions();
            updateSettingsDisplay();
        }

        function changeCharPos(value) {
            charPos = value;
            GM.setValue('charPos', charPos);
            adjustPositions();
            updateSettingsDisplay();
        }

        function resetSettings() {
            offset = 0;
            charPos = "right";
            GM.setValue('offset', offset);
            GM.setValue('charPos', charPos);
            adjustPositions();
            updateSettingsDisplay();
        }

        function updateSettingsDisplay() {
            if (settingsContainer) {
                offsetInput.value = offset;
                offsetInput.max = getMaxOffset();
                charPosLeft.checked = charPos === 'left';
                charPosRight.checked = charPos === 'right';
            }
        }

        function getMaxOffset() {
            const windowWidth = window.innerWidth;
            const iframeWidth = 320;
            return windowWidth - iframeWidth;
        }

        function updateMaxOffset() {
            const maxOffset = getMaxOffset();
            offsetInput.max = maxOffset;
            if (offset > maxOffset) {
                offset = maxOffset;
                GM.setValue('offset', offset);
                adjustPositions();
                updateSettingsDisplay();
            }
        }

        function getCurrentVersion() {
            return currentVersion;
        }

        function getLatestVersion(callback) {
            fetch('https://alkohole.github.io/machine-reading-text/mrt.user.js')
                .then(response => response.text())
                .then(data => {
                    const scriptMeta = data.match(/==UserScript==[^]*?==\/UserScript==/s)[0];
                    const versionMatch = scriptMeta.match(/@version\s+([\d.]+)/);
                    const latestVersion = versionMatch ? versionMatch[1] : 'Unknown';
                    callback(latestVersion);
                })
                .catch(error => {
                    callback('Unknown');
                });
        }

        function openSettings() {
            if (settingsContainer) {
                settingsContainer.remove();
                settingsContainer = null;
                return;
            }

            settingsContainer = document.createElement('div');
            settingsContainer.id = 'contSettings';
            settingsContainer.style.position = 'fixed';
            settingsContainer.style.top = '50%';
            settingsContainer.style.left = '50%';
            settingsContainer.style.transform = 'translate(-50%, -50%)';
            settingsContainer.style.backgroundColor = 'rgb(71, 64, 79)';
            settingsContainer.style.color = 'rgba(208, 208, 208, 0.9)';
            settingsContainer.style.padding = '20px';
            settingsContainer.style.borderRadius = '4px';
            settingsContainer.style.zIndex = 10001;
            settingsContainer.style.width = '300px';

            offsetInput = document.createElement('input');
            offsetInput.type = 'number';
            offsetInput.value = offset;
            offsetInput.min = 0;
            offsetInput.max = getMaxOffset();
            offsetInput.addEventListener('change', function() {
                changeOffset(parseInt(offsetInput.value));
            });

            charPosLeft = document.createElement('input');
            charPosLeft.type = 'radio';
            charPosLeft.name = 'charPos';
            charPosLeft.value = 'left';
            charPosLeft.checked = charPos === 'left';
            charPosLeft.addEventListener('change', function() {
                changeCharPos('left');
            });

            charPosRight = document.createElement('input');
            charPosRight.type = 'radio';
            charPosRight.name = 'charPos';
            charPosRight.value = 'right';
            charPosRight.checked = charPos === 'right';
            charPosRight.addEventListener('change', function() {
                changeCharPos('right');
            });

            const resetButton = document.createElement('button');
            resetButton.id = 'resetButton';
            resetButton.textContent = 'Reset to Default';
            resetButton.addEventListener('click', function() {
                resetSettings();
            });

            const closeButton = document.createElement('button');
            closeButton.style.width = "30px";
            closeButton.style.height = "4px";
            closeButton.style.borderRadius = "15px";
            closeButton.style.opacity = 1;
            closeButton.style.border = "none";
            closeButton.style.boxSizing = "border-box";
            closeButton.style.padding = "5px 10px";
            closeButton.style.cursor = "pointer";
            closeButton.style.backgroundColor = 'rgb(255, 94, 94)';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '10px';
            closeButton.addEventListener('click', function() {
                settingsContainer.remove();
                settingsContainer = null;
            });

            const versionContainer = document.createElement('div');
            const versionText = document.createElement('p');
            const currentVersion = getCurrentVersion();
            versionText.textContent = `Your current version is ${currentVersion}.`;

            getLatestVersion(function(latestVersion) {
                if (currentVersion === latestVersion) {
                    versionText.appendChild(document.createElement('br'));
                    versionText.appendChild(document.createTextNode('You are using the latest version.'));
                } else {
                    const latestVersionLink = document.createElement('a');
                    latestVersionLink.href = 'https://alkohole.github.io/machine-reading-text/mrt.user.js';
                    latestVersionLink.target = '_blank';
                    latestVersionLink.textContent = latestVersion;
                    versionText.appendChild(document.createElement('br'));
                    versionText.appendChild(document.createTextNode('Upgrade to version '));
                    versionText.appendChild(latestVersionLink);
                }
            });

            const aboutContainer = document.createElement('div');

            const poweredByText = document.createElement('p');
            const mailMeText = document.createElement('p');
            const reportIssueText = document.createElement('p');
            const extensionPageText = document.createElement('p');
            const aboutExtensionText = document.createElement('p');
            const donateText = document.createElement('p');

            reportIssueText.innerHTML = `Issues and suggestions: <a href="https://github.com/Alkohole/machine-reading-text/issues" target="_blank">GitHub</a>`;
            extensionPageText.innerHTML = `Extension webpage: <a href="https://alkohole.github.io/machine-reading-text/" target="_blank">MRT</a>`;
            aboutExtensionText.innerHTML = `About extension: <a href="https://alkohole.github.io/mrt/" target="_blank">MRT</a> <sup>(In development)</sup><hr>`;
            poweredByText.innerHTML = `Powered by <a href="https://alkohole.github.io/" target="_blank">@Alkohole</a> <sup>(In development)</sup>`;
            mailMeText.innerHTML = `Mail me <a href="mailto:DeadlineStudio@protonmail.com">my@mail.com</a><hr>`;
            donateText.innerHTML = `Donate to crypto beer: <a href="https://alkohole.github.io/donate/" target="_blank">crypto@Alkohole</a> <sup>(In development)</sup>`;


            versionContainer.appendChild(versionText);
            aboutContainer.appendChild(reportIssueText);
            aboutContainer.appendChild(extensionPageText);
            aboutContainer.appendChild(aboutExtensionText);
            aboutContainer.appendChild(poweredByText);
            aboutContainer.appendChild(mailMeText);
            aboutContainer.appendChild(donateText);

            settingsContainer.appendChild(document.createTextNode('Offset: '));
            settingsContainer.appendChild(offsetInput);
            settingsContainer.appendChild(document.createElement('hr'));
            settingsContainer.appendChild(document.createTextNode('Position: '));
            settingsContainer.appendChild(charPosLeft);
            settingsContainer.appendChild(document.createTextNode('Left '));
            settingsContainer.appendChild(charPosRight);
            settingsContainer.appendChild(document.createTextNode('Right '));
            settingsContainer.appendChild(document.createElement('hr'));
            settingsContainer.appendChild(resetButton);
            settingsContainer.appendChild(closeButton);
            settingsContainer.appendChild(document.createElement('hr'));
            settingsContainer.appendChild(versionContainer);
            settingsContainer.appendChild(document.createElement('hr'));
            settingsContainer.appendChild(aboutContainer);

            shadowRoot.appendChild(settingsContainer);

            updateMaxOffset();
        }

        window.addEventListener('resize', updateMaxOffset);
    }

    initScript();
})();