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