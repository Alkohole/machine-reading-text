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