// Hvor mange dager mellom hver oppgave?
const intervals = {
    haircut: 30,
    beard: 7,
    badNede: 14,
};

// Hjelpefunksjoner
function formatDate(date) {
    return date.toLocaleDateString('no-NO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateNextDate(lastDate, days) {
    const next = new Date(lastDate);
    next.setDate(next.getDate() + days);
    return next;
}

function shouldDisableButton(lastDate) {
    if (!lastDate) return false;
    const last = new Date(lastDate);
    const now = new Date();
    return last.getDate() === now.getDate() &&
           last.getMonth() === now.getMonth() &&
           last.getFullYear() === now.getFullYear();
}

function saveDate(key) {
    localStorage.setItem(key, new Date().toISOString());
}

function getDate(key) {
    return localStorage.getItem(key);
}

function updateTaskDisplay(taskKey, lastId, nextId, buttonId, intervalDays) {
    const lastDateStr = getDate(taskKey);
    const lastElem = document.getElementById(lastId);
    const nextElem = nextId ? document.getElementById(nextId) : null;
    const button = document.getElementById(buttonId);

    if (lastDateStr) {
        const lastDate = new Date(lastDateStr);
        lastElem.textContent = `Sist utført: ${formatDate(lastDate)}`;
        lastElem.style.color = '#000';

        if (nextElem && intervalDays) {
            const nextDate = calculateNextDate(lastDate, intervalDays);
            nextElem.textContent = `Neste: ${formatDate(nextDate)}`;
            nextElem.style.color = '#000';
        }

        button.disabled = shouldDisableButton(lastDateStr);
    } else {
        lastElem.textContent = 'Ingen registrering enda.';
        lastElem.style.color = '#45AC35';
        if (nextElem) nextElem.textContent = '';
        button.disabled = false;
    }
}

// Oppdater alle tasks
function updateAll() {
    updateTaskDisplay('lastHaircut', 'lastHaircut', 'nextHaircut', 'haircutButton', intervals.haircut);
    updateTaskDisplay('lastBeardTrim', 'lastBeardTrim', 'nextBeardTrim', 'beardButton', intervals.beard);
    updateTaskDisplay('lastStretch', 'lastStretch', null, 'stretchButton', null);
    updateTaskDisplay('badNedeLast', 'lastBadNede', 'nextBadNede', 'badNedeButton', intervals.badNede);
}

// Event handlers
document.getElementById('haircutButton').addEventListener('click', () => {
    saveDate('lastHaircut');
    updateAll();
});
document.getElementById('beardButton').addEventListener('click', () => {
    saveDate('lastBeardTrim');
    updateAll();
});
document.getElementById('stretchButton').addEventListener('click', () => {
    saveDate('lastStretch');
    updateAll();
});
document.getElementById('badNedeButton').addEventListener('click', () => {
    saveDate('badNedeLast');
    updateAll();
});
document.getElementById('resetButton').addEventListener('click', () => {
    if (confirm('Er du sikker på at du vil nullstille alt?')) {
        localStorage.clear();
        updateAll();
    }
});

// Initialiser på side-last
document.addEventListener('DOMContentLoaded', updateAll);
    