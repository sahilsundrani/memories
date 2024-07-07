// import fs from 'fs';
// import { spawn } from 'child_process';

// const convertToBase64 = async (memory) => {
//     const pythonProcess = await spawn('python',['./base_64.py', memory.image]);
//     console.log('called');
//     pythonProcess.stdout.on('data',(data) => {
//         console.log(data)
//         return data;
//     })
// }

// const convertToImage = async (memory) => {

// }


// // import imageToBase64 from 'image-to-base64';
// // import base64ToImage from 'base64-to-image';
// // import {encode, decode} from 'node-base64-image';
// // const options = {
// //     string: true,
// //     headers: {
// //       "User-Agent": "my-app"
// //     }
// // };

// // const convertToBase64 = async (memory) => {
// //     const file = await encode(memory.image, options);
// //     console.log(file);
// //     // let file = await imageToBase64(url) // Path to the image
// //     // let file = await fs.readFileSync(url, {encoding : "base64" });
// //     return file;
// // }

// // const convertToImage = async (memory) => {
// //     await decode(memory.base64, { fname: memory.image, ext: 'jpg' });
// //     console.log('done');
// //     return;
// // }
// export { convertToBase64, convertToImage };