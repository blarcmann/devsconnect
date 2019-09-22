const express = require('express');
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI;

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose
    .connect(db)
    .then(() => console.log('Curve the cake'))
    .catch((error) => console.log('ERR', error))

app.get('/', (req, res) => {
    res.send('HEllO')
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`bitch twerking on ${port}`);
})