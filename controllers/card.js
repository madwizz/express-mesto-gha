const Card = require('../models/card');
const BadRequestError = require('../utils/classErrors/BadRequestError');
const NotFoundError = require('../utils/classErrors/NotFoundError');
const ForbiddenError = require('../utils/classErrors/ForbiddenError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid data is received'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Card is not found');
    }
    if (card.owner.toString() !== req.params.cardId) {
      throw new ForbiddenError('It is not allowed to delete cards which you do not own');
    }
    await Card.findByIdAndRemove(req.params.cardId);
    return res.send({
      message: 'Card is deleted',
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Card _id is not valid'));
    }
    return next(err);
  }
};

const handleCardLike = async (req, res, options, next) => {
  try {
    const action = options.addLike ? '$addToSet' : '$pull';
    const cardUpdate = await Card.findByIdAndUpdate(
      req.params.cardId,
      { [action]: { likes: req.user._id } },
      { new: true },
    );
    if (!cardUpdate) {
      throw new NotFoundError('Card is not found');
    }
    return res.send(cardUpdate);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid data is received: wrong _id'));
    }
    return next(err);
  }
};

module.exports.likeCard = (req, res) => {
  handleCardLike(req, res, { addLike: true });
};

module.exports.dislikeCard = (req, res) => {
  handleCardLike(req, res, { addLike: false });
};
