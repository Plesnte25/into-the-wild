const router = require('express').Router();

const reviewController = require('../controller/reviewController.js');

router.get('/:id',reviewController.getReviewbyproperty);
router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;