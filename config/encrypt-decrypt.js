import crypto, { randomBytes } from 'crypto';
import fs from 'fs';

const algorithm = 'aes-256-ctr';

const encrypt = (file, id) => {
    let key = id;
    key = crypto.createHash('sha256').update(String(key)).digest('base64').substring(0,32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const result = Buffer.concat([iv, cipher.update(file), cipher.final()]);
    return result;
}
 
const decrypt = (encrypted, id) => {
    let key = id;
    key = crypto.createHash('sha256').update(String(key)).digest('base64').substring(0,32);
    const iv = encrypted.slice(0,16);
    encrypted = encrypted.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
}

export { encrypt, decrypt };
