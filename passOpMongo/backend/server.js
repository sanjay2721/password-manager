import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'passop'
const app = express()
const port = 3000   
app.use(bodyParser.json())
app.use(cors())

await client.connect();
//get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray()
    res.json(findResult)
})
//save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
    res.json({success:true,result:findResult})
})

//delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password)
    res.json({success:true,result:findResult})
})

app.put('/', async (req, res) => {
    const { id, site, username, password } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const result = await collection.updateOne(
        { id },
        { $set: { site, username, password } }
    );
    res.json({ success: true, result });
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})