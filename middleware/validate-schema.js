const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    // console.log('validator check', errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // res.status(200).json({
    //     success: true,
    //     message: 'Validation Succeeded'
    // });
    next();
}
module.exports = { validate };