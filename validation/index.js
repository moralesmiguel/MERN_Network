exports.createPostValidator = (req, res, next) => {
    //Title validation
    req.check('title',"Write a title").notEmpty();
    req.check('title',"Title must be longer than four characters").isLength({
        min:4
    });
    //Body validation
    req.check('body',"Write a body").notEmpty();
    //Check for errors
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
};

exports.userSignupValidator = (req, res, next) => {
    //Name is not null
    req.check("name","Name is required").notEmpty();
    //Email is valid
    req.check("email","Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:2000
    })
    //Password
    req.check("password","Password is required").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    //Check for errors
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
}