document.getElementById('agreeCheckbox').addEventListener('change', function() {
    document.getElementById('submitButton').disabled = !this.checked;
});

let Commands = [{
    'commands': []
}, {
    'handleEvent': []
}];

function measurePing() {
    var xhr = new XMLHttpRequest();
    var startTime, endTime;
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            endTime = Date.now();
            var pingTime = endTime - startTime;
            document.getElementById("ping").textContent = pingTime + " ms";
        }
    };
    xhr.open("GET", location.href + "?t=" + new Date().getTime());
    startTime = Date.now();
    xhr.send();
}
setInterval(measurePing, 1000);

function updateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const formattedTime = now.toLocaleString('en-US', options);
    document.getElementById('time').textContent = formattedTime;
}
updateTime();
setInterval(updateTime, 1000);

async function State() {
    const jsonInput = document.getElementById('json-data');
    const button = document.getElementById('submitButton');
    try {
        button.style.display = 'none';
        const state = JSON.parse(jsonInput.value);
        if (state && typeof state === 'object') {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state: state,
                    commands: Commands.commands,
                    handleEvent: Commands.handleEvent,
                    prefix: document.getElementById('inputOfPrefix').value,
                    admin: document.getElementById('inputOfAdmin').value,
                }),
            });
            const data = await response.json();
            if (data.success) {
                jsonInput.value = '';
                showResult(data.message);
            } else {
                jsonInput.value = '';
                showResult(data.message);
            }
        } else {
            jsonInput.value = '';
            showResult('Invalid JSON data. Please check your input.');
        }
    } catch (parseError) {
        jsonInput.value = '';
        console.error('Error parsing JSON:', parseError);
        showResult('Invalid JSON data. Please check your input.');
    } finally {
        button.style.display = 'block';
    }
}

function showResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.textContent = message;
};
