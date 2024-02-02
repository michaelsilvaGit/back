const {body} = require("express-validator")

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined").withMessage("O titulo é obrigatório")
            .isString().withMessage("O titulo é obrigatorio")
            .isLength({min: 3}).withMessage("O título precisa ter no míno 3 caractéres"),
        body("image")
            .custom((value, {req}) => {

                if(!req.file) {
                    throw new Error("A imagem é obrigatória")
                }

                return true;
        })
    ]
}


const photoUpdateValidation = () => {
    return[
        body("title")
        .isString().withMessage("O titulo é obrigatório.")
        .isLength({min: 3}).withMessage("O título precisa ter no mínimo 3 caracteres."),
    ]
}


const commentValidation = () => {
    return [
        body("comment")
        .isLength({min: 1}).withMessage("O comentário não pode ser vazio."),
    ]
}




module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation,
}