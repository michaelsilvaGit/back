const mongoose = require("mongoose");
const dbUsr = process.env.DB_USER
const dbPassword = process.env.DB_PASS



const conn = async () => {

    try {

        const dbConn = await mongoose.connect(`mongodb+srv://${dbUsr}:${dbPassword}@cluster0.9ji5sxu.mongodb.net/?retryWrites=true&w=majority`)
        
        console.log("Conectou ao banco")

        return dbConn;

    } catch (error) {

        console.log(error)
    }
}

conn()

module.exports = conn;