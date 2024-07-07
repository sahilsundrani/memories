//----------Using Cloudinary---------//

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "sahil-sundrani",
    api_key: "358547145398556",
    api_secret: "FF5g1iwjMHRawA6bq9e_NVc2V9w",
    secure: true
});
const imageTaggingCloudinary = async (memory) =>{
    try {
        const results = await cloudinary.uploader.upload(memory.image, {
            categorization: "google_tagging",
            auto_tagging: 0.3
        });
        let array = [];
        for (const [key, value] of Object.entries(results)) {
            if (key == 'tags') {
                array = value;
            }      
        }
        // console.log(array);
        memory.tags = array;
        memory.save();
    } catch (err) {
        console.log(err);   
    }
}


//---------------Using Imagga---------------//
import got from 'got';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiKey = 'acc_31b23bf88800baa';
const apiSecret = '34f38b86d246526ec9acc196a18762ea';

 
const imageTagging = (memory => {
    try {
        const filePath = memory.image;
        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));
        (async () => {
            try {
                const response = await got.post('https://api.imagga.com/v2/tags', {body: formData, username: apiKey, password: apiSecret});
                memory.tag = response.body;
                memory.save();
            }catch (error) {
                console.log(error);
            }
        })();
    } catch (error) {
        console.log(error);
    }
});

export { imageTagging, imageTaggingCloudinary };