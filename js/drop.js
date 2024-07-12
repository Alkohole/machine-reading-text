document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("textarea");
    const button = document.getElementById("textSpeaker");
    const warning = document.querySelector(".warning"); // Get the warning div

    // Обработчик для dragover
    textarea.addEventListener("dragover", function(event) {
        event.preventDefault();
        this.value = '';  // Очищаем содержимое
    });

    // Обработчик для drop
    textarea.addEventListener("drop", function(event) {
        event.preventDefault();  // Предотвращаем стандартное поведение
        const droppedText = event.dataTransfer.getData("text/plain");
        this.value = droppedText; // Заменяем содержимое

        // Имитируем событие input
        const inputEvent = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });
        this.dispatchEvent(inputEvent);
    });

    // Обработчик для проверки количества символов
    textarea.addEventListener('input', function() {
        let textLength = textarea.value.length;

        if (textLength > 20000) {
            button.style.backgroundColor = "var(--back-b)";
            button.style.color = "var(--color-button-play-warn)";

            // Update the warning div instead of the button
            warning.textContent = `${textLength} / 20k`;
            warning.style.display = "block";

            // Clear the button's innerHTML
            button.innerHTML = '✖';

        } else {
            button.style.backgroundColor = '';
            button.style.color = '';

            // Hide the warning div
            warning.textContent = '';
            warning.style.display = "none";

            // Clear the button's innerHTML
            button.innerHTML = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const ttsModel = document.getElementById('ttsModel');
    const ttsEmotion = document.getElementById('ttsEmotion');
    const updateEmotionSelector = () => {
        const selectedModel = ttsModel.options[ttsModel.selectedIndex];
        const allowedEmotions = selectedModel.dataset.emotions ? selectedModel.dataset.emotions.split(',') : [];
        for (const option of ttsEmotion.options) {
        option.disabled = !allowedEmotions.includes(option.value);
        }
        const neutralOption = ttsEmotion.querySelector('option[value="neutral"]');
        if (neutralOption && !neutralOption.disabled) {
        neutralOption.selected = true;
        } else {
        for (const option of ttsEmotion.options) {
            if (!option.disabled) {
            option.selected = true;
            break;
            }
        }
        }
    };
    ttsModel.addEventListener('change', updateEmotionSelector);
    updateEmotionSelector();
});

let audioContexts = [];

function updateAudioContexts() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const newContexts = Array.from(audioSources.audioContexts);
            if (newContexts.length > 0) {
                audioContexts = newContexts.filter(context => context.state !== 'closed');
                clearInterval(checkInterval);
                resolve(audioContexts);
            }
        }, 100);
    });
}

async function initController() {
    await updateAudioContexts();
    document.getElementById('speakerPause').addEventListener('click', toggleAudioContexts);
}

function toggleAudioContexts() {
    audioContexts.forEach(audioContext => {
        if (audioContext.state === "running") {
            audioContext.suspend().then(() => {
                console.log('Pause:', audioContext);
            });
        } else if (audioContext.state === "suspended") {
            audioContext.resume().then(() => {
                console.log('Start:', audioContext);
            });
        }
    });
}

const detectorScript = document.createElement('script');
detectorScript.textContent = `
    const audioSources = { audioContexts: new Set() };
    const originalAudioContext = window.AudioContext || window.webkitAudioContext;
    window.AudioContext = window.webkitAudioContext = function(...args) {
        const audioContext = new originalAudioContext(...args);
        audioSources.audioContexts.add(audioContext);
        console.log('New AudioContext created:', audioContext);
        console.log('All AudioContext:', Array.from(audioSources.audioContexts));
        return audioContext;
    };
    window.audioSources = audioSources;
`;
document.head.appendChild(detectorScript);

initController();

setInterval(updateAudioContexts, 500);

document.addEventListener('DOMContentLoaded', function() {
    const textSpeakerButton = document.getElementById('textSpeaker');
    const speakerPauseButton = document.getElementById('speakerPause');

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const classList = textSpeakerButton.classList;
                if (classList.contains('state-playing')) {
                    speakerPauseButton.classList.remove('hidden');
                    setTimeout(() => {
                        speakerPauseButton.classList.add('show');
                    }, 10);
                } else {
                    speakerPauseButton.classList.remove('show');
                    setTimeout(() => {
                        if (!speakerPauseButton.classList.contains('show')) {
                            speakerPauseButton.classList.add('hidden');
                        }
                    }, 500);
                }
            }
        }
    });

    observer.observe(textSpeakerButton, { attributes: true });
});