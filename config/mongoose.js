import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/memories_development');

const db = mongoose.connection;


db.on('error',console.error.bind(console,'Error connecting to mongodb'));
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

export default db;

