const rules = document.querySelector('#rules-btn');
const showRules = document.querySelector('.game-rules');
const crossBtn = document.querySelector('#cross');
const play = document.querySelector('.play');

rules.addEventListener('click', showHideRules);
crossBtn.addEventListener('click', showHideRules);

function showHideRules() {
    showRules.style.right = showRules.style.getPropertyValue('right') === `1rem` ? '-70rem' : '1rem';
    crossBtn.style.display = crossBtn.style.getPropertyValue('display') === 'inline-block' ? 'none' : 'inline-block';
}

const pcChoice = ['rock', 'paper', 'scissors'];
const resultSection = document.querySelector('.result');
const selectedItem = document.querySelectorAll('.play div');

Array.from(selectedItem).forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const random = Math.floor(Math.random() * pcChoice.length);
        checkWhoWon(e.currentTarget.getAttribute('data-value'), pcChoice[random]);
        play.classList.add('inactive');
        resultSection.classList.remove('inactive');
    });
});


function checkWhoWon(player, computer) {
    if (player == 'rock') {
        if (computer == 'rock') {
            updatePage(player, computer, 'tie');
        }
        if (computer == 'scissors') {
            updatePage(player, computer, 'playerwins');
        }
        if (computer == 'paper') {
            updatePage(player, computer, 'pcwins');
        }
    }
    if (player == 'scissors') {
        if (computer == 'rock') {
            updatePage(player, computer, 'pcwins');
        }
        if (computer == 'scissors') {
            updatePage(player, computer, 'tie');
        }
        if (computer == 'paper') {
            updatePage(player, computer, 'playerwins');
        }
    }
    if (player == 'paper') {
        if (computer == 'rock') {
            updatePage(player, computer, 'playerwins');
        }
        if (computer == 'scissors') {
            updatePage(player, computer, 'pcwins');
        }
        if (computer == 'paper') {
            updatePage(player, computer, 'tie');
        }
    }
}

const playerScoreDisplay = document.querySelector('#player-score-number');
const pcScoreDisplay = document.querySelector('#comp-score-number');
let playerScore = parseInt(localStorage.getItem('playerwins')) || 0;
let pcScore = parseInt(localStorage.getItem('pcwins')) || 0;
playerScoreDisplay.textContent = playerScore;
pcScoreDisplay.textContent = pcScore;

function updatePage(player, computer, status) {
    const playerChoiceImg = document.querySelector('.player-choice img');
    const pcChoiceImg = document.querySelector('.pc-choice img');
    const resultText = document.querySelector('.won-lost');
    const nextBtn = document.getElementById('next-btn');
    const playerContainer = document.querySelector('.player-choice');
    const pcContainer = document.querySelector('.pc-choice');

    // Set images
    playerChoiceImg.src = `${player}.png`;
    playerChoiceImg.alt = player;
    pcChoiceImg.src = `${computer}.png`;
    pcChoiceImg.alt = computer;

    // Clear previous rings & winner class
    [playerContainer, pcContainer].forEach(container => {
        container.classList.remove('winner');
        container.querySelectorAll('.ring').forEach(r => r.remove());
    });

    if (status === 'tie') {
        resultText.textContent = 'TIE UP';
        nextBtn.classList.add('inactive');
    } else if (status === 'playerwins') {
        resultText.textContent = 'YOU WON';
        nextBtn.classList.remove('inactive');
        playerScore++;
        localStorage.setItem('playerwins', playerScore);
        playerScoreDisplay.textContent = playerScore;

        playerContainer.classList.add('winner');
        addRings(playerContainer);
    } else {
        resultText.textContent = 'YOU LOST';
        nextBtn.classList.add('inactive');
        pcScore++;
        localStorage.setItem('pcwins', pcScore);
        pcScoreDisplay.textContent = pcScore;

        pcContainer.classList.add('winner');
        addRings(pcContainer);
    }
}

function addRings(container) {
    container.querySelectorAll('.ring').forEach(r => r.remove()); 

    const ringSizes = [160, 200, 240]; 
    const ringColors = [
        'rgb(0, 71, 11)',  
        'rgba(14, 166, 45, 0.75)', 
        'rgba(77, 199, 77, 0.6)' 
    ];

    ringSizes.forEach((size, index) => {
        setTimeout(() => {
            const ring = document.createElement('div');
            ring.classList.add('ring');
            ring.style.width = `${size}px`;
            ring.style.height = `${size}px`;
            ring.style.background = ringColors[index]; 
            ring.style.position = 'absolute';
            ring.style.borderRadius = '50%';
            ring.style.zIndex = '-1';
            container.appendChild(ring);
        }, index * 80);
    });
}

Array.from(document.querySelectorAll('.play-again-btn')).forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.reload();
    });
});

document.querySelector('#next-btn').addEventListener('click', () => {
    play.classList.add('inactive');
    resultSection.classList.add('inactive');
    document.querySelector('header').classList.add('inactive');
    document.querySelector('.hurray').classList.remove('inactive');
    document.querySelector('#next-btn').classList.add('inactive');
    rules.style.marginRight = '0%';
});