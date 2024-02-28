const words = [
    'High',
    'Hello',
    'Rahul',
    'Steer',
    'admit',
    'Loyal',
    'Learn',
    'Leap',
    'Fault',
    'Obesessed',
    'Curiosity',
    'Lovable',
    'Generation',
    'Handsome',
    'Javascript',
    'Learning',
    'Apply', 'abandon', 'ability', 'able', 'abortion',
    'about', 'above', 'abroad', 'absence',
    'absolute', 'absolutely', 'absorb', 'abuse',
    'academic', 'accept', 'access', 'accident',
    'accompany', 'accomplish', 'according', 'account',
    'accurate', 'accuse', 'achieve', 'achievement',
    'acid', 'acknowledge', 'acquire', 'across',
    'act', 'action', 'active', 'activist',
    'activity', 'actor', 'actress', 'actual',
    'actually', 'ad', 'adapt', 'add',
    'addition', 'additional', 'address', 'adequate',
    'adjust', 'adjustment', 'administration', 'administrator',
    'admire', 'admission', 'admit', 'adolescent',
    'adopt', 'adult', 'advance', 'advanced',
    'advantage', 'adventure', 'advertising', 'advice',
    'advise', 'adviser', 'advocate', 'affair',
    'affect', 'afford', 'afraid', 'African',
    'African-American', 'after', 'afternoon', 'again',
    'against', 'age', 'agency', 'agenda',
    'agent', 'aggressive', 'ago', 'agree',
    'agreement', 'agricultural', 'ah', 'ahead',
    'aid', 'aide', 'AIDS', 'aim',
    'air', 'aircraft', 'airline', 'airport',
    'album', 'alcohol', 'alive', 'all',
    'alliance', 'allow', 'ally', 'almost'

];

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
// const timep = document.getElementById('time');
// selecting random words
let randomWord;

// Init score
let score = 0;

//Init time
let time = 10;

// set difficulty to value in local storage else use medium
let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium';

// starting counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate a Random word
let getRandomWord = () => { return words[Math.floor(Math.random() * words.length)] };

// Add word to DOM
let addWordToDom = () => {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
    if (time > 10) {
        timeEl.style.color = 'blue';
    } else {
        timeEl.style.color = 'red';
    }
}

function gameOver() {
    endgameEl.innerHTML = `<h1>Time ran out </h1>
    <p>Your final score is <span style="color: Blue"> ${score} </span></p>
    <button onclick="location.reload()">Reload</button>`

    endgameEl.style.display = 'flex';
}
addWordToDom();

// event Listeners
text.addEventListener('input', (e) => {
    const insertedText = e.target.value;   // input text

    if (insertedText === randomWord) {  // if input text and provided word match
        addWordToDom();               // select new word randomlly
        updateScore();                // update score by +1
        e.target.value = '';         // clearing input 

        if (difficulty === 'hard') {
            time += 2
        } else if (difficulty === 'medium') {
            time += 3
        } else {
            time += 5
        }
        updateTime();
    }
})

settingsBtn.addEventListener('click', (e) => settings.classList.toggle('hide'))

settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})
