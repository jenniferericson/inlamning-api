const { check } = require("express-validator");

const validateInputValues = [
    check('name')
      .escape()
      .trim()
      .not()
      .isEmpty()
      .withMessage('Empty  product name!'),
    check('brand')
      .trim()
      .escape(),
    check('price')
      .escape(),
    check('rating')
      .escape(),
  
    (req, res, next) => {
      const errors = validateInputValues(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
  ];

module.exports = {
    validateInputValues
};