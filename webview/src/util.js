/**
 * Selects a single DOM element.
 * @param {string} q - The CSS selector.
 * @param {HTMLElement|Document} [c=document] - The context to search within.
 * @returns {HTMLElement|null} The selected element or null if not found.
 */
const $ = (q, c = document) => c.querySelector(q);

/**
 * Selects multiple DOM elements.
 * @param {string} q - The CSS selector.
 * @param {HTMLElement|Document} [c=document] - The context to search within.
 * @returns {HTMLElement[]} An array of selected elements.
 */
const $$ = (q, c = document) => Array.from(c.querySelectorAll(q));

/**
 * Attaches a one-time event listener to an element.
 * @param {HTMLElement} elem - The element to attach the listener to.
 * @param {string} evt - The event type.
 * @returns {Promise<Event>} A promise that resolves when the event is triggered.
 */
const once = (elem, evt) => new Promise((done) => elem.addEventListener(evt, done, { once: true }));

/**
 * Forces a DOM node to redraw.
 * @param {HTMLElement} node - The node to redraw.
 * @returns {number} The client height of the node.
 */
const redraw = (node) => node.clientHeight;

/**
 * Sets a CSS variable on a DOM node.
 * @param {string} key - The variable name (without '--').
 * @param {string} value - The value to set.
 * @param {HTMLElement} [node=document.body] - The node to set the variable on.
 */
const setVar = (key, value, node = document.body) => node.style.setProperty('--' + key, value);

/**
 * Calculates the width of a given text string.
 * @param {string} text - The text to measure.
 * @returns {string} The width in pixels.
 */
const calcTextWidth = (text) => {
  const div = document.body.appendChild(document.createElement('div'));
  div.classList.add('size-test');
  div.textContent = text;
  const width = div.clientWidth;
  div.remove();
  return width + 1 + 'px';
};

export { $, $$, once, redraw, setVar, calcTextWidth };
