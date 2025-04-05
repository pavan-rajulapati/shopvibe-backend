const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const mongoose  = require('mongoose')
const cookies = require('cookie-parser')
const path = require('path');
const errorHandler = require('./middlewares/errorHandler')


const app = express()
app.use(require('./routes/post/webhook.routes'))
app.use(bodyParser.json())
app.use(cookies())
dotEnv.config()

// cors for API routes

app.options('*', cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const port = process.env.PORT || 8000;
const url = process.env.MONGO_URI;

// Mongo DB atlas connection 

const dbConnection = ()=>{
    try {
        mongoose.connect(url)
        console.log('Connected to the DB')
    } catch (error) {
        console.log('Error at connecting to the database',error.message)
        process.exit(1)
    }
}

dbConnection()

// API routes 

app.get('/', (req, res) => {
    res.send('This Message from backend');
});

app.use(require('./main_routes'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Port running at ${port}`);
})