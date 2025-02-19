const express = require('express')
const cors = require('cors'); 
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()


require('dotenv').config()

const PORT = process.env.PORT

const allowedOrigins = [
    "http://localhost:5173", 
    "https://expense-tracker-sg1z.vercel.app" 
];

//middLewares

app.use(express.json())

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () =>{
    db()
        app.listen(PORT,() => {
            console.log('listening to port:',PORT)
        })
}

server()
