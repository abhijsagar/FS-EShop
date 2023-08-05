const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({
    path: 'config/.env',
});

const ErrorHandler = require('./middleware/error');
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
app.use('/test', (req, res) => {
    res.send('Hello world!');
});

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
