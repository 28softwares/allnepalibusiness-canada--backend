import crypto from 'node:crypto';
import { DotEnvConfig } from '../config/dotenv.config';

const salt = "abc123"; // Generate a random salt

export const hashPassword = (password: string): string => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512") // Hash the password
    .toString("hex");
  return hash;
};

// Function to verify a password
export const verifyPassword = (password: string, storedHash: string) => {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return hashToVerify === storedHash; // Compare hashes
};


const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = DotEnvConfig.ENCRYPTION_KEY as string;
const IV = Buffer.from(DotEnvConfig.IV as string);

export const encrypt = (text: any): any => {
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${IV.toString('hex')}:${encrypted}`; // Store IV along with ciphertext
};

export const decrypt = (encryptedText: any): any => {
  const [ivHex, encrypted] = encryptedText.split(':'); // Extract IV from the string
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(ivHex, 'hex'),
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
