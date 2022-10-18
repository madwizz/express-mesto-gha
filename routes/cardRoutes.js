const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/cardsId', deleteCard);
cardRoutes.put('/cards/:cardId/likes', likeCard);
cardRoutes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
