/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function() {

/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
const addCardBtns = document.querySelectorAll('.add_card_wrapper');
addCardBtns.forEach(element => element.addEventListener('click', addCardInput));
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
  document.querySelectorAll('.delete_card').forEach(element => element.addEventListener('click', removeCard));
}
function removeCard(e) {
  const card = e.target.parentNode;
  card.remove();
}
const cardsList = document.querySelectorAll('.cards');
cardsList.forEach(element => element.addEventListener('dragstart', e => {
  e.target.classList.add('dragged');
}));
cardsList.forEach(element => element.addEventListener('dragover', e => {
  e.preventDefault();
  const actualCard = document.querySelector('.dragged');
  const currentCard = e.target;
  const isDraggable = actualCard !== currentCard && currentCard.classList.contains('card');
  if (!isDraggable) {
    return;
  }
  const nextCard = getNextCard(e.clientY, currentCard);
  if (nextCard && actualCard === nextCard.previousElementSibling || actualCard === nextCard) {
    return;
  }
  element.insertBefore(actualCard, nextCard);
}));
cardsList.forEach(element => element.addEventListener('dragend', e => {
  e.target.classList.remove('dragged');
}));
cardsList.forEach(element => element.addEventListener('drop', e => {
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
  const nextCard = cursorPosition < currentCardCenter ? currentCard : currentCard.nextElementSibling;
  return nextCard;
};
window.addEventListener('beforeunload', () => {
  const tableData = {};
  cardsList.forEach(element => {
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
    Object.keys(tableData).forEach(key => {
      cardsList[key].innerHTML += tableData[key];
    });
  }
  document.querySelectorAll('.delete_card').forEach(element => element.addEventListener('click', removeCard));
});

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_app__WEBPACK_IMPORTED_MODULE_1__);


}();
/******/ })()
;
//# sourceMappingURL=main.js.map