// Default configurable parameters
let INITIAL_TIME_S = 5; // seconds
const CORRECT_SCALING = 0.95;
const INCORRECT_SCALING = 1.10;

let a, b, timer, timeMs, streak, intervalId;
let stopped = true;
const app = document.getElementById('app');

function getRandomDigit() {
    return Math.floor(Math.random() * 9) + 1;
}

function adjustTime(current, correct) {
    return correct ? current * CORRECT_SCALING : current * INCORRECT_SCALING;
}

function render() {
    app.innerHTML = `
    <form id="config-form" style="margin-bottom:1em;">
        <label>Initial Time (seconds): 
          <input id="config-initial" type="number" min="0.5" step="0.1" value="${INITIAL_TIME_S}" ${intervalId ? 'disabled' : ''}>
        </label>
      <button type="submit" ${intervalId ? 'disabled' : ''}>Set</button>
    </form>
    <button id="start-btn"${stopped ? '' : ' disabled'}>Start</button>
    <button id="stop-btn"${stopped ? ' disabled' : ''}>Stop</button>
    <h2>${a ?? ''} ${a && b ? 'x' : ''} ${b ?? ''} ${a && b ? '= ?' : ''}</h2>
    <form id="answer-form" autocomplete="off">
      <input id="answer-input" type="number" ${stopped ? 'disabled' : ''} autofocus />
    </form>
    <div>
      <progress id="timer-bar" value="${timer ?? INITIAL_TIME_S * 1000}" max="${timeMs ?? INITIAL_TIME_S * 1000}"></progress>
      <span id="timer-label">${((timer ?? INITIAL_TIME_S * 1000) / 1000).toFixed(1)}s</span>
    </div>
    <div>Streak: <span id="streak">${streak ?? 0}</span></div>
  `;

    // Config form logic
    document.getElementById('config-form').onsubmit = e => {
        e.preventDefault();
        const newInitial = parseFloat(document.getElementById('config-initial').value);
        if (!intervalId) {
            INITIAL_TIME_S = Math.max(0.5, newInitial);
            reset();
        }
    };

    document.getElementById('start-btn').onclick = () => {
        stopped = false;
        if (!intervalId) start();
    };

    document.getElementById('stop-btn').onclick = () => {
        stopped = true;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        render();
    };

    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.focus();
        answerInput.addEventListener('input', () => {
            if (!stopped && parseInt(answerInput.value, 10) === a * b) {
                checkAnswer(true);
            }
        });
    }

    document.getElementById('answer-form').onsubmit = e => {
        e.preventDefault();
    };
}

function nextProblem(newTimeMs) {
    a = getRandomDigit();
    b = getRandomDigit();
    timeMs = newTimeMs;
    timer = newTimeMs;
    render();
}

function checkAnswer(isCorrect) {
    const correct = typeof isCorrect === 'boolean' ? isCorrect : (parseInt(document.getElementById('answer-input').value, 10) === a * b);
    timeMs = adjustTime(timeMs, correct);
    streak = correct ? streak + 1 : 0;
    nextProblem(timeMs);
}

function tick() {
    if (stopped) return;
    timer -= 100;
    if (timer <= 0) {
        timeMs = adjustTime(timeMs, false);
        streak = 0;
        nextProblem(timeMs);
    } else {
        document.getElementById('timer-bar').value = timer;
        document.getElementById('timer-label').textContent = (timer / 1000).toFixed(1) + 's';
    }
}

function start() {
    if (stopped) return;
    a = getRandomDigit();
    b = getRandomDigit();
    timeMs = INITIAL_TIME_S * 1000;
    timer = timeMs;
    streak = 0;
    render();
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(tick, 100);
}

function reset() {
    stopped = true;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    a = undefined;
    b = undefined;
    timeMs = INITIAL_TIME_S * 1000;
    timer = INITIAL_TIME_S * 1000;
    streak = 0;
    render();
}

render();