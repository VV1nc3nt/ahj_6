/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
const addCardBtns = document.querySelectorAll('.add_card_wrapper');

addCardBtns.forEach((element) => element.addEventListener('click', addCardInput));

function addCardInput(e) {
  const cardWrapper = e.target.parentNode.parentNode.children[1];

  e.target.remove();

  cardWrapper.innerHTML += '<div class="card_add_form"><input type="text" class="card_input"><button class="card_add_btn">Add card</button><span class="cancel_add">&#10006;</span></div>';

  document.querySelector('.cancel_add').addEventListener('click', removeCardInput);
  document.querySelector('.card_add_btn').addEventListener('click', addNewCard);
}

function removeCardInput(e) {
  const cardWrapper = e.target.parentNode.parentNode.nextElementSibling;

  e.target.parentNode.remove();

  cardWrapper.innerHTML += '<span class="add_card">+ Add new card</span>';
}

function addNewCard(e) {
  const cardInput = document.querySelector('.card_input');
  const cardWrapper = e.target.parentNode.parentNode.nextElementSibling;
  const cards = e.target.parentNode.parentNode;

  cards.innerHTML += `<li class="card" draggable="true"><p class="card_content">${cardInput.value}</p><span class="delete_card">&#10006</span></li>`;

  document.querySelector('.card_add_form').remove();
  cardWrapper.innerHTML += '<span class="add_card">+ Add new card</span>';

  document.querySelectorAll('.delete_card').forEach((element) => element.addEventListener('click', removeCard));
}

function removeCard(e) {
  const card = e.target.parentNode;

  card.remove();
}

const cardsList = document.querySelectorAll('.cards');

cardsList.forEach((element) => element.addEventListener('dragstart', (e) => {
  e.target.classList.add('dragged');
}));

cardsList.forEach((element) => element.addEventListener('dragover', (e) => {
  e.preventDefault();

  const actualCard = document.querySelector('.dragged');
  const currentCard = e.target;

  const isDraggable = actualCard !== currentCard && currentCard.classList.contains('card');

  if (!isDraggable) { return; }

  const nextCard = getNextCard(e.clientY, currentCard);

  if (nextCard && actualCard === nextCard.previousElementSibling || actualCard === nextCard) { return; }

  element.insertBefore(actualCard, nextCard);
}));

cardsList.forEach((element) => element.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragged');
}));

cardsList.forEach((element) => element.addEventListener('drop', (e) => {
  e.preventDefault();

  const actualCard = document.querySelector('.dragged');

  if (e.target.classList.contains('cards')) {
    actualCard.parentNode.removeChild(actualCard);
    e.target.appendChild(actualCard);
  }
}));

const getNextCard = (cursorPosition, currentCard) => {
  const currentCardPosition = currentCard.getBoundingClientRect();
  const currentCardCenter = currentCardPosition.y + currentCardPosition.height / 2;

  const nextCard = (cursorPosition < currentCardCenter) ? currentCard : currentCard.nextElementSibling;

  return nextCard;
};

window.addEventListener('beforeunload', () => {
  const tableData = {};

  cardsList.forEach((element) => {
    tableData[element.id] = `${element.innerHTML}`;
  });

  localStorage.setItem('tableData', JSON.stringify(tableData));
});

document.addEventListener('DOMContentLoaded', () => {
  const json = localStorage.getItem('tableData');

  let tableData;

  try {
    tableData = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }

  if (tableData) {
    Object.keys(tableData).forEach((key) => {
      cardsList[key].innerHTML += tableData[key];
    });
  }

  document.querySelectorAll('.delete_card').forEach((element) => element.addEventListener('click', removeCard));
});
