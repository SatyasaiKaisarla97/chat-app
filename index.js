const express = require('express');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chat')
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', chatRoutes)


app.get('/', (req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})
app.listen(3000)