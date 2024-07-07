import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
    collectionName:{
        type: String,
        required: true
    },
    note:{ // description of collection
        type: String, 
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    memories :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Memory'
        }
    ]
},{
    timestamps : true
});

const Collection = mongoose.model('Collection',collectionSchema);

export default Collection;