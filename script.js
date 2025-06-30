// script.js

// Toggle between light and dark mode
const modeToggle = document.getElementById('mode-toggle');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const body = document.body;

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  });
}

// Show only the clicked section
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    sections.forEach(section => {
      section.style.display = section.id === targetId ? 'block' : 'none';
    });
  });
});

// Initialize visibility on page load
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach(section => {
    section.style.display = section.id === 'home' ? 'block' : 'none';
  });
});

// Tic Tac Toe functionality
let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      document.getElementById('result').textContent = `${gameBoard[a]} wins!`;
      disableBoard();
      return;
    }
  }

  if (!gameBoard.includes("")) {
    document.getElementById('result').textContent = "It's a draw!";
  }
}

function handleClick(e) {
  const idx = e.target.dataset.index;
  if (!gameBoard[idx]) {
    gameBoard[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function disableBoard() {
  document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
}

function initGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.textContent = "";
    cell.dataset.index = index;
    cell.addEventListener('click', handleClick);
  });
  document.getElementById('result').textContent = "";
}

const gameContainer = document.getElementById('games');
if (gameContainer) {
  initGame();
  const restartBtn = document.getElementById('restart');
  if (restartBtn) {
    restartBtn.addEventListener('click', initGame);
  }
}
