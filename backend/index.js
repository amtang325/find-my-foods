const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const friendRoute = require('./routes/friendRoutes.js')

const app = express()
app.use(cors())

app.use('/friend', friendRoute);

app.get('/', (req, res) => {
    res.status(200).json({"message":"hello!"})
})

const port = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App connected to database and');
        app.listen(port, () => {
            console.log(`listening on localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
