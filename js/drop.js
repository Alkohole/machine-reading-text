document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("textarea");
    const button = document.getElementById("textSpeaker");

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
            button.style.backgroundColor = "rgba(250, 69, 69, 0.8)";
            button.style.color = "rgba(243, 235, 225, 0.8)";
            button.innerHTML = `${textLength}/20000`;
            
            const afterElement = getComputedStyle(button).getPropertyValue("content");
            if (afterElement !== 'none') {
                button.style.setProperty('--before-and-after', 'none');
            }
        } else {
            button.style.backgroundColor = '';
            button.style.color = '';
            button.innerHTML = '';
            
            button.style.setProperty('--before-and-after', 'none');
        }
    });
});
