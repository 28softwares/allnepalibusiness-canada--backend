import * as crypto from "crypto";

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
