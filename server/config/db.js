const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true
        })
        console.log(`Db connected Successfully !!!! ${conn.connection.host}`);
    } catch (error) {
            console.log(`Error connecting: = > ${error.message}`);
            process.exit()
    }
}

module.exports = connectDB;