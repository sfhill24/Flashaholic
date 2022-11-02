const { Card } = require("../models");

const cardData = [
  {
    user_id: 1,
    deck_id: 1,
    front_text: "What does HTML stand for?",
    back_text: "HyperText Markup Language",
  },
  {
    user_id: 1,
    deck_id: 1,
    front_text:
      "What are the primary formatting tools used in HTML, symbolized by <>?",
    back_text: "Tags",
  },
  {
    user_id: 1,
    deck_id: 1,
    front_text: "What does <a> symbolize?",
    back_text: "An anchor tag",
  },
  {
    user_id: 1,
    deck_id: 2,
    front_text: "What does CSS stand for?",
    back_text: "Cascading Style Sheets",
  },
  {
    user_id: 1,
    deck_id: 2,
    front_text:
      "If there are two CSS files declared in an HTML file, which will take precedence- this first or the last?",
    back_text: "The one declared last",
  },
  {
    user_id: 1,
    deck_id: 2,
    front_text: "What are the elements of the CSS Box Model?",
    back_text: "Content, padding, border, and margin",
  },
  {
    user_id: 2,
    deck_id: 3,
    front_text: "What is JavaScript?",
    back_text: "A popular programming language",
  },
  {
    user_id: 2,
    deck_id: 3,
    front_text:
      "Which HTML tag ties a JavaScript file and its logic to an HTML file?",
    back_text: "The <script> tag",
  },
  {
    user_id: 2,
    deck_id: 3,
    front_text:
      "What were the two new keywords used to declare variables introduced in ES6?",
    back_text: "const and let",
  },
  {
    user_id: 3,
    deck_id: 4,
    front_text: "What is Bootstrap?",
    back_text: "A CSS framework",
  },
  {
    user_id: 3,
    deck_id: 4,
    front_text:
      "What is the maximum number of columns a div can take up using Bootstrap?",
    back_text: "12 (twelve)",
  },
  {
    user_id: 3,
    deck_id: 4,
    front_text:
      "Which HTML attribute does Bootstrap primarily use to execute its formatting?",
    back_text: "class",
  },
];

const seedCards = () => Card.bulkCreate(cardData);

module.exports = seedCards;
