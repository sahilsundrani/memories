import Memory from '../models/memory.js'
import Collection from '../models/collection.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { imageTagging, imageTaggingCloudinary } from '../config/image_tagging.js';
import User from '../models/user.js';
// import { convertToBase64, convertToImage } from '../config/base64.js';
import { spawn } from 'child_process';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pyFile = path.join(__dirname , '..', '/config/base_64.py');
const pyFile1 = path.join(__dirname , '..', '/config/image.py');
let uploads = path.join(__dirname , '..', '/uploads/');

const create = async (req,res) => {
    try{
        let uploads = path.join(__dirname , '..', '/uploads/')
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        let currentDate = `${day}-${month}-${year}`;
        currentDate.toString()
        let collection = await Collection.findById(req.body.collectionId);
        let user = await User.findById(collection.user);

        uploads = path.join(uploads, user.id);

        if (!fs.existsSync(uploads)) {
            fs.mkdirSync(uploads);
            uploads = path.join(uploads, '/', currentDate.toString());
            // console.log(uploads)
            // folderName = uploads;
            if (!fs.existsSync(uploads)) {
                fs.mkdirSync(uploads);
            }
        }else{
            uploads = path.join(uploads, '/', currentDate.toString());
            // folderName = uploads;
            if (!fs.existsSync(uploads)) {
                fs.mkdirSync(uploads);
            }
        }
        // console.log(req.files.image[0].name);
        for (var i = 0; i < req.files.image.length; i++){
            // console.log(uploads)
            const  image  = req.files.image[i];
            date = new Date();
            image.name = date.getHours().toString() + "-" + date.getMinutes().toString() + "-" + date.getSeconds().toString() + "-" + date.getMilliseconds().toString() + '.png'; 
            // console.log(image.name);
            if (!image) return res.sendStatus(400);
            image.mv(uploads + '/' + image.name);
            // if (/^image/.test(image.mimetype)) return res.sendStatus(400); 
            // console.log(uploads + '/' + image.name);
            if (collection){
            // if (req.file && req.user.id == collection.user){
                let memory = await Memory.create({
                    collectionRef: req.body.collectionId,
                    userRef: req.user._id,
                    image: uploads + '/' + image.name
                });
                //30-01
                let data = fs.readFileSync(memory.image);
                console.log(memory._id);
                // console.log(memory);
                // data.toString('base64')
                await Memory.findOneAndUpdate({_id:memory._id}, {encImage: data});
                console.log(memory);
                // console.log("data", data);
                // data = memory.base64.toString('base');
                // fs.writeFileSync('-2.txt',data);
                // console.log(memory.base64);



                // console.log(memory.image.slice(0,-4));
                // const pythonProcess = spawn('python',[pyFile, memory.image]);
                // console.log('called');
                // pythonProcess.stdout.on('data', async(data) => {
                    // console.log(data);
                    // await Memory.findOneAndUpdate({_id:memory._id}, {base64: data})
                // });
                // const pythonProcess1 = spawn('python',[pyFile1, memory.base64]);
                // console.log('called1');
                // convertToImage(memory);
                user.memories.push(memory._id);
                await user.save();

                collection.memories.push(memory._id);
                await collection.save();

                // imageTagging(memory);
                // imageTaggingCloudinary(memory);
            }
            
        }
        return res.status(200).json({
            // memories: memory,
            message: 'Memory Added!'
        })
        /*Memory.uploadedImage(req,res, async (err)=>{
            if (err){
                console.log('***Multer Error***',err);
            }
            let collection = await Collection.findById(req.body.collectionId);
            let user = await User.findById(collection.user);
            if (collection){
                if (req.file && req.user.id == collection.user){
                    let MEMORY_PATH = path.join(__dirname, '..',Memory.memoryPath);
                    let memory = await Memory.create({
                        collectionRef: req.body.collectionId,
                        userRef: req.user._id,
                        image: MEMORY_PATH + '/' + req.file.filename
                    });
                    user.memories.push(memory._id);
                    user.save();
                    collection.memories.push(memory._id);
                    collection.save();
                    // imageTagging(memory);
                    imageTaggingCloudinary(memory);

                        return res.status(200).json({
                            memories: memory,
                            message: 'Memory Added!'
                        })
                } else{
                    res.redirect('back');
                }   
            }
        }); */
    }catch(err){
        console.log('Catch',err);
        return res.send(err);
    }
}

// let asd = await Memory.findById('63d6fd1ae53559eff6fae5e9');
// asd.imgSrc;

const searchMemory = async (req,res) => {
    try{
        if(req.query.search_tag){
            let tag = req.query.search_tag;
            let memory = await Memory.find({tags:tag}); //-------for cloudinary
            // let memory1 = await Memory.find({tag: /tag/i }); // for imagga
            // memory = memory.concat(memory1);
            return res.render('search.ejs',{
                memories: memory
            });
        }else{
            res.redirect('back');
        } 
    }catch(err){
        console.log('Error in search',err)
        return res.redirect('back');
    }
}

const deleteMemory = async (req,res) => {
    try{
        let memory = await Memory.findByIdAndDelete(req.params.id);
        if (memory){
            if (memory.image && fs.existsSync(memory.image)){
                fs.unlinkSync(memory.image);
            }
            let user = await User.findById(memory.userRef);
            let collection = await Collection.findByIdAndUpdate(memory.collectionRef);
            user.memories.remove(memory._id);
            user.save();
            collection.memories.remove(memory._id);
            collection.save();
        }
        return res.status(200).json({
            message: 'Memory Deleted!'
        })

    }catch(err){
        console.log('Error in Deleting',err);
        res.redirect('back');
    }
}
const openMemory = async (req,res,next) => {
    try{
        let memory = await Memory.findById(req.params.id);
        const filename = 'sahil';
        res.setHeader('Content-Disposition','attachment: filename="' + filename + '"');
        const path = memory.image;
        const file = fs.createReadStream(path);
        file.pipe(res);
    }catch(err){
        console.log(err);
    }
}

const downloadMemory = async (req,res,next) => {
    try{
        let memory = await Memory.findById(req.params.id);
        fs.readFile(memory.image, (err,data)=>{
            const filename = 'sahil';
            res.setHeader('Content-Disposition','attachment: filename="' + filename + '"');
            const path = memory.image;
            const file = fs.createReadStream(path);
            file.pipe(res);
            res.send(data);
        });
    }catch(err){
        console.log(err);
    }
}

const refreshMemory = async (req,res) => {
    try {
        let memories = await Collection.findById(req.params.id).populate('memories');
        return res.status(200).json({
            memories: memories.memories,
            message: "Success"
        })
    } catch (error) {
        console.log(error);
    }
}
export { create, searchMemory, deleteMemory, downloadMemory, openMemory, refreshMemory};

