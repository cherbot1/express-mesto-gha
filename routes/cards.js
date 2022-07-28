const router = require('express').Router();
const { getCards, createCard, deleteCard, addLike, removeLike } = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);


module.exports = router;