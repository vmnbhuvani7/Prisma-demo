const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

require('dotenv').config()

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Cookie middleware
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
app.use('/api', userRoutes)
app.use('/api', postRoutes)


app.get('/', (req, res) => {
    res.send('Hi')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})