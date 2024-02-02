const {body} = require("express-validator")



const userCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O nome é obrigatório!")
            .isLength({min: 3}).withMessage("O nome precisa ter no minimo 3 letras!"),
        body("email")
            .isString().withMessage("O e=mail é obrigatório!")
            .isEmail().withMessage("Insira um e-mail valido!"),
        body("password")
            .isString().withMessage("A senha é obrigatório!")
            .isLength({min: 5}).withMessage("A senha precisa ter no minino 3 caracteres!"),
        body("confirmPassword")
            .isString().withMessage("A confirmação de senha é obrigatorio!")
            .custom((value, {req}) => {
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais!")
                }
                return true;
            }),
    ];  
}


const loginValidation = () => {
    return [
        body("email")
            .isString().withMessage("O email é obrigatorio")
            .isEmail().withMessage("Insira um e-mail válido"),
        body("password")
            .isString().withMessage("A senha é obrigatória"),
    ];
}


const userUpsateValidation = () => {

    return [
        body("name")
        .optional()
        .isLength({min: 3}).withMessage("O nome precisa pelo menos 3 caractéres"),
        body("password")
        .optional()
        .isLength({min: 5}).withMessage("A senha precisa ter no mínimo 5 caractéres")
    ];
};


// const userUpdateStorieVvalidation = () => {

//     return [
//         body("image")
//         .custom((value, {req}) => {

//             if(!req.file) {
//                 throw new Error("A imagem é obrigatória")
//             }

//             return true;
//         })
//     ]
// }



module.exports = {
    userCreateValidation,
    loginValidation,
    userUpsateValidation,
    // userUpdateStorieVvalidation,
}