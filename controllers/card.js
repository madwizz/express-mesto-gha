const Card = require('../models/card');

const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/errors');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Cannot get cards',
    });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Failed to create card',
    });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(NOT_FOUND_ERROR_CODE).json({
        message: 'Card is not found',
      });
    }
    await Card.findByIdAndRemove(req.params.cardId);
    return res.send({
      message: 'Card is deleted',
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
    }
    return res.status(DEFAULT_ERROR_CODE).json({
      message: 'Card is not found',
    });
  }
};

const handleCardLike = async (req, res, options) => {
  try {
    const action = options.addLike ? '$addToSet' : '$pull';
    const cardUpdate = await Card.findByIdAndUpdate(
      req.params.cardId,
      { [action]: { likes: req.user._id } },
      { new: true },
    );
    if (!cardUpdate) {
      return res.status(NOT_FOUND_ERROR_CODE).json({
        message: 'Card is not found',
      });
    }
    return res.send(cardUpdate);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
    }
    return res.status(DEFAULT_ERROR_CODE).json({
      message: 'Card was not updated',
    });
  }
};

module.exports.likeCard = (req, res) => {
  handleCardLike(req, res, { addLike: true });
};

module.exports.dislikeCard = (req, res) => {
  handleCardLike(req, res, { addLike: false });
};
