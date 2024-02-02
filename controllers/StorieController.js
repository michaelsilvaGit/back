const Storie = require("../models/Storie")
const User = require("../models/User")

const mongoose = require("mongoose")



//Insert a storie, whit an user related to it
const insertStorie = async (req, res) => {

    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    //Create a storie
    const newStorie = await Storie.create({
        image,
        userId: user._id,
        userName: user.name,
        userImage: user.profileImage,
    });

    //If photo was created successfully, return data
    if(!newStorie){

        res.status(422).json({
            errors: ["Houve um problema, por favor tente vovamente mais tarde."],
        });

        return;
    }

    res.status(200).json(newStorie);
}


//Get Storie by userId
const getUserStorie = async (req, res) => {

    const {id} = req.params;

    const stories = await Storie.find({userId: id}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(stories);
}


//Delete a storie over time
const deleteStorie = async(req, res) => {

    const {id} = req.params

    try {

        console.log("id: " + id)
  
        const storie = await Storie.findById(new mongoose.Types.ObjectId(id))

        console.log("dados: " + storie)
    
        await Storie.findByIdAndDelete(storie._id);

        res.status(200).json({id: photo._id, message: "Foto excluída com sucesso"});

    } catch (error) {
        res.status(404).json({errors: ["Foto não encontrada!"]})
        return
    }
} 



//Get all stories
const getAllStories = async (req, res) => {
    const stories = await Storie.find({}).exec();

    return res.status(200).json(stories)
}



//Like funcionality
const likeStorie = async (req, res) => {

    const {id} = req.params;

    const reqUser = req.user;

    const storie = await Storie.findById(id);

    //Check if photo exists
    if (!storie){
        res.status(404).json({errors: ["Storie não encontrada!"]})
        return
    }

    //Put user id in likes array
    storie.likes.push(reqUser._id)

    storie.save()

    res.status(200).json({storieId: id, userId: reqUser._id, message: "O storie foi curtido."})

}





module.exports = {
    insertStorie,
    getUserStorie,
    deleteStorie,
    getAllStories,
    likeStorie,
}