import Collection from "../models/collection.js";
import Memory from '../models/memory.js';
import User from '../models/user.js';
import fs from 'fs';

const showGallery = async(req, res) => {
    try {
        let user = await User.findById(req.params.id).populate('memories').sort({'createdAt':0});
        console.log(user.memories);
    } catch (error) {
        return res.status(402).json({
            message: "Invalid operation"
        })
    }
}

const createCollection = async(req, res) => {
    try {
        let collection = await Collection.create({ collectionName: req.body.collectionName, note: req.body.note, user: req.user.id });
        let user = await User.findById(collection.user);
        user.collections.push(collection._id);
        user.save();
        return res.status(200).json({
            collection: collection,
            message: "Collection Created"
        })
    } catch (err) {
        console.log('Error in collection controller', err);
        return res.redirect('back');
    }
}
const openCollection = async(req, res) => {
    try {
        let collection = await Collection.findById(req.params.id).populate('memories');
        return res.render('collection.ejs', {
            memories: collection.memories,//here 30-1
            collectionId: req.params.id
        })
        
    } catch (err) {
        console.log('Error in collection controller', err);
        return res.redirect('back');
    }
}

const deleteCollection = async(req, res) => {
    try {
        let collection = await Collection.findByIdAndDelete(req.params.id);
        let memory = await Memory.find({ collectionRef: req.params.id });
        for (var i = 0; i < memory.length; i++) {
            await Memory.findByIdAndDelete(memory[i]._id);
            if (memory[i].image && fs.existsSync(memory[i].image)) {
                fs.unlinkSync(memory[i].image);
            }
        }
        let user = await User.findById(collection.user);
        user.collections.remove(collection._id);
        user.save();
        return res.status(200).json({
            collection_id: collection._id,
            message: 'Collection Deleted'
        })
    } catch (err) {
        console.log('Error in collection controller', err);
        return res.redirect('back');
    }
}

export { createCollection, openCollection, deleteCollection, showGallery };