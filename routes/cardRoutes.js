const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const {validateCardId, validateCardInfo } = require('../utils/validators/cardValidator')

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', validateCardInfo, createCard);
cardRoutes.delete('/cards/:cardId', deleteCard);
cardRoutes.put('/cards/:cardId/likes', validateCardId, likeCard);
cardRoutes.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRoutes;
