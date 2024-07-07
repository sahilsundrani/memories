import User from '../models/user.js'
import passport from 'passport';
import fs from 'fs';
import { encrypt, decrypt } from '../config/encrypt-decrypt.js';
const createUser = (req,res) => { 
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.log('error in finding user in signing up',err);
            return;
        }
        if (!user){
            User.create(req.body, (err,user) => {
                if (err) {
                    console.log('error in finding user in signing up',err);
                    return;
                }
                console.log(`user created succesfully.Welcome ${req.body.name}`)
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

const signUp = (req,res) => {
    if (req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    return res.render('sign_up.ejs',{
        title: 'Memories - Minimal Gallery',
        statement:"Hoii, Pug is working"
    });
}

const signIn = (req,res) => {
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in.ejs',{
        title: 'Memories - Minimal Gallery',
        statement:"Hoii, Pug is working"
    });
}

const createSession = async (req, res) => {
    try {
        let user = await User.findOne(req.user).populate('collections').populate('memories');
        for (let memory of user.memories){
            fs.readFile(memory.image, (err, file) => {
                if (err) console.log(err);
                if (file){
                    if (memory.encrypted == true){
                        const decryptedFile = decrypt(file, user._id);
                        memory.encrypted = false;
                        memory.save();
                        fs.writeFile(memory.image, decryptedFile, (err,file) => {
                            if (err) console.log(err);
                            if (file) console.log('Decrypted');
                        });
                    }   
                }
            })
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

const destroySession = async (req, res) => {
    try {
        let user = await User.findOne(req.user).populate('collections').populate('memories');
        for (let memory of user.memories){
            fs.readFile(memory.image, (err,file) => {
                if (err) console.log(err);
                if (memory.encrypted == false){
                    const encryptedFile = encrypt(file,user._id);
                    memory.encrypted = true;
                    memory.save();
                    fs.writeFile(memory.image, encryptedFile, (err,file) => {
                        if (err) console.log(err);
                        if (file) console.log('Encrypted');
                    });
                }
            });
        }
        req.logout(err =>{
            if (err){
                console.log(err);
                return res.redirect('back');
            }
        });
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
export { signUp, signIn, createUser, createSession, destroySession };
