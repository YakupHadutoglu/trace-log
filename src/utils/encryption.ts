import crypt from 'crypto';
import env from '../config/env';

const IV_length = 16;

export const encryptApiKey = (text: string) => {
    const iv = crypt.randomBytes(IV_length);
    const cipher = crypt.createCipheriv('aes-256-cbc', Buffer.from(env.ENCRYPTION_KEY as string), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export const decryptApiKey = (text: string) => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const dehipher = crypt.createDecipheriv('aes-256-cbc', Buffer.from(env.ENCRYPTION_KEY as string), iv);
    let decrypted = dehipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, dehipher.final()]);
    return decrypted.toString();
}
