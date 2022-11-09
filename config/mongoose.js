const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.log.bind(console,'error on connecting to the database'));
db.once('open', function(){
    console.log('successfully connected to the database...');
});