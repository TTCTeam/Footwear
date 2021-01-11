const { MongoClient } = require("mongodb");
let database;
const uri = "mongodb+srv://Aloha:TTC123456@cluster0.xh6ru.mongodb.net/Footwear?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectDb() {
    try {
        await client.connect();

        database = await client.db("Footwear");
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}
connectDb();

const db = () => database;
module.exports.db = db;