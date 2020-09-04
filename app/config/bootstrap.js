const bootstrap = () => {
    const express = require('express');
    const bodyParser= require('body-parser');
    const app = express();
    const dotenv = require('dotenv');
    var mongoose = require('mongoose');
    let cors = require('cors');
    const port = process.env.PORT || 5000

    dotenv.config();
    var apiRouter = require('./routes');

    var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use(cors(corsOptions));

//route middelwares
    app.use('/api/v1', apiRouter);

//Connect to DB
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
        () => console.log('Connected to DB')
    )


    app.listen(port, function() {
        console.log('listening on 5000')
    })
};

module.exports = bootstrap;