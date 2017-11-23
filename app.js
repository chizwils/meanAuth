const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/configdatabase');

mongoose.connect(config.database);
const app = express();
//to know if connected 
mongoose.connection.on("connected",()=>{
    console.log('Connected to database '+
               config.database);
});
//throw an error
mongoose.connection.on('error',(err)=>{
    console.log('Database error: \n\t'+ err);
});
const users = require('./routes/users');
const port = 3111;
//middlewares
app.use(cors());
app.use(bodyParser.json());

//passprt midddleware 
app.use(passport.initialize());
app.use(passport.session());
  //set static folder 
app.use(express.static(path.join(__dirname, 'public')))
app.use('/users', users);

//Routes
app.get('/', (req, res) => {
    res.send('CHINEDU CHIZARAM')
})

//Listening port/ start server
app.listen(port, () => {
    console.log('Listening on port: '+ port);
});
