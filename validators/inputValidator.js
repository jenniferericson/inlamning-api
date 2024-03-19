const { check, validationResult } = require("express-validator");

const validateInputValues = [
    check('name')
      .escape()
      .trim()
      .not()
      .isEmpty()
      .withMessage('Empty product name!'),
    check('brand')
      .escape()
      .trim()
      .not()
      .isEmpty()
      .withMessage('Empty brand!'),
    check('price')
      .escape()
      .not()
      .isEmpty()
      .withMessage('Empty price!'),
    check('rating')
      .escape()
      .not()
      .isEmpty()
      .withMessage('Empty rating!'),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

module.exports = {
    validateInputValues
};