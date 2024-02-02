const User = require("../models/User");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;



//Generate user Token
const generateTtoken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    });
};



//Register user and sign in
const register = async (req, res) => {
    
    const {name, email, password} = req.body

    const storieImage = 0;

    //check if user exists
    const user = await User.findOne({email})

    if(user) {

        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]})
        return
    }

    //Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
        storieImage
    })

    //If user was created sucessfully, return the token
    if(!newUser){

        res.status(422).json({errors: ["Houve um erro, porfavor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateTtoken(newUser._id)
    })


};



//Sign user in
const login = async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})


    //Check if user exists
    if(!user){

        res.status(404).json({errors: ["Usuário não encontrado"]})
        return

    }

    //Check if password matches
    if(!(await bcrypt.compare(password, user.password))){

        res.status(422).json({errors: ["Senha inválida"]})
        return

    }

    //Return user with tohen
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateTtoken(user._id)
    })

}


//Get current logged in user
const getCurrentUser = async (req, res) => {

    const user = req.user;

    res.status(200).json(user);
}


//Update an user
const update = async (req, res) => {

    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
        
    }

    const reqUser = req.user

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");

    if(name) {
        user.name = name;
    }

    if(password) {

        //Generate password hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash;
    }

    if(profileImage) {

        user.profileImage = profileImage;
    }

    if(bio){

        user.bio = bio;
    }

    await user.save()

    res.status(200).json(user);
}



const getUserById = async (req, res) => {

    const {id} = req.params;

    try {
        
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");

        //Check if user exists
        if(!user) {

            res.status(404).json({erros: ["Usuario não está no banco de dados."]});
            return;
        }

        res.status(200).json(user);
        
    } catch (error) {

        res.status(404).json({erros: ["Erro ao encontrar o usuário."]});
        return;
        
    }

}


const getAllUsers = async (req, res) => {

    const users = await User.find({}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(users);
}






const insertStorie = async (req, res) => {
    
    reqUser = req.user;

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");

    if(user) {

        if(user.storieImage == undefined || user.storieImage == null){

            console.log("if")

            user.storieImage = 0;

        }else{
            console.log("else")
            user.storieImage = user.storieImage + 1;

        }

        await user.save()
            
        res.status(200).json({user, message: "eiiiiiiiiiiiiii"});
        
    }

}


const removeInsertStorie = async (req, res) => {

    const {id} = req.params

    const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");

    if(user) {

        if(user.storieImage !== 0){

            console.log("removeu storie do usuario")
            user.storieImage = user.storieImage - 1;
           
        }

        await user.save()

        res.status(200).json({user, message: "Storie removido."});
    }
    

    

    

}



module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
    getAllUsers,
    insertStorie,
    removeInsertStorie,

};
