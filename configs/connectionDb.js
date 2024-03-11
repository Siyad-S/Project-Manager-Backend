const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://siyad:o2Omi34vLMmvKUNr@cluster0.ietlnyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Database connected",
        connect.connection.host,
        connect.connection.name
        )
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb