const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  doesCardExist,
} = require('../controllers/card');
const { validateCardId, validateCardInfo } = require('../utils/validators/cardValidator');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCardInfo, createCard);
cardRoutes.delete('/:cardId', deleteCard, doesCardExist);
cardRoutes.put('/:cardId/likes', validateCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRoutes;
