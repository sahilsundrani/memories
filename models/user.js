import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }, 
    name : {
        type : String,
        required : true
    },
    collections :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        }
    ],
    memories :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Memory'
        }
    ]
},{
    timestamps : true
});

const User = mongoose.model('User',userSchema);
export default User;
