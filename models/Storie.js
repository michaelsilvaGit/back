const mongoose = require("mongoose");
const {Schema} = mongoose;



const storieSchema = new Schema(
    {
        image: String,
        likes: Array,
        userId: mongoose.ObjectId,
        userName: String,
        userImage: String
    },

    {
        timestamps: true
    }
)


const Storie = mongoose.model("Storie", storieSchema);

module.exports = Storie;